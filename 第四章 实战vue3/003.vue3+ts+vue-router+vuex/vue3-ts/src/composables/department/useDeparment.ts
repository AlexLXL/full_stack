import {ref} from 'vue'
import {EditType} from '@/type/BaseEnum';
import {AddDeptModel, DeptModel, IListParams} from '@/services/departmentModel';
import useInstance from '@/hooks/useInstance';
import {Result, StatusCode} from "@/http/ajax";
import {addDeptApi, deleteDeptApi, editDeptApi} from "@/services/departmentService";
// import AddAndEdit from '@/views/system/department/AddAndEdit.vue'

export default function useDept(getTableData: any, searchForm: IListParams) {
  //(vue的官方给的方式)打包的时候会报错
  // const addDeptRef = ref<InstanceType<typeof AddAndEdit>>();
  const addDeptRef = ref<{ show: (type: string, row?: DeptModel) => void }>();
  const {global, proxy} = useInstance();

  //搜索
  const serachBtn = () => {
    getTableData();
  }
  //重置
  const resetBtn = () => {
    searchForm.searchName = ''
    getTableData();
  }
  //新增
  const addBtn = () => {
    addDeptRef.value?.show(EditType.ADD);
  }
  //编辑
  const editBtn = (row: DeptModel) => {
    //父组件调用子组件的show方法
    addDeptRef.value?.show(EditType.EDIT, row);
  }
  //删除
  const deleteBtn = async (id: number) => {
    let params = {id}
    const confirm = await global.$$myConfirm('确定删除该数据吗?')
    if (confirm) {
      let res = await deleteDeptApi(params)
      if (res && res.code == StatusCode.Success) {
        global.$message({message: res.msg, type: 'success'})
        getTableData();
      }
    }
  }
  //保存
  const save = async (params: AddDeptModel) => {
    let res: Result;
    if (params.type === EditType.ADD) {
      res = await addDeptApi(params)
    } else {
      res = await editDeptApi(params)
    }
    if (res && res.code === StatusCode.Success) {
      global.$message({message: res.msg, type: 'success'})
      getTableData();
    }
  }
  return {
    serachBtn,
    addBtn,
    editBtn,
    deleteBtn,
    save,
    addDeptRef,
    resetBtn
  }
}