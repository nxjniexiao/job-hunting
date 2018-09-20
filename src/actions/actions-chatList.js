import axios from "axios";

export const GET_CHART_LIST_SUCCESS = 'GET_CHART_LIST_SUCCESS';
export const GET_CHART_LIST_FAILED = 'GET_CHART_LIST_FAILED';

function getChatListSuccess(chatList) {
    return {
        type: GET_CHART_LIST_SUCCESS,
        chatList
    }
}
//出错
function getChatListFailed(msg) {
    return {
        type: GET_CHART_LIST_FAILED,
        msg
    }
}
// Thunk(返回一个函数): 获取聊天用户列表
export function getChatList(){
    return dispatch => {
        axios.get('/user/list')
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    //获取成功
                    dispatch(getChatListSuccess(res.data.chatList));
                }else {
                    //获取失败
                    dispatch(getChatListFailed(res.data.msg));
                }
            }).catch(err => console.log(err));
    }
}