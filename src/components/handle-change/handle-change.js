// 简单的高阶组件
// 代理 state 和 handleChange
import React, {Component} from 'react';

export default function handleChange(Comp){
    return class HandleChangeComp extends Component {
        constructor(props){
            super(props);
            this.state={};
            this.handleChange=this.handleChange.bind(this);
        }
        handleChange(key, value) {
            this.setState({
                [key]: value
            });
        }
        render () {
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props} />;
        };
    }
}