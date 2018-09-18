import React, {Component} from 'react';
import {WingBlank, Button, WhiteSpace, List, InputItem} from 'antd-mobile';
// 导入自定义库
import Logo from '../../components/logo/logo';

class Login extends Component {
    constructor(props) {
        super(props);
        this.toRegister = this.toRegister.bind(this);
    }

    toRegister() {
        // console.log(this.props);//{match: {…}, location: {…}, history: {…}, staticContext: undefined}
        this.props.history.push('/register');
    }

    render() {
        return (
            <div>
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem>用户名</InputItem>
                        <InputItem>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary">登陆</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.toRegister}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}

export default Login;
