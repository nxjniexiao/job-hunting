import './chat.css';
import React, {Component} from 'react';
import {NavBar, Icon, List} from 'antd-mobile';
import {connect} from 'react-redux';
import BScroll from 'better-scroll';
// 引入自定义库
import {getChatList} from '../../actions/actions-chatList';
import {getMsg, receiveMsg, readMsg} from "../../actions/actions-chat";
import ChatInput from './chat-input';

const Item = List.Item;
@connect(
    state => {
        return {
            _id: state.user._id,
            avatar: state.user.avatar,
            isOnline: state.chat.isOnline,
            chatmsgs: state.chat.chatmsgs,
            list: state.chatList.list
        }
    },
    dispatch => {
        return {
            getMsg: () => dispatch(getMsg()),
            getList: () => dispatch(getChatList()),
            receiveMsg: (fromUserID) => dispatch(receiveMsg(fromUserID)),
            readMsg: (fromUserID, toUserID) => dispatch(readMsg(fromUserID, toUserID))
        }
    }
)
class Chat extends Component {
    constructor(props){
        super(props);
        this.state={
            text: ''
        }
    }
    componentWillMount() {
        if(this.props.list.length === 0) {
            this.props.getList();// 后端根据_id获取type
        }
        if(!this.props.isOnline) {
            const fromUserID = this.props._id;// 发送消息的ID
            this.props.receiveMsg(fromUserID);
        }
        if(this.props.chatmsgs.length === 0){
            this.props.getMsg();
        }
    }
    componentDidMount() {
        // 聊天信息滚动
        this.scrollMsgs();
    }
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.chatmsgs.length !== nextProps.chatmsgs.length
        );
    }
    componentDidUpdate() {
        // 聊天信息滚动
        this.scrollMsgs();
    }
    componentWillUnmount() {
        const fromUserID = this.props._id;// 发送消息的ID
        const toUserID = this.props.match.params.chatWith;// 接收消息的ID
        this.props.readMsg(fromUserID, toUserID);
    }
    scrollMsgs() {
        this.msgsScrollY = 0;
        const chatMsg = document.querySelector('.am-list');
        if(chatMsg){
            if(this.msgScroll !== null){
                this.msgScroll = new BScroll(chatMsg, {probeType: 3});
            }
            const wrapperY = document.querySelector('.am-list').clientHeight;
            const contentY = document.querySelector('.am-list-body').clientHeight;
            this.msgScroll.on('scroll', (pos) => {
                this.msgsScrollY = Math.abs(Math.round(pos.y));
                // console.log('this.msgsScrollY=', this.msgsScrollY);
            });
            const disY = contentY - wrapperY;
            // console.log('disY=',disY);
            if( this.msgsScrollY < disY ) {
                this.msgScroll.scrollTo(-this.msgsScrollY, -disY, 0);
            }
        }
    }
    showChatContent(chatContent) {
        const fromUserID = this.props._id;// 发送消息的ID
        const toUserID = this.props.match.params.chatWith;// 接收消息的ID
        // 获取对方信息
        let toInfo = null;
        this.props.list.forEach(item => {
            if(item._id === toUserID) {
                toInfo = {
                    username: item.username,
                    _id: item._id,
                    avatar: item.avatar
                }
            }
        });
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {this.props.history.goBack()}}
                >{toInfo ? toInfo.username : ''}</NavBar>
                <List className="chat-msg">
                    {chatContent.map((msg, index) => {
                        const relevantUsers = [fromUserID, toUserID].sort().join('_');
                        if(msg.relevantUsers !== relevantUsers){
                            return null;
                        }
                        if (msg.fromUserID === fromUserID){
                            return <Item
                                key={index}
                                className="my-content"
                                extra={<img src={this.props.avatar} alt="img" />}
                            >{msg.text}</Item>
                        } else {
                            return <Item
                                key={index}
                                thumb={toInfo.avatar}
                            >{msg.text}</Item>
                        }
                    })}
                </List>
            </div>
        );

    }
    render(){
        console.log('chat 组件 render 中。。。');
        return (
            <div>
                {this.showChatContent(this.props.chatmsgs)}
                <ChatInput fromUserID={this.props._id} toUserID={this.props.match.params.chatWith} />
            </div>
        );
    }
}
export default Chat;