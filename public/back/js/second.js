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



//  委托事件给动态生成的一级分类添加点击事件

  $(".dropdown-menu").on("click","a",function(){
    //console.log('kk');
    var str=$(this).text();
    var id=$(this).data("id");
    //console.log(id);
    //console.log(str);
    $("#dropdownMenu2").text(str);
    // 将选中的 id 设置到 input 表单元素中
    $("[name='categoryId']").val(id);

    // 需要将校验状态置成 VALID
    // 参数1: 字段
    // 参数2: 校验状态
    // 参数3: 配置规则, 来配置我们的提示文本
    $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");

  })

  //插入表单校验
  $("#form").bootstrapValidator({
    excluded:[],
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //校验字段
    fields:{
      brandName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类名称"
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:"请上传图片"
          }
        }
      }


    }
  })

  // 4. 配置图片上传
$("#fileupload").fileupload({
  dataType:'json',
  done:function(e,data){
    console.log("图片上传完成啦");
    console.log(data);

    var picAddr=data.result.picAddr;
    console.log(picAddr);
    $(".img_box").attr("src",picAddr);
    $('[name="brandLogo"]').val(picAddr)
    ////重置表单校验状态
    $("#form").data("bootstrapValidator").updateStatus("brandLogo", "VALID");
  }
})
//  5.点击添加按钮请求ajax添加数据
  $("#form").on("success.form.bv", function( e ) {
    // 阻止默认的提交
    e.preventDefault();
    $.ajax({
      type:'post',
      url:'/category/addSecondCategory',
      data:$("#form").serialize(),
      success:function(info){
        console.log(info);
      //  关闭模态框
        $("#secondModal").modal("hide");
      //  重置表单内容
        $("#form").data("bootstrapValidator").resetForm(true);
        currentPage=1;
        render();
        // 找到下拉菜单文本重置
        $('#dropdownText').text("请选择1级分类")

      }
    })
  })

})