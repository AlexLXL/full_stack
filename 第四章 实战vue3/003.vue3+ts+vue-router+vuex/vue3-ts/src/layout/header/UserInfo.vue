<template>
  <el-dropdown placement="bottom-start">
        <span class="el-dropdown-link">
            <img class="userimg" src="@/assets/avatar.jpg"/>
        </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="restore">还原数据</el-dropdown-item>
        <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang='ts'>
import useInstance from '@/hooks/useInstance';
import {cleanSession, getToken} from '@/utils/auth';
import {loginOutApi, restoreApi} from "@/services/userService";

const {global} = useInstance()
//退出登录
const loginOut = async () => {
  let confirm = await global.$$myConfirm('确定退出登录吗?')
  if (confirm) {
    let parm = {
      token: getToken()
    }
    let res = await loginOutApi(parm)
    if (res && res.code == 200) {
      //跳到登录
      window.location.href = "/login";
      //清空session
      cleanSession();
    }
  }
}
//还原数据
const restore = async () => {
  let confirm = await global.$$myConfirm('确定还原数据吗?')
  if (confirm) {
    let res = await restoreApi();
    if (res && res.code == 200) {
      //信息提示
      global.$message({message: res.msg, type: 'success'})
    }
  }
}
</script>
<style scoped lang='scss'>
.userimg {
  height: 42px;
  width: 42px;
  border-radius: 50%;
}
</style>