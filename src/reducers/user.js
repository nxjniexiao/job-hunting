// Reducer: user
import {
    AUTH_SUCCESS,
    LOAD_INFO,
    ERR_MSG
} from '../actions/actions-user';
import {getRedirectPath} from '../common/js/util';

const initState = {
    redirectPath: '',
    isAuth: false,
    username: '',
    type: '',
    msg: ''
};

const user = (state=initState, action)=> {
    switch (action.type){
        case AUTH_SUCCESS:
            return {
                ...state,
                isAuth: true,
                msg: '',
                redirectPath: getRedirectPath(action.info),
                ...action.info
            };
        case LOAD_INFO:
            return {
                ...state,
                isAuth: true,
                msg: '',
                ...action.info
            };
        case ERR_MSG:
            return {
                ...state,
                isAuth: false,
                msg: action.msg
            };
        default:
            return state;
    }
};

export default user;