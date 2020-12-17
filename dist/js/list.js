"use strict";

$(function () {
  /* 获取商品列表 */
  var list = document.querySelector('.main-show');
  $.ajax({
    url: 'img/goods.json',
    type: 'get',
    dataType: 'json',
    success: function success(json) {
      var domStr = '';
      $.each(json, function (index, item) {
        domStr += "<dl>\n              <dt><img src=\"".concat(item.imgurl, "\" alt=\"\"></dt>\n              <dd>\n                  <a>").concat(item.title, "</a>\n                  <span>\uFFE5<b>").concat(item.price, "<b> <em></em></span>\n                  <p>\u591A\u8272\u9009\u62E9,\u7F24\u7EB7\u4F60\u7684\u590F\u65E5</p>\n                  <i class=\"list-btn\" code = \"").concat(item.code, "\">\u52A0\u5165\u8D2D\u7269\u8F66</i>\n              </dd>\n          </dl>");
      });
      list.innerHTML = domStr;
    }
  });
  $('.main-show').on('click', '.list-btn', function () {
    // 获取当前商品的编号
    var code = $(this).attr('code'); // console.log(code)
    //判断本地存储是否有数据

    if (localStorage.getItem('goods')) {
      var goodsArr = JSON.parse(localStorage.getItem('goods'));
    } else {
      var goodsArr = [];
    }

    var flag = false;

    if (goodsArr.length > 0) {
      // 判断当前选中的商品是否在购物车中
      $.each(goodsArr, function (index, item) {
        //  console.log(index, item)
        if (item.code === code) {
          item.num++;
          flag = true;
          return;
        }
      });
    }

    if (!flag) {
      //如果所选商品不再购物车中，则添加一条数据进去
      goodsArr.push({
        code: code,
        num: 1
      });
    } // 更新数据到本地仓库


    localStorage.setItem('goods', JSON.stringify(goodsArr));
    alert('添加购物车成功');
  });
});