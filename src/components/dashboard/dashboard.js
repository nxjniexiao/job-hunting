import './dashboard.css';
import React, {Component} from 'react';
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter, Route} from 'react-router-dom';
//引入自定义库
import NavLink from '../../components/nav-link/nav-link';
import Boss from '../../components/boss/boss';
import Genius from '../../components/genius/genius';
import My from '../../components/my/my';
import {getChatList} from '../../actions/actions-chatList';
import {receiveMsg} from "../../actions/actions-chat";
// import AuthRoute from '../../components/authroute/authroute';

@withRouter
@connect(
    state => state,
    dispatch => {
        return {
            getList: () => dispatch(getChatList()),
            receiveMsg: (fromUserID) => dispatch(receiveMsg(fromUserID))
        }
    }
)
class Dashboard extends Component {
    // componentWillMount () {
    //     if(this.props.chatList.list.length === 0) {
    //         this.props.getList();// 后端根据_id获取type
    //     }
    //     if(!this.props.chat.isOnline) {
    //         const fromUserID = this.props.user._id;// 发送消息的ID
    //         this.props.receiveMsg(fromUserID);
    //     }
    // }
    render() {
        /**temp**/
        const Message = () => (<div>Message Page</div>);
        /**temp end**/
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
        return (
            <div>
                {/*<AuthRoute/>*/}
                <NavBar className="fixed-header">{title}</NavBar>
                <div className="content-wrapper">
                    {filteredNavList.map((list, index) => (
                        <Route key={index} path={list.path} component={list.component} />
                    ))}
                </div>
                <NavLink filteredNavList={filteredNavList} />
            </div>
        );
    }
}
export default Dashboard;