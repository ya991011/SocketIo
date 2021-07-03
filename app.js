
const express = require('express');
const path = require('path');
const ejs = require('ejs');
var _ = require('underscore');
const app = express();

app.set('views', path.join(__dirname, 'views/html'));
app.set('view engine', 'ejs');
app.use('/views', express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.render('login')
})

app.get('/user', (req, res) => {
  res.render('index')
})

let port = 3001;
let portname = '192.168.0.106';
const server = require('http').createServer(app);
const io = require('socket.io')(server);
server.listen(port, portname);
// 存储所有用户
var hashName = {};
// 用户连接成功
io.on('connection', function(socket){
    console.log('connection is established!');
    // 设置用户名与socket.id的对应关系
    socket.on('setName',function (data) {
        var name = data;
        hashName[name] = socket.id;
        console.log(hashName);
        if(data) {
        	io.emit('users',hashName)
        }
    });
    // 对不同的socket.id发送信息
    socket.on('sayTo',function (data) {
        var toName = data.to;
        let msg = data.msg;
        let setName = data.setName;
        var toId;
        if(toId = hashName[toName]){
            // var toSocket = _.findWhere(io.sockets.sockets,{id:toId});
            // toSocket.emit('message',data.msg);
            socket.to(toId).emit('message',{msg: msg, to: toName, setName: setName, server: true});
        }
        console.log(data)
    })
    // 用户断开连接
    socket.on('disconnect', function(){
        console.log('connection is disconnect!');
        for(let attr in hashName) {
        	if(hashName[attr] === socket.id){
        		delete hashName[attr]
        		io.emit('users',hashName)  
        	}
        }
    });
});