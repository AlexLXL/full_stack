import {DeptModel, SelectNode} from '@/services/departmentModel'
import {getLeftTreeApi} from '@/services/userService'
import {ElTree} from 'element-plus';
import {reactive, ref, onMounted, nextTick} from 'vue'

export default function useLeftTree(emit: any) {
  //树的ref
  const parentTree = ref<InstanceType<typeof ElTree>>();
  //树的数据
  const treeData = reactive({
    data: []
  })
  //选中的数据
  const selectNode = reactive<SelectNode>({
    id: '',
    name: ''
  })
  //树的属性
  const defaultProps = reactive({
    children: 'children',
    label: 'name',
  })
  //树的点击事件
  const handleNodeClick = (data: DeptModel) => {
    selectNode.id = data.id;
    selectNode.name = data.name
    emit('treeClick', data.id)
  }
  //获取树的数据
  const getTreeData = () => {
    getLeftTreeApi().then((res) => {
      if (res && res.code == 200) {
        treeData.data = res.data;
        nextTick(() => {
          const firstNode = document.querySelector(".el-tree-node") as any;
          if (firstNode) firstNode.click();
        }).then()
      }
    });

  }
  onMounted(() => {
    getTreeData();
  })

  //加号和减号的点击事件
  const openBtn = (data: DeptModel) => {
    //设置展开或者关闭
    data.open = !data.open;
    if (parentTree.value) {
      parentTree.value.store.nodesMap[data.id].expanded = !data.open;
    }
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