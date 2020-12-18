/* <!-- banner图 --> */
var mySwiper = new Swiper('.swiper-container', {
    //direction: 'vertical', // 垂直切换选项
    loop: true, // 循环模式选项
    autoplay: {
        delay: 2000,
        stopOnLastSlide: true,
        disableOnInteraction: false,
    },
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },

    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
})
  
/*鼠标移入停止轮播，鼠标离开 继续轮播*/
mySwiper.el.onmouseover = function(){
    mySwiper.autoplay.stop();
  }
  //鼠标离开开始自动切换
  mySwiper.el.onmouseout = function(){
    mySwiper.autoplay.start();
  }
  /* 获取case案例数据 */
  $(function() {
    let case_main = document.querySelector('.case-main')
    $.ajax({
        url: './img/index.json',
        type: 'get',
        dataType: 'json',
        success: function(json) {
           // console.log(json)
           var domStr = ''
           $.each(json, function (index, item) {
               domStr += `
               <dl class="case-imgs">
               <dt code = "${item.code}"><img src="${item.imgurl}" alt=""></dt>
               <dd>
                   <i>特价</i>
                   <p>${item.title}</p>
                   <span>￥${item.price}<em>￥${item.price1}</em></span>
               </dd>
           </dl>
               `
           })
           case_main.innerHTML = domStr
        }
    })
  })