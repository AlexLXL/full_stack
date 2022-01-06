// import { InjectionKey } from 'vue'
// import { createStore, useStore as baseUseStore, Store } from 'vuex'
// import { ITab } from './type'

// export interface State {
//   count: number,
//   collapse: boolean,
//   tabList: ITab[]
// }

// export const key: InjectionKey<Store<State>> = Symbol()

// export const store = createStore<State>({
//   state: {
//     count: 0,
//     collapse: false,
//     tabList: []
//   },
//   mutations: {
//     setCount(state: State, v: number) {
//       state.count = v
//     },
//     setCollapse(state: State, v: boolean) {
//       state.collapse = v
//     },
//     addTabList(state: State, v: ITab) {
//       if(state.tabList.some(item => item.path === v.path)) return
//       state.tabList.push(v)
//     },
//     removeTabList(state: State, v: ITab) {
//       state.tabList = state.tabList.filter(item => item.path !== v.path)
//     },
//     setTabList(state: State, v: ITab[]) {
//       state.tabList = v
//     }
//   },
//   getters: {
//     getCount(state: State): number {
//       return state.count
//     },
//     getCollapse(state: State): boolean {
//       return state.collapse
//     },
//     getTabList(state: State): ITab[] {
//       return state.tabList
//     }
//   }
// })

// // 定义自己的 `useStore` 组合式函数
// export function useStore () {
//   return baseUseStore(key)
// }

// store.ts
import {InjectionKey} from 'vue'
import {createStore, useStore as baseUseStore, Store} from 'vuex'
import tabs, {TabState} from '../store/modules/tabs'
import menu, {MenuState} from '../store/modules/menu'
import {CommonStore} from './help'

//是一种规范
export type RootState = {
  tabs: TabState,
  menu: MenuState,
}
//导入所有的模块
export const modules = {
  tabs: tabs,
  menu: menu,
}
export const key: InjectionKey<Store<RootState>> = Symbol()

export const store = createStore<RootState>({
  modules
}) as CommonStore

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key) as CommonStore
}