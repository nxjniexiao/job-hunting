import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

// 导入自定义模块
import rootReducers from './reducers';
import Login from './containers/login/login';
import Register from './containers/register/register';
import AuthRoute from './components/authroute/authroute';

const loggerMiddleware = createLogger();// 用来打印 action 日志
const store = createStore(
    rootReducers,
    applyMiddleware(
        thunk,
        loggerMiddleware
    )
);

ReactDOM.render(
    (<Provider store={store}>
        <Router>
            <div>
                <AuthRoute/>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </div>
        </Router>
    </Provider>),
    document.getElementById('root')
);
