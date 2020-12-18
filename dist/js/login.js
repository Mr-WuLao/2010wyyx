"use strict"; //新人红包吸顶效果

var scan = document.querySelector('.scan');
var hotlistW1 = offset(scan).top;
window.addEventListener('scroll', function () {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

  if (hotlistW1 <= scrollTop) {
    /* 当符合条件，则产生吸顶效果 */
    scan.style.top = scrollTop + 'px';
  }
});
/* 登录模块 */

var login = document.querySelector('.main-login');
var sign = document.querySelector('.main-sign');
var login_txt = document.querySelector('.login-txt');
var login_pass = document.querySelector('.login-pass');
var login_login = document.querySelector('.banner-form em'); //登录

var login_sign = document.querySelector('.banner-form b'); //注册

login_login.addEventListener('click', function () {
  if (!login_txt.value || !login_pass.value) {
    alert('账号密码不能为空');
    return;
  } // 获取数据


  ajax({
    url: './user.php',
    type: 'post',
    data: {
      user: login_txt.value,
      pass: login_pass.value,
      type: 'login'
    },
    dataType: 'json',
    success: function success(json) {
      alert(json.msg);
      location.href = './index1.html';
    },
    error: function error(code) {
      alert(code);
    }
  });
});
login_sign.addEventListener('click', function () {
  // 验证
  if (!login_txt.value || !login_pass.value) {
    alert('账号密码不为空');
    return;
  }

  ajax({
    url: './user.php',
    type: 'post',
    data: {
      user: login_txt.value,
      pass: login_pass.value,
      type: 'add'
    },
    dataType: 'json',
    success: function success(json) {
      alert(json.msg);
    },
    error: function error(code) {
      alert(code);
    }
  });
});