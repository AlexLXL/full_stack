import {EditType, Title} from "@/type/BaseEnum";
import {DialogModel} from "@/type/BastType"
import {reactive, ref} from "vue";
import {ElForm} from "element-plus";
import useInstance from "@/hooks/useInstance";
import {AddMenuModel, MenuModel} from "@/services/menuModel";
import {SelectNode} from "@/services/departmentModel";

export default function useAddMenu(dialog: DialogModel, onClose: any, onShow: any, emit: any) {
  const {global} = useInstance()
  //表单ref
  const addMenuForm = ref<InstanceType<typeof ElForm>>();
  //表单验证
  const rules = reactive({
    type: [
      {
        required: true,
        trigger: "change",
        message: "请选择菜单类型",
      },
    ],
    parentName: [
      {
        required: true,
        trigger: "change",
        message: "请选择上级菜单",
      },
    ],
    label: [
      {
        required: true,
        trigger: "change",
        message: "请填写菜单名称",
      },
    ],
    name: [
      {
        required: true,
        trigger: "change",
        message: "请填写路由名称",
      },
    ],
    path: [
      {
        required: true,
        trigger: "change",
        message: "请填写路由路径",
      },
    ],
    url: [
      {
        required: true,
        trigger: "change",
        message: "请填写组件路径",
      },
    ],
    code: [
      {
        required: true,
        trigger: "change",
        message: "请填写权限字段",
      },
    ],
    icon: [
      {
        required: true,
        trigger: "change",
        message: "请填写图标",
      },
    ]
  })
  //表单数据
  const addMenuModel = reactive<AddMenuModel>({
    id: '',
    editType: '',
    type: '',
    parentId: '',
    parentName: '',
    label: '',
    icon: '',
    name: '',
    path: '',
    url: '',
    code: '',
    orderNum: '',
  })
  //确定
  const confrim = () => {
    addMenuForm.value?.validate(valid => {
      if (valid) {
        emit('save', addMenuModel)
        onClose();
      }
    })
  }
  //展示弹框
  const show = (type: string, row: MenuModel) => {
    type == EditType.ADD ? (dialog.title = Title.ADD) : (dialog.title = Title.EDIT)
    onShow();
    global.$$resetForm(addMenuForm.value, addMenuModel)
    if (type == EditType.EDIT) global.$$objCopy(row, addMenuModel)
    addMenuModel.editType = type
  }
  //选中上级的数据
  const select = (node: SelectNode) => {
    addMenuModel.parentId = node.id;
    addMenuModel.parentName = node.name
  }
  return {
    confrim,
    show,
    addMenuModel,
    rules,
    addMenuForm,
    select
  }
}