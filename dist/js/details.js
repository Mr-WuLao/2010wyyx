"use strict";

/* 放大镜效果展示 */
var minImg_box = document.querySelector('.details-minImg');
var details_mask = document.querySelector('.details-mask');
var bigImg_box = document.querySelector('.details-bigImg');
var bigImg_img = document.querySelector('.details-bigImg img');
var imgs = document.querySelectorAll('.details ul li img');
/* 绑定事件，鼠标移动时，遮罩层跟随一起移动 */

minImg_box.onmousemove = function (eve) {
  var e = eve || window.event; // console.log(e.clientX, e)

  /* 计算遮罩层的坐标 */

  var maskLeft = e.pageX - offset(minImg_box).left - details_mask.clientWidth / 2;
  var maskTop = e.pageY - offset(minImg_box).top - details_mask.clientHeight / 2; // console.log(offset(minImg_box).left)

  /* 判断是否进入边界线 */

  /* 左右边界 */

  if (maskLeft < 0) {
    maskLeft = 0;
  }

  if (maskLeft > minImg_box.clientWidth - details_mask.clientWidth) {
    maskLeft = minImg_box.clientWidth - details_mask.clientWidth;
  } //    上下边界 


  if (maskTop < 0) {
    maskTop = 0;
  }

  if (maskTop > minImg_box.clientHeight - details_mask.clientHeight) {
    maskTop = minImg_box.clientHeight - details_mask.clientHeight;
  }

  details_mask.style.left = maskLeft + 'px';
  details_mask.style.top = maskTop + 'px';
  /* 大图也跟着一起移动 */

  var scaleX = maskLeft / (minImg_box.clientWidth - details_mask.clientWidth);
  var scaleY = maskTop / (minImg_box.clientHeight - details_mask.clientHeight);
  bigImg_img.style.left = -scaleX * (bigImg_img.clientWidth - bigImg_box.clientWidth) + 'px';
  bigImg_img.style.top = -scaleY * (bigImg_img.clientHeight - bigImg_box.clientHeight) + 'px';
};
/* 绑定事件，鼠标进入时，遮罩层和大图显示 */


minImg_box.onmouseover = function () {
  details_mask.style.display = 'block';
  bigImg_box.style.display = 'block';
};
/* 绑定事件，鼠标移出时，遮罩层和大图隐藏 */


minImg_box.onmouseout = function () {
  // console.log('leave')
  details_mask.style.display = 'none';
  bigImg_box.style.display = 'none';
}; // 获取小图下标


var minImg = document.querySelector('.details-minImg>img'); //console.log(minImg.src)

var _loop = function _loop(i) {
  imgs[i].onmouseover = function () {
    // console.log(imgs[i].src)
    minImg.src = imgs[i].src; // console.log(minImg.src)

    bigImg_img.src = imgs[i].src;
  };
};

for (var i = 0; i < imgs.length; i++) {
  _loop(i);
} // 获取增减点击事件


var detailsLose = document.querySelector('.lose');
var detailsAdd = document.querySelector('.details-add');
var num = document.querySelector('.details-num span');

detailsLose.onclick = function () {
  if (num.innerHTML > 0) {
    num.innerHTML--;
  } else {
    num.innerHTML = 0;
  }
};

detailsAdd.onclick = function () {
  num.innerHTML++;
}; // 活动倒计时


window.onload = function () {
  count('2021/2/5 :00:00:00');
}; //点击加入购物车事件


var detailsShopping = document.querySelector('.details-goShopping');

detailsShopping.onclick = function () {};