import {combineReducers} from 'redux';
// 引入reducers
import user from './user';
import chatList from './chatList';

export default combineReducers({user, chatList});