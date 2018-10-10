import {
    CHAT_ONLINE,
    CHAT_OFFLINE,
    MSG_RECEIVED,
    GET_MSG_SUCCESS,
    MSG_READ
} from '../actions/actions-chat';

const initState = {
    isOnline: false,
    chatmsgs: []
};
const chat = (state = initState, action) => {
    switch (action.type) {
        case MSG_RECEIVED:
            return {
                ...state,
                chatmsgs: [...state.chatmsgs, action.msg]
            };
        case CHAT_ONLINE:
            return {
                ...state,
                isOnline: true
            };
        case CHAT_OFFLINE:
            return {
                ...state,
                isOnline: false
            };
        case GET_MSG_SUCCESS:
            return {
                ...state,
                chatmsgs: action.chatmsgs
            };
        case MSG_READ:
            let newChatMsgs = state.chatmsgs.map(msg => {
                if(msg.fromUserID === action.toUserID && msg.toUserID ===  action.fromUserID) {
                    // 判断条件是反的，对方发给我的消息设为已读
                    return {...msg, isRead: true};
                }
                return msg;
            });
            return {
                ...state,
                chatmsgs: newChatMsgs
            };
        default:
            return state;
    }
};
export default chat;