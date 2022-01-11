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
      <el-form
        :model="addModel"
        ref="addRoleForm"
        :rules="rules"
        label-width="80px"
        size="mini"
      >
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop='name' label="角色名称">
              <el-input v-model="addModel.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="角色备注">
              <el-input v-model="addModel.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useAddRole from '@/composables/role/useAddRole';

//弹框属性
const {dialog, onClose, onShow} = useDialog()
//声明事件
const emit = defineEmits(['save'])
const {confirm, show, addModel, rules, addRoleForm} = useAddRole(dialog, onClose, onShow, emit)

//暴露出去给外部使用
defineExpose({show})
</script>
<style scoped lang='scss'>
</style>