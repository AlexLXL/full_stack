<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onClose='onClose'
    @onConfirm='confirm'
  >
    <template v-slot:content>
      <el-form
        :model="addModel"
        ref="addUserForm"
        :rules="rules"
        label-width="80px"
        size="mini"
      >
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="deptName" label="所属部门">
              <el-input v-model="addModel.deptName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="loginName" label="姓名">
              <el-input v-model="addModel.loginName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="mobile" label="电话">
              <el-input v-model="addModel.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="昵称">
              <el-input v-model="addModel.nickName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item label="邮箱">
              <el-input v-model="addModel.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="username" label="登录名">
              <el-input v-model="addModel.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="password" label="密码">
              <el-input v-model="addModel.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="sex" label="性别">
              <el-radio-group v-model="addModel.sex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
              </el-radio-group>
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
import useUserAddAndEdit from "@/composables/userManager/useUserAddAndEdit";
import useBaseModel from '@/composables/userManager/useBaseModel';

//声明事件
const emit = defineEmits(['save'])
//弹框属性
const {dialog, onShow, onClose} = useDialog();
//基础属性
const { addModel, rules } = useBaseModel();
const {show, confirm, addUserForm} = useUserAddAndEdit(dialog, onShow, onClose, addModel, emit);


//暴露方法
defineExpose({show})

</script>
<style scoped lang='scss'>
</style>