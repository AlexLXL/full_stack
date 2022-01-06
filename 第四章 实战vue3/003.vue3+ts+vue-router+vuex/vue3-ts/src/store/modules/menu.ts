//定义state
export type MenuState = {
  count: number,
  collapse: boolean,
}
export const state: MenuState = {
  count: 0,
  collapse: false,
}

//定义actions
export const actions = {}

//定义mutations
export const mutations = {
  setCount(state: MenuState, count: number) {
    state.count = count;
  },
  setCollapse: (state: MenuState, collapse: boolean) => {
    state.collapse = collapse;
  }
}

//定义getters
export const getters = {
  getCount(state: MenuState) {
    return state.count;
  },
  getCollapse: (state: MenuState) => {
    return state.collapse;
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}