<template>
  <el-tabs
    v-model="activedTab"
    type="card"
    closable
    @tab-click="handleClick"
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.path"
      :label="item.name"
      :name="item.path"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
  import { store } from '@/store'
import { ITab } from '@/store/type'
  import {ref, computed, watch, onMounted} from 'vue'
  import {useRoute, useRouter} from 'vue-router'

  let route = useRoute()
  let router = useRouter()
  let activedTab = ref('')
  let tabList = computed(() => {
    // return store.getters['getTabList']
    return store.getters['tabs/getTabList']
  })
  const removeTab = (targetName: string) => {
    if(targetName === '/homepage') return
    const tabs = tabList.value
    let activeName  = activedTab.value
    if (activeName === targetName) {
      tabs.forEach((tab: ITab, index: number) => {
        if (tab.path === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) activeName = nextTab.path
        }
      })
    } 
    console.log(activeName)
    activedTab.value = activeName
    // store.commit('removeTabList', {path: targetName, name: ''})
    store.commit('tabs/removeTabList', {path: targetName, name: ''})
    router.push({path: activeName})
  }
  const addTab = () => {
    // store.commit('addTabList', {path: route.path, name: route.meta.title as string})
    if (['/login'].includes(route.path)) return
    store.commit('tabs/addTabList', {path: route.path, name: route.meta.title as string})
  }
  const setActivedTab = () => {
    activedTab.value = route.path
  }
  const handleClick = (tab: any) => {
    let {props} = tab
    router.push({path: props.name})
  }
  const refreshPage = () => {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('tabList', JSON.stringify(tabList.value))
    })
    let tabListSession = sessionStorage.getItem('tabList')
    if(tabListSession) {
      let oldTabList = JSON.parse(tabListSession);
      // oldTabList && store.commit('setTabList', oldTabList)
      oldTabList && store.commit('tabs/setTabList', oldTabList)
    }
  }

  onMounted(() => {
    setActivedTab()
    refreshPage()
  })
  watch(() => route.path, () => {
    addTab()
    setActivedTab()
  })
</script>

<style lang="scss" scoped>
 :deep(.e1-tabsheader) {
   margin: 0
 }
 :deep(.el-tabs__item) {
   height: 26px !important;
   line-height: 26px !important;
   color: #495060;
   font-size: 12px !important;
   text-align: center;
   padding: 0 10px !important;
   border: 1px solid #d8dce5 !important;
   margin: 0 0 !important;
 }
 :deep(.el-tabs_nav) {
   border: none !important;
 }
 :deep(.is-active) {
   color: #fff !important;
   border: 1px solid #42b983 !important;
   border-bottom: 1px solid transparent !important;
   background-color: #42b983 !important;
 }
 :deep(.el-tabs_item:hover) {
   color: #495060 !important;
 }
  :deep(.is-active:hover) {
   color: #fff !important;
 }
</style>