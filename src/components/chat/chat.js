import './chat.css';
import React, {Component} from 'react';
import {NavBar, Icon, List, InputItem, Button} from 'antd-mobile';
import {connect} from 'react-redux';
// 引入自定义库
import {getChatList} from '../../actions/actions-chatList';
import {getMsg, receiveMsg, sendMsg, readMsg} from "../../actions/actions-chat";

const Item = List.Item;
@connect(
    state => state,
    dispatch => {
        return {
            getMsg: () => dispatch(getMsg()),
            getList: () => dispatch(getChatList()),
            receiveMsg: (fromUserID) => dispatch(receiveMsg(fromUserID)),
            sendMsg: (fromUserID, toUserID, text) => dispatch(sendMsg(fromUserID, toUserID, text)),
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

    }
    componentDidMount() {
        console.log('Chat 组件已经挂载');
        if(this.props.chatList.list.length === 0) {
            this.props.getList();// 后端根据_id获取type
        }
        if(!this.props.chat.isOnline) {
            const fromUserID = this.props.user._id;// 发送消息的ID
            this.props.receiveMsg(fromUserID);
        }
        if(this.props.chat.chatmsgs.length === 0){
            this.props.getMsg();
        }
    }
    componentWillUnmount() {
        const fromUserID = this.props.user._id;// 发送消息的ID
        const toUserID = this.props.match.params.chatWith;// 接收消息的ID
        this.props.readMsg(fromUserID, toUserID);
    }
    handleSubmit() {
        const fromUserID = this.props.user._id;// 发送消息的ID
        const toUserID = this.props.match.params.chatWith;// 接收消息的ID
        this.props.sendMsg(fromUserID, toUserID, this.state.text);
        this.setState({
            text: ''
        })
    }
    showChatContent(chatContent) {
        const fromUserID = this.props.user._id;// 发送消息的ID
        const toUserID = this.props.match.params.chatWith;// 接收消息的ID
        // 获取对方信息
        let toInfo = null;
        this.props.chatList.list.forEach(item => {
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
                                extra={<img src={this.props.user.avatar} alt="img" />}
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
        return (
            <div>
                {this.showChatContent(this.props.chat.chatmsgs)}
                <List className="msg-edit">
                    <InputItem
                        value={this.state.text} /*重要，双向绑定*/
                        onChange={v => this.setState({text: v})}
                        extra={<Button type="primary" onClick={()=>this.handleSubmit()}>发送</Button>}
                        placeholder="请输入聊天内容"
                    />
                </List>
            </div>
        );
    }
}
export default Chat;