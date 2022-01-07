import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {LoginResult, UserInfo} from './userModel'

const Api = {
  getImg: normalURL + '/api/sysUser/image',
  login: normalURL + '/api/user/login',
  getUserInfo: normalURL + '/api/sysUser/getInfo',
}

//获取验证码
export async function getImageApi() {
  return await http.getImage(Api.getImg)
}
//登录
export async function loginApi(params: any) {
  return await http.postAny<LoginResult>(Api.login, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
//获取用户信息
export const getUserInfoApi = async () => {
  return await http.get<UserInfo>(Api.getUserInfo)
}

// enum Api {
//   getImg = '/api/sysUser/image'
// }
//获取验证码
// export async function getImageApi() {
//   return await http.getImage(api.getImg)
// }