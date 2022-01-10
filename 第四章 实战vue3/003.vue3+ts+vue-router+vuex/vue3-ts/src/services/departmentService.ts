import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {ListParams} from '@/services/departmentModel'

const Api = {
  getDepartmentList: normalURL + '/api/department/list',
}

// 获取列表
export async function getDepartmentListApi(params: ListParams) {
  return await http.get(Api.getDepartmentList, params)
}