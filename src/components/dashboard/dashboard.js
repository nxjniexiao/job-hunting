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
    state => state,
    dispatch => {
        return {
            getMsg: () => dispatch(getMsg()),
            getList: () => dispatch(getChatList()),
            receiveMsg: (fromUserID) => dispatch(receiveMsg(fromUserID))
        }
    }
)
class Dashboard extends Component {
    componentWillMount () {
        console.log('== Dashboard 组件即将挂载');
        this.props.getList();// 后端根据_id获取type
        // if(this.props.chatList.list.length === 0) {
        //     this.props.getList();// 后端根据_id获取type
        // }
        if(!this.props.chat.isOnline) {
            const fromUserID = this.props.user._id;// 发送消息的ID
            this.props.receiveMsg(fromUserID);
        }
        if(this.props.chat.chatmsgs.length === 0){
            this.props.getMsg();
        }
    }
    componentDidMount() {
        // 中间内容区域滚动(异步问题)
        const contentWrapper = document.querySelector('.content-wrapper');
        if(contentWrapper){
            new BScroll(contentWrapper, {click: true});
        }
    }
    componentWillUpdate() {
        console.log('== Dashboard 组件即将更新');
    }
    componentDidUpdate() {
        console.log('== Dashboard 组件已经更新');
    }
    render() {
        const type = this.props.user.type;
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
        // 未读消息数量
        const fromUserID = this.props.user._id;// 发送消息的ID
        let unreadMsgs = 0;
            this.props.chat.chatmsgs.forEach((msg) => {
                if(msg.toUserID === fromUserID && msg.isRead === false){
                    unreadMsgs++;
                }
            });
        return (
            <div>
                <NavBar className="fixed-header">{title}</NavBar>
                <div className="content-wrapper">
                    <div className="content">
                        {filteredNavList.map((list, index) => (
                            <Route key={index} path={list.path} component={list.component} />
                        ))}
                    </div>
                </div>
                <NavLink filteredNavList={filteredNavList} unreadMsgs={unreadMsgs}/>
            </div>
        );
    }
}
export default Dashboard;