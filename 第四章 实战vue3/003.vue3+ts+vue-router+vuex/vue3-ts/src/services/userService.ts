import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {AddUserModel, AssignRoleListParm, LoginResult, SelectRoleParm, UserInfo, UserListParams} from './userModel'
import qs from "qs";

const Api = {
  getImg: normalURL + '/api/sysUser/image',
  login: normalURL + '/api/user/login',
  getUserInfo: normalURL + '/api/sysUser/getInfo',
  getLeftTree: normalURL + '/api/department/list',
  getUserList: normalURL + '/api/user/list',
  addAndEdit: normalURL + '/api/user',
  getRoleList: normalURL + '/api/user/getRolistForAssign',
  getRoleId: normalURL + '/api/user/getRoleIdByUserId',
  assignSave: normalURL + '/api/user/assingRole',
  loginOut: normalURL + '/api/sysUser/loginOut',
  restore: normalURL + '/api/backup/restore'
}

//获取验证码
export async function getImageApi() {
  return await http.getImage(Api.getImg)
}
//登录
export async function loginApi(params: any) {
  return await http.postAny<LoginResult>(Api.login, params, {
    transformRequest: [(params) => qs.stringify(params, {indices: false})],
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}
//获取用户信息
export const getUserInfoApi = async () => {
  return await http.get<UserInfo>(Api.getUserInfo)
}
//获取用户部门树
export const getLeftTreeApi = async () => {
  return await http.get(Api.getLeftTree)
}
//获取用户列表
export const getUserListApi = async (param: UserListParams) => {
  return await http.get(Api.getUserList, param)
}
//新增用户
export const addUserApi = async (params: AddUserModel) => {
  return await http.post(Api.addAndEdit, params)
}
//编辑用户
export const editUserApi = async (params: AddUserModel) => {
  return await http.put(Api.addAndEdit, params)
}
//删除用户
export const deleteUserApi = async (params: any) => {
  return await http.delete(Api.addAndEdit, params)
}
//获取分配角色弹框列表
export const getRoleListApi = async (params: AssignRoleListParm) => {
  return await http.get(Api.getRoleList, params)
}
//查询用户原来用有的角色id
export const getRoleIdApi = async (userId: number | string) => {
  return await http.getRestApi(Api.getRoleId, {userId: userId})
}
//分配角色保存
export const assingRoleSaveApi = async (params: SelectRoleParm) => {
  return await http.post(Api.assignSave, params)
}
//退出登录
export const loginOutApi = async (params: any) => {
  return await http.post(Api.loginOut, params)
}
//还原数据
export const restoreApi = async () => {
  return await http.post(Api.restore, null)
}

// enum Api {
//   getImg = '/api/sysUser/image'
// }
//获取验证码
// export async function getImageApi() {
//   return await http.getImage(api.getImg)
// }