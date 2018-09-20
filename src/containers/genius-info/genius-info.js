import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {NavBar, List, InputItem, TextareaItem, Button} from 'antd-mobile';
// 引入自定义库
import AvatarSelector from '../../components/avatar-selector/avatar-selector';
import {update} from '../../actions/actions-user';

class GeniusInfo extends Component {
    constructor(props){
        super(props);
        this.state = {
            avatar: '',
            title: '',
            desc: ''
        };
        this.submitAvatar = this.submitAvatar.bind(this);
    }
    componentDidMount() {
        this.setState({
            ...this.props.user
        });
    }
    handleChange(key, value) {
        this.setState({
            [key]: value
        });
    }
    submitAvatar(avatar){
        this.setState({
            avatar
        });
    }
    render(){
        const currPath = this.props.location.pathname;// 当前路径
        const redirect = (this.props.redirectPath && (this.props.redirectPath !== currPath));// 是否需要跳转
        return (<div>
            {redirect ? <Redirect to={this.props.redirectPath}/> : null}
            <NavBar mode="dark">
                牛人完善信息页
            </NavBar>
            <AvatarSelector
                avatar={this.state.avatar}
                submitAvatar={this.submitAvatar}
            />
            <List>
                <InputItem
                    onChange={v => this.handleChange('title', v)}>
                    应聘岗位
                </InputItem>
                <TextareaItem
                    rows={3}
                    title="个人简介"
                    autoHeight="rows"
                    onChange={v => this.handleChange('desc', v)}
                />
            </List>
            <Button type="primary" onClick={() => this.props.updateInfo(this.state)}>保存</Button>
        </div>)
    }
}
const mapStateToProps = state => {
    return {
        // user: state.user
        redirectPath: state.user.redirectPath
    }
};
const mapDispatchToProps = dispatch => {
    return {
        updateInfo: info => dispatch(update(info))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(GeniusInfo);