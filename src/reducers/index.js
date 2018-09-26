import {combineReducers} from 'redux';
// 引入reducers
import user from './user';
import chatList from './chatList';
import chat from './chat';

export default combineReducers({user, chatList, chat});