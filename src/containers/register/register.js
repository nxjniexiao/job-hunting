import React, {Component} from 'react';
import {WingBlank, Button, WhiteSpace, List, InputItem, Radio} from 'antd-mobile';
// import md5 from 'md5';// 无效
import {connect} from 'react-redux';
// 导入自定义库
import Logo from '../../components/logo/logo';
import {register} from '../../actions/actions';

const RadioItem = Radio.RadioItem;
class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            username: '',
            pwd: '',
            repeatPwd: '',
            type: 'boss'// 'boss'或者'genius'
        };
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleChange(key, value) {
        this.setState({
            [key]: value
        });
    }
    handleRegister() {
        const md5 = require('md5');
        const {username, pwd, repeatPwd, type} = this.state;
        if(username === ''){
            alert('用户名不能为空！');
            return;
        }
        if(pwd === ''){
            alert('密码不能为空！');
            return;
        }
        if(repeatPwd === ''){
            alert('确认密码不能为空！');
            return;
        }
        if(pwd !== repeatPwd){
            alert('密码不一致');
            return;
        }
        // 注册
        this.props.register({
            username,
            pwd: md5(pwd),
            type
        });
    }
    render() {
        return (
            <div>
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v=>this.handleChange('username',v)}
                        >用户名</InputItem>
                        <InputItem
                            type="password"
                            onChange={v=>this.handleChange('pwd',v)}
                        >密码</InputItem>
                        <InputItem
                            type="password"
                            onChange={v=>this.handleChange('repeatPwd',v)}
                        >确认密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <RadioItem
                        checked={this.state.type === "boss"}
                        // onChange={this.typeSelected('boss')}
                        onClick={()=>this.handleChange('type',"boss")}
                    >老板</RadioItem>
                    <RadioItem
                        checked={this.state.type === "genius"}
                        // onChange={this.typeSelected('genius')}
                        onClick={()=>this.handleChange('type',"genius")}
                    >牛人</RadioItem>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        register: info => dispatch(register(info))
    }
};
export default connect(null, mapDispatchToProps)(Register);