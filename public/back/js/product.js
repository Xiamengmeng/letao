/**
 * Created by mymy on 2018/4/8.
 */
$(function(){
  var currentPage=1;
  var pageSize=5;
  $.ajax({
    type:'get',
    url:'/product/queryProductDetailList',
    dataType:'json',
    data:{
      page:currentPage,
      pageSize:pageSize
    },
    success:function(info){
      console.log(info);
      $(".lt_content tbody").html(template("productTpl",info));
    }

  });
  $("#addBtn").click(function(){
    $("#productModal").modal("show");
  })
})