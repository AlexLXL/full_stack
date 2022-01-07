<template>
  <template v-for="menu in menuList" :key="menu.path">
    <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.path">
      <template #title>
        <el-icon>
<!--          <Icon :icon="menu.meta.icon2" />-->
        </el-icon>
        <span>{{menu.meta.title}}</span>
      </template>
      <MenuItem :menuList="menu.children"></MenuItem>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path">
      <el-icon>
<!--        <Icon :icon="menu.meta.icon2" />-->
      </el-icon>
      <template #title>{{menu.meta.title}}</template>
    </el-menu-item>
  </template>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MenuItem",
  props: ['menuList'],
  setup() {
    return {}
  },
});
</script>

<style lang="scss" scoped></style>