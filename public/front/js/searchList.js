/**
 * Created by mymy on 2018/4/11.
 */
//获取到key 中的数据，渲染页面
var key =getSearch("key");
console.log(key);
$(".search_input").val(key);

//功能1 一进入页面就渲染页面
render();

// 功能2: 点击搜索按钮, 实现搜索功能
$(".search_btn").click(function(){
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
//在请求渲染的时候，将product结构重置成loading
  $(".product").html('<div class="loading"></div>');
//将需要传入的参数放在一个对象中
var params={};
params.proName=$(".search_input").val().trim();
params.page=1;
params.pageSize=100;

  //对于price和num， 如果价格被点了，需要发送price  如果库存被点了，需要发送num, 如果都没被点，都不发送
  var $current = $(".lt_sort a.current");
  if ($current.length > 0) {
    //说明有一个被点击了，说明需要排序, 需要给param设置参数，可能是price，也可能是num,需要获取到$current这个元素是price或者type
    var type = $current.data("type");//price num
    var value = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;
    params[type] = value;
  }

setTimeout(function(){
  $.ajax({
    type:'get',
    url:'/product/queryProduct',
    data:params,
    success:function(info){
      console.log(info);
      $(".product").html(template("listTpl",info));
    }
  })

},500)

}