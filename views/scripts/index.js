var socket = io.connect('http://192.168.0.106:3001');

const app = new Vue({
  el: '#app',
  data: {
    username: '',
    toName: '',
    users: [],
    message: [],
    urls: 'https://picsum.photos/100/100?random=',
    chatWindow: false,
    userList: true,
    left: false,
    right: false
  },
  methods: {
    GoChat(data) {
      this.toName = data
      this.chatWindow = true
      this.userList = false
    },
    back() {
      this.chatWindow = false
      this.userList = true
    },
    // 发送信息
    sendMessage() {
      let setMessage = this.$refs.setMessage.value
      setMessage.replace(/\s/g, "");
      if (setMessage.trim() !== "") {
        this.message.push({ msg: setMessage, setName: this.username, to: this.toName })
        socket.emit('sayTo', { to: this.toName, msg: setMessage, setName: this.username })
        this.right = true
        this.$refs.setMessage.value = ''
        window.scrollTo(0, document.body.scrollHeight);
      }
    },
    // 页面滚动条位置设置
    inChange() {
      window.scrollTo(0, document.body.scrollHeight);
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 300)
    }
  },
  created() {
    // 查询本地sessionStorage，判断用户是否登录，如否，跳转登录页
    let username = window.sessionStorage.getItem('username')
    if (!username) {
      location.replace('/')
    } else {
      this.username = username
      socket.emit('setName', username);
    }
  },
  mounted() {
    // 监控用户上线，把用户名称push到users数组里面
    socket.on('users', (data) => {
      let users = []
      for (let attr in data) {
        users.push(attr)
      }
      this.users = users
    })
    // 接收信息，然后把信息push到message数组里面
    socket.on('message', (data) => {
      this.message.push(data)
      console.log(this.message)
    })
  }
})