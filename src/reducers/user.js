// Reducer
import {REGISTER_SUCCESS} from '../actions/actions';

const initState = {
    isAuth: false,
    username: '',
    type: ''
};

const user = (state=initState, action)=> {
    switch (action.type){
        case REGISTER_SUCCESS:
            return {...state, isAuth: true, ...action.info};
            // return {...state,
            //     isAuth: true,
            //     username: action.info.username,
            //     type: action.info.type,
            // };
        default:
            return state;
    }
};

export default user;