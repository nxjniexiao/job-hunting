import React, {Component} from 'react';
import {connect} from 'react-redux';
import {WhiteSpace} from 'antd-mobile';
// 引入自定义库
import UserList from '../../components/user-list/user-list';

class Boss extends Component {

    render() {
        return (
            <div>
                <WhiteSpace />
                <UserList chatList={this.props.chatList}/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        chatList: state.chatList.list
    }
};
export default connect(mapStateToProps)(Boss);