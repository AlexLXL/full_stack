<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="tab in tabs">{{tab.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
  import { useRoute, RouteLocationMatched } from 'vue-router'
  import { ref, Ref, watch } from 'vue'

  let tabs: Ref<RouteLocationMatched[]> = ref([])
  let route = useRoute()
  let getBreadCrum = () => {
    let matched = route.matched.filter(item => item.meta && item.meta.title)
    if(matched && matched[0] && matched[0].path !== '/homepage') {
      matched = [{path: '/homepage', meta: {title: '首页'}} as any].concat(matched)
    }
    tabs.value = matched
  }
  getBreadCrum()

  watch(() => route.path, () => {
    getBreadCrum()
  })
</script>

<style lang="scss" scoped></style>