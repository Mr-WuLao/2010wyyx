"use strict";

/* <!-- banner图 --> */
var mySwiper = new Swiper('.swiper-container', {
  //direction: 'vertical', // 垂直切换选项
  loop: true,
  // 循环模式选项
  grabCursor: true,
  autoplay: {
    delay: 2000,
    stopOnLastSlide: true,
    disableOnInteraction: false // stop()

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
/*  // 鼠标移入停止自动滚动
$('.swiper-slide').mouseenter(function() {
  mySwiper.autoplay.stop();
})
// 鼠标移出开始自动滚动
$('.swiper-slide').mouseleave(function() {
  mySwiper.autoplay.start();
}) */