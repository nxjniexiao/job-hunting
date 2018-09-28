import io from 'socket.io-client';
import axios from 'axios';

export const MSG_RECEIVED = 'MSG_RECEIVED';
export const CHAT_ONLINE = 'CHAT_ONLINE';
export const CHAT_OFFLINE = 'CHAT_OFFLINE';
export const GET_MSG_SUCCESS = 'GET_MSG_SUCCESS';
export const MSG_READ = 'MSG_READ';
let socket = null;

function msgReceived(msg){
    return {
        type: MSG_RECEIVED,
        msg
    };
}
// export function goOnline(fromUserID){
//     return dispatch => {
//         dispatch({
//             type: CHAT_ONLINE
//         });
//         socket = io('http://localhost:3030');// 连接服务器
//         socket.emit('online', fromUserID);// 上线
//         // 监听后端发来的消息
//         socket.on('receive-msg', function(data){
//             dispatch(msgReceived(data));
//         });
//     }
// }
// export function chatOnline(){
//     return {
//         type: CHAT_ONLINE
//     }
// }
// export function goOffline(){
//     return {
//         type: CHAT_OFFLINE
//     }
// }
export function receiveMsg(fromUserID) {
    return dispatch => {
        dispatch({type: CHAT_ONLINE});
        // socket = io('http://localhost:3030');// 连接服务器
        socket = io('ws://192.168.8.103:3030');// 连接服务器
        socket.emit('online', fromUserID);// 上线
        socket.on('receive-msg', function(data){
            dispatch(msgReceived(data));
        });
    };
}
export function sendMsg(fromUserID, toUserID, text){
    return dispatch => {
        const relevantUsers = [fromUserID, toUserID].sort().join('_');
        const data =  {relevantUsers, fromUserID, toUserID, text, isRead: false};
        socket.emit('send-msg', data);
        dispatch(msgReceived(data));
    }
}
function getMsgSuccess (chatmsgs){
    return {
        type: GET_MSG_SUCCESS,
        chatmsgs
    }
}
export function getMsg() {
    return dispatch => {
        axios.get('/user/msg-list').then(res => {
            if(res.status === 200 && res.data.code === 0){
                dispatch(getMsgSuccess(res.data.chatmsgs));
            }
        })
    }
}
function msgRead(fromUserID, toUserID) {
    return {
        type: MSG_READ,
        fromUserID,
        toUserID
    }
}
export function readMsg(fromUserID, toUserID) {
    return dispatch => {
        axios.post('/user/read-msg',{fromUserID, toUserID})
            .then(res => {
                if(res.status === 200 && res.data.code === 0) {
                    dispatch(msgRead(fromUserID, toUserID));
                }
            });
    }
}