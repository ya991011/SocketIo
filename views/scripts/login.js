var socket = io.connect("http://192.168.0.106:3001");
// 设置聊天昵称，并且把昵称存在sessionStorage中
let btn_login = document.getElementById("btn-login");
btn_login.onclick = function() {
  let in_username = document.getElementById("username").value;
  // 去除昵称字符串中的空字符
  in_username = in_username.replace(/\s/g, "");
  // 昵称验证
  if (in_username.trim() !== "") {
    if(in_username.length > 5) {
      alert('昵称长度在1-5字符之间');
      return document.getElementById("username").value = '';
    }
    window.sessionStorage.setItem("username", in_username);
    let username = window.sessionStorage.getItem("username");
    if (username) {
      location.replace("user");
    } else {
      location.replace("/");
    }
  } else {
    alert("拜托，请设置昵称");
  }
};
