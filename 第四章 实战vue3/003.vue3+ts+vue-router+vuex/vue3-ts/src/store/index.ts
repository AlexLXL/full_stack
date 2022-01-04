import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  count: number,
  collapse: boolean
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0,
    collapse: false
  },
  mutations: {
    setCount(state: State, v: number) {
      state.count = v
    },
    setCollapse(state: State, v: boolean) {
      state.collapse = v
    }
  },
  getters: {
    getCount(state: State): number {
      return state.count
    },
    getCollapse(state: State): boolean {
      return state.collapse
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}