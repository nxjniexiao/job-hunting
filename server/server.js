const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// 导入自定义库
const user = require( './user');
const handleChat = require('./handleChat');

const app = express();
app.use(bodyParser.json());// 使用JSON body parser中间件
app.use(cookieParser()); // 使用cookie-parser中间件
app.use('/user', user);

// 配置socket.io (work with express)
let server = require('http').createServer(app);
const io = require('socket.io')(server);
handleChat(io);
// 配置结束

let _server = server.listen(3030, '127.0.0.1', () => {
    const host = _server.address().address;
    const port = _server.address().port;
    console.log('http://%s:%s', host, port);
});