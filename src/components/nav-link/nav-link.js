import React, {Component} from 'react';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

class NavLink extends Component {
    static propTypes = {
        filteredNavList: PropTypes.array.isRequired
    };
    // constructor(props) {
    //     super(props);
    // }
    render() {
        const Item = TabBar.Item;
        const currPath = this.props.location.pathname;
        return (
            <TabBar>
                {this.props.filteredNavList.map((item, index) => (
                    <Item
                        key={index}
                        title={item.title}
                        icon={{uri: require(`./icons/${item.icon}.png`)}}
                        selectedIcon={{uri: require(`./icons/${item.icon}-active.png`)}}
                        selected={currPath === item.path}
                        onPress={() => this.props.history.push(item.path)}
                    />))
                }
            </TabBar>
        );
    }
}

export default withRouter(NavLink);