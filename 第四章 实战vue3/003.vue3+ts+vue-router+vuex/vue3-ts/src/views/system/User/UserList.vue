<template>
  <el-container :style="{ height: containerHeight + 'px' }">
    <el-aside width="200px" style="border-right: 1px solid #dfe6ec">
      <LeftTree></LeftTree>
    </el-aside>
    <el-main height>用户列表</el-main>
  </el-container>
</template>
<script setup lang="ts">
import LeftTree from './LeftTree.vue';
import {ref, onMounted} from 'vue'

const containerHeight = ref(0);
onMounted(() => {
  containerHeight.value = window.innerHeight - 100
})
</script>