/**
 * Created by mymy on 2018/4/9.
 */
$(function(){
  $.ajax({
    url:'/category/queryTopCategory',
    type:'get',
    dataType:'json',
    success:function(info){
      console.log(info);
      $("#ul_left").html(template("cateTpl",info));
    }
  });
//  给左侧li添加委托事件
  $("#ul_left").on("click","a",function(){
    //获取到点击的id通过ajax请求后台渲染数据
    var id=$(this).parent().data("id");
    //console.log(id);
    $(this).parent().addClass("active").siblings().removeClass("active");
    renderByid(id);

  });


  function renderByid(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{id:id},
      dataType:'json',
      success:function(info){
        console.log(info);
        $("#ul_right").html(template("secateTpl",info));
      }
    })
  }
})