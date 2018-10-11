import {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {withRouter} from 'react-router-dom';// 访问react-router的history对象
// 引入自定义库
import {loadInfo} from '../../actions/actions-user';

@withRouter
@connect(
    null,
    dispatch => {
        return {
            loadInfo: info => dispatch(loadInfo(info)),
        }
    }
)
class AuthRoute extends Component {
    componentWillMount() {
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
            } else {
                // 2.2 未登录：跳转至登陆页面
                // console.log(this.props);// {match: {…}, location: {…}, history: {…}, staticContext: undefined}
                this.props.history.push('/login');// 跳转至登陆页面
            }
        });
    }
    render() {
        console.log('authroute 组件 render中。。。');
        return null;
    }
}
export default AuthRoute;