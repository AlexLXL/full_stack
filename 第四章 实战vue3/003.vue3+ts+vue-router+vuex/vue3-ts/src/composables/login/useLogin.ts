import {ref, reactive} from 'vue'
import { ElForm } from "element-plus";

export default function useLogin() {
  // 表单绑定数据
  let loginModel = reactive({
    username: 'admin',
    password: '1234',
    code: ''
  })
  //表单验证规则
  let rules = reactive({
    username: [{
      required: true,
      trigger: 'change',
      message: '请填写登录账户'
    }],
    password: [{
      required: true,
      trigger: 'change',
      message: '请填写登录密码'
    }],
    code: [{
      required: true,
      trigger: 'change',
      message: '请填写验证码'
    }]
  })
  // 表单的ref属性
  // 自定义组件获取ref的固定写法, ElForm就是组件名
  const loginFormRef = ref<InstanceType<typeof ElForm>>();

  return {
    loginModel,
    rules,
    loginFormRef
  }
}
