<template>
  <SysDialog
    :title="dialog.title"
    :visible="dialog.visible"
    :width="dialog.width"
    :height="dialog.height"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <template v-slot:content>
      <el-form
        :model="dialogModel"
        ref="addDeptForm"
        :rules="rules"
        label-width="80px"
        size="small"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item prop="parentName" label="上级部门">
              <el-input type="hidden" v-model="dialogModel.pid"></el-input>
              <el-input @click="selectTree" v-model="dialogModel.parentName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="name" label="部门名称">
              <el-input v-model="dialogModel.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="deptCode" label="部门编码">
              <el-input v-model="dialogModel.deptCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="deptPhone" label="部门电话">
              <el-input v-model="dialogModel.deptPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="manager" label="部门经理">
              <el-input v-model="dialogModel.manager"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="deptAddress" label="部门地址">
              <el-input v-model="dialogModel.deptAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="orderNum" label="部门序号">
              <el-input v-model="dialogModel.orderNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>

  <!-- 上级部门弹框 -->
   <deparentmentSelectTree ref="selectTreeRef" @select="select"></deparentmentSelectTree>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue'
import useDialog from '@/hooks/useDialog'
import useBaseModel from '@/composables/department/useBaseModel'
import { EditType, Title } from '@/type/BaseEnum'
import { ref } from 'vue'
import { ElForm } from 'element-plus'
import {DeptModel, SelectNode} from '@/services/departmentModel'
import deparentmentSelectTree from './deparentmentSelectTree.vue'
import useSelectTree from '@/composables/department/useSelectTree'
import useInstance from '@/hooks/useInstance'


//弹框属性
const { dialog, onShow, onClose } = useDialog();
//基础数据
const { dialogModel, rules } = useBaseModel();
//表单的ref属性
const addDeptForm = ref<InstanceType<typeof ElForm>>();
//全局挂载global
const { global } = useInstance();
//定义事件
const emit = defineEmits(['save'])
//弹框的确定,把表单的值，返回给父组件
const confirm = () => {
  addDeptForm.value?.validate(valid => {
    if (valid) {
      emit('save', dialogModel)
      onClose();
    }
  })
}

//显示弹框
const show = (type: string, row?: DeptModel) => {
  dialog.width = 650;
  dialog.height = 250;
  type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
  onShow();
  global.$$resetForm(addDeptForm.value, dialogModel); // 清空表单
  if (type === EditType.EDIT) {
    global.$$objCopy(row, dialogModel)
  }
  dialogModel.type = type;
}

// 父组件调用ref的时候使用
defineExpose({
  show
})

// 调用子组件deparentmentSelectTree.vue
const { selectTreeRef, selectTree } = useSelectTree();
const select = (node: SelectNode) => {
  dialogModel.pid = node.id;
  dialogModel.parentName = node.name
}
</script>
<style scoped lang='scss'>
</style>