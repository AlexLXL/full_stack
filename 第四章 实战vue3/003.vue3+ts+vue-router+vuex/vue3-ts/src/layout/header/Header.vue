<template>
  <div class="header">
    <Collapse></Collapse>
    <BreadCrum></BreadCrum>
  </div>
</template>
<script lang="ts" setup>
import Collapse from "@/layout/header/Collapse.vue"
import BreadCrum from "@/layout/header/BreadCrum.vue"
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    align-items: center;
  }
</style>