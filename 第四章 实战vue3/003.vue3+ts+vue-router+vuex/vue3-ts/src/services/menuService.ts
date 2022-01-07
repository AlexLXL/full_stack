import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {LoginResult, UserInfo} from './userModel'

const Api = {
  getMenuList: normalURL + '/api/sysUser/getMenuList',
}

//获取菜单
export const getMenuListApi = async () => {
  return await http.get(Api.getMenuList)
}