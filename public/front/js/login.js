/**
 * Created by mymy on 2018/4/14.
 */
$(function(){
  $(".login").click(function(){
    var username=$("[type='name']").val().trim();
    var password=$("[type='password']").val().trim();
    //console.log(username);
    if(!username){
      mui.toast("请输入用户名");
      return false;
    }
    if(!password){
      mui.toast("请输入用户密码");
      return false;
    }
    $.ajax({
      url:'/user/login',
      type:'post',
      data:{
        username:username,
        password:password
      },
      success:function(info){
        console.log(info);
        if(info.error===403){
          mui.toast("用户名或密码错误");
        };
        if(info.success){
        //  需要知道他之前是从哪个页面跳转过来的，需要记录跳转过来路径
        //如果是购物车这类页面跳转过来的，需要跳回去
        //如果是直接访问的login页面，需要跳转到会员中心
        //获取到retUrl参数，如果有这个参数，直接跳转回去即可。如果没有没有这个，默认跳到会员中心。
          var search=location.search;
          if(search.indexOf("retUrl")!=-1){
            location.href=search.replace("?retUrl=","");
          }else{
            location.href="user.html";
          }
        }
      }
    });
  });


})