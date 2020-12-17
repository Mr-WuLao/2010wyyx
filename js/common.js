
/* 热销榜 */
var hotList = document.querySelector('.hotList')/* 获取热销榜 */
/* 获取元素最开始的top值 */
var hotlistW = offset(hotList).top
//console.log(hotlistW)
window.addEventListener('scroll', function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    if (hotlistW  <= scrollTop){  
        /* 当符合条件，则产生吸顶效果 */
        scan.style.top = scrollTop + 'px'
        hotList.style.top = scrollTop + 'px'
    }
})
/* 新人福利 */
var scan = document.querySelector('.scan')
var hotlistW1 = offset(scan).top
window.addEventListener('scroll', function() {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    if (hotlistW1  <= scrollTop){  
        /* 当符合条件，则产生吸顶效果 */
        scan.style.top = scrollTop + 'px'
    }
})
//点击登录注册按钮跳转到登录页面
let header_login = document.querySelector('.header-login')
header_login.addEventListener('click', function () {
    location.href = './login.html'
})



//搜索框搜索功能，这里没有数据接口，所以使用了百度搜索框接口
let logo_form = document.querySelector('.logo-form')
let search = document.querySelector('.logo-form>input')
let search_show = document.querySelector('.logo-form-search')
search.addEventListener('input', function() {
    let oScript = document.createElement('script')
    oScript.src = 'http://suggestion.baidu.com/su?cb=callback&wd=' + search.value
    document.body.appendChild(oScript)
    oScript.onload = function () {
        document.body.removeChild(oScript)
    }
    if (search.value == '') {
        console.log(111)
        search_show.style.display = 'none'
    }
})
function callback(json) {
    console.log(json)
    let str = ''
    json.s.forEach(function (item) {
        str += `<li>${item}</li>`
    })
    search_show.innerHTML = str
}