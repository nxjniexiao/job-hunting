const express = require('express');
const router = express.Router();
// 自定义库
const getModel = require('./model');

// mongoose，连接mongodb数据库
const User = getModel('user');
// 处理注册: axios.post("/user/register", {})
router.post('/register', (req, res) => {
    // console.log(req.body);// 使用body-parser后产生的对象
    const {username, pwd, type} = req.body;
    User.findOne({username}, (err, doc) => {
        if(doc){
            res.json({code: 1, msg: '此用户名已被注册。'});
            return;
        }
        const instance = new User({username, pwd, type});
        instance.save((err, product) => {
            if(err) {
                // console.log(err);
                res.json({code: 2, msg: '内部错误，注册失败。'});
                return;
            }
            const _id = product._id;
            // console.log(product);// {_id: 5b9f..., username: 'nie',...}
            // 向前端返回cookie
            res.cookie("_id", _id, {maxAge: 10*60*1000});
            res.json({code: 0, info: {username, type, _id}});
        })
    });
});
// 处理登陆: axios.post("/login", {})
router.post('/login', (req, res) => {
    console.log(req.body);// 使用body-parser后产生的对象
    const {username, pwd} = req.body;
    User.findOne({username, pwd}, (err, doc) => {
        if(doc){
            // 向前端返回cookie
            res.cookie("_id", doc._id, {maxAge: 10*60*1000});
            // 登陆成功
            res.json({code: 0, info: doc});
        } else {
            // 登陆失败
            res.json({code: 1, msg: '用户名或密码错误！'});
        }
    })
});
// 处理请求信息：axios.get('/user/info')
router.get('/info', (req, res) => {
    // 获取cookie中的_id
    if(req.cookies && req.cookies._id){
        const _id = req.cookies._id;
        console.log('_id: '+_id);
        User.findOne({_id}, (err, doc) => {
            if(err){
                res.json({code: 1, msg: '后端错误！'});
                return;
            }
            res.json({code: 0, info: doc});
        })
    } else {
        // _id不存在
        res.json({code: 1, msg: '无登陆信息'});
    }
});


module.exports = router;