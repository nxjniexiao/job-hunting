const express = require('express');
const router = express.Router();
// 自定义库
const getModel = require('./model');

// mongoose，连接mongodb数据库
const User = getModel('user');
const Chat = getModel('chat');
// 处理注册: axios.post("/user/register", {})
router.post('/register', (req, res) => {
    const {username, pwd, type} = req.body;// req.body：使用body-parser后产生的对象
    User.findOne({username}, (err, doc) => {
        if(doc){
            res.json({code: 1, msg: '此用户名已被注册。'});
            return;
        }
        const instance = new User({username, pwd, type});
        instance.save((err, product) => {
            if(err) {
                // console.log(err);
                res.json({code: 1, msg: '内部错误，注册失败。'});
                return;
            }
            // console.log(product);// {_id: 5b9f..., username: 'nie',...}
            // 向前端返回cookie
            res.cookie("_id", product._id, {maxAge: 60*60*1000});
            product.pwd = null;
            res.json({code: 0, info: product});
        });
    });
});
// 处理登陆: axios.post("/user/login", {})
router.post('/login', (req, res) => {
    const {username, pwd} = req.body;// req.body：使用body-parser后产生的对象
    User.findOne({username, pwd}, (err, doc) => {
        if(doc){
            // 向前端返回cookie
            res.cookie("_id", doc._id, {maxAge: 60*60*1000});
            // 登陆成功
            doc.pwd = null;
            res.json({code: 0, info: doc});
        } else {
            // 登陆失败
            res.json({code: 1, msg: '用户名或密码错误！'});
        }
    });
});
// 处理更新用户信息: axios.post('/user/update', {})
router.post('/update', (req, res) => {
    // 获取cookie中的_id，判断用户是否已登录
    if(req.cookies && req.cookies._id){
        // 已登录
        const _id = req.cookies._id;
        console.log('_id: '+_id);
        User.findOneAndUpdate({_id}, req.body, (err, doc) => {
            if(err){
                res.json({code: 1, msg: '后端错误！'});
            }else{
                console.log(doc);
                doc.pwd = null;
                // doc为插入数据前，在数据库中查找到的数据
                const info = Object.assign({}, {type: doc.type}, req.body);
                // 注意：不要直接复制doc，会复制doc中其他不需要的可枚举属性。
                // const info = Object.assign({}, doc, req.body);
                res.json({code: 0, info: info});
            }
        });
    } else {
        // 未登录，_id不存在
        res.json({code: 1, msg: '无登陆信息'});
    }

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
            if(doc) {
                // 找到与_id对应的用户信息
                doc.pwd = null;
                res.json({code: 0, info: doc});
            } else {
                // 未找到与_id对应的用户信息
                res.clearCookie('_id');// 删除cookie
                res.json({code: 1, msg: '未找到跟_id对应的用户信息'});
            }
        })
    } else {
        // cookies不存在
        res.json({code: 1, msg: '无cookies信息'});
    }
});
// 处理请求信息：axios.get('/user/list')
router.get('/list', (req, res) => {
    // 获取cookie中的_id
    if(req.cookies && req.cookies._id){
        const _id = req.cookies._id;
        console.log('_id: '+_id);
        User.findOne({_id}, (err, doc) => {
            if(err){
                res.json({code: 1, msg: '后端错误！'});
                return;
            }
            if(doc){
                // 找到与_id对应的用户信息
                // let type = req.query.type;// BUG: 第一次加载有值，刷新时没有值
                let type = doc.type;// 用户的类型
                console.log('type = ', type);
                type = (type==='boss') ? 'genius' : 'boss';
                User.find({type}, (err, doc) => {
                    if(err){
                        res.json({code: 1, msg: '后端错误！'});
                        return;
                    }
                    doc.forEach(item => {item.pwd = null});// 删除密码
                    res.json({code: 0, chatList: doc});
                });
            }else{
                // 未找到与_id对应的用户信息
                res.clearCookie('_id');// 删除cookie
                res.json({code: 1, msg: '未找到跟_id对应的用户信息'});
            }
        })
    } else {
        // cookies不存在
        res.json({code: 1, msg: '无cookies信息'});
    }
});
// 处理登出请求：axios.get('/user/logout')
router.get('/logout', (req, res) => {
    res.clearCookie('_id');// 删除cookie
    res.json({code: 0, msg: '已退出登录'});
});
// 处理获取聊天信息请求：axios.get('/user/msg-list')
router.get('/msg-list', (req, res) => {
    // 获取cookie中的_id
    if(req.cookies && req.cookies._id){
        const _id = req.cookies._id;
        User.findOne({_id}, (err, doc) => {
            if(err){
                res.json({code: 1, msg: '后端错误！'});
                return;
            }
            if(doc){
                // 找到与_id对应的用户信息
                Chat.find({'$or': [{fromUserID: _id}, {toUserID: _id}]}, (err, doc) => {
                    if(err){
                        res.json({code: 1, msg: '后端错误！'});
                        return;
                    }
                    res.json({code: 0, chatmsgs: doc});
                })
            }else{
                // 未找到与_id对应的用户信息
                res.clearCookie('_id');// 删除cookie
                res.json({code: 1, msg: '未找到跟_id对应的用户信息'});
            }
        })
    } else {
        // cookies不存在
        res.json({code: 1, msg: '无cookies信息'});
    }
});
// axios.post('/user/read-msg',{fromUserID, toUserID})
router.post('/read-msg', (req, res) => {
    // console.log(req.body);
    const {fromUserID, toUserID} = req.body;
    Chat.updateMany({fromUserID: toUserID, toUserID: fromUserID}, {$set: {isRead: true}}, (err, doc)=>{
        // 筛选条件颠倒，是为了把对方发给自己的消息设为已读
        if(err){
            res.json({code:1, msg: '设置消息为已读失败'});
            return;
        }
        res.json({code:0, msg: '设置消息为已读成功'});
    });
});
module.exports = router;