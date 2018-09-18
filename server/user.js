const express = require('express');
const router = express.Router();
// 自定义库
const getModel = require('./model');

router.get('/boss', (req, res) => {
    res.json({type: 'boss'});
});
router.get('/info', (req, res) => {
    // cookie相关操作
    res.json({code: 1});
});
router.get('/genius', (req, res) => {
    res.json({type: 'genius'});
});
// 处理注册: axios.post("/user/register", {})
const User = getModel('user');
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
            res.json({code: 0, info: {username, type, _id}});
        })
    });
});

module.exports = router;