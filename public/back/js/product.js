/**
 * Created by mymy on 2018/4/8.
 */
$(function(){
  var currentPage=1;
  var pageSize=3;
  var picArr=[];
  render();
  function render(){
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
        //  分页初始化

        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          },
          // 配置按钮大小 large
          size:"normal",
          // 配置每个按键的文字
          // 每个按钮, 都会调用一次这个方法, 他的返回值, 就是按钮的文本内容
          itemTexts: function( type, page, current ) {
            // first 首页 last 尾页, prev 上一页, next 下一页, page 普通页码
            // page 是当前按钮指向第几页
            // current 是指当前是第几页 (相对于整个分页来说的)
            switch( type ) {
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "page":
                return page;
            }
          },
          // 配置提示框
          tooltipTitles: function( type, page, current) {
            switch( type ) {
              case "first":
                return "首页";
              case "last":
                return "尾页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "page":
                return "前往第" + page + "页";
            }
          },
          // 使用 bootstrap 样式的提示框组件
          useBootstrapTooltip: true

        })
      }

    });
  }

  //渲染二级菜单
  $("#addBtn").click(function(){
    $("#productModal").modal("show");
    $.ajax({
      type:'get',
      url:'/category/querySecondCategoryPaging',
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        console.log(info);
        $(".dropdown-menu").html(template("dropdownTpl",info));

      }
    })
  });


//  3.给a注册委托事件
  $(".dropdown-menu").on("click","a",function(){
    //console.log("kk");
    var txt=$(this).text();
    var id=$(this).data("id");
    $("#dropdownMenu2").text(txt);
    $('[name="brandId"]').val(id);
  });

  // 4. 配置上传图片回调函数

  $("#fileupload").fileupload({
  //  返回数据类型
    type:"json",
    //回调函数
    done:function(e,data){
      console.log(data);
      // 获取图片地址
      var picObj=data.result;
      var picAddr=picObj.picAddr;
    //  将获取到的图片地址存储在数组中
      picArr.unshift(picObj);
      console.log(picArr);
    //  动态生成img标签，显示图片
      $("#imgBox").prepend('<img src="'+picAddr+'" alt="" width="100px">');
      if(picArr.length>3){
        //删除数组中的最后一项
        picArr.pop();
      //  除了删除数组中的最后一项，还要删除页面渲染中的最后一张
        $("#imgBox img:last-of-type").remove();
      };

      if(picArr.length === 3){
        $("#form").data("bootstrapValidator").updateStatus("picStatus","VALID")
      }
    }
  })


//  5.表单校验配置
  $("#form").bootstrapValidator({
    excluded:[],
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      proName:{
        validators:{
          notEmpty:{
            message:"商品名称不能为空"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存"
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:"商品库存格式, 必须是非零开头的数字"
          }

        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入商品尺码"
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:"尺码格式，必须是32-40"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品价格"
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品原价"
          }
        }
      },
      // 标记图片是否上传满三张
      picStatus: {
        validators: {
          notEmpty: {
            message: "请上传3张图片"
          }
        }
      }
    }

  })




//  6.表单成功校验请求ajax
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    var data=$("#form").serialize();
    console.log(data);
    data+="&picName1="+picArr[0].picAddr+"$picAddr1="+picArr[0].picName;
    data+="&picName2="+picArr[1].picAddr+"$picAddr2="+picArr[1].picName;
    data+="&picName3="+picArr[2].picAddr+"$picAddr3="+picArr[2].picName;
    $.ajax({
      type:'post',
      url:'/product/addProduct',
      data:data,
      success:function(info){
        console.log(info);
        if(info.success){

          $("#productModal").modal("hide");
          currentPage=1;
          render();

          // 手动重置, 下拉菜单
          $('#dropdownText').text("请选择二级分类")
          //表单内容重置
          $("#form").data("bootstrapValidator").resetForm(true);
        //  图片重置
          $("#imgBox img").remove();
          picArr=[];
        }

      }
    })
  })
})