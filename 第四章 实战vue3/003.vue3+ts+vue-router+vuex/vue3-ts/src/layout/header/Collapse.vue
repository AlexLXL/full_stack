<template>
  <el-icon @click="handleCollapse">
    <Icon :icon="getCollapse ? 'Fold' : 'Expand'" />
  </el-icon>
</template>
<script lang="ts" setup>
  import {useStore} from "@/store";
import { get } from "http";
  import {computed} from 'vue'

  let store = useStore()
  let getCollapse = computed(() => {
    // return store.getters['getCollapse']
    return store.getters["menu/getCollapse"]
  })
  let handleCollapse = () => {
    // store.commit('setCollapse', !getCollapse.value)
    store.commit('menu/setCollapse', !getCollapse.value)
  }
</script>

<style lang="scss" scoped>
  .el-icon {
    font-size: 20px;
    cursor: pointer;
    color: #303123;
    margin-right: 15px;
  }
</style>