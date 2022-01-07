import http from '@/http'
import {loginUrls} from '@/services/serviceHelper'

export async function getImageApi() {
  return await http.getImage(loginUrls.getImg)
}

export async function loginApi(params: any) {
  return await http.post(loginUrls.login, params, {
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