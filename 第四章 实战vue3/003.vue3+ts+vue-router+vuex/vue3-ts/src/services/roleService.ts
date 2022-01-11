import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {AddRoleModel, AssignSaveParm, AssignTreeParm, DeleteParm, RoleListParm} from "./roleModel"

const Api = {
  getList: normalURL + '/api/role/list',
  add: normalURL + '/api/role',
  assignTree: normalURL + '/api/role/getAssignPermissionTree',
  assignSave: normalURL + '/api/role/roleAssignSave'
}

//角色列表
export const getRoleListApi = async (params: RoleListParm) => {
  return await http.get(Api.getList, params)
}
//新增角色
export const addRoleApi = async (params: AddRoleModel) => {
  return await http.post(Api.add, params)
}
//编辑角色
export const editRoleApi = async (params: AddRoleModel) => {
  return await http.put(Api.add, params)
}
//删除角色
export const deleteRoleApi = async (params: DeleteParm) => {
  return await http.delete(Api.add, params)
}

//分配权限树的数据
export const assignTreeApi = async (params: AssignTreeParm) => {
  return await http.get(Api.assignTree, params)
}
//分配权限保存
export const assignSaveApi = async (params: AssignSaveParm) => {
  return await http.post(Api.assignSave, params)
}