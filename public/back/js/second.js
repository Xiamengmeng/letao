/**
 * Created by mymy on 2018/4/8.
 */
$(function(){
  // 当前页
  var currentPage = 1;
  // 每页多少条
  var pageSize = 5;
  render();
  //1.渲染页面
  function render(){
    $.ajax({

      type:'get',
      url:'/category/querySecondCategoryPaging',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        $(".lt_content tbody").html(template("secondTpl",info));

        //  2.分页的基本操作
        $("#paginator").bootstrapPaginator({
          //  版本号
          bootstrapMajorVersion:3,
          //  当前页
          currentPage:info.page,
          //  总页数
          totalPages:Math.ceil(info.total/info.size),
          //  给分页添加一个点击事件
          onPageClicked:function(a,b,c,page){
            currentPage=page;
            render();
          }
        })

      }
    });
  }

//  2.模态框

//  点击分类按钮模态框显示
  $("#cateAdd").click(function(){
    //console.log("hh");
    $("#secondModal").modal("show");
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      dataType:'json',
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        console.log(info);
        $(".dropdown-menu").html(template("mcTpl",info));
      }

    });
  });

//3.插入表单校验
  $("#form").bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验字段
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类名称"
          }
        }
      }

    }


  })

})