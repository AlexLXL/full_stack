import {ref} from 'vue'
import {EditType} from '@/type/BaseEnum';
import {AddDeptModel, DeptModel} from '@/services/departmentModel';
import useInstance from '@/hooks/useInstance';
import {Result, StatusCode} from "@/http/ajax";
import {addDeptApi, editDeptApi} from "@/services/departmentService";
// import AddAndEdit from '@/views/system/department/AddAndEdit.vue'

export default function useDept(getTableData: any) {
  const {global, proxy} = useInstance();
  //(vue的官方给的方式)打包的时候会报错
  // const addDeptRef = ref<InstanceType<typeof AddAndEdit>>();
  const addDeptRef = ref<{ show: (type: string, row?: DeptModel) => void }>();

  //搜索
  const serachBtn = () => {
    // getTableData();
  }
  //重置
  const resetBtn = () => {
    //清空搜索框
    // searchParm.searchName = ''
    // getTableData();
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
    console.log(global)
    console.log(proxy)
    // let parm = {
    //     id: id
    // }
    // const confirm = await global.$myconfirm('确定删除该数据吗?')
    // if (confirm) {
    //     //执行删除操作
    //     let res = await deleteDeptApi(parm)
    //     if (res && res.code == StatusCode.Success) {
    //         //信息提示
    //         global.$message({ message: res.msg, type: 'success' })
    //         //刷新表格
    //         getTableData();
    //     }
    // }
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