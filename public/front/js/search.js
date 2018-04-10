/**
 * Created by mymy on 2018/4/10.
 */
$(function() {
  // 用户获取 search_history 的值, 并且转换成数组, 方便操作
  function getHistory() {
    var history = localStorage.getItem("search_history")||"[]";
    var arr = JSON.parse(history);
    return arr;
  }

  //  render页面
  render();

  function render() {
    var arr = getHistory();
    $(".history").html(template("tpl", {arr: arr}));
  }

//  1.添加搜索列表

  $(".search_btn").click(function () {
    //console.log("jh");
    var key = $(".search_input").val().trim();
    //console.log(key);
    if (key === "") {
      mui.toast("请输入关键字");
      return false;
    }

    // 获取本地存储中的数组
    var arr = getHistory();
    //// (1) 如果有重复的, 需要删除掉旧的
    var index = arr.indexOf( key );
    if ( index != -1 ) { // 说明 key 在数组中存在
      arr.splice(index, 1);
    }
    // (2) 如果长度超过了 10, 删除最老的一项
    if ( arr.length >= 10 ) {
      arr.pop();
    }
    // 获取本地存储中的数组
      arr.unshift(key);
      var arr=localStorage.setItem("search_history",JSON.stringify(arr));
      render();
    //  渲染到页面之后清空input框
      $(".search_input").val("");
    })


//  2.删除当前项
  $(".history").on("click",".btn_delete",function () {
    console.log("kk");
    var index=$(this).data("index");
    console.log(index);
    var arr=getHistory();
    arr.splice(index,1);
    localStorage.setItem("search_history",JSON.stringify(arr));
    render();
  });


//  3.清空所有

    //事件委托
    $(".history").on("click",".btn-delete",function(){

      //  清空所有的时候出来一个提示框

      mui.confirm("你是否要清空所有的历史记录？","温馨提示",["取消","确认"],function(e){
        console.log(e.index);
        if(e.index===1){
          var arr=getHistory();
          arr=[];
          localStorage.setItem("search_history",JSON.stringify(arr));
          render();
        }

      })

    });


  });
