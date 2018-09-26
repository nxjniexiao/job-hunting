import {
    CHAT_ONLINE,
    CHAT_OFFLINE,
    MSG_RECEIVED
} from '../actions/actions-chat';

const initState = {
    isOnline: false,
    chatmsgs: []
};
console.log(initState);
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
        default:
            return state;
    }
};
export default chat;