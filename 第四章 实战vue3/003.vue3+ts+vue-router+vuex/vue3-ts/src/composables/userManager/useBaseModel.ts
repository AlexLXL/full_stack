import {reactive} from 'vue'
import {AddUserModel} from "@/services/userModel";

export default function useBaseModel() {
  //表单绑定的数据
  const addModel = reactive<AddUserModel>({
    type: '', //判断新增还是编辑
    id: '',
    deptId: '',
    deptName: '',
    loginName: '',
    mobile: '',
    nickName: '',
    email: '',
    username: '',
    password: '',
    sex: '',
  })

  //表单验证规则
  const rules = reactive({
    deptName: [{
      required: true,
      message: '请选择上级部门',
      trigger: 'change'
    }],
    loginName: [{
      required: true,
      message: '请填写姓名',
      trigger: 'change'
    }],
    mobile: [{
      required: true,
      message: '请填写电话',
      trigger: 'change'
    }],
    username: [{
      required: true,
      message: '请填写登录名',
      trigger: 'change'
    }],
    password: [{
      required: true,
      message: '请填写密码',
      trigger: 'change'
    }],
    sex: [{
      required: true,
      message: '请选择性别',
      trigger: 'change'
    }],
  });

  return {
    rules,
    addModel
  }
}