# IM一对一聊天，基于nodejs+socket.io+vue.js
## 项目分析
WebSocket 是 HTML5 开始提供的一种在单个 TCP 连接上进行全双工通讯的协议。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。
这里说的数据传输，我们简单点理解就是“广播”。而广播又分为对所有人广播与对个人广播，简单点理解就是“群聊”与“私聊”。这个项目是一对一聊天，也就是“私聊”，如果对socket.io感兴趣的话，可以参考如下文档：https://www.w3cschool.cn/socket/socket-buvk2eib.html
## 一对一聊天
连接到socket服务器的每个一用户都是一个对象，并且他们是唯一的，既然是唯一的，肯定有一个唯一的id，这个id叫做socket.
id，我们只需要维护一个socket.id和用户名映射关系的全局对象即可，也就是源码中的`var hashName = {}`。
## 项目运行
把`app.js`,`views/scripts/login.js`,`views/scripts/index.js`的ip地址换成自己的ip地址，然后打开powershell，输入命令`node app.js`即可体验。
## 项目截图，项目为移动端开发，移动端体验为佳
![](https://images.gitee.com/uploads/images/2020/0808/102845_1d63b14d_7392036.png)
![](https://images.gitee.com/uploads/images/2020/0808/102845_d19667b5_7392036.png)
![](https://images.gitee.com/uploads/images/2020/0808/102845_c085df56_7392036.png)
