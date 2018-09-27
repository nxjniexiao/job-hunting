import {
    CHAT_ONLINE,
    CHAT_OFFLINE,
    MSG_RECEIVED,
    GET_MSG_SUCCESS
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
            }
        default:
            return state;
    }
};
export default chat;