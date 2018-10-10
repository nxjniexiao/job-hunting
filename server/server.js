const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
// 导入自定义库
const user = require( './user');
const handleChat = require('./handleChat');

const app = express();
app.use(bodyParser.json());// 使用JSON body parser中间件
app.use(cookieParser()); // 使用cookie-parser中间件
app.use('/user', user);
// build完成后新增配置
app.use(express.static(path.resolve('./build')));// 托管 build 目录下的文件
app.use((req, res, next) => {
    console.log(req.url);
    const reg = /^\/user|\/static/;// 判断请求URL是否以 /user 或 /static 开头
    if(reg.test(req.url)) {
        return next();
    }
    return res.sendFile(path.resolve('./build/index.html'));// path.resolve() 会把一个路径或路径片段的序列解析为一个绝对路径。
});

// 配置socket.io (work with express)
let server = require('http').createServer(app);
const io = require('socket.io')(server);
handleChat(io);
// 配置结束

let _server = server.listen(3030, '192.168.8.103', () => {
    const host = _server.address().address;
    const port = _server.address().port;
    console.log('http://%s:%s', host, port);
});