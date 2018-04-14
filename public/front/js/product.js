/**
 * Created by mymy on 2018/4/11.
 */
//获取到地址栏中的id
var id=getSearch("productId");
console.log(id);


//动态生成的轮播图和input都需要重新初始化

$.ajax({
  type:'get',
  url:'/product/queryProductDetail',
  data:{id:id},
  dataType:'json',
  success:function(info){
    console.log(info);
    $(".mui-scroll").html(template("lbTpl",info));
    mui(".mui-slider").slider({
      interval: 1000
    });
    mui(".mui-numbox").numbox();

  //  给点击的尺码加current 类
    $(".lt_size span").on("click",function(){
      $(this).addClass("current").siblings().removeClass("current");
    });

  }
});


//添加购物车
//1. 点击按钮
//2. 获取id， 尺码  ，数量
//3. 发送ajax请求， 根据结果
$(".btn_add_cart").click(function(){
  var size=$(".lt_size span.current").text();
  //console.log(size);
  if(!size){
    mui.toast("请选择合适的尺码！");
    return false;
  }
//  获取数量
  var num=$(".mui-numbox input").val();
  //console.log(num);
  $.ajax({
    url:'/cart/addCart',
    type:'post',
    data:{
      productId:id,
      num:num,
      size:size
    },
    success:function(info){
      console.log(info);
      if(info.error==400){
        //如果添加失败，需要跳转至login页面登录，
        // 为了使在登录页面登录之后仍能跳回该页面，需记录当前页面路径
        location.href="login.html?retUrl="+location.href;
      }
      if(info.success){
        mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
          if(e.index===0){
            location.href="cart.html";
          }
        })

      }
    }
  });

})