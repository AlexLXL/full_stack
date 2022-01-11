import {reactive, onMounted} from 'vue'
import {getUserId} from '@/utils/auth'
import {getRoleListApi} from "@/services/roleService";
import {RoleListParm} from "@/services/roleModel";

export default function useRoleTable() {
  //表格查询参数
  const listParams = reactive<RoleListParm>({
    userId: getUserId() || '',
    name: '',
    pageSize: 10,
    currentPage: 1,
    total: 0
  })
  //表格数据
  const roleTable = reactive({
    list: []
  })
  //获取表格数据
  const getRoleList = () => {
    getRoleListApi(listParams).then((res) => {
      if (res && res.code == 200) {
        roleTable.list = res.data.records
      }
    })
  }

  //搜索按钮
  const searchBtn = () => {
    getRoleList()
  }
  //重置按钮
  const resetBtn = () => {
    listParams.name = '';
    getRoleList()
  }
  //页容量改变触发
  const sizeChange = (size: number) => {
    listParams.pageSize = size;
    getRoleList();
  }
  //页数改变触发
  const currentChange = (page: number) => {
    listParams.currentPage = page;
    getRoleList();
  }

  onMounted(() => {
    getRoleList()
  })

  return {
    listParams,
    roleTable,
    getRoleList,
    searchBtn,
    resetBtn,
    sizeChange,
    currentChange
  }
}