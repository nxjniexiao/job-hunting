import './dashboard.css';
import React, {Component} from 'react';
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter, Route} from 'react-router-dom';
import BScroll from 'better-scroll';
// 引入自定义库
import NavLink from '../../components/nav-link/nav-link';
import Boss from '../../components/boss/boss';
import Genius from '../../components/genius/genius';
import My from '../../components/my/my';
import Message from '../../components/message/message';
import {getChatList} from '../../actions/actions-chatList';
import {receiveMsg, getMsg} from "../../actions/actions-chat";

@withRouter
@connect(
    state => {
        let unreadMsgs = 0;// 未读消息数量
        const fromUserID = state.user._id;
        state.chat.chatmsgs.forEach((msg) => {
            if (msg.toUserID === fromUserID && msg.isRead === false) {
                unreadMsgs++;
            }
        });
        return {
            _id: state.user._id,
            type: state.user.type,
            isOnline: state.chat.isOnline,
            chatMsgsLength: state.chat.chatmsgs.length,
            unreadMsgs
        }
    },
    dispatch => {
        return {
            getMsg: () => dispatch(getMsg()),
            getList: () => dispatch(getChatList()),
            receiveMsg: (fromUserID) => dispatch(receiveMsg(fromUserID))
        }
    }
)
class Dashboard extends Component {
    componentWillMount() {
        this.props.getList();// 后端根据_id获取type
        if (!this.props.isOnline) {
            const fromUserID = this.props._id;// 发送消息的ID
            this.props.receiveMsg(fromUserID);
        }
        if (this.props.chatMsgsLength === 0) {
            this.props.getMsg();
        }
    }
    componentDidMount() {
        // 中间内容区域滚动
        const contentWrapper = document.querySelector('.content-wrapper');
        if (contentWrapper) {
            new BScroll(contentWrapper, {click: true});
        }
    }
    // 减少 render 次数
    shouldComponentUpdate(nextProps, nextState) {
        return (
            this.props.location.pathname !== nextProps.location.pathname ||
            this.props.unreadMsgs !== nextProps.unreadMsgs ||
            this.props.chatMsgsLength !== nextProps.chatMsgsLength);
    }
    render() {
        console.log('dashboard 组件 render中。。。');
        const type = this.props.type;
        const navList = [
            {
                title: '牛人列表',
                path: '/boss',
                icon: 'job',
                component: Boss,
                available: type === 'boss'
            },
            {
                title: 'Boss列表',
                path: '/genius',
                icon: 'boss',
                component: Genius,
                available: type === 'genius'
            },
            {
                title: '消息',
                path: '/message',
                icon: 'msg',
                component: Message,
                available: true
            },
            {
                title: '我的',
                path: '/my',
                icon: 'user',
                component: My,
                available: true
            }
        ];
        const filteredNavList = navList.filter(item => item.available);
        let title = null;// 标题
        filteredNavList.forEach(item => {
            if (this.props.location.pathname === item.path) {
                title = item.title;
            }
        });
        return (
            <div>
                <NavBar className="fixed-header">{title}</NavBar>
                <div className="content-wrapper">
                    <div className="content">
                        {filteredNavList.map((list, index) => (
                            <Route key={index} path={list.path} component={list.component}/>
                        ))}
                    </div>
                </div>
                <NavLink filteredNavList={filteredNavList} unreadMsgs={this.props.unreadMsgs}/>
            </div>
        );
    }
}
export default Dashboard;