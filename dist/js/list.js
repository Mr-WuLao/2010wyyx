//$(function () {

/* 获取商品列表 */

/*   $.ajax ({
       url: 'http://localhost/goods.json',
       type: 'get',
       dataType: 'json',
       success: function (json) {
           console.log(json)
       }
   })
}) */

/* window.onload = function (){
var oScript = document.createElement('script')
oScript.src = 'http://localhost/goods.json?cb=mycallback'
document.body.appendChild(oScript)
    /* oScript.onload = function (){
  document.body.removeChild(oScript)
} */

/*}
var list = document.querySelector('.main-show')
function mycallback(json){
  var domStr = ''
  $.each(json, function (index, item){
    domStr += `<dl>
    <dt><img src="${item.imgurl}" alt=""></dt>
    <dd>
        <a>${item.title}</a>
        <span>${item.price} <em></em></span>
        <p>多色选择,缤纷你的夏日</p>
    </dd>
</dl>`
  })
  list.innerHTML = domStr
} */
"use strict";