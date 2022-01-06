import { ITab } from '../type'

//定义state
export type TabState = {
  tabList: ITab[]
}
export const state: TabState = {
  tabList: []
}

//定义actions
export const actions = {}

//定义mutations
export const mutations = {
  addTabList(state: TabState, v: ITab) {
    if(state.tabList.some(item => item.path === v.path)) return
    state.tabList.push(v)
  },
  removeTabList(state: TabState, v: ITab) {
    state.tabList = state.tabList.filter(item => item.path !== v.path)
  },
  setTabList(state: TabState, v: ITab[]) {
    state.tabList = v
  }
}

//定义getters
export const getters = {
  getTabList(state: TabState): ITab[] {
    return state.tabList
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
