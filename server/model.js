/*操作mongodb数据模型*/
const mongoose = require('mongoose');

// 连接mongodb
const DB_URL = 'mongodb://127.0.0.1:27017/job-hunting';
mongoose.connect(DB_URL, { useNewUrlParser: true });
const models = {
    user: {
        username: {type: String, required: true},
        pwd: {type: String, required: true},
        type: {type: String, required: true},
    },
    chat: {},
};
for (let modelName in models) {
    // mongoose.model(name, schema)定义一个model
    // 注：modelName 对应数据库中的集合名
    mongoose.model(modelName, new mongoose.Schema(models[modelName]));
}
module.exports = function getModel(name) {
    // mongoose.model(name)返回一个model
    return mongoose.model(name);
};