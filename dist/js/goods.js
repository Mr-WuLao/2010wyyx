"use strict";

$(function () {
  //判断本地存储是否有购物车数据
  if (localStorage.getItem('goods')) {
    //获取本地存储中购物车数据
    var goodsArr = JSON.parse(localStorage.getItem('goods')); // console.log(goodsArr)
    // 获取数据

    $.ajax({
      url: './img/goods.json',
      type: 'get',
      dataType: 'json',
      success: function success(json) {
        var domStr = '';
        $.each(goodsArr, function (index, item) {
          $.each(json, function (ind, obj) {
            if (item.code === obj.code) {
              domStr += "\n                        <div class=\"shopping-main-list\">\n                            <input class=\"left shopping-main-input\" type=\"checkbox\">\n                            <div class=\"shopping-main-img left\">\n                                <img src=\"".concat(obj.imgurl, "\" alt=\"\">\n                            </div>\n                            <div class=\"shopping-main-text left\">\n                                <a>").concat(obj.title, "</a>\n                            </div>\n                            <div class=\"shopping-main-price left\">\uFFE5<b>").concat(obj.price, "</b></div>\n                            <div class=\"shopping-main-num clearfix left\">\n                                <em class=\"shopping-main-lose left\"> - </em>\n                                <span class=\"left\">").concat(item.num, "</span>\n                                <em class=\"shopping-main-add left\">+</em>\n                            </div>\n                            <div class=\"shopping-main-sum left\">\uFFE5<b>0</b></div>\n                            <div code=").concat(obj.code, " class=\"shopping-main-del left\">\u5220\u9664</div>\n                        </div>\n                            ");
            }
          });
        });
        $('.shopping-main').html(domStr);
        reset();
      }
    }); // 移除购物车商品

    $('.shopping-main').on('click', '.shopping-main-del', function () {
      $(this).parent().remove(); //更新本地数据

      var code = $(this).attr('code'); //商品编号

      $.each(goodsArr, function (index, item) {
        if (item.code === code) {
          goodsArr.splice(index, 1); //删除该商品编号
          // console.log(111)

          return false;
        }
      }); // 判断购物车是否还有商品

      if (goodsArr.length > 0) {
        localStorage.setItem('goods', JSON.stringify(goodsArr));
      } else {
        localStorage.removeItem('goods');
        var nodata = '<li style="line-height: 70px; text-align: center; font-size: 30px; color: red;">购物车空空如也</li>';
        $('.shopping-main').html(nodata);
      }
    });
  } else {
    var nodata = '<li style="line-height: 70px; text-align: center; font-size: 30px; color: red;">购物车空空如也</li>';
    $('.shopping-main').html(nodata);
  }

  function reset() {
    //点击全选选中所有商品
    var checkboxAll = document.querySelector('.checkboxAll'); //  console.log(checkboxs)

    var checkboxs = document.querySelectorAll('.shopping-main-input');

    checkboxAll.onclick = function () {
      //点击获取input复选框的勾选状态
      if (checkboxAll.checked) {
        for (var i = 0; i < checkboxs.length; i++) {
          // console.log(111)
          checkboxs[i].checked = true;
        }
      } else {
        for (var _i = 0; _i < checkboxs.length; _i++) {
          //  console.log(222)
          checkboxs[_i].checked = false;
        }
      }
    }; // 如果全部选中，则全选按钮选中,反之不全选


    for (var j = 0; j < checkboxs.length; j++) {
      checkboxs[j].onclick = function () {
        var flag = true;

        for (var i = 0; i < checkboxs.length; i++) {
          if (checkboxs[i].checked === false) {
            flag = false;
            break;
          }
        }

        if (flag === true) {
          checkboxAll.checked = true;
        } else {
          checkboxAll.checked = false;
        }
      };
    } // 商品价格获取


    function listAdd() {
      // 商品总价
      var listPris = document.querySelectorAll('.shopping-main-price>b'); //商品单价

      var listNums = document.querySelectorAll('.shopping-main-num>span'); //商品数量

      var listAdds = document.querySelectorAll('.shopping-main-sum>b'); //商品总价

      for (var i = 0; i < listAdds.length; i++) {
        listAdds[i].innerHTML = Number(listPris[i].innerHTML) * Number(listNums[i].innerHTML);
      }
    }

    listAdd(); // 商品数量的增减

    var shopping_lose = document.querySelector('.shopping-main-lose');
    var shopping_add = document.querySelector('.shopping-main-add');
    $('.shopping-main-num').on('click', '.shopping-main-lose', function (eve) {
      var e = eve || window.event; //console.log(e.target)
      //判断底线值，查看商品数量是否大于1，如果等于1则无法执行减减

      if (e.target.nextElementSibling.innerHTML > 1) {
        e.target.nextElementSibling.innerHTML--;
      } else {
        e.target.nextElementSibling.innerHTML === 1;
      }

      listAdd(); // qqq()
    });
    $('.shopping-main-num').on('click', '.shopping-main-add', function (eve) {
      var e = eve || window.event; //console.log(e.target)

      e.target.previousElementSibling.innerHTML++;
      listAdd(); //  qqq()
    }); //批量删除事件，点击删除已选中商品

    $('.shopping-total-del').on('click', function () {
      for (var i = 0; i < checkboxs.length; i++) {
        // console.log(checkboxs)
        if (checkboxs[i].checked) {
          checkboxs[i].parentNode.remove();
        }
      }
    }); //  统计购物车商品总价

    var shopping_main = document.querySelector('.shopping-main');
    shopping_main.addEventListener('click', function (eve) {
      var e = eve || window.event;
      console.log(e.target);

      if (e.target.tagName == 'INPUT') {
        var moneyAll = Number($('.shopping-total-money em b').html());

        if (e.target.checked) {
          moneyAll += Number(e.target.parentNode.lastElementChild.previousElementSibling.children[0].innerHTML);
        }

        $('.shopping-total-money em b').html(moneyAll);
      }
    });
  }
});