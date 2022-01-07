<template>
  <div class="header">
    <Collapse></Collapse>
    <BreadCrum></BreadCrum>
    <el-button type="primary" @click="toLogin">登录页</el-button>
  </div>
</template>
<script lang="ts" setup>
import Collapse from "@/layout/header/Collapse.vue"
import BreadCrum from "@/layout/header/BreadCrum.vue"
import {cleanSession} from "@/utils/auth";
import {useRouter} from "vue-router";
import {useStore} from "@/store";

let store = useStore()
let router = useRouter()
let toLogin = () => {
  cleanSession()
  store.commit('tabs/setTabList', [])
  router.replace('/login')
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
  }
</style>