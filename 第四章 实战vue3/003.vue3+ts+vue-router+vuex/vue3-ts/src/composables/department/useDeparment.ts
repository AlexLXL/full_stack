import { ref } from 'vue'
import { EditType } from '@/type/BaseEnum';
import { AddDeptModel, DeptModel } from '@/services/departmentModel';
// import useInstance from '@/hooks/useInstance';
// import { addDeptApi, editDeptApi, deleteDeptApi } from '@/api/dept/dept';
// import { Result, StatusCode } from '@/http/request';
// import AddAndEdit from '@/views/system/department/AddAndEdit.vue'

export default function useDept() {
  // const { global, proxy } = useInstance();
  //(vue的官方给的方式)打包的时候会报错
  // const addDeptRef = ref<InstanceType<typeof AddAndEdit>>();
  const addDeptRef = ref<{ show: (type: string, row?: DeptModel) => void }>();

  //搜索
  const serachBtn = () => {
    // getDeptList();
  }
  //重置
  const resetBtn = () => {
    //清空搜索框
    // searchParm.searchName = ''
    // getDeptList();
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
    // console.log(global)
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
    //         getDeptList();
    //     }
    // }
  }
  //保存
  const save = async (params: AddDeptModel) => {
    console.log(params)
    // //提交表单
    // let res: Result;
    // if (parm.type == EditType.ADD) { //新增
    //     res = await addDeptApi(parm)
    // } else { //编辑
    //     res = await editDeptApi(parm)
    // }
    // if (res && res.code == StatusCode.Success) {
    //     //信息提示
    //     global.$message({ message: res.msg, type: 'success' })
    //     //刷新表格
    //     getDeptList();
    // }
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