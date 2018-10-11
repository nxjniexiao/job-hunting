import {
    GET_CHART_LIST_SUCCESS,
    GET_CHART_LIST_FAILED,
    EMPTY_CHART_LIST
} from '../actions/actions-chatList';

const chatList = (state = {list: [], msg: ''}, action) => {
    switch(action.type){
        case GET_CHART_LIST_SUCCESS:
            return {
                ...state,
                list: action.chatList,
                msg: ''
            };
        case GET_CHART_LIST_FAILED:
            return {
                ...state,
                list: [],
                msg: action.msg
            };
        case EMPTY_CHART_LIST:
            return {
                list: [],
                msg: action.msg
            };
        default:
            return state;
    }
};
export default chatList;