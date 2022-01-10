import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {LoginResult, UserInfo, UserListParm} from './userModel'
import qs from "qs";

const Api = {
  getImg: normalURL + '/api/sysUser/image',
  login: normalURL + '/api/user/login',
  getUserInfo: normalURL + '/api/sysUser/getInfo',
  getLeftTree: normalURL + '/api/department/list',
  getUserList: normalURL + '/api/user/list',
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
export const getUserListApi = async (param: UserListParm) => {
  return await http.get(Api.getUserList, param)
}

// enum Api {
//   getImg = '/api/sysUser/image'
// }
//获取验证码
// export async function getImageApi() {
//   return await http.getImage(api.getImg)
// }