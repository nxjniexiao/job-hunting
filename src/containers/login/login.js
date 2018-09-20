import React, {Component} from 'react';
import {WingBlank, Button, WhiteSpace, List, InputItem} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
// 导入自定义库
import Logo from '../../components/logo/logo';
import {login} from "../../actions/actions-user";

const md5 = require('md5');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pwd: '',
        };
        this.toRegister = this.toRegister.bind(this);
        this.login = this.login.bind(this);
    }
    toRegister() {
        // console.log(this.props);// {match: {…}, location: {…}, history: {…}, staticContext: undefined}
        this.props.history.push('/register');// 跳转
    }
    login() {
        const {username, pwd} = this.state;
        if(username === ''){
            console.log('用户名不能为空！');
            return;
        }
        if(pwd === ''){
            console.log('密码不能为空！');
            return;
        }
        this.props.login({
            username,
            pwd: md5(pwd)
        });
    }
    handleChange (key, value){
        this.setState({
            [key]: value
        });
    }
    render() {
        return (
            <div>
                {this.props.redirectPath?<Redirect to={this.props.redirectPath} />:null}
                <Logo/>
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v => this.handleChange('username', v)}>
                            用户名
                        </InputItem>
                        <InputItem
                            type="password"
                            onChange={v => this.handleChange('pwd', v)}>
                            密码
                        </InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.login}>登陆</Button>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.toRegister}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        redirectPath: state.user.redirectPath
    };
};
const mapDispatchToProps = dispatch => {
    return {
        login: info => dispatch(login(info))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
