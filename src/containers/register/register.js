import React, {Component} from 'react';
import {WingBlank, Button, WhiteSpace, List, InputItem, Radio} from 'antd-mobile';
// import md5 from 'md5';// 无效
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
// 导入自定义库
import Logo from '../../components/logo/logo';
import {register} from '../../actions/actions-user';
import handleChange from '../../components/handle-change/handle-change';

const RadioItem = Radio.RadioItem;

@handleChange
@connect(
    state => {
        return {
            redirectPath: state.user.redirectPath
        };
    },
    dispatch => {
        return {
            register: info => dispatch(register(info))
        };
    }
)
class Register extends Component {
    constructor(props){
        super(props);
        // this.state={
        //     username: '',
        //     pwd: '',
        //     repeatPwd: '',
        //     type: 'boss'// 'boss'或者'genius'
        // };
        this.handleRegister = this.handleRegister.bind(this);
    }
    componentDidMount() {
        this.props.handleChange('type', 'boss');
    }
    // handleChange(key, value) {
    //     this.setState({
    //         [key]: value
    //     });
    // }
    handleRegister() {
        const md5 = require('md5');
        const {username, pwd, repeatPwd, type} = this.props.state;
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
                {this.props.redirectPath?<Redirect to={this.props.redirectPath} />:null}
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem
                            onChange={v=>this.props.handleChange('username',v)}
                        >用户名</InputItem>
                        <InputItem
                            type="password"
                            onChange={v=>this.props.handleChange('pwd',v)}
                        >密码</InputItem>
                        <InputItem
                            type="password"
                            onChange={v=>this.props.handleChange('repeatPwd',v)}
                        >确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem
                            checked={this.props.state.type === "boss"}
                            onChange={()=>this.props.handleChange('type',"boss")}
                        >老板</RadioItem>
                        <RadioItem
                            checked={this.props.state.type === "genius"}
                            onChange={()=>this.props.handleChange('type',"genius")}
                        >牛人</RadioItem>
                    </List>
                    <WhiteSpace/>
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        );
    }
}
// const mapStateToProps = state => {
//     return {
//         redirectPath: state.user.redirectPath
//     };
// };
// const mapDispatchToProps = dispatch => {
//     return {
//         register: info => dispatch(register(info))
//     };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Register);
export default Register;