import {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {withRouter} from 'react-router-dom';// 访问react-router的history对象
// 引入自定义库
import {loadInfo} from '../../actions/actions-user';
import {receiveMsg} from '../../actions/actions-chat';
import {getChatList} from '../../actions/actions-chatList';

@withRouter
@connect(
    state => state,
    dispatch => {
        return {
            loadInfo: info => dispatch(loadInfo(info)),
            getList: () => dispatch(getChatList()),
            receiveMsg: (fromUserID) => dispatch(receiveMsg(fromUserID))
        }
    }
)
class AuthRoute extends Component {
    componentWillMount() {
        console.log('AuthRoute 组件已挂载');
        // 用户的type，身份是boss还是牛人
        // 用户是否完善信息(选择头像/个人简介)

        // 1. 判断前端中当前url是否需要验证
        const pathWithoutAuth = ['/login', '/register'];// 无需验证的路径
        const currPath = this.props.location.pathname;// 当前路径
        if(pathWithoutAuth.indexOf(currPath) !== -1) {
            // indexOf在没找到的情况下返回-1
            return;
        }
        // 2.向后端发送get请求，获取用户信息
        axios.get('/user/info').then((res) => {
            // 判断是否已登陆
            if(res.status === 200 && res.data.code === 0) {
                // 2.1 已登录：dispatch来获取后端传过来的信息
                this.props.loadInfo(res.data.info);
                // 2.2 socket.io上线,监听
                // const fromUserID = this.props.user._id;// 发送消息的ID
                // this.props.receiveMsg(fromUserID);
                if(!this.props.isOnline) {
                    const fromUserID = this.props._id;// 发送消息的ID
                    this.props.receiveMsg(fromUserID);
                }
                // 2.3 获取可聊天用户列表
                if(this.props.chatList.list.length === 0){
                    this.props.getList();// 后端根据_id获取type
                }
            } else {
                // 2.4 未登录：跳转至登陆页面
                // console.log(this.props);// {match: {…}, location: {…}, history: {…}, staticContext: undefined}
                this.props.history.push('/login');// 跳转至登陆页面
            }
        });
    }
    // componentWillUnmount() {
    //     console.log('AuthRoute 组件即将卸载');
    // }
    // componentWillUpdate(){
    //     console.log('AuthRoute 组件即将更新');
    //     // socket.io上线,监听
    //     // const fromUserID = this.props.user._id;// 发送消息的ID
    //     // this.props.receiveMsg(fromUserID);
    //     if(!this.props.chat.isOnline) {
    //         const fromUserID = this.props._id;// 发送消息的ID
    //         this.props.receiveMsg(fromUserID);
    //     }
    //     // 获取可聊天用户列表
    //     if(this.props.chatList.list.length === 0) {
    //         this.props.getList();// 后端根据_id获取type
    //     }
    // }
    componentDidUpdate(){
        console.log('AuthRoute 组件已经更新');
    }
    render() {
        return null;
    }
}
export default AuthRoute;