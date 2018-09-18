import React, {Component} from 'react';
import axios from 'axios';

class AuthRoute extends Component {
    componentDidMount() {
        // 获取用户信息
        // 是否登陆
        // 现在的url地址，login是不是需要跳转
        // 用户的type，身份是boss还是牛人
        // 用户是否完善信息(选择头像 个人简介)
        axios.get('/user/info').then((res) => {
            if(res.status === 200) {
                console.log(res.data);
            }
        });
    }
    render() {
        return <div>authroute</div>;
    }
}
export default AuthRoute;