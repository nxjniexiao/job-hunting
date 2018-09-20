import './dashboard.css';
import React, {Component} from 'react';
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter, Route} from 'react-router-dom';
//引入自定义库
import NavLink from '../../components/nav-link/nav-link';
import Boss from '../../components/boss/boss';
import Genius from '../../components/genius/genius';
import {getChatList} from '../../actions/actions-chatList';

class Dashboard extends Component {
    componentDidMount () {
        // console.log(this.props);
        // this.props.getList(this.props.type);// 第一次加载有值，刷新时没有值
        this.props.getList();// 后端根据_id获取type
    }
    render() {
        /**temp**/
        const Message = () => (<div>Message Page</div>);
        const My = () => (<div>My Page</div>);
        /**temp end**/
        const navList = [
            {
                title: '牛人列表',
                path: '/boss',
                icon: 'job',
                component: Boss,
                available: this.props.type === 'boss'
            },
            {
                title: 'Boss列表',
                path: '/genius',
                icon: 'boss',
                component: Genius,
                available: this.props.type === 'genius'
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
                    {filteredNavList.map((list, index) => (
                        <Route key={index} path={list.path} component={list.component} />
                    ))}
                </div>
                <NavLink filteredNavList={filteredNavList}/>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        type: state.user.type
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getList: () => dispatch(getChatList())
    }
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));