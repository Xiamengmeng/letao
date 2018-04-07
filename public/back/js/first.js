/**
 * Created by mymy on 2018/4/7.
 */
$(function(){
  // 当前页
  var currentPage = 1;
  // 每页多少条
  var pageSize = 5;
  $.ajax({
    url:'/category/queryTopCategoryPaging',
    type:'get',
    dataType:'json',
    success:function( info ){
      console.log( info );
    }
  })
})