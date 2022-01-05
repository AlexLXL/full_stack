<template>
  <el-icon @click="handleCollapse">
    <Icon :icon="getCollapse ? 'Fold' : 'Expand'" />
  </el-icon>
</template>
<script lang="ts" setup>
  import {useStore} from "@/store";
  import {computed} from 'vue'

  let store = useStore()
  let getCollapse = computed(() => {
    return store.getters['getCollapse']
  })
  let handleCollapse = () => {
    store.commit('setCollapse', !getCollapse.value)
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