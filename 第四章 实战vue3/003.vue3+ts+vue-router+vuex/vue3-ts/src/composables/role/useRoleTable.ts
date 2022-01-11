import {reactive, onMounted} from "vue";
import {getUserId} from "@/utils/auth";
import {RoleListParm} from "@/services/roleModel";
import {getRoleListApi} from "@/services/roleService";

export default function useRoleTable() {
  //定义列表查询的参数
  const listParm = reactive<RoleListParm>({
    userId: getUserId() || '',
    currentPage: 1,
    pageSize: 10,
    name: '',
    total: 0
  })
  //定义表格数据
  const roleTable = reactive({
    list: []
  })

  //获取角色列表
  const getRoleList = () => {
    getRoleListApi(listParm).then((res) => {
      if (res && res.code == 200) {
        roleTable.list = res.data.records
        listParm.total = res.data.total;
      }
    })
  }

  //搜索
  const searchBtn = () => {
    getRoleList();
  }
  //重置
  const resetBtn = () => {
    listParm.name = '';
    getRoleList();
  }
  //页大小
  const sizeChange = (size: number) => {
    listParm.pageSize = size;
    getRoleList();
  }
  //页数
  const currentChange = (page: number) => {
    listParm.currentPage = page;
    getRoleList();
  }
  onMounted(() => {
    getRoleList();
  })

  return {
    roleTable,
    listParm,
    getRoleList,
    sizeChange,
    currentChange,
    searchBtn,
    resetBtn
  }
}