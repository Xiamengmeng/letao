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
          min:6,
          max:12,
          message:"用户名长度6-12位"
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
        }
      }
    }

  },
})
})