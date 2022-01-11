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
        ref="assignTree"
        :data="assignTreeData.list"
        node-key="id"
        :props="defaultProps"
        empty-text="暂无数据"
        :show-checkbox="true"
        default-expand-all
        :highlight-current="true"
        :default-checked-keys='assignTreeData.assignTreeChecked'
      ></el-tree>
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useAssignMenu from '@/composables/role/useAssignMenu';

//弹框属性
const {dialog, onShow, onClose} = useDialog();
//组件业务
const {confirm, show, assignTreeData, defaultProps, assignTree} = useAssignMenu(dialog, onShow, onClose)
//暴露方法给父组件调用
defineExpose({show})
</script>
<style scoped lang='scss'>
</style>