/**
 * Created by mymy on 2018/4/6.
 */
$(function(){

  // 禁用小环环
  NProgress.configure({ showSpinner: false });

// ajax 开始
  $( document ).ajaxStart(function() {
    // 进度条加载效果
    NProgress.start();
  });

// ajax 结束
  $( document ).ajaxStop( function() {
    // 模拟网络延迟
    setTimeout(function() {
      // 进度条关闭
      NProgress.done();
    }, 500);
  });

//拦截功能，判断是否登录
  $.ajax({
    type:'get',
    url:'/employee/checkRootLogin',
    success:function( info ){
      //console.log( info );
      if(info.success){
        //  登录成功的状态

      }
      //进行拦截,到登陆页面
      if(info.error===400){
        location.href="login.html";

      }
    }

  })

$(".category").click(function(){
  $(this).next().stop().slideToggle();
  //console.log('jj');
});


//顶部菜单栏

$(".icon_menu").click(function(){
  //console.log("jj");
  $('.side').toggleClass("hidemenu");
  $('.main_top').toggleClass("hidemenu");
  $('.main_content').toggleClass("hidemenu");
});


  $(".icon_back").click(function(){
    //console.log(11);
  //  模态框显示
    $("#commonModal").modal('show');
  })

  //给退出添加一个点击事件，模态框隐藏，
  $("#loginOut").click(function(){
    //console.log("hh");
    $("#commonModal").modal('hide');
  //  请求ajax,判断管理员是否登录
    $.ajax({
      type:"get",
      url:"/employee/checkRootLogin",
      dataType:"json",
      success:function(info){
        //console.log(info);
        if(info.success){
        //  登录成功，跳转到login页面
          location.href="login.html";
        }
      }
    })
  })

})