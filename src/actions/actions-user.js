import axios from "axios";
// 自定义模块
import {emptyChatList} from '../actions/actions-chatList';
import {emptyMsgList} from '../actions/actions-chat';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const LOAD_INFO = 'LOAD_INFO';
export const ERR_MSG = 'ERR_MSG';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

//注册\登陆\更新成功
function authSuccess(info) {
    return {
        type: AUTH_SUCCESS,
        info
    };
}
// 根据cookie._id查询到相应用户
export function loadInfo(info){
    return {
        type: LOAD_INFO,
        info
    };
}
//出错
function errMsg(msg) {
    return {
        type: ERR_MSG,
        msg
    };
}
// 退出登录成功
function logoutSuccess(msg){
    return {
        type: LOGOUT_SUCCESS,
        msg
    };
}
// Thunk(返回一个函数): 注册
export function register({username, pwd, type}) {
    return dispatch => {
        axios.post('/user/register', {username, pwd, type})
            .then((res) => {
                // console.log(res);// res.data：返回的json
                if (res.status === 200 && res.data.code === 0) {
                    // 注册成功
                    dispatch(authSuccess(res.data.info));
                } else {
                    // 注册失败
                    dispatch(errMsg(res.data.msg));
                }
            }).catch(err => console.log(err));
    }
}
// Thunk(返回一个函数): 登陆
export function login({username, pwd}) {
    return dispatch => {
        axios.post('/user/login', {username, pwd})
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    //登陆成功
                    dispatch(authSuccess(res.data.info));
                }else{
                    //登陆失败
                    dispatch(errMsg(res.data.msg));
                }
            }).catch(err => console.log(err));
    }
}
// Thunk(返回一个函数): 更新用户信息
export function update(info){
    return dispatch => {
        axios.post('/user/update', info)
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    //更新成功
                    dispatch(authSuccess(res.data.info));
                }else {
                    //更新失败
                    dispatch(errMsg(res.data.msg));
                }
            }).catch(err => console.log(err));
    }
}
// Thunk(返回一个函数): 退出登录
export function logout() {
    return dispatch => {
        axios.get('/user/logout')
            .then(res => {
            dispatch(logoutSuccess(res.data.msg));
            // 清空用户列表
            dispatch(emptyChatList(res.data.msg));
            // 清空聊天信息
            dispatch(emptyMsgList());
            });
    }
}