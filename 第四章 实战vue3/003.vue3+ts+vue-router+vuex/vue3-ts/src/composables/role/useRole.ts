import {EditType} from "@/type/BaseEnum"
import {ref} from "vue"
import useInstance from "@/hooks/useInstance"
import {AddRoleModel} from "@/services/roleModel";
import {addRoleApi, deleteRoleApi, editRoleApi} from "@/services/roleService";
import {Result} from "@/http/ajax";

export default function useRole(getRoleList: any) {
  const {global} = useInstance()
  //弹窗ref
  const addRoleRef = ref<{ show: (type: string, row?: AddRoleModel) => void }>()
  //新增
  const addBtn = () => {
    addRoleRef.value?.show(EditType.ADD)
  }
  //编辑
  const editBtn = (row: AddRoleModel) => {
    addRoleRef.value?.show(EditType.EDIT, row)
  }
  //删除
  const deleteBtn = async (id: number) => {
    let parm = {
      id: id
    }
    //信息确认
    let confirm = await global.$$myConfirm('确定删除该数据吗?')
    if (confirm) {
      let res = await deleteRoleApi(parm)
      if (res && res.code == 200) {
        global.$message({message: res.msg, type: 'success'})
        getRoleList();

      }
    }
  }
  //保存
  const save = async (parm: AddRoleModel) => {
    let res: Result;
    if (parm.type == EditType.ADD) {
      res = await addRoleApi(parm)
    } else {
      res = await editRoleApi(parm)
    }
    if (res && res.code == 200) {
      global.$message({message: res.msg, type: 'success'})
      getRoleList();
    }
  }

  return {
    addBtn,
    editBtn,
    deleteBtn,
    save,
    addRoleRef,
  }
}