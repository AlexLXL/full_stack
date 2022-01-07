import {createApp, createVNode} from 'vue'
import App from './App.vue'
import router from "./router"
import {store, key} from './store'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
import {cleanSession, getToken} from "@/utils/auth";
// import 'element-plus/dist/index.css'

const Icon = (props: { icon: string }) => {
  const {icon} = props
  return createVNode(Icons[icon as keyof typeof Icons])
}

createApp(App)
  .use(router)
  .use(store, key)
  .use(ElementPlus)
  .component('Icon', Icon)
  .mount('#app')


//权限验证处理:全集守卫路由实现
//白名单
const whiteList = ['/login'];
router.beforeEach(async (to, from, next) => {
  let token = getToken();
  if (token) {
    if (['/'].includes(to.path)) {
      next({path: '/'})
    } else {
      let hasRoles = store.state.user.permissions && store.state.user.permissions.length
      if (hasRoles) {
        next()
      } else {
        try {
          //vuex中不存在权限，从服务器获取
          await store.dispatch('user/getUserInfo')
          //获取菜单、动态生成路由
          await store.dispatch('menu/getMenuList', router)
          //确保动态添加的路由已经被完全加载上去
          next({...to, replace: true})
        } catch (error) {
          //重置token
          cleanSession();
          //跳到登录
          next({path: '/login'})
        }
      }
    }
  } else {
    whiteList.includes(to.path) ? next() : next({path: '/login'})
  }
})