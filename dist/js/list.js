"use strict";

$(function () {
  /* 获取商品列表 */
  $.ajax({
    url: '../goods.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      console.log(json);
    }
  });
});