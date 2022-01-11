import {reactive, onMounted} from "vue"
import {getMenuTableApi} from "@/services/menuService";

export default function useMenuTable() {
  //表格数据
  const menuTable = reactive({
    list: []
  })

  //获取表格数据
  const getMenuTable = () => {
    getMenuTableApi().then((res) => {
      if (res && res.code == 200) {
        menuTable.list = res.data;
      }
    })
  }

  onMounted(() => {
    getMenuTable()
  })
  return {
    menuTable,
    getMenuTable
  }
}