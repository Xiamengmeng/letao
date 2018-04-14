/**
 * Created by mymy on 2018/4/14.
 */
$(function(){
  $(".btn_logout ").click(function(){
    console.log(999);
    $.ajax({
      type:'get',
      url:'/user/logout',
      success:function(info){
        console.log(info);
        if(info.success){
          location.href="login.html";
        }
      }
    })
  })
})