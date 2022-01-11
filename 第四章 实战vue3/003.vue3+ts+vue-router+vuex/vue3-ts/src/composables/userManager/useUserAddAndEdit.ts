import {EditType, Title} from "@/type/BaseEnum"
import {DialogModel} from "@/type/BastType"
import {AddUserModel} from "@/services/userModel";
import {ElForm} from "element-plus";
import {ref} from "vue";
import useInstance from "@/hooks/useInstance";
import {SelectNode} from "@/services/departmentModel";

export default function useUserAddAndEdit(dialog: DialogModel, onShow: any, onClose: any, addModel: AddUserModel, emit: any) {
  //获取全局属性
  const {global} = useInstance()
  //表单ref属性
  const addUserForm = ref<InstanceType<typeof ElForm>>();
  //显示
  const show = (type: string, row?: AddUserModel) => {
    dialog.height = 230;
    type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
    onShow();
    global.$util_resetForm(addUserForm.value, addModel)
    if (type == EditType.EDIT) global.$util_objCopy(row, addModel)
    addModel.type = type;
  }
  //确定
  const confirm = () => {
    addUserForm.value?.validate((valid: any) => {
      if (valid) {
        emit('save', addModel)
        onClose();
      }
    })
  }
  // 选择
  const select = (node: SelectNode) => {
    addModel.deptId = node.id;
    addModel.deptName = node.name
  }
  return {
    show,
    confirm,
    addUserForm,
    select
  }
}