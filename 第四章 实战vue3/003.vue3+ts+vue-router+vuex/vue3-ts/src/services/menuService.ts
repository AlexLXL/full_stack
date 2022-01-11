import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {AddMenuModel} from "@/services/menuModel";

const Api = {
  getMenuList: normalURL + '/api/sysUser/getMenuList',
  getTable: normalURL + '/api/menu/list',
  getParent: normalURL + '/api/menu/parent',
  add: normalURL + '/api/menu'
}

//获取菜单
export const getMenuListApi = async () => {
  return await http.get(Api.getMenuList)
}

//获取菜单列表
export const getMenuTableApi = async () => {
  return await http.get(Api.getTable)
}
//获取上级菜单
export const getParentApi = async () => {
  return await http.get(Api.getParent)
}
//新增
export const addMenuApi = async (params: AddMenuModel) => {
  return await http.post(Api.add, params)
}
//编辑
export const editMenuApi = async (params: AddMenuModel) => {
  return await http.put(Api.add, params)
}
//删除
export const deleteMenApi = async (id: number) => {
  return await http.delete(Api.add, {id: id})
}