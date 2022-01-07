import {RouteRecordRaw} from "vue-router";
import {ActionContext} from "vuex";
import {RootState} from "@/store";
import {getMenuListApi} from "@/services/menuService";
import Layout from '@/layout/index.vue'

const modules = import.meta.glob('../../views/**/*.vue')
/**
 * 获取全部组件, 返回值如下
 * {
 *   '../../views/system/user/UserList.vue': () => import("/src/views/system/user/UserList.vue")
 * }
 */

//定义state
export type MenuState = {
  count: number,
  collapse: boolean,
  menuList: any
}
export const state: MenuState = {
  count: 0,
  collapse: false,
  menuList: [
    {
      path: '/homepage',
      component: "Layout",
      meta: {
        title: "首页",
        icon: "HomeFilled",
        roles: ["sys:manage"]
      },
      children: []
    }
  ]
}

//定义actions
export const actions = {
  getMenuList({commit}: ActionContext<MenuState, RootState>, router: any) {
    return new Promise((resolve, reject) => {
      getMenuListApi().then(res => {
        let accessedRoutes;
        if (res.code == 200) {
          // 动态生成路由
          accessedRoutes = filterAsyncRoutes(res.data, router);
          // 设置到menuList
          commit('setMenuList', accessedRoutes)
        }
        resolve(accessedRoutes);
      }).catch(error => {
        reject(error)
      })
    })
  }

}

//定义mutations
export const mutations = {
  setCount(state: MenuState, count: number) {
    state.count = count;
  },
  setCollapse: (state: MenuState, collapse: boolean) => {
    state.collapse = collapse;
  },
  setMenuList: (state: MenuState, menuList: Array<RouteRecordRaw>) => {
    state.menuList = state.menuList.concat(menuList)
  }
}

//定义getters
export const getters = {
  getCount(state: MenuState) {
    return state.count;
  },
  getCollapse: (state: MenuState) => {
    return state.collapse;
  },
  getMenuList: (state: MenuState) => {
    return state.menuList
  }
}

export function filterAsyncRoutes(routes: RouteRecordRaw[], router: any) {
  const res: Array<RouteRecordRaw> = [];
  routes.forEach((route: any) => {
    const tmp = {...route}
    const {component} = tmp
    if (component) tmp.component = component === 'Layout' ? Layout : modules[`../../views${component}.vue`]
    //递归
    if (tmp.children) tmp.children = filterAsyncRoutes(tmp.children, router)
    router.addRoute(tmp)
    res.push(tmp)
  })
  return res;
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}