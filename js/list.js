$(function () {
    /* 获取商品列表 */
    $.ajax ({
        url: '../goods.json',
        type: 'get',
        dataType: 'json',
        success: function (json) {
            console.log(json)
        }



    })

})