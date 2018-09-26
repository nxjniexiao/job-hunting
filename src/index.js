import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// 导入自定义模块
import rootReducers from './reducers';
import Login from './containers/login/login';
import Register from './containers/register/register';
import AuthRoute from './components/authroute/authroute';
import BossInfo from './containers/boss-info/boss-info';
import GeniusInfo from './containers/genius-info/genius-info';
import Dashboard from './components/dashboard/dashboard';
import Chat from './components/chat/chat';

const loggerMiddleware = createLogger();// 用来打印 action 日志
const store = createStore(
    rootReducers,
    compose(
        applyMiddleware(thunk,loggerMiddleware),
        window.devToolsExtension?window.devToolsExtension():f=>f
    ),
);
ReactDOM.render(
    (<Provider store={store}>
        <Router>
            <div>
                <AuthRoute/>
                <Switch>
                    <Route path="/boss-info" component={BossInfo}/>
                    <Route path="/genius-info" component={GeniusInfo}/>
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/chat/:chatWith" component={Chat} />
                    <Route component={Dashboard} />
                </Switch>
            </div>
        </Router>
    </Provider>),
    document.getElementById('root')
);
