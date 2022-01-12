<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <template v-slot:content>
      <el-tree
        ref="parentTree"
        :data="treeData.data"
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :highlight-current="true"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-container">
            <!-- 长度为0说明没有下级 -->
            <span v-if="data.children.length == 0">
                            <DocumentRemove
                              style="width: 1.3em; height: 1.3em; margin-right: 5px;color: #8c8c8c;"></DocumentRemove>
                        </span>
            <!-- 点击展开和关闭 -->
            <span v-else @click.stop="openBtn(data)">
                            <component style="width: 1.1em; height: 1.1em; margin-right: 5px;color: #8c8c8c;"
                                       :is="data.open ? Plus : Minus"/>
                        </span>
            <span>{{ node.label }}</span>
          </div>
        </template>
      </el-tree>
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue';
import {DocumentRemove, Plus, Minus} from '@element-plus/icons-vue'
import {ElTree} from 'element-plus';
import useDialog from '@/hooks/useDialog';
import {reactive, ref} from 'vue'

const props = defineProps({
  getTreeDataApi: {//弹框标题
    type: Function,
    default: () => {}
  },
  defaultProps: { //控制弹框的展示和影藏
    type: Object,
    default: {
      children: 'children',
      label: 'label',
    }
  }
})

//弹框属性
const {dialog, onClose, onShow} = useDialog()
//树ref
const parentTree = ref<InstanceType<typeof ElTree>>();
//树数据
const treeData = reactive({
  data: []
})
//获取树数据
const getTreeData = async () => {
  let res = await props.getTreeDataApi();
  if (res && res.code == 200) {
    treeData.data = res.data;
  }
}
//树点击事件
const handleNodeClick = (data: any) => {
  selectNode.id = data.id;
  selectNode.name = data.label
}
//树点击后的数据
const selectNode = reactive<any>({
  id: '',
  name: ''
})
//树的属性
// const defaultProps = reactive({
//   children: 'children', //设置树的children
//   label: 'label', //设置树的名字属性字段
// })

//加号和减号的点击事件
const openBtn = (data: any) => {
  //设置展开或者关闭
  data.open = !data.open;
  if (parentTree.value) {
    parentTree.value.store.nodesMap[data.id].expanded = !data.open;
  }
}

//子组件传值给父组件
const emit = defineEmits(['select'])
//弹框确定
const confirm = () => {
  emit('select', selectNode)
  onClose();
}

//供父组件调用，显示弹框
const show = async () => {
  await getTreeData();
  dialog.title = '选择上级菜单'
  dialog.height = 420;
  dialog.width = 300;
  //显示
  onShow();
}

//把方法暴露出去
defineExpose({show})
</script>

<style lang="scss">
.el-tree {
  // 将每一行的设置为相对定位 方便后面before after 使用绝对定位来固定位置
  .el-tree-node {
    position: relative;
    padding-left: 10px;
  }

  // 子集像右偏移 给数线留出距离
  .el-tree-node__children {
    padding-left: 20px;
  }

  //这是竖线
  .el-tree-node :last-child:before {
    height: 40px;
  }

  .el-tree > .el-tree-node:before {
    border-left: none;
  }

  .el-tree > .el-tree-node:after {
    border-top: none;
  }

  //这自定义的线 的公共部分
  .el-tree-node:before,
  .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .tree :first-child .el-tree-node:before {
    border-left: none;
  }

  // 竖线
  .el-tree-node:before {
    border-left: 1px dotted #d9d9d9;
    bottom: 0px;
    height: 100%;
    top: -25px;
    width: 1px;
  }

  //横线
  .el-tree-node:after {
    border-top: 1px dotted #d9d9d9;
    height: 20px;
    top: 14px;
    width: 24px;
  }

  .el-tree-node__expand-icon.is-leaf {
    width: 8px;
  }

  //去掉elementui自带的展开按钮  一个向下的按钮,打开时向右
  .el-tree-node__content > .el-tree-node__expand-icon {
    display: none;
  }

  //每一行的高度
  .el-tree-node__content {
    line-height: 30px;
    height: 30px;
    padding-left: 10px !important;
  }
}

//去掉最上级的before  after 即是去电最上层的连接线
.el-tree > div {
  &::before {
    display: none;
  }

  &::after {
    display: none;
  }
}
</style>