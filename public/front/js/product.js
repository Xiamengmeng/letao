/**
 * Created by mymy on 2018/4/11.
 */
//获取到地址栏中的id
var id=getSearch("productId");
console.log(id);

$.ajax({
  type:'get',
  url:'/product/queryProductDetail',
  data:{id:id},
  dataType:'json',
  success:function(info){
    console.log(info);
    $(".mui-scroll").html(template("lbTpl",info))
  }
})