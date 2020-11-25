/* 登录模块 */
var logins = document.querySelector('.header-login')
var mask = document.querySelector('.header-mask')
var login = document.querySelector('.login')
var close = document.querySelector('.close')
var login_txt = document.querySelector('.login-txt')
var login_password = document.querySelector('.login-password')
var login_btn = document.querySelector('.login-btn')
var checkbox = document.querySelector('.login-checkbox')
/* 点击登录注册按钮弹出登陆界面 */
logins.onclick = function () {
    mask.style.display = 'block'
    login.style.display = 'block'
    if(getCookie('name')) {
        login_txt.value = getCookie('name')
        login_password.value = getCookie('password')
        checkbox.checked = true
    }
}
//console.log(login_txt)
close.onclick = function () {
    mask.style.display = 'none'
    login.style.display = 'none'
}
login_btn.onclick = function () {
    if(checkbox.checked) { //判断是否勾选密码
        //console.log(login_txt.value)
        setCookie( {
            key: 'name',
            val: login_txt.value,
            days: 7
        })
        setCookie( {
            key: 'password',
            val: login_password.value,
            days: 7
        })
        alert('登陆成功')
        
    } else { //没有勾选
        login_txt.value = ''
        login_password.value = ''
        removeCookie('name')
        removeCookie('password')
        alert('登陆成功')
    }
}

/* 注册 */
