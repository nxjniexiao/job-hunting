function handleChat(io){
    const socketsOnline = {};
    io.on('connection', function(socket){
        // 监听上线
        console.log('有用户连接...');
        socket.on('online', function(userID){
            socket.userID = userID;// 给socket增加一个"userID"属性
            console.log(`用户${socket.userID}上线了。`);
            if(!socketsOnline[userID]) {
                socketsOnline[userID] = socket;
            }
            console.log("在线用户：", Object.getOwnPropertyNames(socketsOnline));
        });
        // 监听下线
        socket.on('disconnect', function() {
            if(socketsOnline[socket.userID]) {
                delete socketsOnline[socket.userID];
                console.log(`用户${socket.userID}断开连接。`);
            }
            console.log("在线用户：", Object.getOwnPropertyNames(socketsOnline));
        });
        // 监听客户端A发来的消息
        socket.on('send-msg', function(data){
            // 把信息存储在mongodb数据库中

            // 给指定客户端B发送信息
            if(socketsOnline[data.toUserID]) {
                console.log('=== 发送消息 ===');
                io.sockets.connected[socketsOnline[data.toUserID].id].emit('receive-msg', data);
            }
        });
    });
}
module.exports = handleChat;