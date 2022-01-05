import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { ITab } from './type'

export interface State {
  count: number,
  collapse: boolean,
  tabList: ITab[]
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0,
    collapse: false,
    tabList: []
  },
  mutations: {
    setCount(state: State, v: number) {
      state.count = v
    },
    setCollapse(state: State, v: boolean) {
      state.collapse = v
    },
    addTabList(state: State, v: ITab) {
      if(state.tabList.some(item => item.path === v.path)) return
      state.tabList.push(v)
    },
    removeTabList(state: State, v: ITab) {
      state.tabList = state.tabList.filter(item => item.path !== v.path)
    },
    setTabList(state: State, v: ITab[]) {
      state.tabList = v
    }
  },
  getters: {
    getCount(state: State): number {
      return state.count
    },
    getCollapse(state: State): boolean {
      return state.collapse
    },
    getTabList(state: State): ITab[] {
      return state.tabList
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}