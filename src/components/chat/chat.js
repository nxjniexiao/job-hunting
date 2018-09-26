import './chat.css';
import React, {Component} from 'react';
import {NavBar, Icon, List, InputItem, Button} from 'antd-mobile';
import {connect} from 'react-redux';
import { sendMsg } from "../../actions/actions-chat";

const Item = List.Item;
@connect(
    state => state,
    dispatch => {
        return {
            // receiveMsg: (fromUserID) => dispatch(receiveMsg(fromUserID)),
            sendMsg:(fromUserID, toUserID, text) => dispatch(sendMsg(fromUserID, toUserID, text))
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
    componentDidMount() {
        // const fromUserID = this.props.user._id;// 发送消息的ID
        // this.props.receiveMsg(fromUserID);
    }
    // componentWillUpdate(){
    //     console.log('组件更新');
    //     const fromUserID = this.props.user._id;// 发送消息的ID
    //     goOnline(fromUserID);
    // }
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
        // const toUserID = this.props.match.params.chatWith;// 接收消息的ID
        return (
            <List>
                {chatContent.map((msg, index) => {
                    if (msg.fromUserID === fromUserID){
                        return <Item
                            key={index}
                            className="my-content"
                            thumb={this.props.user.avatar}
                        >{msg.text}</Item>
                    } else {
                        return <Item
                            key={index}
                            // thumb={this.props.chaList}
                        >{msg.text}</Item>
                    }
                })}
            </List>
        );

    }
    render(){
        return (
            <div>
                <NavBar
                    mode="dark"
                    icon={<Icon type="left"/>}
                    onLeftClick={() => {this.props.history.goBack()}}
                >name</NavBar>
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