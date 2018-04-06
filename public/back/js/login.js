/**
 * Created by mymy on 2018/4/6.
 */
$(function(){
  $("#form").bootstrapValidator({
  //设置小图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  //设置用户名
  fields:{
    username:{
      validators:{
        notEmpty:{
          message:"用户名不能为空"
        },
        stringLength:{
          min:4,
          max:12,
          message:"用户名长度4-12位"
        },
        callback:{
          message:"用户名不正确"

        }
      }
    },
    password:{
      validators:{
        notEmpty:{
          message:"密码不能为空"
        },
        stringLength:{
          min:2,
          max:6,
          message:"密码长度2-6位"
        },
        callback:{
          message:"密码不正确"

        }
      }
    }

  },
});

  //登录功能
  $("#form").on("success.form.bv", function( e ) {
    // 阻止浏览器默认行为
    e.preventDefault();
    // 发送 ajax 请求登录
    // dataType: "json"
    // 如果没设置 jQuery 会自动识别  text/html, text/json
    $.ajax({
      type: "post",
      url: "/employee/employeeLogin",
      data: $("#form").serialize(),
      dataType: "json",
      success: function( info ) {
        console.log(info);
        if(info.success){
          location.href="index.html";
        }
        if(info.error==1000){
          //alert("用户名不存在");
          $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
        }
        if(info.error==1001){
          //alert("密码不存在");
          $("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
        }

      }
    })

  });

//  重置功能

  $("[type='reset']").on("click",function(){
    console.log('hh');
    //reset本身就可以将表单中的内容重置，但是不可以将表单里的操作重置

    // resetForm 传 true 表示不仅验证重置, 表单内容也重置
    $("#form").data("bootstrapValidator").resetForm(reset);
  })
})