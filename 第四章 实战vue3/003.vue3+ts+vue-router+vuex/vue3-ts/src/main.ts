import { createApp, createVNode } from 'vue'
import App from './App.vue'
import router from "./router"
import { store, key } from './store'
import ElementPlus from 'element-plus'
import * as Icons from '@element-plus/icons-vue'
// import 'element-plus/dist/index.css'

const Icon = (props: { icon: string }) => {
  const { icon } = props
  return createVNode(Icons[icon as keyof typeof Icons])
}

createApp(App)
  .use(router)
  .use(store, key)
  .use(ElementPlus)
  .component('Icon', Icon)
  .mount('#app')
