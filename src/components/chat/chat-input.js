import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, InputItem, Button} from 'antd-mobile';
import {sendMsg} from "../../actions/actions-chat";

@connect(
    null,
    dispatch => {
        return {
            sendMsg: (fromUserID, toUserID, text) => dispatch(sendMsg(fromUserID, toUserID, text)),
        }
    }
)
class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }
    handleSubmit() {
        this.props.sendMsg(this.props.fromUserID, this.props.toUserID, this.state.text);
        this.setState({
            text: ''
        })
    }
    render() {
        console.log('chat-input 组件 render 中。。。');
        return (
            <List className="msg-edit">
                <InputItem
                    value={this.state.text} /*重要，双向绑定*/
                    onChange={v => this.setState({text: v})}
                    extra={<Button type="primary" onClick={()=>this.handleSubmit()}>发送</Button>}
                    placeholder="请输入聊天内容"
                />
            </List>
        );
    }
}
export default ChatInput;