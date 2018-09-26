import io from 'socket.io-client';

export const MSG_RECEIVED = 'MSG_RECEIVED';
export const CHAT_ONLINE = 'CHAT_ONLINE';
export const CHAT_OFFLINE = 'CHAT_OFFLINE';
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
        socket = io('http://localhost:3030');// 连接服务器
        socket.emit('online', fromUserID);// 上线
        socket.on('receive-msg', function(data){
            dispatch(msgReceived(data));
        });
    };
}
export function sendMsg(fromUserID, toUserID, text){
    return dispatch => {
        socket.emit('send-msg', {fromUserID, toUserID, text});
        dispatch(msgReceived({fromUserID, toUserID, text}));
    }
}