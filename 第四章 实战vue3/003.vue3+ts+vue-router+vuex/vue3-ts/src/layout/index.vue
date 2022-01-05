<template>
  <el-container class="layout">
    <el-aside class="aside">
      <MenuBar></MenuBar>
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header></Header>
      </el-header>
      <el-main class="main">
        <Tabs></Tabs>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>

      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import MenuBar from "@/layout/menu/MenuBar.vue"
import Header from "@/layout/header/Header.vue"
import Main from "@/layout/main/Main.vue"
import Tabs from "@/layout/tab/Tabs.vue"

export default {
  name: "index",

  components: {
    MenuBar,
    Header,
    Main,
    Tabs
  }
}
</script>

<style lang="scss" scoped>
  .layout {
    height: 100%;
    .aside {
      width: auto;
      background-color: rgb(48, 65, 86);
    }
    .header {
      height: 50px;
      border-bottom: 1px solid #e5e5e5;
    }
    .main {
      padding-top: 0;
    }
  }
</style>