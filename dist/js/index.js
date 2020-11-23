"use strict";

/* document.querySelector('h1').onclick = function (){
  alert(123);
}; */

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