import React, {Component} from 'react';
import {Grid, List} from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatarSelector extends Component {
    static propTypes = {
        submitAvatar: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const avatarNameList = ['boy', 'girl', 'man', 'woman', 'bull', 'chick', 'crab',
            'hedgehog', 'hippo', 'koala', 'lemur', 'pig', 'tiger', 'whale', 'zebra'];
        const avatarList = avatarNameList.map(name => {
            return {
                icon: require(`./avatars/${name}.png`),
                text: name
            }
        });
        const renderHeader = (
            <div style={{display: 'inline-block', height: '32px', lineHeight: '32px'}}>
                <span>{this.props.avatar ? '您选择的头像：' : '请选择头像'}</span>
                {
                    this.props.avatar
                        ? <img style={{height: '32px', verticalAlign: 'top'}} src={this.props.avatar} alt="头像"/>
                        : null
                }
            </div>
        );
        return (
            <div>
                <List renderHeader={renderHeader}>

                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={(avatar) => this.props.submitAvatar(avatar.icon)}
                    />
                </List>
            </div>
        )
    }
}
export default AvatarSelector;