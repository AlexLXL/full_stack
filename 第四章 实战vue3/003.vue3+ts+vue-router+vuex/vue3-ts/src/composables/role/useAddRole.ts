import {EditType, Title} from "@/type/BaseEnum";
import {DialogModel} from "@/type/BastType"
import {ElForm} from "element-plus";
import {reactive, ref} from "vue";
import useInstance from "@/hooks/useInstance";
import {AddRoleModel} from "@/services/roleModel";

export default function useAddRole(dialog: DialogModel, onClose: any, onShow: any, emit: any) {
  //全局属性
  const {global} = useInstance()
  //表单ref
  const addRoleForm = ref<InstanceType<typeof ElForm>>()
  //表单数据
  const addModel = reactive<AddRoleModel>({
    id: '',
    name: '',
    createUser: '',
    type: '',
    remark: ''
  })
  //表单验证
  const rules = reactive({
    name: [{
      trigger: 'change',
      required: true,
      message: '请填写角色名称'
    }]
  })
  //确定
  const confirm = () => {
    addRoleForm.value?.validate(valid => {
      if (valid) {
        emit('save', addModel)
        onClose();
      }
    })
  }
  //显示弹框 type : 0 和 1
  const show = (type: string, row: AddRoleModel) => {
    dialog.height = 180;
    type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
    onShow();
    global.$$resetForm(addRoleForm.value, addModel)
    if (type == EditType.EDIT) global.$$objCopy(row, addModel)
    addModel.type = type;
  }
  return {
    confirm,
    show,
    addModel,
    rules,
    addRoleForm
  }
}