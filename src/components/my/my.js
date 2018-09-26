import React, {Component} from 'react';
import {Result, List, Button, WhiteSpace, Modal} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
// 引入自定义库
import {logout} from '../../actions/actions-user';

const Item = List.Item;
const Brief = Item.Brief;
const alert = Modal.alert;

@connect(
    state => {
        return {
            user: state.user
        }
    },
    dispatch => {
        return {
            logout: () => dispatch(logout())
        }
    }
)
class My extends Component {
    logout() {
        alert('退出登录', '', [
            { text: '取消', onPress: () => {} },
            { text: '确认', onPress: () => this.props.logout() },
        ])
    }
    createItem(title, content, multipleLine = false) {
        if (multipleLine) {
            if (content) {
                return (
                    <Item multipleLine>
                        {title}
                        {
                            content.split('\n').map((item, index) => (<Brief key={index}>{item}</Brief>))
                        }
                    </Item>
                );
            }
        } else {
            return (
                <Item multipleLine extra={content}>
                    {title}
                </Item>
            );
        }
    }
    createList(info) {
        if (info.type === 'boss') {
            return (
                <List renderHeader="招聘信息">
                    {this.createItem('招聘公司', info.company, false)}
                    {this.createItem('招聘岗位', info.title, false)}
                    {this.createItem('工资', info.salary, false)}
                    {this.createItem('职位要求', info.desc, true)}
                </List>
            );
        } else {
            return (
                <List renderHeader="应聘信息">
                    {this.createItem('应聘岗位', info.title, false)}
                    {this.createItem('个人描述', info.desc, true)}
                </List>
            );
        }
    }
    render() {
        const currPath = this.props.location.pathname;
        const redirect = (this.props.user.redirectPath && (this.props.user.redirectPath !== currPath));
        return (<div>
            { (!this.props.user._id && redirect) ? <Redirect to={this.props.user.redirectPath} /> : null}
            <Result
                img={<img src={this.props.user.avatar} alt="头像" style={{width: '60px'}}/>}
                title={this.props.user.username}
            />
            {this.createList(this.props.user)}
            <WhiteSpace/>
            <Button type="warning" onClick={this.logout.bind(this)}>退出登录</Button>
        </div>);
    }
}
export default My;