import {reactive, ref} from 'vue'
import {ElTree} from 'element-plus';
import {DeptModel, SelectNode} from "@/services/departmentModel";
import {getDeptParentApi} from "@/services/departmentService";

export default function useSelectTree() {
  //树的ref
  const parentTree = ref<InstanceType<typeof ElTree>>();
  //树的数据
  const treeData = reactive({
    data: []
  })
  //树的属性
  const defaultProps = reactive({
    children: 'children', //设置树的children
    label: 'name', //设置树的名字属性字段
  })
  //树的点击事件
  const handleNodeClick = (data: DeptModel) => {
    selectNode.id = data.id;
    selectNode.name = data.name
  }
  //树的打开事件
  const openBtn = (data: DeptModel) => {
    //设置展开或者关闭
    data.open = !data.open;
    if (parentTree.value) {
      parentTree.value.store.nodesMap[data.id].expanded = !data.open;
    }
  }
  //选中的数据
  const selectNode = reactive<SelectNode>({
    id: '',
    name: ''
  })
  //获取树的数据
  const getTreeData = async () => {
    getDeptParentApi().then((res) => {
      if (res && res.code == 200) {
        treeData.data = res.data;
      }
    })
  }

  return {
    treeData,
    defaultProps,
    handleNodeClick,
    getTreeData,
    openBtn,
    parentTree,
    selectNode
  }
}