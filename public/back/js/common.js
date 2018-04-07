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

})