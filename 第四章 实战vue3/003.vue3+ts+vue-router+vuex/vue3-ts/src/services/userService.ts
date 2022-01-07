import http from '@/http'
import {normalURL} from '@/services/serviceHelper'

const Api = {
  getImg: normalURL + '/api/sysUser/image',
  login: normalURL + '/api/user/login',
}

export async function getImageApi() {
  return await http.getImage(Api.getImg)
}

export async function loginApi(params: any) {
  return await http.post(Api.login, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

// enum Api {
//   getImg = '/api/sysUser/image'
// }
//获取验证码
// export async function getImageApi() {
//   return await http.getImage(api.getImg)
// }