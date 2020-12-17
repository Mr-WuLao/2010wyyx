 $(function () {
    /* 获取商品列表 */
    var list = document.querySelector('.main-show')
    $.ajax ({
        url: 'img/goods.json',
        type: 'get',
        dataType: 'json',
        success: function (json) {
            var domStr = ''
            $.each(json, function (index, item){
              domStr += `<dl>
              <dt><img src="${item.imgurl}" alt=""></dt>
              <dd>
                  <a>${item.title}</a>
                  <span>￥<b>${item.price}<b> <em></em></span>
                  <p>多色选择,缤纷你的夏日</p>
                  <i class="list-btn" code = "${item.code}">加入购物车</i>
              </dd>
          </dl>`
            })
            list.innerHTML = domStr
        }
    })
    $('.main-show').on('click', '.list-btn', function () {
        // 获取当前商品的编号
        let code = $(this).attr('code')
        // console.log(code)
        //判断本地存储是否有数据
        if( localStorage.getItem('goods')) {
            var goodsArr = JSON.parse(localStorage.getItem('goods'))
        } else {
            var goodsArr = []
        }
        let flag = false
        if (goodsArr.length > 0) {
            // 判断当前选中的商品是否在购物车中
            $.each(goodsArr, function(index, item) {
                //  console.log(index, item)
                if (item.code === code) {
                    item.num++
                    flag = true
                    return
                }
            })
        }
        if (!flag) {  //如果所选商品不再购物车中，则添加一条数据进去
            goodsArr.push({code: code, num: 1})
        }
        // 更新数据到本地仓库
        localStorage.setItem('goods', JSON.stringify(goodsArr))
        alert('添加购物车成功')
    })
}) 
  