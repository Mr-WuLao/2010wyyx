"use strict";

/* <!-- banner图 --> */
var mySwiper = new Swiper('.swiper-container', {
  //direction: 'vertical', // 垂直切换选项
  loop: true,
  // 循环模式选项
  autoplay: {
    delay: 2000,
    stopOnLastSlide: true,
    disableOnInteraction: false
  },
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});
/*鼠标移入停止轮播，鼠标离开 继续轮播*/

mySwiper.el.onmouseover = function () {
  mySwiper.autoplay.stop();
}; //鼠标离开开始自动切换


mySwiper.el.onmouseout = function () {
  mySwiper.autoplay.start();
};
/* 获取case案例数据 */


$(function () {
  var case_main = document.querySelector('.case-main');
  $.ajax({
    url: './img/index.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      // console.log(json)
      var domStr = '';
      $.each(json, function (index, item) {
        domStr += "\n               <dl class=\"case-imgs\">\n               <dt code = \"".concat(item.code, "\"><img src=\"").concat(item.imgurl, "\" alt=\"\"></dt>\n               <dd>\n                   <i>\u7279\u4EF7</i>\n                   <p>").concat(item.title, "</p>\n                   <span>\uFFE5").concat(item.price, "<em>\uFFE5").concat(item.price1, "</em></span>\n               </dd>\n           </dl>\n               ");
      });
      case_main.innerHTML = domStr;
    }
  });
});