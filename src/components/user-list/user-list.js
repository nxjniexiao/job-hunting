import React, {Component} from 'react';
import {WingBlank,Card} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

@withRouter
class UserList extends Component {
    showContent(data) {
        const isBoss = (data.type === "boss");
        return (
            <div>
                {isBoss ? <div>公司名称：{data.company}</div> : null}
                {isBoss ? <div>工资：{data.salary}</div> : null}
                {isBoss ? <div>岗位要求：</div> : null}
                <div>{data.desc.split('\n').map((item,index) => {
                    return <div key={index}>{item}</div>;
                })}</div>
            </div>
        );
    }
    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <WingBlank>
                {this.props.chatList.map((item, index) => {
                    return (
                        <Card
                            key={index}
                            onClick={() => {this.props.history.push(`/chat/${item._id}`)}}
                        >
                            <Header
                                title={item.username}
                                thumb={item.avatar}
                                extra={item.title}
                            />
                            <Body>
                                {this.showContent(item)}
                            </Body>
                        </Card>
                    );
                })}
            </WingBlank>
        )
    }
}
export default UserList;