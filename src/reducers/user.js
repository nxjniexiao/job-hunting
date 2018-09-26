// Reducer: user
import {
    AUTH_SUCCESS,
    LOAD_INFO,
    ERR_MSG,
    LOGOUT_SUCCESS
} from '../actions/actions-user';
import {getRedirectPath, getCookie} from '../common/js/util';

const initState = {
    redirectPath: '',
    username: '',
    type: '',
    msg: '',
    _id: getCookie('_id')
};

const user = (state=initState, action)=> {
    switch (action.type){
        case AUTH_SUCCESS:
            return {
                ...state,
                msg: '',
                redirectPath: getRedirectPath(action.info),
                ...action.info
            };
        case LOAD_INFO:
            return {
                ...state,
                msg: '',
                ...action.info
            };
        case ERR_MSG:
            return {
                ...state,
                msg: action.msg
            };
        case LOGOUT_SUCCESS:
            return {
                redirectPath: '/login',
                username: '',
                type: '',
                msg: action.msg
            };
        default:
            return state;
    }
};

export default user;