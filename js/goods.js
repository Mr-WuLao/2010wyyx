$(function () {
    //判断本地存储是否有购物车数据
    if (localStorage.getItem('goods')) {
        //获取本地存储中购物车数据
        let goodsArr = JSON.parse(localStorage.getItem('goods'))
        // console.log(goodsArr)
        // 获取数据
        $.ajax ({
            url: './img/goods.json',
            type: 'get',
            dataType: 'json',
            success: function(json) {
                var domStr = ''
                $.each(goodsArr, function (index, item) {
                    $.each(json, function(ind, obj) {
                        if(item.code === obj.code) {
                            domStr += `
                        <div class="shopping-main-list " code = "${obj.code}">
                            <input class="left shopping-main-input" type="checkbox">
                            <div class="shopping-main-img left">
                                <img src="${obj.imgurl}" alt="">
                            </div>
                            <div class="shopping-main-text left">
                                <a>${obj.title}</a>
                            </div>
                            <div class="shopping-main-price left">￥<b>${obj.price}</b></div>
                            <div class="shopping-main-num clearfix left">
                                <em class="shopping-main-lose left"> - </em>
                                <span class="left">${item.num}</span>
                                <em class="shopping-main-add left">+</em>
                            </div>
                            <div class="shopping-main-sum left">￥<b>0</b></div>
                            <div code=${obj.code} class="shopping-main-del left">删除</div>
                        </div>
                            `
                        }
                    })
                })
                $('.shopping-main').html(domStr)
                reset()
            }
        })
        // 移除购物车商品
        $('.shopping-main').on('click', '.shopping-main-del', function() {
            $(this).parent().remove()
            //更新本地数据
            var code = $(this).attr('code') //商品编号
            $.each(goodsArr, function(index, item) {
                
                if (item.code === code) {
                    goodsArr.splice(index, 1)  //删除该商品编号
                    // console.log(111)
                    return false
                }
            })
            // 判断购物车是否还有商品
            if (goodsArr.length > 0) {
                localStorage.setItem('goods', JSON.stringify(goodsArr))
            } else {
                localStorage.removeItem('goods')
                var nodata = '<li style="line-height: 70px; text-align: center; font-size: 30px; color: red;">购物车空空如也</li>'
                $('.shopping-main').html(nodata)
            }
        })
    } else {
        var nodata = '<li style="line-height: 70px; text-align: center; font-size: 30px; color: red;">购物车空空如也</li>'
        $('.shopping-main').html(nodata)
    }
    function reset() {
         //点击全选选中所有商品
         let checkboxAll = document.querySelector('.checkboxAll')
        //  console.log(checkboxs)
         let checkboxs = document.querySelectorAll('.shopping-main-input')
         checkboxAll.onclick = function () { //点击获取input复选框的勾选状态
             if (checkboxAll.checked) {
                 for(let i = 0; i < checkboxs.length; i++) {
                    // console.log(111)
                     checkboxs[i].checked = true
                 }
             } else {
                 for(let i = 0; i < checkboxs.length; i++) {
                   //  console.log(222)
                     checkboxs[i].checked = false
                 }
             }
         }
         // 如果全部选中，则全选按钮选中,反之不全选
         for(let j = 0; j < checkboxs.length; j++) {
                 checkboxs[j].onclick = function () {
                 var flag = true
                 for(let i = 0; i < checkboxs.length; i++) {
                     if(checkboxs[i].checked === false) {
                             flag = false
                             break
                         }
                 }
                 if(flag === true) {
                     checkboxAll.checked = true
                 } else {
                     checkboxAll.checked = false
                 }
             }  
         }
 
 
        // 商品价格获取
        function listAdd() {
             // 商品总价
         let listPris = document.querySelectorAll('.shopping-main-price>b')  //商品单价
         let listNums = document.querySelectorAll('.shopping-main-num>span')  //商品数量
         let listAdds = document.querySelectorAll('.shopping-main-sum>b')  //商品总价
         for (let i = 0; i < listAdds.length; i++) {
            listAdds[i].innerHTML = Number(listPris[i].innerHTML) * Number (listNums[i].innerHTML)
            } 
        
        }
        listAdd()
        // 商品数量的增减
        let shopping_lose = document.querySelector('.shopping-main-lose')
        let shopping_add = document.querySelector('.shopping-main-add')
        $('.shopping-main-num').on('click', '.shopping-main-lose', function (eve) {
           var e = eve || window.event
           //console.log(e.target)
           //判断底线值，查看商品数量是否大于1，如果等于1则无法执行减减
           if (e.target.nextElementSibling.innerHTML > 1) {
            e.target.nextElementSibling.innerHTML--
            
        } else {
            e.target.nextElementSibling.innerHTML === 1
        }
        listAdd()
        // qqq()
        })
        $('.shopping-main-num').on('click', '.shopping-main-add', function (eve) {
            var e = eve || window.event
            //console.log(e.target)
             e.target.previousElementSibling.innerHTML++
             listAdd()
            //  qqq()
         })

        //批量删除事件，点击删除已选中商品
         $('.shopping-total-del').on('click', function () {
            for(let i = 0; i < checkboxs.length; i++) {
               // console.log(checkboxs)
                 if (checkboxs[i].checked) {
                   checkboxs[i].parentNode.remove()
                 }
             }
         })

         
             //  统计购物车商品总价
         let shopping_main = document.querySelector('.shopping-main')
        shopping_main.addEventListener('click', function (eve) {
            let e = eve || window.event
            // console.log(e.target)
            if (e.target.tagName == 'INPUT') {
            let moneyAll = Number($('.shopping-total-money em b').html())
            if (e.target.checked) {
                moneyAll += Number(e.target.parentNode.lastElementChild.previousElementSibling.children[0].innerHTML)
                } 
            $('.shopping-total-money em b').html(moneyAll) 
            }
        })

    //   结账付款
    let goodsArr = JSON.parse(localStorage.getItem('goods'))
    let total_add = document.querySelector('.shopping-total-add')
     total_add.addEventListener('click', function () {
        //  显示付款价格
         alert('一共花费' + Number($('.shopping-total-money em b').html()) + '元')
        // 当复选框选中时，删除该列表
         let checkboxs = document.querySelectorAll('.shopping-main-input')
         for( let i = 0; i < checkboxs.length; i++) {
            if(checkboxs[i].checked) {
                checkboxs[i].parentNode.remove()
                //更新本地数据
                var code = checkboxs[i].parentNode.getAttribute('code')
                console.log(code)
            $.each(goodsArr, function(index, item) {
                if (item.code === code) {
                    goodsArr.splice(index, 1)  //删除该商品编号
                    // console.log(111)
                    localStorage.setItem('goods', JSON.stringify(goodsArr))
                }
            })
            }
        }
        let moneyReset = document.querySelector('.shopping-total-money em b')
            moneyReset.innerHTML = 0
        })
    }

})