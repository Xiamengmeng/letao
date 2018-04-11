/**
 * Created by mymy on 2018/4/11.
 */
//获取到key 中的数据，渲染页面
var key =getSearch("key");
$(".search_input").val(key);

//功能1 一进入页面就渲染页面
render();

// 功能2: 点击搜索按钮, 实现搜索功能
$(".search_btn").click(function(){
  console.log(666);
  render();
// 获取搜索关键字

  var key=$(".search_input").val();
//  拿到数组
  var history=localStorage.getItem("search_list")||"[]";

  var arr=JSON.parse(history);
  //不能有重复的
  var index=arr.indexOf(arr);
  if(index!=-1){
    arr.splice(index,1);
  }
  //长度不能超过10
  if(arr.length>=10){
    arr.pop();
  }

  //拿到搜索到的关键字，放入数组中
  arr.unshift(key);
  localStorage.setItem("search_list",JSON.stringify(arr))

})

//功能3：判断当前是够有current类，高亮显示
// 功能3: 点击排序按钮, 进行排序
// 1. 如果没有 current 类, 自己加上 current 类, 其他去掉 current类
// 2. 如果有 current 类, 直接切换 i 里面的上下箭头

$("[data-type]").click(function(){
  //console.log("jkk");


//  判断当前当前点击的有没有current类,有，切换向上向下箭头
//  没有添加
  if($(this).hasClass("current")){
    $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
  }else{
    $(this).addClass("current").siblings().removeClass("current");
    $(".lt_sort a").find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
  }
})


function render(){

//将需要传入的参数放在一个对象中
var params={};
params.proName=$(".search_input").val();
params.page=1;
params.pageSize=100;


  $.ajax({
    type:'get',
    url:'/product/queryProduct',
    data:params,
    success:function(info){
      console.log(info);
      $(".product").html(template("listTpl",info));
    }
  })
}
