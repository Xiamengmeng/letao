/**
 * Created by mymy on 2018/4/7.
 */
$(function(){
  var currentPage=1;
  var pageSize=5;
  render();
  function render(){
    $.ajax({
      type:'get',
      url:'/user/queryUser',
      dataType:'json',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      success:function(info){
        console.log(info);
        $(".lt_content tbody").html(template( "userTpl", info ));

        //  渲染分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/pageSize),
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          }
        });
      }
    });
  }

//给禁用启用注册点击事件，更改状态
  $('.lt_content tbody').on("click","button",function(){
    $('#userModal').modal('show');

    //  获取到当前点击的按钮的id
    var id=$(this).parent().data("id");
    var isDelete=$(this).hasClass("btn-success") ? 1:0;

    //  给确定按钮添加一个点击事件，在click 事件中再次注册点击事件，会导致多次注册内部的那个点击事件，多次作用，解决这个问题需要在内部注册点击事件的时候先解绑再注册，或者提到click外部注册点击事件


    $("#submitBtn").off("click").on("click",function(){
      //console.log("HHE");
      $('#userModal').modal('hide');
      $.ajax({
        type:'post',
        dataType:'json',
        url:'/user/updateUser',
        data: {
          id: id,
          isDelete: isDelete
        },
        success:function(info){
          console.log(info);
          render();

        }
      })



    })
  })


})