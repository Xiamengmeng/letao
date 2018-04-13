/**
 * Created by mymy on 2018/4/12.
 */
$(function(){


//  给购物车添加一个下刷新的功能
  mui.init({

    //配置下拉刷新以及上拉加载
    pullRefresh: {
      container: ".mui-scroll-wrapper",
      down: {
        auto: true,
        //下拉刷新时触发
        callback: function () {
          //发送ajax，获取购物车的数据
          $.ajax({
            type: "get",
            url: "/cart/queryCart",
            success: function (data) {
              console.log(data);
              setTimeout(function () {
                if (data.error === 400) {
                  //没登录，跳转到登录页面 , 登录成功需要回跳
                  location.href = "login.html?retUrl=" + location.href;
                  return;
                }
                //获取到的购物车数据是一个数组，渲染到页面中, data是一个数组
                $(".mui-table-view").html(template("cartTpl", {list: data}));

                //结束下拉刷新
                mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
              }, 500);

            }
          });
        }
      }
    }

  });

//  删除功能
//  给删除按钮绑定委托点击事件，点击按钮是获取数组的id，请求ajax

  $(".mui-table-view").on("tap",".btn_delete",function(){
    var id=$(this).data("id");
    console.log(id);
    //弹出确认框
    mui.confirm("确认要删除此商品吗？","温馨提示",["取消","确认"],function(e){
      if(e.index===1){
        $.ajax({
          url:'/cart/deleteCart',
          type:'get',
          data:{id:id},
          success:function(info){
            console.log(info);
          //  执行成功之后重新执行下拉刷新
            if(info.success){
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        });
      }

    })


  });


//  编辑功能
//  点击编辑按钮的时候弹出提示框，里面的内容要动态渲染在上面
  $(".mui-table-view").on("tap",".btn_edit",function(){
    var data=this.dataset;
    console.log(data);
    var html=template("tpl2",data);
    html=html.replace(/\n/g,"");
    mui.confirm(html,"编辑商品",["确认","取消"],function(e){
      //console.log(e);
      if(e.index===0){
        var id=data.id;
      //  获取到span中的数据
        var num = $(".mui-numbox-input").val();
        var size = $(".lt_edit_size span.current").text();
        console.log(num,size,id);
        $.ajax({
          type:'post',
          url:'/cart/updateCart',
          data:{
            id:id,
            num:num,
            size:size
          },
          success:function(info){
            console.log(info);
            if(info.success){
              mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
            }
          }
        })
      }

    });
    mui(".mui-numbox").numbox();
  })


})
