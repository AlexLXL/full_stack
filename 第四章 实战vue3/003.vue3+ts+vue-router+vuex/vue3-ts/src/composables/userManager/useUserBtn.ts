import {EditType} from '@/type/BaseEnum';
import {ref} from 'vue'
import useInstance from '@/hooks/useInstance';
import {Result} from "@/http/ajax";
import {AddUserModel} from "@/services/userModel";
import {addUserApi, deleteUserApi, editUserApi} from "@/services/userService";

export default function useUserBtn(getUserList: any) {
  //全局属性
  const {global} = useInstance()
  //新增ref
  const userAddRef = ref<{ show: (type: string, row?: AddUserModel) => void }>();
  //分配角色ref
  const assignRoleRef = ref<{ show: (name: string, useId: string | number) => void }>();
  //新增
  const addBtn = () => {
    userAddRef.value?.show(EditType.ADD)
  }
  //编辑
  const editBtn = (row: AddUserModel) => {
    userAddRef.value?.show(EditType.EDIT, row)
  }
  //删除
  const deleteBtn = async (id: number) => {
    let params = {id}
    let confirm = await global.$myconfirm('确定删除该数据吗?')
    if (confirm) {
      let res = await deleteUserApi(params)
      if (res && res.code == 200) {
        global.$message({message: res.msg, type: "success"})
        getUserList();
      }
    }
  }
  //新增、编辑保存
  const save = async (params: AddUserModel) => {
    let res: Result;
    if (params.type == EditType.ADD) {
      res = await addUserApi(params)
    } else {
      res = await editUserApi(params)
    }
    if (res && res.code == 200) {
      getUserList();
      global.$message({message: res.msg, type: 'success'})
    }
  }
  //分配角色
  const assignBtn = (row: AddUserModel) => {
    assignRoleRef.value?.show(row.loginName, row.id)
  }

  return {
    addBtn,
    editBtn,
    deleteBtn,
    assignBtn,
    userAddRef,
    save,
    assignRoleRef
  }
}