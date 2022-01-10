import {reactive} from 'vue'
import {UserListParams} from "@/services/userModel";
import {getUserListApi} from "@/services/userService";

export default function useUserTable() {
  //列表参数
  const listParams = reactive<UserListParams>({
    deptId: '',
    currentPage: 1,
    pageSize: 10,
    loginName: '',
    total: 0
  })
  //表格数据
  const tableData = reactive({
    list: []
  })

  //获取表格数据
  const getUserList = () => {
    getUserListApi(listParams).then((res) => {
      if (res && res.code == 200) {
        tableData.list = res.data.records
        listParams.total = res.data.total;
      }
    })
  }
  //树点击数据
  const treeClick = (deptId: number) => {
    listParams.deptId = deptId;
    getUserList();
  }
  //页容量改变触发
  const sizeChange = (size: number) => {
    listParams.pageSize = size;
    getUserList();
  }
  //页数改变触发
  const currentChange = (page: number) => {
    listParams.currentPage = page
    getUserList();
  }
  return {
    listParams,
    tableData,
    getUserList,
    treeClick,
    sizeChange,
    currentChange
  }
}