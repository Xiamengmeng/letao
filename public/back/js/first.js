/**
 * Created by mymy on 2018/4/7.
 */
$(function(){
  // 当前页
  var currentPage = 1;
  // 每页多少条
  var pageSize = 5;
  render();
  function  render(){
    $.ajax({
      url:'/category/queryTopCategoryPaging',
      type:'get',
      dataType:'json',
      data:{
        page:currentPage,
        pageSize:pageSize
      },
      success:function( info ){
        console.log( info );
        $(".lt_content tbody").html(template("firstTpl",info));

        //  在页面渲染成功之后进行分页操作
        $('#paginator').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),

          // 给页码添加点击事件
          onPageClicked: function( a, b, c, page ) {
            // 将选中的页码更新到 currentPage
            currentPage = page;
            // 重新渲染
            render();
          }
        })
      }
    });
  }



//  1.添加分类
  $('#cateAdd').click(function(){
    //console.log("ii");
    //点击添加分类的时候模态框显示
    $("#categoryModal").modal('show');
  });
  //2.点击模态框中的确定按钮，模态框隐藏
  $('#addbtn').click(function(){
    console.log("kk");
    $('#categoryModal').modal('hide');
    // 4. 注册表单校验成功事件
    //    表单校验插件, 会在表单提交时, 进行校验
    $.ajax({
      type:'post',
      url:'/category/addTopCategory',
      dataType:'json',
      data:{
        categoryName:$("#form").serialize()
      }
    })
  });
  //3.通过校验插件，添加校验功能
  $("#form").bootstrapValidator({

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 校验的字段
    fields: {
      categoryName: {
        // 校验规则
        validators: {
          // 非空检验
          notEmpty: {
            // 提示信息
            message: "请输入一级分类名称"
          }
        }
      }
    }
  });
  // 4. 注册表单校验成功事件
  //    表单校验插件, 会在表单提交时, 进行校验
  $('#form').on("success.form.bv", function( e ) {
    e.preventDefault();

    $.ajax({
      url: "/category/addTopCategory",
      type: "POST",
      data: $('#form').serialize(),
      success: function( info ) {
        console.log(info);
        if (info.success) {
          // 关闭模态框
          $('#categoryModal').modal("hide");
          // 重新渲染页面, 添加的项会在第一页, 所以应该重新渲染第一页
          currentPage = 1;
          render();

          // 重置表单校验状态和 表单内容
          // 传 true 不仅可以重置 状态, 还可以重置内容
          $('#form').data("bootstrapValidator").resetForm( true );
        }
      }
    })

  })


})