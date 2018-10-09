import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
@connect(
    state => state
)
class Message extends Component {
    getTime(createTime){
        function fixedPre(num, pre){
            return ('000000000' + num).slice(-pre);
        }
        const CreateDate = new Date(createTime);
        const now = new Date();
        if(now.getDay() !== CreateDate.getDay()){
            return fixedPre(CreateDate.getFullYear(), 4) + '/'
                + fixedPre((CreateDate.getMonth()+1), 2) + '/'
                + fixedPre(CreateDate.getDate(), 2);
        } else {
            return fixedPre(CreateDate.getHours(), 2) + ':'
                + fixedPre(CreateDate.getMinutes(), 2);
        }
    }
    getLastMsg(msgList){
        return msgList[msgList.length - 1];
    }
    countUnread(msgList) {
       let count = 0;
       msgList.forEach(msg => {
           if(!msg.isRead){
               count ++;
           }
       });
       return count;
    }
    getUser(_id, userList) {
        let res = null;
        userList.forEach(list => {
            if (_id === list._id){
                res = list;
            }
        });
        return res;
    }
    sortMessage(msgList, userList){
        if(msgList.length === 0 || userList.length === 0) {
            return null;
        }
        const fromUserID = this.props.user._id;
        // 筛选出别人发给自己的消息
        const toMsgList = msgList.filter(list => list.fromUserID !== fromUserID);
        // 按发送用户分类
        const msg = {};// { id: [{消息1}，{消息2}] }
        toMsgList.forEach(list => {
            if(!msg[list.fromUserID]){
                msg[list.fromUserID] = [];
            }
            msg[list.fromUserID].push(list);
        });
        // 根据消息是否全部已读分类
        const msgUserList = Object.getOwnPropertyNames(msg);
        const readMsgUserList = [];
        const unreadMsgUserList = [];
        msgUserList.forEach(user => {
            const isAllRead = msg[user].every(msg => {
                return msg.isRead;
            });
            if(isAllRead){
                readMsgUserList.push(user);
            } else {
                unreadMsgUserList.push(user);
            }
        });
        // 重新排序，新消息显示在上面
        const compare = (preID, nextID) => {
            return this.getLastMsg(msg[nextID]).createTime - this.getLastMsg(msg[preID]).createTime;
        };
        readMsgUserList.sort(compare);
        unreadMsgUserList.sort(compare);
        // 渲染
        return (<div>
            {this.renderMessage(unreadMsgUserList, msg, userList)}
            {this.renderMessage(readMsgUserList, msg, userList)}
        </div>)
    }

    renderMessage(msgList, msg, userList,) {
        return msgList.map(id => {
            return (
                <List key={id}>
                    <Item
                        arrow="horizontal"
                        thumb={this.getUser(id, userList).avatar}
                        extra={<div>
                            {<Badge style={ {marginRight: '5px'} } text={this.countUnread(msg[id])}/>}
                            {this.getTime(this.getLastMsg(msg[id]).createTime)}
                        </div>}
                        onClick={() => this.props.history.push(`/chat/${id}`)}
                    >
                        {this.getUser(id, userList).username}
                        <Brief>{this.getLastMsg(msg[id]).text}</Brief>
                    </Item>
                </List>
            );
        });
    }
    render() {
        const msgList = this.props.chat.chatmsgs;
        const userList = this.props.chatList.list;
        return (
            <div>
                {(msgList && userList) ? this.sortMessage(msgList, userList) : ''}
            </div>
        );
    }
}
export default Message;