import {Result} from "@/http/ajax"
import {EditType} from "@/type/BaseEnum";
import {ref} from "vue"
import useInstance from "@/hooks/useInstance";
import {AddMenuModel, MenuModel} from "@/services/menuModel";
import {addMenuApi, deleteMenApi, editMenuApi} from "@/services/menuService";

export default function useMenu(getMenuTable: any) {
  const {global} = useInstance()
  //弹框ref
  const addMenuRef = ref<{ show: (type: string, row?: MenuModel) => void }>();
  //新增
  const addBtn = () => {
    addMenuRef.value?.show(EditType.ADD)
  }
  //编辑
  const editBtn = (row: MenuModel) => {
    addMenuRef.value?.show(EditType.EDIT, row)
  }
  //删除
  const deleteBtn = async (id: number) => {
    let confrim = await global.$$myConfirm('确定删除该数据吗?')
    if (confrim) {
      let res = await deleteMenApi(id);
      if (res && res.code == 200) {
        global.$message({message: res.msg, type: 'success'})
        getMenuTable();
      }
    }
  }
  //保存
  const save = async (params: AddMenuModel) => {
    let res: Result;
    if (params.editType == EditType.ADD) {
      res = await addMenuApi(params)
    } else {
      res = await editMenuApi(params)
    }
    if (res && res.code == 200) {
      global.$message({message: res.msg, type: 'success'})
      getMenuTable();
    }
  }
  return {
    addBtn,
    editBtn,
    deleteBtn,
    save,
    addMenuRef
  }
}