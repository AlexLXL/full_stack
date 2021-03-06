import {IListParams, ITableData} from '@/services/departmentModel'
import {getDepartmentListApi} from '@/services/departmentService'
import {ref, reactive, onMounted, nextTick} from "vue";

export default function useDepartmentTable() {
  //表格的高度
  const tableHeigth = ref(0);

  // 搜索栏
  let searchForm = reactive<IListParams>({
    searchName: ''
  })
  // 表格数据
  let tableData = reactive<ITableData>({
    list: []
  })

  // 获取表格数据
  let getTableData = () => {
    getDepartmentListApi(searchForm).then((res) => {
      if (res && res.code === 200) {
        tableData.list = res.data
      }
    })
  }

  onMounted(() => {
    getTableData()
    nextTick(() => {
      tableHeigth.value = window.innerHeight - 200
    })
  })

  return {
    tableHeigth,
    searchForm,
    tableData,
    getTableData,
  }
}