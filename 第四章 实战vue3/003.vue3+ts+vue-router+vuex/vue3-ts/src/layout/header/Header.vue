<template>
  <div class="header">
    <div class="left">
      <Collapse></Collapse>
      <BreadCrum></BreadCrum>
    </div>
    <div class="right">
      <UserInfo></UserInfo>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Collapse from "@/layout/header/Collapse.vue"
import BreadCrum from "@/layout/header/BreadCrum.vue"
import UserInfo from "@/layout/header/UserInfo.vue"

// import {cleanSession} from "@/utils/auth";
// import {useRouter} from "vue-router";
// import {useStore} from "@/store";
//
// let store = useStore()
// let router = useRouter()
// let toLogin = () => {
//   cleanSession()
//   store.commit('tabs/setTabList', [])
//   router.replace('/login')
// }
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
    }
  }
</style>