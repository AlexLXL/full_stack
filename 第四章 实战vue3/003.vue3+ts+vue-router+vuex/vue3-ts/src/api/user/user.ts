import http from '@/api'
import {userUrls} from '@/api/basicURLs'

export async function getImageApi() {
  return await http.getImage(userUrls.getImg)
}

// enum Api {
//   getImg = '/api/sysUser/image'
// }
//获取验证码
// export async function getImageApi() {
//   return await http.getImage(api.getImg)
// }