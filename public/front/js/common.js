/**
 * Created by mymy on 2018/4/9.
 */
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});


// 专门用于解析地址栏参数
function getSearch(key){
  var search=location.search;
//  解码
  search=decodeURI(search);
//  去掉问号
  search=search.slice(1);

  //切割成数组
  var arr=search.split("&")
  //对数组进行遍历
  var obj={};
  arr.forEach(function(element,key){
    var k=element.split("=")[0];
    var v=element.split("=")[1];
    obj[k]=v;
  });
  //console.log(obj);
  return obj[key];
}