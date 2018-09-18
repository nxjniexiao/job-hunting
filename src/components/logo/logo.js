import './logo.css'
import React, {Component} from 'react';
//导入自定义库
import Img from './job.png';

class Logo extends Component {
    render() {
        return (
            <div className="logo-wrapper">
                <img src={Img} alt="logo"/>
            </div>
        );
    }
}
export default Logo;