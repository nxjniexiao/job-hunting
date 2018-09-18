const express = require('express');
const bodyParser = require('body-parser');
// 导入自定义库
const user =require( './user');

const app = express();
app.use(bodyParser.json());// 使用JSON body parser
app.use('/user', user);
const server = app.listen(3030, '127.0.0.1', () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('http://%s:%s', host, port);
});