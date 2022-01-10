import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {AddDeptModel, IListParams} from '@/services/departmentModel'

const Api = {
  getDepartmentList: normalURL + '/api/department/list',
  getParent: normalURL + '/api/department/parent',
  add: normalURL + '/api/department',
  edit: normalURL + '/api/department',
  delete: normalURL + '/api/department'
}

// 获取列表
export async function getDepartmentListApi(params: IListParams) {
  return await http.get(Api.getDepartmentList, params)
}

//查询上级部门树
export const getDeptParentApi = async () => {
  return await http.get(Api.getParent)
}
//新增
export const addDeptApi = async (params: AddDeptModel) => {
  return await http.post(Api.add, params)
}
//编辑
export const editDeptApi = async (params: AddDeptModel) => {
  return await http.put(Api.edit, params)
}
//删除
export const deleteDeptApi = async (params: any) => {
  return await http.delete(Api.delete, params)
}