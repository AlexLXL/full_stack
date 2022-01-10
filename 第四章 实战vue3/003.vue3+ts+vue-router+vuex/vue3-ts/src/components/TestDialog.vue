<template>
  <div>
      <el-button type="primary" size="default" @click="addBtn">新增</el-button>
      
  </div>
  <SysDialog
  :title="dialog.title"
  :visible="dialog.visible"
  :height="dialog.height"
  :width="dialog.width"
  @onClose='onClose'
  @onConfirm='onConfirm'
  >
      <template v-slot:content>
          弹框内容
      </template>
  </SysDialog>
</template>
<script setup lang='ts'>
import { ref,reactive} from 'vue'
//引入组件
import SysDialog from './SysDialog.vue';
//定义弹框属性
const dialog = reactive({
    title:'新增',
    visible:false,
    height:280,
    width:630
})
//按钮点击事件
const addBtn = () =>{
    //visible为true的时候，弹框显示
    dialog.visible = true;
}
//关闭
const onClose = () =>{
    dialog.visible = false;
}
//确定
const onConfirm = () =>{
    dialog.visible = false
}
</script>
<style scoped lang='scss'>
</style>