---
title: vite+vue3+ts+vue-router4+vuex4+element-plus+echart5实战
date: 2022-01-12 12:02:56
categories:
- [Vue3, TypeScript, Vite]  
tags:
- Vue3
- TypeScript
- Vite
---

### 第01讲 前置知识

> vue3.2 + ts + vue-router4.x + vuex4.x + vite2.x 后台管理系统.  
> element plus、EChart  依赖
>
> 项目展示: http://120.79.201.10:9001/
> 视频参考: https://ke.qq.com/course/4124130  
> 样式参考: https://github.com/wmy19940613/vue-element-admin-master  
> 样式参考：https://github.com/PanJiaChen/vue-admin-template
> 项目参考: https://juejin.cn/post/7042497481543778334
> 项目参考: https://github.com/RainManGO/vue3-composition-admin
> 项目参考: https://github.com/biaochenxuying/blog-vue-typescript (博客)

### 第02讲 创建项目

1.初始化项目

```
npm init vite@latest
npm i
npm run dev
```

这种方式生成的脚手架需要取消vue-tsc这个插件, 该插件只支持vscode

package.json

```
+ "build2": "vite build",
```

2.解决: `npm run dev` 后终端输出 `Network: use '--host' to expose`

vite.config.js

```
+ server: {
+     host: '0.0.0.0',
+     port: 8080,
+     open: true
+ }
```

3.添加别名

vite.config.js

```
+import {resolve} from "path";

export default defineConfig({
+    resolve: {
+        alias: {
+            '@': resolve(__dirname, 'src')
+        }
+    },
})
```

tsconfig.js

ts文件使用别名的时候按下面规则寻址

```
+ "baseUrl": "./",
+ "paths": {
+   "@": ["src"],
+   "@/*": ["src/*"]
+ }
```

会提示依赖@types/node, `npm install @types/node -D`安装一下

### 第03讲 安装vue-router

1.安装路由

```
npm install vue-router@4
```

src/router/index.ts

```
+ import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
+ import Home from '@/components/HelloWorld.vue'
+ 
+ const routes: Array<RouteRecordRaw> = [
+   {
+     path: '/',
+     name: 'Home',
+     component: Home
+   }
+ ]
+ 
+ const router = createRouter({
+   history: createWebHistory(),
+   routes
+ })
+ 
+ export default router
```

App.vue

```
+ <template>
+   <router-view></router-view>
+ </template>
```

main.ts

```
+ import router from "./router";

+ createApp(App).use(router).mount('#app')
```

### 第04讲 安装vuex(支持typescript)

```
npm install vuex@next -S
```

src/store/index.ts

```
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  count: number
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0
  },
  mutations: {
    setCount(state: State, v: number) {
      state.count = v
    }
  },
  getters: {
    getCount(state: State): number {
      return state.count
    }
  }
})

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}
```

src/components/HelloWorld.vue

```
<template>
+  <h2>{{showCount}}</h2>
+  <button @click="addBtn">+</button>
</template>

<script lang="ts">
  import { ref, computed, defineComponent } from 'vue'
  import { useStore } from 'vuex'
  import { key } from '@/store'

  export default defineComponent({
+    setup() {
+      const store = useStore(key)
+      const count = ref(0)
+      const showCount = computed(() => {
+        return store.getters.getCount
+      })
+      const addBtn = () => {
+        store.commit('setCount', ++count.value)
+      }
+      return {
+        showCount,
+        addBtn
+      }
+    }
  });
</script>
```

### 第05讲 安装eslint、sass

1.安装eslint

更完整安装eslint也可以参考 `打包Vite的笔记`

```
npm install eslint eslint-plugin-vue
```

.eslintrc.js

```
module.exports = {
  // 默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。
  // ESLint一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  root: true,
  parserOptions: {
    // 代码是 ECMAScript 模块
    sourceType: 'module',
    // 对Babel解析器的包装使其与 ESLint 兼容。
    // parser: 'babel-eslint'
  },
  env: {
     // 预定义的全局变量，这里是浏览器环境
    browser: true,
    node: true,
    es6: true,
  },
  // 扩展风格
  extends: [
      'plugin:vue/vue3-essential',
      'plugin:vue/vue3-strongly-recommended',
      'plugin:vue/vue3-recommended'
  ],
  // 规则的细节请到ESLint官方网站查看https://eslint.org/docs/rules/
  rules: {
    // 禁用 console
    'no-console': 'off',
    // 禁止使用拖尾逗号
    'comma-dangle': [2, 'never']
  }
}
```

2.安装sass

```
npm install sass sass-loader -D
```

src/components/HelloWorld.vue

```
<style scoped lang="scss">
$color: green;
h2 {
  color: $color;
}
</style>
```

### 第06讲 引入element plus

1.安装依赖

```
npm install element-plus --save
```

main.ts

```
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
+ import ElementPlus from 'element-plus'
+ import 'element-plus/dist/index.css'

const app = createApp(App)
+ app.use(ElementPlus)
app.mount('#app')
```

src/components/HelloWorld.vue

```
<el-row>
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>
```

2.打包报错的话添加配置

tsconfig.js

```
"skipLibCheck": true, // 解决打包时候的报错, 忽略*.d.ts的声明文件
```

### 第07讲 项目主页面布局

public/init.scss（初始化样式）

```
html, body, div, h1, h2, h3, h4, h5, h6, p, dl, dt, dd, ol, ul, li, fieldset, form, label, input, legend, table, caption, tbody, tfoot, thead, tr, th, td, textarea, article, aside, audio, canvas, figure, footer, header, mark, menu, nav, section, time, video { margin: 0; padding: 0; }
h1, h2, h3, h4, h5, h6 { font-size: 100%; font-weight: normal }
article, aside, dialog, figure, footer, header, hgroup, nav, section, blockquote { display: block; }
ul, ol { list-style: none; }
img { border: 0 none; vertical-align: top; }
blockquote, q { quotes: none; }
blockquote:before, blockquote:after, q:before, q:after { content: none; }
table { border-collapse: collapse; border-spacing: 0; }
strong, em, i { font-style: normal; font-weight: normal; }
ins { text-decoration: underline; }
del { text-decoration: line-through; }
mark { background: none; }
input::-ms-clear { display: none !important; }
body { font: 12px/1.5 \5FAE\8F6F\96C5\9ED1, \5B8B\4F53, "Hiragino Sans GB", STHeiti, "WenQuanYi Micro Hei", "Droid Sans Fallback", SimSun, sans-serif; background: #fff; }
a { text-decoration: none; color: #333; }
a:hover { text-decoration: underline; }
```

src/App.vue

```
+ <style lang="scss">
+   @import "../public/css/init.scss";
+   html, body, #app {
+     height: 100%;
+   }
+ </style>
```

src/layout/index.vue（基础布局）

```
<template>
  <el-container class="layout">
    <el-aside width="200px" class="aside">Aside</el-aside>
    <el-container>
      <el-header class="header">Header</el-header>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
export default {
  name: "index"
}
</script>

<style lang="scss" scoped>
  .layout {
    height: 100%;
    .aside {
      background-color: aquamarine;
    }
    .header {
      background-color: blueviolet;
    }
    .main {
      background-color: darkgray;
    }
  }
</style>
```

src/router/index.ts（修改默认路由为layout）

```
+ import Home from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
+  {
+    path: '/',
+    name: 'Home',
+    component: Home
+  }
]
```

### 第08讲 左侧导航菜单制作讲解1

前置知识: 引入组件方式

```
// 全局注册 main.js
import { createApp } from 'vue';
import ComA from './components/ComA.vue';
import App from './App.vue';
const app = createApp(App);
app.component('com-a', ComA);
app.mount('#app');
 
至此可以在任意地方使用<com-a>组件
 
// 局部注册
import {defineComponent} from 'vue';
import ComA from './components/ComA.vue';
export default defineComponent({
    name: 'App',
    components: {
        ComA
    },
    setup() {
        return {};
    }
});

======================注册异步组件==================

// defineAsyncComponent
import {defineComponent, defineAsyncComponent} from 'vue';
export default defineComponent({
    name: 'App',
    components: {
        ComA: defineAsyncComponent(() => import('./components/ComA.vue'));
    },
    setup() {
        return {};
    }
});

======================vue3.2语法糖===================

在vue3.2 setup语法糖里，直接引入来用就好，不用注册

```

src/layout/menu/MenuBar.vue

```
<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <location/>
        </el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3" disabled>
      <el-icon>
        <document/>
      </el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon>
        <setting/>
      </el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>
<script lang="ts">
import {ref, computed, defineComponent} from 'vue'
import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'

export default defineComponent({
  name: "Aside",
  setup() {
    const isCollapse = ref(false)
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    return {
      isCollapse,
      handleOpen,
      handleClose
    }
  },
  components: {
    Location,
    Document,
    IconMenu,
    Setting
  }
});
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
```

src/layout/header/Header.vue

```
<template>
  <div>header区域</div>
</template>
<script lang="ts">
export default {
  name: "Header"
}
</script>
<style lang="scss" scoped></style>
```

src/layout/main/Main.vue

```
<template>
  <div>Main区域</div>
</template>
<script lang="ts">
export default {
  name: "Main"
}
</script>
<style lang="scss" scoped></style>
```

src/layout/index.vue

```
<template>
  <el-container class="layout">
    <el-aside width="200px" class="aside">
+      <MenuBar></MenuBar>
    </el-aside>
    <el-container>
      <el-header class="header">
+        <Header></Header>
      </el-header>
      <el-main class="main">
+        <Main></Main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
+ import MenuBar from "@/layout/menu/MenuBar.vue"
+ import Header from "@/layout/header/Header.vue"
+ import Main from "@/layout/main/Main.vue"

export default {
  name: "index",

+  components: {
+    MenuBar,
+    Header,
+    Main
+  }
}
</script>
```

### 第09讲 左侧导航菜单制作讲解2（完善）

1.抽离el-sub-menu、el-menu-item 为MenuItem

src/layout/MenuItem  
利用递归组件,生成菜单

```
<template>
  <template v-for="menu in menuList" :key="menu.path">
    <el-sub-menu v-if="menu.children && menu.children.length" :index="menu.path">
      <template #title>
        <el-icon>
          <Icon :icon="menu.meta.icon2" />
        </el-icon>
        <span>{{menu.meta.title}}</span>
      </template>
      <MenuItem :menuList="menu.children"></MenuItem>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path">
      <el-icon>
        <Icon :icon="menu.meta.icon2" />
      </el-icon>
      <template #title>{{menu.meta.title}}</template>
    </el-menu-item>
  </template>
</template>
<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
  name: "MenuItem",
  props: ['menuList'],
  setup() {
    return {}
  },
});
</script>

<style lang="scss" scoped></style>
```

2.父组件传值

src/menu/MenuBar

```

<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#304156"
      @open="handleOpen"
      @close="handleClose"
  >
+    <MenuItem :menuList="menuList"></MenuItem>
  </el-menu>
</template>

<script lang="ts">
+ import MenuItem from "@/layout/menu/MenuItem.vue";

+ export default defineComponent({
+   name: "MenuBar",
+   setup(prop) {
+     let menuList = reactive([
+       {
+         path: '/dashboard',
+         component: 'Layout',
+         meta: {
+           title: '首页',
+           icon: 'el-icon-s-home',
+           icon2: 'HomeFilled',
+           roles: ['sys:manage']
+         },
+         children: []
+       },
+       {
+         path: '/system',
+         component: 'Layout',
+         alwaysShow: true,
+         name: 'system',
+         meta: {
+           title: '系统管理',
+           icon: 'el-icon-menu',
+           icon2: 'Menu',
+           roles: ['sys:manage'],
+           parentId: 0
+         },
+         children: [
+           {
+             path: '/department',
+             component: '/system/department/department',
+             alwaysShow: false,
+             name: 'department',
+             meta: {
+               title: '机构管理',
+               icon: 'el-icon-document',
+               icon2: 'Document',
+               roles: ['sys:dept'],
+               parentId: 17
+             },
+           },
+           {
+             path: '/userList',
+             component: '/system/User/UserList',
+             alwaysShow: false,
+             name: 'userList',
+             meta: {
+               title: '用户管理',
+               icon: 'el-icon-s-custom',
+               icon2: 'UserFilled',
+               roles: ['sys:user'],
+               parentId: 17
+             }
+           },
+           {
+             path: '/roleList',
+             component: '/system/Role/RoleList',
+             alwaysShow: false,
+             name: 'roleList',
+             meta: {
+               title: '角色管理',
+               icon: 'el-icon-s-tools',
+               icon2: 'Tools',
+               roles: ['sys:role'],
+               parentId: 17
+             },
+           },
+           {
+             path: '/menuList',
+             component: '/system/Menu/MenuList',
+             alwaysShow: false,
+             name: 'menuList',
+             meta: {
+               title: '权限管理',
+               icon: 'el-icon-document',
+               icon2: 'Document',
+               roles: ['sys:menu'],
+               parentId: 17
+             },
+           }
+         ]
+       },
+       {
+         path: '/goods',
+         component: 'Layout',
+         alwaysShow: true,
+         name: 'goods',
+         meta: {
+           title: '商品管理',
+           icon: 'el-icon-document',
+           icon2: 'Document',
+           roles: ['sys:goods'],
+           parentId: 0,
+         },
+         children: [
+           {
+             path: '/goodcategory',
+             component: 'goods/goodsCategory/goodscategoryList',
+             alwaysShow: false,
+             name: 'goodcategory',
+             meta: {
+               title: '商品分类',
+               icon: 'el-icon-document',
+               icon2: 'Document',
+               roles: ['sys:goodsCategory'],
+               parentId: 34
+             },
+           }
+         ]
+       },
+       {
+         path: '/systenconfig',
+         component: 'Layout',
+         alwaysShow: true,
+         name: 'systenconfig',
+         meta: {
+           title: '系统工具',
+           icon: 'el-icon-document',
+           icon2: 'Document',
+           roles: ['sys:systenconfig'],
+           parentId: 0,
+         },
+         children: [
+           {
+             path: '/document',
+             component: '/system/config/systemDocument',
+             alwaysShow: false,
+             name: 'https://42.193.158.170：8089/swagger-ui/index.html',
+             meta: {
+               title: '接口文档',
+               icon: 'el-icon-document',
+               icon2: 'Document',
+               roles: ['sys:document'],
+               parentId: 42
+             },
+           }
+         ]
+       },
+     ])
+     return {
+       menuList
+     }
+   },
+   components: {
+     MenuItem
+   }
+ });
</script>
```

3.添加样式

src/layout/index.vue

```
.aside {
  background-color: rgb(48, 65, 86);
}
.header {
  height: 50px;
  border-bottom: 1px solid #e5e5e5;
}
```

src/layout/menu/MenuBar.vue

```
<el-menu
  default-active="2"
  class="el-menu-vertical-demo"
  :collapse="isCollapse"
+  background-color="#304156"
  @open="handleOpen"
  @close="handleClose"
>


<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
}
.el-menu--collapse {
  border-right: none;
}
::v-deep .el-sub-menu .el-sub-menu__title {
  color: #ffffff !important;
}
::v-deep .el-menu-item {
  color: #ffffff;
}
::v-deep .el-menu .el-menu-item {
  color: #bfcbd9;
}
::v-deep .el-menu-item.is-active {
  color:  #4093ff !important;
}
::v-deep .is-opened .el-menu-item {
  background-color: #1f2d3d !important;
}
::v-deep .el-menu-item:hover {
  background-color: #001528 !important;
}
</style>
```

知识点:

4.element plus 更新后动态icon的使用

https://blog.csdn.net/pdd11997110103/article/details/121440220

```
需要使用  
<component class="xxx" :is="iconName"></component>

或  

自己一个组件, 动态注册需要的icon, 通过prop传据图icon名称
```

5.::v-deep、>>>、/deep/

https://www.jianshu.com/p/72a9e0dfdfb4

作用就是样式穿透子组件

### 第10讲 菜单路由

1.src/router/index.ts（添加路由）

```
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    redirect: '/homepage',
    children: [
      {
        path: '/homepage',
        component: () => import('@/layout/homepage/Index.vue'),
        name: 'homepage',
        meta: {
          title: '首页',
          icon: '#icondashboard'
        }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    name: 'system',
    meta: {
      title: '系统管理',
      icon: 'el-icon-menu',
      roles: ['sys:manage'],
      parentId: 0
    },
    children: [
      {
        path: '/department',
        component: () => import('@/views/system/department/Department.vue'),
        name: 'department',
        meta: {
          title: '机构管理',
          icon: 'el-icon-document',
          roles: ['sys:dept']
        }
      },
      {
        path: '/userList',
        component: () => import('@/views/system/user/UserList.vue'),
        name: 'userList',
        meta: {
          title: '用户管理',
          icon: 'el-icon-s-custom',
          roles: ['sys:user']
        }
      },
      {
        path: '/roleList',
        component: () => import('@/views/system/role/RoleList.vue'),
        name: 'roleList',
        meta: {
          title: '角色管理',
          icon: 'el-icon-s-tools',
          roles: ['sys:role']
        }
      },
      {
        path: '/menuList',
        component: () => import('@/views/system/menu/MenuList.vue'),
        name: 'menuList',
        meta: {
          title: '权限管理',
          icon: 'el-icon-document',
          roles: ['sys:menu']
        }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    name: 'goods',
    meta: {
      title: '商品管理',
      icon: 'el-icon-document',
      roles: ['sys:goods']
    },
    children: [
      {
        path: '/goodCategory',
        component: () => import('@/views/goods/goodCategory/goodCategoryList.vue'),
        name: 'goodCategory',
        meta: {
          title: '商品分类',
          icon: 'el-icon-document',
          roles: ['sys:goodCategory']
        }
      }
    ]
  },
  {
    path: '/systemConfig',
    component: Layout,
    name: 'systemConfig',
    meta: {
      title: '系统工具',
      icon: 'el-icon-document',
      roles: ['sys:systemConfig']
    },
    children: [
      {
        path: '/document',
        component: () => import('@/views/system/config/systemConfig.vue'),
        name: 'https://42.193.158.170：8089/swagger-ui/index.html',
        meta: {
          title: '接口文档',
          icon: 'el-icon-document',
          roles: ['sys:document']
        }
      }
    ]
  },
]
```

2.新建路由里的各个页面

```
<template>
  接口文档展示
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped></style>
```

3.启用element plus的menu的路由模式

src/layout/menu/MenuBar.vue

```
<el-menu
  default-active="2"
  class="el-menu-vertical-demo"
  :collapse="isCollapse"
  background-color="#304156"
+  :router="true"
  @open="handleOpen"
  @close="handleClose"
>
<MenuItem :menuList="menuList"></MenuItem>
</el-menu>
```

4.F5刷新页面的时候保持路由

src/layout/menu/MenuBar.vue

```
<template>
    <el-menu
+     :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="#304156"
      :router="true"
      @open="handleOpen"
      @close="handleClose"
    >
    <MenuItem :menuList="menuList"></MenuItem>
    </el-menu>
</template>

<srcipt lang="ts">
import {useRoute} from "vue-router";
import {computed} from 'vue'

export default defineComponent({
    setup() {
        let {path} = useRoute()
        let activeIndex = computed(() => {
          return path
        })
        return {
            activeIndex
        }
    }
})
</srcipt>
```

### 第11讲 菜单的收缩和展开

1.添加折叠图标组件

src/layout/header/Collapse.vue

```
<template>
  <el-icon @click="handleCollapse">
    <Icon :icon="getCollapse ? 'Fold' : 'Expand'" />
  </el-icon>
</template>
<script lang="ts" setup>
  import {useStore} from "@/store";
  import {computed} from 'vue'

  let store = useStore()
  let getCollapse = computed(() => {
    return store.getters['getCollapse']
  })
  let handleCollapse = () => {
    store.commit('setCollapse', !getCollapse.value)
  }
</script>

<style lang="scss" scoped>
  .el-icon {
    font-size: 20px;
    cursor: pointer;
    color: #303123;
  }
</style>
```

2.定义vuex变量

src/store/index.ts

```
export interface State {
  count: number,
+  collapse: boolean
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0,
+    collapse: false
  },
  mutations: {
    setCount(state: State, v: number) {
      state.count = v
    },
+    setCollapse(state: State, v: boolean) {
+      state.collapse = v
+    }
  },
  getters: {
    getCount(state: State): number {
      return state.count
    },
+    getCollapse(state: State): boolean {
+      return state.collapse
+    }
  }
})
```

3.菜单栏使用vuex的变量

src/layout/menu/MenuBar.vue

```
<el-menu
  :default-active="activeIndex"
  class="el-menu-vertical-demo"
+  :collapse="isCollapse"
  background-color="#304156"
  :router="true"
  @open="handleOpen"
  @close="handleClose"
>

=====================================================

import {computed} from 'vue'
import {useStore} from "@/store";

let store = useStore()
let isCollapse = computed(() => {
  return store.getters['getCollapse']
})
```

### 第12讲 面包屑导航

1.添加面包屑组件，样式，引入

src/layout/header/BreadCrumb.vue

用到了断言和泛型

```
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="tab in tabs">{{tab.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
  import { useRoute, RouteLocationMatched, onBeforeRouteUpdate } from 'vue-router'
  import { ref, Ref, watch } from 'vue'

  let tabs: Ref<RouteLocationMatched[]> = ref([])
  let route = useRoute()
  let getBreadCrum = () => {
    let matched = route.matched.filter(item => item.meta && item.meta.title)
    if(matched[0].path !== '/homepage') {
      matched = [{path: '/homepage', meta: {title: '首页'}} as any].concat(matched)
    }
    tabs.value = matched
  }
  getBreadCrum()

  watch(() => route.path, () => {
    getBreadCrum()
  })
</script>

<style lang="scss" scoped></style>
```

src/layout/header/Header.vue

```
<template>
  <div class="header">
    <Collapse></Collapse>
+    <BreadCrum></BreadCrum>
  </div>
</template>
<script lang="ts" setup>
import Collapse from "@/layout/header/Collapse.vue"
+ import BreadCrum from "@/layout/header/BreadCrum.vue"
</script>
```

3.知识点

3.1 指定ref类型

```
import {ref} from 'vue'
let a: Ref<string[]> = ref(['a', 'b'])
```

3.2 尝试使用路由守卫代替监听路由

问题1: vue3.2的setup语法糖导致无法设置beforeRouteEnter, 因为setup是替代created生命周期的

问题2: onBeforeRouteUpdate能监听子路由变化，但无法监听同级别路由变化

### 第13讲 Tab选项卡

1.添加组件src/layout/tab/Tabs.vue、添加样式、引用

src/layout/tab/Tabs.vue

使用了vuex存储tabList

```
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
    return store.getters['getTabList']
  })
  const removeTab = (targetName: string) => {
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
    store.commit('removeTabList', {path: targetName, name: ''})
    router.push({path: activeName})
  }
  const addTab = () => {
    store.commit('addTabList', {path: route.path, name: route.meta.title as string})
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
      let oldTabList = JSON.parse(tabListSession)
      oldTabList && store.commit('setTabList', oldTabList)
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
   margin: 0 3px !important;
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
```

src/layout/index.vue（引入tab）

```
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
+        <Tabs></Tabs>
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
+ import Tabs from "@/layout/tab/Tabs.vue"

export default {
  components: {
+    Tabs
  }
}
</script>
```

2.数据和事件
- 使用vuex存储tabs（添加interface类型）
- 通过监听路由来添加tabs激活tab（看第一点）
- 删除就直接用事件、点击tab跳转路由（看第一点）

src/store/index.ts

```
export interface State {
  count: number,
  collapse: boolean,
+  tabList: ITab[]
}

export const store = createStore<State>({
  state: {
    count: 0,
    collapse: false,
+    tabList: []
  },
  mutations: {
+    addTabList(state: State, v: ITab) {
+      if(state.tabList.some(item => item.path === v.path)) return
+      state.tabList.push(v)
+    },
+    removeTabList(state: State, v: ITab) {
+      state.tabList = state.tabList.filter(item => item.path !== v.path)
+    },
+    setTabList(state: State, v: ITab[]) {
+      state.tabList = v
+    }
  },
  getters: {
+    getTabList(state: State): ITab[] {
+      return state.tabList
+    }
  }
})
```

src/store/type/index.ts

```
export interface ITab {
  path: string,
  name: string
}
```

3.F5刷新保留激活tab（F5刷新存在sessionStorage里）

技术点:
- onMounted
- window.addEventListener("beforeunload")
- sessionStorage.setItem('tabList', JSON.stringify(xxx))
- sessionStorage.getItem('tabList')
- JSON.parse()

src/layout/tab/index.vue

```
const refreshPage = () => {
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('tabList', JSON.stringify(tabList.value))
    })
    let tabListSession = sessionStorage.getItem('tabList')
    if(tabListSession) {
        let oldTabList = JSON.parse(tabListSession)
        oldTabList && store.commit('setTabList', oldTabList)
    }
}

onMounted(() => {
    setActivedTab()
    refreshPage()
})
```

### 第14讲 TypeScript

接下来章节需要有TS的: interface/type(keyof、typeof)/泛型(泛型约束)/
交叉类型、联合类型/Omit/Pick/Parameters/ReturnType基础

### 第15讲 Vuex4+TypeScript实现类型推测1

- 目的: 调用dispatch/commit/getters的时候有代码提示
- 过程: 改为只用modules + 命名空间namespaced的方式
- 结果: 还是只能在vscode有提示，webstorm不支持
- 附录: 单文件（不分modules）想要代码提示可看`002.资料的ts-test`

src/store/modules/tabs.ts（抽取）

```
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

```

src/store/modules/menu.ts（抽取）

```
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
```

src/store/index.ts（使用modules+namespaced的方式）

```
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
```

src/store/help.ts（添加代码提示）

```
import {CommitOptions, DispatchOptions, Store as VuexStore} from 'vuex'
import {modules, RootState} from './index'

//获取modules的类型
type Modules = typeof modules
//获取所有模块下的mutations
type GetMutation<T> = T extends { mutations: infer G } ? G : never;
type GetMutations<T> = {
  [K in keyof T]: GetMutation<T[K]>
}
type mutationsObj = GetMutations<Modules>
//获取所有模块下的actions
type GetAction<T> = T extends { actions: infer G } ? G : never;
type GetActions<T> = {
  [K in keyof T]: GetAction<T[K]>
}
type actionsObj = GetActions<Modules>
//获取所有模块下的getters
type GetGetter<T> = T extends { getters: infer G } ? G : never;
type GetGetters<T> = {
  [K in keyof T]: GetGetter<T[K]>
}
type gettersObj = GetGetters<Modules>

//  tabs/addTabe  menu/setCount
type AddPrefix<prefix, keys> = `${prefix & string}/${keys & string}`
type Getkey<T, K> = AddPrefix<K, keyof T>;
type Getkeys<T> = {
  [K in keyof T]: Getkey<T[K], K>
}[keyof T]

// type ss = Getkeys<mutationsObj>

//获取当前模块下每个函数的返回值
type GetFunc<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]];
type GetMethod<T> = {
  [K in Getkeys<T>]: K extends `${infer A}/${infer B}` ? GetFunc<T, A, B> : unknown
}

type GetMutationsFunc = GetMethod<mutationsObj>;
type GetActionsFunc = GetMethod<actionsObj>;
type GetGettersFunc = GetMethod<gettersObj>;

export type CommonStore = Omit<VuexStore<RootState>, 'commit' | 'getters' | 'dispatch'>
  &
  {
    commit<K extends keyof GetMutationsFunc, P extends Parameters<GetMutationsFunc[K]>[1]>(
      key: K,
      payload?: P,
      options?: CommitOptions
    ): ReturnType<GetMutationsFunc[K]>
  }
  &
  {
    getters: {
      [K in keyof GetGettersFunc]: ReturnType<GetGettersFunc[K]>
    }
  }
  &
  {
    dispatch<K extends keyof GetActionsFunc>(
      key: K,
      payload?: Parameters<GetActionsFunc[K]>[1],
      options?: DispatchOptions
    ): ReturnType<GetActionsFunc[K]>
  }
```

### 第16讲 axios的安装与使用

1.安装axios和qs

```
npm install axios
npm install --save @types/qs
npm i qs -S
```

2.src/http/ajax.ts

```
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {ElMessage} from "element-plus";
import {getToken} from "@/utils/auth";
import qs from 'qs'

export interface Result<T = any> {
  code: number;
  msg: string;
  data: T;
}

enum StatusCode {
  NoAuth = 600, //token失效
  Success = 200 //返回成功
}

class Request {
  private axiosInstance: AxiosInstance;
  private defaultConfig: AxiosRequestConfig = {
    headers: {'Content-Type': 'application/json'}
  };

  constructor(config: AxiosRequestConfig) {
    // 创建axios实例
    this.axiosInstance = axios.create(config)
    // axios默认配置
    this.defaults()
    // axios拦截器
    this.interceptors()
  }

  private defaults() {
    this.axiosInstance.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
    this.axiosInstance.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest'
    // this.axiosInstance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    this.axiosInstance.defaults.responseType = 'json'
    this.axiosInstance.defaults.transformRequest = [
      (params) => qs.stringify(params, {indices: false})
    ]
  }

  //axios拦截器
  private interceptors() {
    // 请求发送之前拦截
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      //这里可以设置头部token携带到后端进行token的验证
      let token = getToken() || '';
      if (token) config.headers!.token = token
      return config
    }, (error) => {
      // 错误抛到业务代码
      error.data = {}
      error.data.msg = '服务器异常，请联系管理员！'
      return error
    })

    /**
     * 请求返回之后拦截
     * res的类型是AxiosResponse<any>
     */
    this.axiosInstance.interceptors.response.use((res: AxiosResponse) => {
      if (res && res.data) {
        const data = res.data as any;
        if (data.code == StatusCode.NoAuth) {
          //清空sessionStorage数据
          sessionStorage.clear();
          //跳到登录
          window.location.href = "/login";
          // return res;
        } else if (data.code == StatusCode.Success || res.config.responseType === "arraybuffer") {
          return res;
        } else {
          ElMessage.error(data.msg || '服务器出错!')
          return res || null // 返回数据
        }
      }

    }, (error) => { // 这里是遇到报错的回调
      console.log('进入错误')
      error.data = {};
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.data.msg = '错误请求';
            ElMessage.error(error.data.msg)
            break
          case 401:
            error.data.msg = '未授权，请重新登录';
            ElMessage.error(error.data.msg)
            break
          case 403:
            error.data.msg = '拒绝访问';
            ElMessage.error(error.data.msg)
            break
          case 404:
            error.data.msg = '请求错误,未找到该资源';
            ElMessage.error(error.data.msg)
            break
          case 405:
            error.data.msg = '请求方法未允许';
            ElMessage.error(error.data.msg)
            break
          case 408:
            error.data.msg = '请求超时';
            ElMessage.error(error.data.msg)
            break
          case 500:
            error.data.msg = '服务器端出错';
            ElMessage.error(error.data.msg)
            break
          case 501:
            error.data.msg = '网络未实现';
            ElMessage.error(error.data.msg)
            break
          case 502:
            error.data.msg = '网络错误';
            ElMessage.error(error.data.msg)
            break
          case 503:
            error.data.msg = '服务不可用';
            ElMessage.error(error.data.msg)
            break
          case 504:
            error.data.msg = '网络超时';
            ElMessage.error(error.data.msg)
            break
          case 505:
            error.data.msg = 'http版本不支持该请求';
            ElMessage.error(error.data.msg)
            break
          default:
            error.data.msg = `连接错误${error.response.status}`;
            ElMessage.error(error.data.msg)
        }
      } else {
        error.data.msg = "连接到服务器失败";
        ElMessage.error(error.data.msg)
      }
      return error
    })
  }

  /**
   * http://localhost:8089/api/user/getUserById?userId=10
   * @param url   /api/user/getUserById
   * @param params  {userId:10}
   * @returns
   */
  get<T = any>(url: string, params?: any): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.get<T>(url, params).then((res) => {
        resolve(res.data as any)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  /**
   * http://localhost:8089/api/user/getUserById/10
   * @param url   /api/user/getUserById
   * @param params  {userId:10}
   * @returns
   */
  getRestApi<T = any>(url: string, params?: any): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.get<T>(this.getParams(params) ? `${url}/${this.getParams(params)}` : url)
        .then((res) => {
          resolve(res.data as any)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  getParams(params: any): string {
    let _params = "";
    if (Object.is(params, undefined)) {
      _params = ''
    } else {
      for (const key in params) {
        if (params.hasOwnProperty(key) && params[key]) {
          _params += `${params[key]}/`
        }
      }
    }
    //去掉参数最后一位/
    if (_params) _params = _params.slice(0, _params.length - 1);
    return _params;
  }

  post<T = any>(url: string, params: any, config: AxiosRequestConfig = {}): Promise<Result<T>> {
    config = Object.assign(this.defaultConfig, config)
    return new Promise((resolve, reject) => {
      this.axiosInstance.post<T>(url, params, config).then((res) => {
        resolve(res.data as any)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  put<T = any>(url: string, params: any, config: AxiosRequestConfig = {}): Promise<Result<T>> {
    config = Object.assign(this.defaultConfig, config)
    return new Promise((resolve, reject) => {
      this.axiosInstance.put<T>(url, params, config).then((res) => {
        resolve(res.data as any)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  delete<T = any>(url: string, params: any): Promise<Result<T>> {
    return new Promise((resolve, reject) => {
      this.axiosInstance.delete<T>(this.getParams(params) ? `${url}/${this.getParams(params)}` : url)
        .then((res) => {
          resolve(res.data as any)
        }).catch((error) => {
        reject(error)
      })
    })
  }

  postAny<T = any>(url: string, params: any, config: AxiosRequestConfig): Promise<T> {
    config = Object.assign(this.defaultConfig, config)
    return new Promise((resolve, reject) => {
      this.axiosInstance.post<T>(url, params, config).then((res) => {
        resolve(res.data as any)
      }).catch((error) => {
        reject(error)
      })
    })
  }

  /**
   * 获取图片（验证码）
   * @param url
   */
  getImage(url: string) {
    return this.axiosInstance.post(url, null, {
      responseType: 'arraybuffer'
    })
  }

  /**
   * 单例模式
   * @private
   */
  private static instance: Request;
  public static getInstance(config: AxiosRequestConfig) {
    if (!Request.instance) {
      Request.instance = new Request(config)
    }
    return Request.instance
  }
}

export default Request;
```

src/utils/auth.ts

```
enum Keys {
  Token = 'token',
  UserId = 'userId',
  ExpireTime = 'expireTime'
}

//存储token到session
export const setToken = (token: string) => {
  sessionStorage.setItem(Keys.Token, token)
}
export const getToken = () => {
  return sessionStorage.getItem(Keys.Token)
}

//存储userId到sessionStorage
export const setUserId = (userId: number) => {
  sessionStorage.setItem(Keys.UserId, JSON.stringify(userId))
}
export const getUserId = () => {
  return sessionStorage.getItem(Keys.UserId)
}

//存储过期时间
export const setExpireTime = (time: number) => {
  sessionStorage.setItem(Keys.ExpireTime, JSON.stringify(time))
}
export const getExpireTime = () => {
  return sessionStorage.getItem(Keys.ExpireTime)
}

//session清空
export const cleanSession = () => {
  sessionStorage.clear()
}
```

2.src/http/index.ts

```
// import Request from "./ajax";
// const http = new request({
//     baseURL:'http://42.193.158.170:8098',
//     timeout: 10000
// })
// export default http;

// 单例模式
import Request from "./ajax";
const http = Request.getInstance({
  timeout: 10000
})
export default http;
```

### 第17讲 登录页静态页面

src/view/login/Login.vue

```
<template>
  <div class="logincontainer">
    <el-form
        class="loginForm"
        :model="loginModel"
        ref="loginFormRef"
        :rules="rules"
        :inline="false"
    >
      <el-form-item>
        <div class="loginTitle">系统登录</div>
      </el-form-item>
      <el-form-item prop='username'>
        <el-input placeholder="请输入账户" v-model="loginModel.username"></el-input>
      </el-form-item>
      <el-form-item prop='password'>
        <el-input type='password' placeholder="请输入密码" v-model="loginModel.password"></el-input>
      </el-form-item>
      <el-form-item prop='code'>
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input placeholder="请输入验证码" v-model="loginModel.code"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input placeholder="请输入验证码" v-model="loginModel.code"></el-input>
            <!-- <img :src='imgSrc' @click="getImage"/> -->
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="btnLayout">
        <el-row :gutter="20" class="btnGroup">
          <el-col :span="12">
            <el-button class="mybtn" @click="login" type="primary">登录</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="mybtn">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang='ts'>
import {ref, reactive} from 'vue'

let loginModel = reactive({
  username: '',
  password: '',
  code: ''
})

let imgSrc = ref('')
let rules = ref([])
let getImage = () => {
}
let login = () => {
}

// // 组合API
// import useImage from '@/composables/login/useImage';
// import useBaseLogin from '@/composables/login/useBaseLogin';
// import useLogin from '@/composables/login/useLogin';
// //基础数据
// const {loginModel, rules, loginFormRef} = useBaseLogin();

// //验证码
// const {imgSrc, getImage} = useImage();

// //登录
// const {login} = useLogin(loginModel);


</script>
<style scoped lang='scss'>
.logincontainer {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .loginForm {
    height: 320px;
    width: 400px;
    border-radius: 10px;
    padding: 20px 35px;
    box-shadow: 0 0 25px #cac6c6;

    .loginTitle {
      font-size: 24px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    .mybtn {
      width: 100%;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }

    .el-form-item {
      .el-form-item__content {
        justify-content: center;

        .el-input {
          :deep(.el-input__inner) {
            height: 40px;
          }
        }

        .el-button {
          height: 40px;
        }
      }

      &.btnLayout {
        margin-top: 10px;

        .btnGroup {
          width: 100%;
          margin-left: 0 !important;
          margin-right: 0 !important;

          .el-col:nth-child(1) {
            padding-left: 0 !important;
          }
          .el-col:nth-child(2) {
            padding-right: 0 !important;
          }
        }
      }
    }
  }
}

</style>
```

src/router/index.ts

```
+ {
+     path: '/login',
+     component: () => import('@/views/login/Login.vue'),
+     name: 'login',
+     children: []
+ },
```

### 第18讲 做一些优化(自己的)

1.多环境打包

/.env.test

```
# 必须VITE开头
VITE_RUNNING_ENV = 'test'
VITE_RUNNING_DESC = '测试环境打包'
```

/package.json

```
"dev": "vite --mode dev",
"build:test": "vite build --mode test",
"build:prod": "vite build --mode prod",
```

2.统一管理多url

src/services/serviceHelper.ts

```
let dev = {
  normalURL: 'http://42.193.158.170:8098',
  iotURL: 'http://42.193.158.170:8098/iot_test',
  woURL: 'http://42.193.158.170:8098/wo_server_test',
  authURL: 'http://42.193.158.170:8098/psgs_auth_server_test',
  safeProdURL: 'http://42.193.158.170:8098/safeprod_test',
  pumpUrl: 'http://42.193.158.170:8098/gwxj_test',
  aeURL: 'http://42.193.158.170:8098/testPsgsDuAe'
}

let test = {
  normalURL: 'http://42.193.158.170:8098',
  iotURL: 'http://42.193.158.170:8098/iot_test',
  woURL: 'http://42.193.158.170:8098/wo_server_test',
  authURL: 'http://42.193.158.170:8098/psgs_auth_server_test',
  safeProdURL: 'http://42.193.158.170:8098/safeprod_test',
  pumpUrl: 'http://42.193.158.170:8098/gwxj_test',
  aeURL: 'http://42.193.158.170:8098/testPsgsDuAe'
}

let prod = {
  normalURL: 'http://42.193.158.170:8098',
  iotURL: 'http://42.193.158.170:8098/iot_test',
  woURL: 'http://42.193.158.170:8098/wo_server_test',
  authURL: 'http://42.193.158.170:8098/psgs_auth_server_test',
  safeProdURL: 'http://42.193.158.170:8098/safeprod_test',
  pumpUrl: 'http://42.193.158.170:8098/gwxj_test',
  aeURL: 'http://42.193.158.170:8098/testPsgsDuAe'
}

// @ts-ignore
let RUNNING_ENV = { dev, test, prod }[import.meta.env.VITE_RUNNING_ENV]

export const normalURL =  RUNNING_ENV.normalURL
export const iotURL =  RUNNING_ENV.iotURL
export const woURL =  RUNNING_ENV.woURL
export const authURL =  RUNNING_ENV.authURL
export const safeProdURL =  RUNNING_ENV.safeProdURL
export const pumpUrl =  RUNNING_ENV.pumpUrl
export const aeURL =  RUNNING_ENV.aeURL
```

src/http/index.ts

```
// 单例模式
import Request from "./ajax";
const http = Request.getInstance({
-  baseURL: 'http://42.193.158.170:8098',
   timeout: 10000
})
export default http;
```

src/services/userService (使用请求)

```
import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {LoginResult, UserInfo} from './userModel'

const Api = {
  getImg: normalURL + '/api/sysUser/image',
  login: normalURL + '/api/user/login',
  getUserInfo: normalURL + '/api/sysUser/getInfo',
}

//获取验证码
export async function getImageApi() {
  return await http.getImage(Api.getImg)
}
//登录
export async function loginApi(params: any) {
  return await http.postAny<LoginResult>(Api.login, params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
//获取用户信息
export const getUserInfoApi = async () => {
  return await http.get<UserInfo>(Api.getUserInfo)
}

// enum Api {
//   getImg = '/api/sysUser/image'
// }
//获取验证码
// export async function getImageApi() {
//   return await http.getImage(api.getImg)
// }
```

### 第19讲 获取验证码

src/composables/login/useImage.ts (组合式API, 其实类似Mixin)

```
import {ref, onMounted} from 'vue'
import {getImageApi} from '@/api/user/user'

export default function useImage() {
  let imgSrc = ref('')

  const getImage = () => {
    getImageApi()
      .then((res) => {
        // console.log(res)
        return 'data:image/png;base64,' + btoa(
          new Uint8Array(res.data as any).reduce((data, byte) => data + String.fromCharCode(byte), '')
        )
      })
      .then((data) => {
        imgSrc.value = data
      })
  }

  onMounted(() => {
    getImage()
  })

  return {
    imgSrc,
    getImage
  }
}
```

src/view/login/Login.vue

```
- let imgSrc = ref('')
- let getImage = () => {}

+ // 组合API
+ import useImage from '@/composables/login/useImage';
+ //验证码
+ const {imgSrc, getImage} = useImage();
```

### 第20讲 登录

src/composables/login/useLogin.ts (组合式API, 其实类似Mixin)

```
import {ref, reactive} from 'vue'
import { ElForm } from "element-plus";

export default function useLogin() {
  // 表单绑定数据
  let loginModel = reactive({
    username: 'admin',
    password: '1234',
    code: ''
  })
  //表单验证规则
  let rules = reactive({
    username: [{
      required: true,
      trigger: 'change',
      message: '请填写登录账户'
    }],
    password: [{
      required: true,
      trigger: 'change',
      message: '请填写登录密码'
    }],
    code: [{
      required: true,
      trigger: 'change',
      message: '请填写验证码'
    }]
  })
  // 表单的ref属性
  // 自定义组件获取ref的固定写法, ElForm就是组件名
  const loginFormRef = ref<InstanceType<typeof ElForm>>();

  return {
    loginModel,
    rules,
    loginFormRef
  }
}

```

src/composables/login/useLogin2.ts (组合式API, 其实类似Mixin)

```
import {getCurrentInstance} from "vue";
import {loginApi} from '@/services/userService'

export default function useLogin2(loginModel: any) {
  const {proxy} = getCurrentInstance() as any;

  let login = () => {
    proxy.$refs.loginFormRef.validate(async (valid: boolean) => {
      if (valid) {
        loginApi(loginModel).then((res) => {
          console.log(res)
        })
      }
    })
  }

  return {
    login
  }
}

// export default function useLogin(loginModel:LoginParm) {
//   const router = useRouter();
//
//   const store = useStore();
//
//   const { proxy } = getCurrentInstance() as any;
//
//   //登录提交
//   const login = async () => {
//     //表单验证
//     console.log(proxy)
//     console.log(loginModel)
//     proxy.$refs.loginFormRef.validate(async(valid: boolean) => {
//       if (valid) {
//         store.dispatch('user/login',loginModel).then(res =>{
//           console.log('登录成功')
//           // console.log(res)
//           // store.dispatch('user/getInfo')
//           if(res.code == 200){
//             //跳转到首页
//             router.push({path:'/'})
//           }
//         })
//       }
//     })
//   }
//   return {
//     login
//   }
// }
```

src/view/login/Login.vue

```
<el-form
    class="loginForm"
    :model="loginModel"
    :rules="rules"
    :inline="false"
+    ref="loginFormRef"
>


+ <script setup lang='ts'>
+ // import {ref, reactive} from 'vue'
+ // let loginModel = reactive({
+ //   username: '',
+ //   password: '',
+ //   code: ''
+ // })
+ // let rules = ref([])
+ // let imgSrc = ref('')
+ // let getImage = () => {}
+ // let login = () => {}
+ 
+ // 组合API
+ import useImage from '@/composables/login/useImage';
+ import useLogin from '@/composables/login/useLogin';
+ import useLogin2 from '@/composables/login/useLogin2';
+ //基础数据
+ const {loginModel, rules, loginFormRef} = useLogin();
+ 
+ //验证码
+ const {imgSrc, getImage} = useImage();
+ 
+ //登录
+ const {login} = useLogin2(loginModel);
+ </script>
```

### 第21讲 登录接口优化

把登录接口放到vuex的action里, token放到state里

1.新建vuex模块 src/store/modules/user.ts

- 把请求放action
    - 登录成功后
    - 把token、userId放state和mutations
    - 把token、userId放sessionStorage

```
//定义state
import {loginApi} from "@/services/userService";
import {ActionContext} from "vuex"
import {RootState} from "@/store";
import {setUserId, setToken, setExpireTime} from "@/utils/auth";

export type UserState = {
  token: string,
  userId: string
}
export const state: UserState = {
  token: '',
  userId: '',
}

//定义actions
export const actions = {
  login({commit}: ActionContext<UserState, RootState>, loginModel: any) {
    return new Promise((resolve, reject) => {
      loginApi(loginModel).then((res) => {
        if (res.code == 200) {
          commit('setToken', res.token)
          commit('setUserId', res.id)
          //存到cookies ==> sessioStorage
          setUserId(res.id)
          setToken(res.token)
          setExpireTime(res.expireTime)
        }
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}

//定义mutations
export const mutations = {
  setToken(state: UserState, token: string) {
    state.token = token
  },
  setUserId(state: UserState, userId: string) {
    state.userId = userId
  }
}

//定义getters
export const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
```

2.src/store/index.ts（引入）

```
+ import user, {UserState} from '../store/modules/user'

//是一种规范
export type RootState = {
  tabs: TabState,
  menu: MenuState,
+  user: UserState,
}
//导入所有的模块
export const modules = {
  tabs,
  menu,
+  user
}
```

3.登录页面调用vuex的user的登录

src/composables/useLogin2.ts

```
export default function useLogin2(loginModel: any) {
  const {proxy} = getCurrentInstance() as any;
  const store = useStore()
  const router = useRouter()

  let login = () => {
    proxy.$refs.loginFormRef.validate(async (valid: boolean) => {
      if (valid) {
        store.dispatch('user/login', loginModel).then((res: any) => {
          if(res.code === 200) {
            router.push({path: '/'})
          }
        })
      }
    })
  }

  return {
    login
  }
}
```

### 第22讲 获取用户权限信息

1. src/composables/login/useLogin2.ts

```
export default function useLogin2(loginModel: any) {
  const {proxy} = getCurrentInstance() as any;
  const store = useStore()
  const router = useRouter()

  let login = () => {
    proxy.$refs.loginFormRef.validate(async (valid: boolean) => {
      if (valid) {
        store.dispatch('user/login', loginModel).then((res) => {
          if(res.code === 200) {
            // 请求用户权限
+            store.dispatch('user/getUserInfo')
            router.push({path: '/'})
          }
        })
      }
    })
  }

  return {
    login
  }
}
```

2. src/store/modules/user.ts

```
export const actions = {
+  getUserInfo({commit}: ActionContext<UserState, RootState>) {
+    return new Promise((resolve, reject) => {
+      getUserInfoApi().then((res) => {
+        if (res.code == 200) {
+          commit('setRoles', res.data.roles)
+        }
+        resolve(res)
+      }).catch((err) => {
+        reject(err)
+      })
+    })
+  }
}

//定义mutations
export const mutations = {
+  setRoles(state: UserState, roles: string[]) {
+    state.permissions = roles;
+  }
}

//定义getters
export const getters = {
+  //获取用户的权限字段
+  getPermissions(state: UserState) {
+    return state.permissions
+  }
}
```

3. src/services/userService.ts

```
import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
+ import {LoginResult, UserInfo} from './userModel'

const Api = {
  getImg: normalURL + '/api/sysUser/image',
  login: normalURL + '/api/user/login',
+  getUserInfo: normalURL + '/api/sysUser/getInfo',
}

+ //获取用户信息
+ export const getUserInfoApi = async () => {
+   return await http.get<UserInfo>(Api.getUserInfo)
+ }
```

4. src/services/userModel.ts

```
/**
 * 登录请求参数类型
 */
export interface LoginParm {
  username: string;
  password: string;
  code: string;
}

/**
 * 登录成功返回值类型
 */
export interface LoginResult {
  id: number;
  token: string;
  code: number;
  expireTime: number;
}

/**
 * 用户信息
 */
export interface UserInfo {
  avatar: string;
  id: string;
  introduction: string;
  name: string;
  roles: Array<string>
}

/**
 * 用户列表查询参数
 */
export interface UserListParm {
  deptId: string | number;
  loginName: string;
  currentPage: number;
  pageSize: number;
  total: number;
}

/**
 * 表单提交的参数
 */
export interface AddUserModel {
  type: string; //判断新增还是编辑
  id: string | number;
  deptId: string | number;
  deptName: string;
  loginName: string;
  mobile: string;
  nickName: string;
  email: string;
  username: string;
  password: string;
  sex: string;
}

/**
 * 分配角色列表参数
 */
export interface AssignRoleListParm {
  currentPage: number,
  pageSize: number,
  userId: string | number,
  total: number,
}

export interface SelectRoleParm {
  roleId: string | number;
  userId: string | number;
}
```

### 第23讲 动态菜单（动态路由）

vue2: https://www.jianshu.com/p/1a59ee7dde22  
vue3:

1. 添加接口请求

src/services/menuService.ts

```
import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {LoginResult, UserInfo} from './userModel'

const Api = {
  getMenuList: normalURL + '/api/sysUser/getMenuList',
}

//获取菜单
export const getMenuListApi = async () => {
  return await http.get(Api.getMenuList)
}
```

2. store请求、存储

src/store/modules/menu.ts

```
+ import {RouteRecordRaw} from "vue-router";
+ import {ActionContext} from "vuex";
+ import {RootState} from "@/store";
+ import {getMenuListApi} from "@/services/menuService";
+ import Layout from '@/layout/index.vue'
+ const modules = import.meta.glob('../../views/**/*.vue')
+ /**
+  * 获取全部组件, 返回值如下
+  * {
+  *   '../../views/system/user/UserList.vue': () => import("/src/views/system/user/UserList.vue")
+  * }
+  */

//定义state
export type MenuState = {
  count: number,
  collapse: boolean,
+  menuList: any
}
export const state: MenuState = {
  count: 0,
  collapse: false,
+  menuList: [
+    {
+      path: '/homePage',
+      component: "Layout",
+      meta: {
+        title: "首页",
+        icon: "HomeFilled",
+        roles: ["sys:manage"]
+      },
+      children: []
+    }
+  ]
}

//定义actions
export const actions = {
+  getMenuList({commit}: ActionContext<MenuState, RootState>, router: any) {
+    return new Promise((resolve, reject) => {
+      getMenuListApi().then(res => {
+        let accessedRoutes;
+        if (res.code == 200) {
+          // 动态生成路由
+          accessedRoutes = filterAsyncRoutes(res.data, router);
+          // 设置到menuList
+          commit('setMenuList', accessedRoutes)
+        }
+        resolve(accessedRoutes);
+      }).catch(error => {
+        reject(error)
+      })
+    })
+  }
}

//定义mutations
export const mutations = {
  setCount(state: MenuState, count: number) {
    state.count = count;
  },
  setCollapse: (state: MenuState, collapse: boolean) => {
    state.collapse = collapse;
  },
+  setMenuList: (state: MenuState, menuList: Array<RouteRecordRaw>) => {
+    state.menuList = state.menuList.concat(menuList)
+  }
}

//定义getters
export const getters = {
  getCount(state: MenuState) {
    return state.count;
  },
  getCollapse: (state: MenuState) => {
    return state.collapse;
  },
+  getMenuList: (state: MenuState) => {
+    return state.menuList
+  }
}

+ export function filterAsyncRoutes(routes: RouteRecordRaw[], router: any) {
+   const res: Array<RouteRecordRaw> = [];
+   routes.forEach((route: any) => {
+     const tmp = {...route}
+     const {component} = tmp
+     if (component) tmp.component = component === 'Layout' ? Layout : modules[`../../views${component}.vue`]
+     //递归
+     if (tmp.children) tmp.children = filterAsyncRoutes(tmp.children, router)
+     router.addRoute(tmp)
+     res.push(tmp)
+   })
+   return res;
+ }

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
```

3. 接口返回的url和当前项目的文件夹、文件命名有些不同,酌情改一下

4.menuBar改用store的动态路由

src/layout/menu/MenuBar.vue

```
//菜单数据
const menuList = computed(() =>{
  return store.getters['menu/getMenuList']
})
```
替换掉原来的mock数据

5. /main.ts

利用路由守卫做权限验证:
前提: 已经使用动态路由
- 没有token
    - 1.属于白名单, 跳转白名单
    - 2.不属于白名单, 跳转login
- 有token
    - 1.跳转['/'], 允许
    - 2.有没用户权限信息(登录过会存储在store中)
        - 1.有, 在系统内随便跳转
        - 2.没, 拿token获取用户信息和用户菜单, 然后随便跳

```
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
```

6.修改路由

src/router/index.ts (用下面的替代之前的)

```
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/Login.vue'),
    name: 'login',
    children: []
  },
  {
    path: '/',
    component: Layout,
    name: 'Layout',
    redirect: '/homepage',
    children: [
      {
        path: '/homepage',
        component: () => import('@/layout/homepage/Index.vue'),
        name: 'homepage',
        meta: {
          title: '首页',
          icon: '#icondashboard'
        }
      }
    ]
  }
]
```

7. 修补小bug
- 重复发送getUserInfo, 注释掉useLogin2里的
- MenuItem.vue的图标, 和视频用的element-plus版本不一致, 暂时不修复

### 第24讲 系统管理->机构管理->获取列表

1.定义API和Model  
src/services/departmentService.ts
```
import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {IListParams} from '@/services/departmentModel'

const Api = {
  getDepartmentList: normalURL + '/api/department/list',
}

// 获取列表
export async function getDepartmentListApi(params: IListParams) {
  return await http.get(Api.getDepartmentList, params)
}
```

src/services/departmentModel.ts
```
export interface IListParams {
  searchName: string;
}

export interface ITableData {
  list: any;
}

//部门表格每行数据的格式
export interface DeptModel {
  id: number;
  pid: number;
  likeId: number;
  parentName: string;
  manager: string;
  name: string;
  deptCode: string;
  deptAddress: string;
  deptPhone: string;
  orderNum: number;
  open: boolean;
  children: Array<DeptModel>
}

//表单提交的数据类型
export interface AddDeptModel {
  type: string;
  id: string | number;
  pid: string | number;
  parentName: string;
  manager: string;
  deptAddress: string;
  deptPhone: string;
  name: string;
  deptCode: string;
  orderNum: string;
}

//上级部门树选中的数据
export interface SelectNode {
  id: string | number;
  name: string;
}


```

2.定义组件组合式API  
src/composables/department/useDepartmentTable.ts

```
import {IListParams, ITableData} from '@/services/departmentModel'
import {getDepartmentListApi} from '@/services/departmentService'
import {reactive, onMounted} from "vue";

export default function useDepartmentTable() {
  // 搜索栏
  let searchForm = reactive<IListParams>({
    searchName: ''
  })
  // 表格数据
  let tableData = reactive<ITableData>({
    list: []
  })

  // 获取表格数据
  let getTableData = () => {
    getDepartmentListApi(searchForm).then((res) => {
      if (res && res.code === 200) {
        tableData.list = res.data
      }
    })
  }

  onMounted(() => {
    getTableData()
  })

  return {
    searchForm,
    tableData,
    getTableData,
  }
}
```

2. 定义组件组合式API_基础数据  
   src/composables/department/useBaseModel.ts

```
import { reactive } from "vue";

export default function useBaseModel() {
  //表单验证规则
  const rules = reactive({})

  return {
    rules
  }
}
```

3.组件使用组合式API  
src/views/system/department/department.vue
```
<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="searchForm" :rules="rules" label-width="80px" :inline="true" size="small">
      <el-form-item>
        <el-input size="large" v-model="searchForm.searchName" placeholder="请输入部门名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="large" :icon="Search">查询</el-button>
        <!-- <el-button type="primary" :icon='Plus'>新增</el-button> -->
        <el-button size="large" type="primary" :icon="Plus">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="tableData.list"
      style="width: 100%"
      row-key="id"
      default-expand-all
      size="medium"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="部门名称" />
      <el-table-column prop="deptCode" label="部门编码" />
      <el-table-column prop="deptPhone" label="部门电话" />
      <el-table-column width="200" align="center" label="操作">
        <template #default="scope">
          <el-button size="mini" type="success" :icon="Edit">编辑</el-button>
          <el-button size="mini" type="danger" :icon="Close">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
</template>
<script lang="ts" setup>
import useBaseModel from '@/composables/department/useBaseModel'
import useDepartmentTable from '@/composables/department/useDepartmentTable';
import {Edit,Close,Plus,Search} from '@element-plus/icons-vue'

let { rules } = useBaseModel()
let { searchForm, tableData, getTableData } = useDepartmentTable()

</script>

<style lang="scss" scoped>
</style>
```

### 第25讲 弹窗封装和测试

src/components/SysDialog.vue（具名插槽和作用域插槽）
```
<!-- 此处注意，使用 v-model="visible"绑定的形式
上线会报错

修改为如下方式
:model-value="visible"
 -->
<template>
  <el-dialog
    :title='title'
    :model-value="visible"
    :before-close="onClose"
    append-to-body
    :width="width + 'px'"
  >
    <div class="container" :style="{height:height + 'px'}">
      <slot name="content"></slot>
    </div>
    <template #footer>
            <span class="dialog-footer">
                <el-button type='danger' @click="onClose">取消</el-button>
                <el-button type="primary" @click="onConfirm">确定</el-button>
            </span>
    </template>
  </el-dialog>
</template>
<script setup lang='ts'>
import {ref, reactive} from 'vue'

const props = defineProps({
  title: {//弹框标题
    type: String,
    default: '标题'
  },
  visible: { //控制弹框的展示和影藏
    type: Boolean,
    default: false
  },
  width: {
    type: Number,
    default: 600
  },
  height: {
    type: Number,
    default: 250
  }
})
// 定义emit
const emit = defineEmits(['onClose', 'onConfirm'])
// 定义弹框的关闭
const onClose = () => {
  emit('onClose')
}
// 定义弹框的确定
const onConfirm = () => {
  emit('onConfirm')
}
</script>
<style lang="scss" scope>
.container {
  overflow-x: initial;
  overflow-y: auto;
}

.el-dialog {
  border-top-left-radius: 7px !important;
  border-top-right-radius: 7px !important;

  .el-dialog__header {
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    background-color: #1890ff !important;

    .el-dialog__title {
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }

    .el-dialog__close {
      color: #fff;
    }
  }

  .el-dialog__body {
    padding: 10px;
  }

  .el-dialog__footer {
    border-top: 1px solid #e8eaec !important;
    padding: 10px;
  }
}
</style>
```

src/components/TestDialog.vue
```
<template>
  <div>
      <el-button type="primary" size="default" @click="addBtn">新增</el-button>
      
  </div>
  <SysDialog
  :title="dialog.title"
  :visible="dialog.visible"
  :height="dialog.height"
  :width="dialog.width"
  @onClose='onClose'
  @onConfirm='onConfirm'
  >
      <template v-slot:content>
          弹框内容
      </template>
  </SysDialog>
</template>
<script setup lang='ts'>
import { ref,reactive} from 'vue'
//引入组件
import SysDialog from './SysDialog.vue';
//定义弹框属性
const dialog = reactive({
    title:'新增',
    visible:false,
    height:280,
    width:630
})
//按钮点击事件
const addBtn = () =>{
    //visible为true的时候，弹框显示
    dialog.visible = true;
}
//关闭
const onClose = () =>{
    dialog.visible = false;
}
//确定
const onConfirm = () =>{
    dialog.visible = false
}
</script>
<style scoped lang='scss'>
</style>
```

src/router/index.ts
```
{
    path: '/test',
    name: 'test',
    component: () => import('@/components/TestDialog.vue'),
}
```

### 第26讲 系统管理->机构管理->新增

- 进度: 新增的静态页面、选择`上级部门`的接口页面

1.写新增页面

src/views/system/department/AddAndEdit.vue

```
<template>
  <SysDialog
    :title="dialog.title"
    :visible="dialog.visible"
    :width="dialog.width"
    :height="dialog.height"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <template v-slot:content>
      <el-form
        :model="dialogModel"
        ref="addDeptForm"
        :rules="rules"
        label-width="80px"
        size="small"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item prop="parentName" label="上级部门">
              <el-input type="hidden" v-model="dialogModel.pid"></el-input>
              <el-input @click="selectTree" v-model="dialogModel.parentName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="name" label="部门名称">
              <el-input v-model="dialogModel.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="deptCode" label="部门编码">
              <el-input v-model="dialogModel.deptCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="deptPhone" label="部门电话">
              <el-input v-model="dialogModel.deptPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="manager" label="部门经理">
              <el-input v-model="dialogModel.manager"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="deptAddress" label="部门地址">
              <el-input v-model="dialogModel.deptAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="orderNum" label="部门序号">
              <el-input v-model="dialogModel.orderNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>

  <!-- 上级部门弹框 -->
   <deparentmentSelectTree ref="selectTreeRef" @select="select"></deparentmentSelectTree>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue'
import useDialog from '@/hooks/useDialog'
import useBaseModel from '@/composables/department/useBaseModel'
import { EditType, Title } from '@/type/BaseEnum'
import { ref } from 'vue'
import { ElForm } from 'element-plus'
import {DeptModel, SelectNode} from '@/services/departmentModel'
import deparentmentSelectTree from './deparentmentSelectTree.vue'
import useSelectTree from '@/composables/department/useSelectTree'

// import useInstance from '@/hooks/useInstance'
//全局挂载global
// const { global } = useInstance();

//弹框属性
const { dialog, onShow, onClose } = useDialog();
//基础数据
const { dialogModel, rules } = useBaseModel();
//表单的ref属性
const addDeptForm = ref<InstanceType<typeof ElForm>>();
//定义事件
const emit = defineEmits(['save'])
//弹框的确定,把表单的值，返回给父组件
const confirm = () => {
  addDeptForm.value?.validate(valid => {
    if (valid) {
      emit('save', dialogModel)
      onClose();
    }
  })
}

//显示弹框
const show = (type: string, row?: DeptModel) => {
  dialog.width = 650;
  dialog.height = 250;
  type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
  onShow();
  // //清空表单
  // global.$resetForm(addDeptForm.value, dialogModel);
  // if (EditType.EDIT === type) {
  //   //把要编辑的数据，放到表单绑定的model里面
  //   global.$objCoppy(row, dialogModel)
  // }
  // //设置编辑属性
  // dialogModel.type = type;
}

// 父组件调用ref的时候使用
defineExpose({
  show
})

// 调用子组件deparentmentSelectTree.vue
const { selectTreeRef, selectTree } = useSelectTree();
const select = (node: SelectNode) => {
  dialogModel.pid = node.id;
  dialogModel.parentName = node.name
}
</script>
<style scoped lang='scss'>
</style>
```


2.新增页面-组合API

src/composables/department/useBaseModel.ts

```
import {reactive} from "vue";
import {AddDeptModel} from "@/services/departmentModel";

export default function useBaseModel() {
  //表单验证
  const rules = reactive({
    parentName: [{
      required: true,
      message: '请选择上级部门',
      trigger: 'change',
    }],
    name: [{
      required: true,
      message: '请填写部门名称',
      trigger: 'change',
    }]
  })

  //表单数据
  const dialogModel = reactive<AddDeptModel>({
    type: "",
    id: "",
    pid: "",
    parentName: "",
    manager: "",
    deptAddress: "",
    deptPhone: "",
    name: "",
    deptCode: "",
    orderNum: ""
  })

  return {
    rules,
    dialogModel
  }
}
```

3.相关文件

src/type/BaseEnum

```
export enum EditType {
  ADD = '0', //代表新增
  EDIT = '1' //代表编辑
}

//定义弹框的标题
export enum Title {
  ADD = '新增',
  EDIT = '编辑'
}

```

src/services/departmentModel.ts（已经是全的）

src/composables/department/useSelectTree

```
import {ref} from 'vue'

export default function useSelectTree() {
  //parent组件的ref属性
  const selectTreeRef = ref<{ show: () => void }>()

  //选择上级部门
  const selectTree = () => {
    selectTreeRef.value?.show();
  }
  return {
    selectTreeRef,
    selectTree
  }
}
```

4.写部门选择树页面

src/views/system/department/deparentmentSelectTree.vue

```
<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <template v-slot:content>
      <el-tree
        ref="parentTree"
        :data="treeData.data"
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :highlight-current="true"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-container">
            <!-- 长度为0说明没有下级 -->
            <span v-if="data.children.length == 0">
                            <DocumentRemove
                              style="width: 1.3em; height: 1.3em; margin-right: 5px;color: #8c8c8c;"></DocumentRemove>
                        </span>
            <!-- 点击展开和关闭 -->
            <span v-else @click.stop="openBtn(data)">
                            <component style="width: 1.1em; height: 1.1em; margin-right: 5px;color: #8c8c8c;"
                                       :is="data.open ? Plus : Minus"/>
                        </span>
            <span>{{ node.label }}</span>
          </div>
        </template>
      </el-tree>
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
import {DocumentRemove, Plus, Minus} from '@element-plus/icons-vue'
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useDeparentmentSelectTree from '@/composables/department/useDeparentmentSelectTree';

//弹框属性
const {dialog, onClose, onShow} = useDialog()
//树相关数据
const {parentTree, treeData, defaultProps, handleNodeClick, openBtn, selectNode, getTreeData} = useDeparentmentSelectTree();

//供父组件调用，显示弹框
const show = async () => {
  //获取树的数据
  await getTreeData();
  dialog.title = '选择上级部门'
  dialog.height = 420;
  dialog.width = 300;
  onShow();
}
//把方法暴露出去
defineExpose({
  show
})

//子组件传值给父组件
const emit = defineEmits(['select'])
//弹框确定事件
const confirm = () => {
  emit('select', selectNode)
  onClose();
}
</script>

<style lang="scss">
.el-tree {
  // 将每一行的设置为相对定位 方便后面before after 使用绝对定位来固定位置
  .el-tree-node {
    position: relative;
    padding-left: 10px;
  }

  // 子集像右偏移 给数线留出距离
  .el-tree-node__children {
    padding-left: 20px;
  }

  //这是竖线
  .el-tree-node :last-child:before {
    height: 40px;
  }

  .el-tree > .el-tree-node:before {
    border-left: none;
  }

  .el-tree > .el-tree-node:after {
    border-top: none;
  }

  //这自定义的线 的公共部分
  .el-tree-node:before,
  .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .tree :first-child .el-tree-node:before {
    border-left: none;
  }

  // 竖线
  .el-tree-node:before {
    border-left: 1px dotted #d9d9d9;
    bottom: 0px;
    height: 100%;
    top: -25px;
    width: 1px;
  }

  //横线
  .el-tree-node:after {
    border-top: 1px dotted #d9d9d9;
    height: 20px;
    top: 14px;
    width: 24px;
  }

  .el-tree-node__expand-icon.is-leaf {
    width: 8px;
  }

  //去掉elementui自带的展开按钮  一个向下的按钮,打开时向右
  .el-tree-node__content > .el-tree-node__expand-icon {
    display: none;
  }

  //每一行的高度
  .el-tree-node__content {
    line-height: 30px;
    height: 30px;
    padding-left: 10px !important;
  }
}

//去掉最上级的before  after 即是去电最上层的连接线
.el-tree > div {
  &::before {
    display: none;
  }

  &::after {
    display: none;
  }
}
</style>
```

5.部门选择树页面-组合式API

src/composables/department/useDeparentmentSelectTree.ts

```
import {reactive, ref} from 'vue'
import {ElTree} from 'element-plus';
import {DeptModel, SelectNode} from "@/services/departmentModel";
import {getDeptParentApi} from "@/services/departmentService";

export default function useSelectTree() {
  //树的ref
  const parentTree = ref<InstanceType<typeof ElTree>>();
  //树的数据
  const treeData = reactive({
    data: []
  })
  //树的属性
  const defaultProps = reactive({
    children: 'children', //设置树的children
    label: 'name', //设置树的名字属性字段
  })
  //树的点击事件
  const handleNodeClick = (data: DeptModel) => {
    selectNode.id = data.id;
    selectNode.name = data.name
  }
  //树的打开事件
  const openBtn = (data: DeptModel) => {
    //设置展开或者关闭
    data.open = !data.open;
    if (parentTree.value) {
      parentTree.value.store.nodesMap[data.id].expanded = !data.open;
    }
  }
  //选中的数据
  const selectNode = reactive<SelectNode>({
    id: '',
    name: ''
  })
  //获取树的数据
  const getTreeData = async () => {
    getDeptParentApi().then((res) => {
      if (res && res.code == 200) {
        treeData.data = res.data;
      }
    })
  }

  return {
    treeData,
    defaultProps,
    handleNodeClick,
    getTreeData,
    openBtn,
    parentTree,
    selectNode
  }
}
```

5.部门选择树页面-API请求

src/services/departmentService.ts

```
import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {AddDeptModel, IListParams} from '@/services/departmentModel'

const Api = {
  getDepartmentList: normalURL + '/api/department/list',
  getParent: normalURL + '/api/department/parent',
  add: normalURL + '/api/department',
  edit: normalURL + '/api/department',
  delete: normalURL + '/api/department'
}

// 获取列表
export async function getDepartmentListApi(params: IListParams) {
  return await http.get(Api.getDepartmentList, params)
}

//查询上级部门树
export const getDeptParentApi = async () => {
  return await http.get(Api.getParent)
}
//新增
export const addDeptApi = async (params: AddDeptModel) => {
  return await http.post(Api.add, params)
}
//编辑
export const editDeptApi = async (params: AddDeptModel) => {
  return await http.put(Api.edit, params)
}
//删除
export const deleteDeptApi = async (params: any) => {
  return await http.delete(Api.delete, params)
}
```

### 第27讲 工具类的封装与全局挂载

##### 1、给request.ts添加token过期的处理

```
cleanSession();
//跳到登录
window.location.href = "/login";
```

##### 2、信息确定弹框的封装   myconfirm.ts

```
//信息确认弹框封装
import { ElMessageBox } from "element-plus";
export default function myconfirm(text) {
    return new Promise((resolve, reject) => {
        ElMessageBox.confirm(text, '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            resolve(true);
        }).catch(() => {
            reject(false)
        })
    }).catch(() => {
        return false;
    })
}
```

##### 3、对象复制的封装  objCoppy.ts

```
//对象的快速复制
export default function objCoppy(obj1,obj2){
    Object.keys(obj2).forEach(key =>{
        obj2[key] = obj1[key]
    })
}

```

##### 4、表单清空封装   resetForm.ts

```
/**
 * 清空表单
 * @param fromRef  表单的ref属性
 * @param obj      表单绑定的model
 */
export default function resetForm(fromRef: any, obj: any) {
  //清除表单的验证
  if (fromRef) {
    fromRef.resetFields();
    fromRef.clearValidate();
  }
  //清空数据
  Object.keys(obj).forEach(key => {
    obj[key] = ''
  })
}
```

##### 5、main.ts引入挂载

```
import resetForm from './utils/resetForm'
import objCoppy from './utils/objCoppy'
import myconfirm from './utils/myconfirm'

/**
 * 全局工具类
 */
app.config.globalProperties.$$resetForm = resetForm; // 清空表单
app.config.globalProperties.$util_objCoppy = objCopy;    // 对象复制
app.config.globalProperties.$$myConfirm = myConfirm; // 确定弹框
```

##### 6、useInstance的封装

hooks/useInstance

```
import { ComponentInternalInstance, getCurrentInstance } from 'vue'
export default function useInstance() {
    const { appContext,proxy } = getCurrentInstance() as ComponentInternalInstance
    const global = appContext.config.globalProperties
    return {
        proxy,
        global
    }
}
```

##### 7、使用

```
import useInstance from '@/hooks/useInstance';

const {global} = useInstance();

//信息确认框使用
 let confirm = await global.$$myConfirm('确定删除该数据吗?')
 
//element plus全局信息提示信息使用
 global.$message.success('新增成功');
```

##### 8、解决any的验证

implicitly has an 'any' type

在tsconfig.json添加如下配置

```
"noImplicitAny": false
```

### 第28讲 新增、编辑对接口

src/views/system/department/AddAndEdit.vue

```
+import useInstance from '@/hooks/useInstance'

+//全局挂载global
+const { global } = useInstance();

const show = (type: string, row?: DeptModel) => {
  dialog.width = 650;
  dialog.height = 250;
  type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
  onShow();
+  global.$$resetForm(addDeptForm.value, dialogModel); // 清空表单
+  if (type === EditType.EDIT) {
+    global.$$objCopy(row, dialogModel)
+  }
+  dialogModel.type = type;
}
```

src/views/system/department/department.vue

```
// 传入刷新函数
+ const { serachBtn, resetBtn, addBtn, editBtn, deleteBtn, addDeptRef, save } = useDeparment(getTableData);
```

src/composables/department/useDeparment.ts

```
import useInstance from '@/hooks/useInstance';
import {Result, StatusCode} from "@/http/ajax";
import {addDeptApi, editDeptApi} from "@/services/departmentService";

+ export default function useDept(getTableData: any) {
+    const {global, proxy} = useInstance();

    const save = async (params: AddDeptModel) => {
    +    let res: Result;
    +    if (params.type === EditType.ADD) {
    +      res = await addDeptApi(params)
    +    } else {
    +      res = await editDeptApi(params)
    +    }
    +    if (res && res.code === StatusCode.Success) {
    +      global.$message({message: res.msg, type: 'success'})
    +      getTableData();
    +    }
    }
})
```

### 第29讲 删除部门

> 这里修改了一下之前的ajax的代码, 具体看git的0053b889

src/composables/department/useDeparment.ts

```
+ import {addDeptApi, deleteDeptApi, editDeptApi} from "@/services/departmentService";

+ //删除
+ const deleteBtn = async (id: number) => {
+     let params = {id}
+     const confirm = await global.$$myConfirm('确定删除该数据吗?')
+     if (confirm) {
+       let res = await deleteDeptApi(params)
+       if (res && res.code == StatusCode.Success) {
+         global.$message({message: res.msg, type: 'success'})
+         getTableData();
+       }
+     }
+ }
```

### 第30讲 用户管理->左侧树

src/views/system/User/UserList.vue

```
<template>
  <el-container :style="{ height: containerHeight + 'px' }">
    <el-aside width="200px" style="border-right: 1px solid #dfe6ec">
      <LeftTree></LeftTree>
    </el-aside>
    <el-main height>用户列表</el-main>
  </el-container>
</template>
<script setup lang="ts">
import LeftTree from './LeftTree.vue';
import {ref, onMounted} from 'vue'

const containerHeight = ref(0);
onMounted(() => {
  containerHeight.value = window.innerHeight - 100
})
</script>
```

src/views/system/User/LeftTree.vue

```
<template>
  <el-tree
    ref="parentTree"
    :data="treeData.data"
    node-key="id"
    :props="defaultProps"
    default-expand-all
    :highlight-current="true"
    :expand-on-click-node="false"
    @node-click="handleNodeClick"
  >
    <template #default="{ node, data }">
      <div class="custom-tree-container">
        <!-- 长度为0说明没有下级 -->
        <span v-if="data.children.length == 0">
                    <DocumentRemove
                      style="width: 1.3em; height: 1.3em; margin-right: 5px;color: #8c8c8c;"
                    ></DocumentRemove>
                </span>
        <!-- 点击展开和关闭 -->
        <span v-else @click.stop="openBtn(data)">
                    <component
                      style="width: 1.1em; height: 1.1em; margin-right: 5px;color: #8c8c8c;"
                      :is="data.open ? Plus : Minus"
                    />
                </span>
        <span>{{ node.label }}</span>
      </div>
    </template>
  </el-tree>
</template>
<script setup lang='ts'>
import {DocumentRemove, Plus, Minus} from '@element-plus/icons-vue'
import useLeftTree from '@/composables/userManager/useLeftTree';
//树相关数据
const {treeData, defaultProps, handleNodeClick, getTreeData, openBtn, parentTree, selectNode} = useLeftTree();

</script>

<style lang="scss">
.el-tree {
  font-size: 14px;

  .el-tree-node {
    position: relative;
    padding-left: 10px;
  }

  // 子集像右偏移 给数线留出距离
  .el-tree-node__children {
    padding-left: 20px;
  }

  //这是竖线
  .el-tree-node :last-child:before {
    height: 40px;
  }

  .el-tree > .el-tree-node:before {
    border-left: none;
  }

  .el-tree > .el-tree-node:after {
    border-top: none;
  }

  //这自定义的线 的公共部分
  .el-tree-node:before,
  .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .tree :first-child .el-tree-node:before {
    border-left: none;
  }

  // 竖线
  .el-tree-node:before {
    border-left: 1px solid #d9d9d9;
    bottom: 0px;
    height: 100%;
    top: -25px;
    width: 1px;
  }

  //横线
  .el-tree-node:after {
    border-top: 1px solid #d9d9d9;
    height: 20px;
    top: 14px;
    width: 12px;
  }

  .el-tree-node__expand-icon.is-leaf {
    width: 8px;
  }

  //去掉elementui自带的展开按钮  一个向下的按钮,打开时向右
  .el-tree-node__content > .el-tree-node__expand-icon {
    display: none;
  }

  //每一行的高度
  .el-tree-node__content {
    line-height: 30px;
    height: 30px;
    padding-left: 10px !important;
  }
}

//去掉最上级的before  after 即是去电最上层的连接线
.el-tree > div {
  &::before {
    display: none;
  }

  &::after {
    display: none;
  }
}

</style>
```

src/composables/userManager/useLeftTree.ts

```
import {DeptModel, SelectNode} from '@/services/departmentModel'
import {getLeftTreeApi} from '@/services/userService'
import {ElTree} from 'element-plus';
import {reactive, ref, onMounted, nextTick} from 'vue'

export default function useLeftTree() {
  //树的ref
  const parentTree = ref<InstanceType<typeof ElTree>>();
  //树的数据
  const treeData = reactive({
    data: []
  })
  //选中的数据
  const selectNode = reactive<SelectNode>({
    id: '',
    name: ''
  })
  //树的属性
  const defaultProps = reactive({
    children: 'children',
    label: 'name',
  })
  //树的点击事件
  const handleNodeClick = (data: DeptModel) => {
    selectNode.id = data.id;
    selectNode.name = data.name
  }
  //获取树的数据
  const getTreeData = () => {
    getLeftTreeApi().then((res) => {
      if (res && res.code == 200) {
        treeData.data = res.data;
        nextTick(() => {
          const firstNode = document.querySelector(".el-tree-node") as any;
          if (firstNode) firstNode.click();
        })
      }
    });

  }
  onMounted(() => {
    getTreeData();
  })

  //加号和减号的点击事件
  const openBtn = (data: DeptModel) => {
    //设置展开或者关闭
    data.open = !data.open;
    if (parentTree.value) {
      parentTree.value.store.nodesMap[data.id].expanded = !data.open;
    }
  }
  return {
    treeData,
    defaultProps,
    handleNodeClick,
    getTreeData,
    openBtn,
    parentTree,
    selectNode
  }
}
```

src/services/userService.ts

```
const Api = {
+  getLeftTree: normalURL + '/api/department/list',
+  getUserList: normalURL + '/api/user/list',
}

+ //获取用户部门树
+ export const getLeftTreeApi = async () => {
+   return await http.get(Api.getLeftTree)
+ }
+ 
+ //获取用户列表
+ export const getUserListApi = async (param: UserListParm) => {
+   return await http.get(Api.getUserList, param)
+ }
```

### 第31讲 用户管理->右侧列表

src/views/system/User/UserList.vue

```
<template>
  <el-container :style="{ height: containerHeight + 'px' }">
    <el-aside width="200px" style="border-right: 1px solid #dfe6ec">
      <!-- Aside content -->
      <LeftTree ref="userLeftTree" @treeClick="treeClick"></LeftTree>
    </el-aside>
    <el-main>
+      <!-- 搜索栏 -->
+      <el-form :model="listParams" label-width="80px" :inline="true" size="mini">
+        <el-form-item label>
+          <el-input v-model="listParams.loginName"></el-input>
+        </el-form-item>
+        <el-form-item>
+          <el-button size="mini" :icon="Search">搜索</el-button>
+          <el-button size="mini" :icon="Close">重置</el-button>
+          <el-button size="mini" type="primary" :icon="Plus">新增</el-button>
+        </el-form-item>
+      </el-form>
+      <!-- 用户表格 -->
+      <el-table :height="tableHeight" :data="tableData.list" border stripe>
+        <el-table-column prop="loginName" label="用户名"></el-table-column>
+        <el-table-column prop="deptName" label="所属部门"></el-table-column>
+        <el-table-column prop="mobile" label="电话"></el-table-column>
+        <el-table-column prop="email" label="邮箱"></el-table-column>
+        <el-table-column align="center" width="320" label="操作">
+          <template #default="scope">
+            <el-button type="primary" size="mini" :icon="Edit" @click=''>编辑</el-button>
+            <el-button type="primary" size="mini"  :icon="Setting" @click="">分配角色</el-button>
+            <el-button type="danger" size="mini" :icon="Delete" @click=''>删除</el-button>
+          </template>
+        </el-table-column>
+      </el-table>
+      <!-- 分页 -->
+      <el-pagination
+        @size-change="sizeChange"
+        @current-change="currentChange"
+        :current-page.sync="listParams.currentPage"
+        :page-sizes="[10, 20, 40, 80, 100]"
+        :page-size="listParams.pageSize"
+        :total="listParams.total"
+        layout="total, sizes, prev, pager, next, jumper"
+        background
+      ></el-pagination>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
+    import {Search, Close, Plus, Delete, Edit} from '@element-plus/icons-vue';
    import LeftTree from './LeftTree.vue';
+    import useUserTable from '@/composables/userManager/useUserTable';
    import {ref, onMounted, nextTick} from 'vue'
    //容器高度
    const containerHeight = ref(0);
    //表格高度
    const tableHeight = ref(0);
    //表格数据
+    const {listParams, tableData, getUserList, treeClick, sizeChange, currentChange} = useUserTable();
    onMounted(() => {
      nextTick(() => {
        containerHeight.value = window.innerHeight - 100
        tableHeight.value = window.innerHeight - 220
      })
    })
</script>
```

src/composables/userManager/useUserTable.ts

```
import {reactive} from 'vue'
import {UserListParams} from "@/services/userModel";
import {getUserListApi} from "@/services/userService";

export default function useUserTable() {
  //列表参数
  const listParams = reactive<UserListParams>({
    deptId: '',
    currentPage: 1,
    pageSize: 10,
    loginName: '',
    total: 0
  })
  //表格数据
  const tableData = reactive({
    list: []
  })

  //获取表格数据
  const getUserList = () => {
    getUserListApi(listParams).then((res) => {
      if (res && res.code == 200) {
        tableData.list = res.data.records
        listParams.total = res.data.total;
      }
    })
  }
  //树点击数据
  const treeClick = (deptId: number) => {
    listParams.deptId = deptId;
    getUserList();
  }
  //页容量改变触发
  const sizeChange = (size: number) => {
    listParams.pageSize = size;
    getUserList();
  }
  //页数改变触发
  const currentChange = (page: number) => {
    listParams.currentPage = page
    getUserList();
  }
  return {
    listParams,
    tableData,
    getUserList,
    treeClick,
    sizeChange,
    currentChange
  }
}
```

src/views/system/User/LeftTree.vue

```
+ onst emit = defineEmits(['treeClick'])
+ /树相关数据
+ onst {treeData, defaultProps, handleNodeClick, getTreeData, openBtn, parentTree, selectNode} = useLeftTree(emit);
```

src/composables/userManager/useLeftTree.ts

```
+ export default function useLeftTree(emit: any) {
      const handleNodeClick = (data: DeptModel) => {
        selectNode.id = data.id;
        selectNode.name = data.name
+        emit('treeClick', data.id)
      }
})
```

### 第32讲 用户管理->新增->部门树选择(复用之前的)

src/views/system/User/AddAndEdit.vue

```
<el-form-item prop="deptName" label="所属部门">
+  <el-input v-model="addModel.deptName" @click="selectTree"></el-input>
</el-form-item>

</SysDialog>
<!-- 上级部门弹框 -->
+ <deparentmentSelectTree ref="selectTreeRef" @select="select"></deparentmentSelectTree>

=====================================================

+ import deparentmentSelectTree from '@/views/system/department/deparentmentSelectTree.vue'
+ import useSelectTree from "@/composables/department/useSelectTree";
+ 
+ const {show, confirm, addUserForm, select} = useUserAddAndEdit(dialog, onShow, onClose, addModel, emit);
+ // 调用子组件deparentmentSelectTree.vue
+ const { selectTreeRef, selectTree } = useSelectTree();
```

src/composables/userManager/useUserAddAndEdit.ts

```
+ import {SelectNode} from "@/services/departmentModel";

// 选择
+ const select = (node: SelectNode) => {
+     addModel.deptId = node.id;
+     addModel.deptName = node.name
+ }

return {
    show,
    confirm,
    addUserForm,
+    select
}

```

### 第33讲 角色管理->列表、新增、编辑、删除

src/services/roleService.ts

```
import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {AddRoleModel, AssignSaveParm, AssignTreeParm, DeleteParm, RoleListParm} from "./roleModel"

const Api = {
  getList: normalURL + '/api/role/list',
  add: normalURL + '/api/role',
  assignTree: normalURL + '/api/role/getAssignPermissionTree',
  assignSave: normalURL + '/api/role/roleAssignSave'
}

//角色列表
export const getRoleListApi = async (params: RoleListParm) => {
  return await http.get(Api.getList, params)
}
//新增角色
export const addRoleApi = async (params: AddRoleModel) => {
  return await http.post(Api.add, params)
}
//编辑角色
export const editRoleApi = async (params: AddRoleModel) => {
  return await http.put(Api.add, params)
}
//删除角色
export const deleteRoleApi = async (params: DeleteParm) => {
  return await http.delete(Api.add, params)
}
//分配权限树的数据
export const assignTreeApi = async (params: AssignTreeParm) => {
  return await http.get(Api.assignTree, params)
}
//分配权限保存
export const assignSaveApi = async (params: AssignSaveParm) => {
  return await http.post(Api.assignSave, params)
}
```

src/services/roleModel.ts

```
/**
 * 角色列表查询参数
 */
 export interface RoleListParm{
    userId:string | number;
    currentPage:number;
    pageSize:number;
    name:string;
    total:number;
}
/**
 * 角色类型定义
 */
export interface AddRoleModel{
    id:number | string;
    name:string;
    remark:string;
    createUser:string | number;
    type:string; //区分新增 、 编辑
}
export interface DeleteParm{
    id:number | string;
}
//分配权限树数据查询参数
export interface AssignTreeParm{
    userId:number | string;
    roleId:number | string;
}
/**
 * 分配权限保存参数
 */
export interface AssignSaveParm{
    roleId:string | number;
    list:Array<string | number>
}
```

src/views/system/Role/RoleList.vue

```
<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="listParm" label-width="80px" :inline="true" size="mini">
      <el-form-item>
        <el-input placeholder="请输入角色名称" v-model="listParm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">搜索</el-button>
        <el-button style="color: #FF7670;" :icon="Close" @click="resetBtn">重置</el-button>
        <el-button
          type="primary"
          :icon="Plus"
          @click="addBtn"
        >新增
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="roleTable.list" border stripe>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="remark" label="角色备注"></el-table-column>
      <el-table-column label="操作" align="center" width="320">
        <template #default="scope">
          <el-button
            type="primary"
            size="mini"
            :icon="Edit"
            @click="editBtn(scope.row)"
          >编辑
          </el-button>
          <el-button
            type="primary"
            size="mini"
            :icon="Setting"
          >分配权限
          </el-button>
          <el-button
            type="danger"
            size="mini"
            :icon="Delete"
            @click="deleteBtn(scope.row.id)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="listParm.currentPage"
      :page-sizes="[10, 20, 40, 80, 100]"
      :page-size="listParm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listParm.total"
      background
    ></el-pagination>
  </el-main>
  <!-- 新增、编辑弹框 -->
  <AddRole ref="addRoleRef" @save="save"></AddRole>
</template>
<script setup lang="ts">
import useRoleTable from '@/composables/role/useRoleTable';
import useRole from '@/composables/role/useRole';
import AddRole from './AddRole.vue';
import {Search, Edit, Plus, Setting, Close, Delete} from '@element-plus/icons-vue';
import {ref, onMounted, nextTick} from 'vue';

//表格列表
const {listParm, roleTable, getRoleList, sizeChange, currentChange, searchBtn, resetBtn} = useRoleTable()
//新增、编辑
const {addBtn, editBtn, deleteBtn, save, addRoleRef} = useRole(getRoleList)

//表格的高度
const tableHeight = ref(0);
onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 220
  })
})
</script>
```

src/composables/role/useRoleTable.ts

```
import {reactive, onMounted} from "vue";
import {getUserId} from "@/utils/auth";
import {RoleListParm} from "@/services/roleModel";
import {getRoleListApi} from "@/services/roleService";

export default function useRoleTable() {
  //定义列表查询的参数
  const listParm = reactive<RoleListParm>({
    userId: getUserId() || '',
    currentPage: 1,
    pageSize: 10,
    name: '',
    total: 0
  })
  //定义表格数据
  const roleTable = reactive({
    list: []
  })

  //获取角色列表
  const getRoleList = () => {
    getRoleListApi(listParm).then((res) => {
      if (res && res.code == 200) {
        roleTable.list = res.data.records
        listParm.total = res.data.total;
      }
    })
  }

  //搜索
  const searchBtn = () => {
    getRoleList();
  }
  //重置
  const resetBtn = () => {
    listParm.name = '';
    getRoleList();
  }
  //页大小
  const sizeChange = (size: number) => {
    listParm.pageSize = size;
    getRoleList();
  }
  //页数
  const currentChange = (page: number) => {
    listParm.currentPage = page;
    getRoleList();
  }
  onMounted(() => {
    getRoleList();
  })

  return {
    roleTable,
    listParm,
    getRoleList,
    sizeChange,
    currentChange,
    searchBtn,
    resetBtn
  }
}
```

src/composables/role/useRole.ts

```
import {EditType} from "@/type/BaseEnum"
import {ref} from "vue"
import useInstance from "@/hooks/useInstance"
import {AddRoleModel} from "@/services/roleModel";
import {addRoleApi, deleteRoleApi, editRoleApi} from "@/services/roleService";
import {Result} from "@/http/ajax";

export default function useRole(getRoleList: any) {
  const {global} = useInstance()
  //弹窗ref
  const addRoleRef = ref<{ show: (type: string, row?: AddRoleModel) => void }>()
  //新增
  const addBtn = () => {
    addRoleRef.value?.show(EditType.ADD)
  }
  //编辑
  const editBtn = (row: AddRoleModel) => {
    addRoleRef.value?.show(EditType.EDIT, row)
  }
  //删除
  const deleteBtn = async (id: number) => {
    let parm = {
      id: id
    }
    //信息确认
    let confirm = await global.$$myConfirm('确定删除该数据吗?')
    if (confirm) {
      let res = await deleteRoleApi(parm)
      if (res && res.code == 200) {
        global.$message({message: res.msg, type: 'success'})
        getRoleList();

      }
    }
  }
  //保存
  const save = async (parm: AddRoleModel) => {
    let res: Result;
    if (parm.type == EditType.ADD) {
      res = await addRoleApi(parm)
    } else {
      res = await editRoleApi(parm)
    }
    if (res && res.code == 200) {
      global.$message({message: res.msg, type: 'success'})
      getRoleList();
    }
  }

  return {
    addBtn,
    editBtn,
    deleteBtn,
    save,
    addRoleRef,
  }
}
```

src/views/system/Role/AddRole.vue

```
<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <template v-slot:content>
      <el-form
        :model="addModel"
        ref="addRoleForm"
        :rules="rules"
        label-width="80px"
        size="mini"
      >
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop='name' label="角色名称">
              <el-input v-model="addModel.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="角色备注">
              <el-input v-model="addModel.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useAddRole from '@/composables/role/useAddRole';

//弹框属性
const {dialog, onClose, onShow} = useDialog()
//声明事件
const emit = defineEmits(['save'])
const {confirm, show, addModel, rules, addRoleForm} = useAddRole(dialog, onClose, onShow, emit)

//暴露出去给外部使用
defineExpose({show})
</script>
<style scoped lang='scss'>
</style>
```

src/composables/role/useAddRole.ts

```
import {EditType, Title} from "@/type/BaseEnum";
import {DialogModel} from "@/type/BastType"
import {ElForm} from "element-plus";
import {reactive, ref} from "vue";
import useInstance from "@/hooks/useInstance";
import {AddRoleModel} from "@/services/roleModel";

export default function useAddRole(dialog: DialogModel, onClose: any, onShow: any, emit: any) {
  //全局属性
  const {global} = useInstance()
  //表单ref
  const addRoleForm = ref<InstanceType<typeof ElForm>>()
  //表单数据
  const addModel = reactive<AddRoleModel>({
    id: '',
    name: '',
    createUser: '',
    type: '',
    remark: ''
  })
  //表单验证
  const rules = reactive({
    name: [{
      trigger: 'change',
      required: true,
      message: '请填写角色名称'
    }]
  })
  //确定
  const confirm = () => {
    addRoleForm.value?.validate(valid => {
      if (valid) {
        emit('save', addModel)
        onClose();
      }
    })
  }
  //显示弹框 type : 0 和 1
  const show = (type: string, row: AddRoleModel) => {
    dialog.height = 180;
    type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
    onShow();
    global.$$resetForm(addRoleForm.value, addModel)
    if (type == EditType.EDIT) global.$$objCopy(row, addModel)
    addModel.type = type;
  }
  return {
    confirm,
    show,
    addModel,
    rules,
    addRoleForm
  }
}
```

### 第34讲 权限管理->全部功能

src/services/menuService.ts

```
import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {AddMenuModel} from "@/services/menuModel";

const Api = {
  getMenuList: normalURL + '/api/sysUser/getMenuList',
  getTable: normalURL + '/api/menu/list',
  getParent: normalURL + '/api/menu/parent',
  add: normalURL + '/api/menu'
}

//获取菜单
export const getMenuListApi = async () => {
  return await http.get(Api.getMenuList)
}

//获取菜单列表
export const getMenuTableApi = async () => {
  return await http.get(Api.getTable)
}
//获取上级菜单
export const getParentApi = async () => {
  return await http.get(Api.getParent)
}
//新增
export const addMenuApi = async (params: AddMenuModel) => {
  return await http.post(Api.add, params)
}
//编辑
export const editMenuApi = async (params: AddMenuModel) => {
  return await http.put(Api.add, params)
}
//删除
export const deleteMenApi = async (id: number) => {
  return await http.delete(Api.add, {id: id})
}
```

src/services/menuModel.ts

```
export interface AddMenuModel {
    id: string | number;
    editType: string; //新增 编辑 
    type: string;
    parentId: string | number;
    parentName: string;
    label: string;
    icon: string;
    name: string;
    path: string;
    url: string;
    code: string;
    orderNum: string | number;
}
export interface MenuModel{
    id: string | number, 
    parentId: string, 
    parentName: string, 
    label: string, 
    code: string, 
    path: string, 
    name: string, 
    url: string, 
    orderNum: string | number, 
    type: string, 
    icon: string, 
    remark: string, 
    createTime: string, 
    updateTime: string, 
    children:Array<MenuModel>, 
    value: string, 
    open: boolean
}
```

src/views/system/Menu/MenuList.vue

```
<template>
  <el-main>
    <!-- 按钮 -->
    <el-form :inline="true" size="mini">
      <el-form-item>
        <el-button
          type="primary"
          @click="addBtn"
          :icon="Plus"
        >新增
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table
      :height="tableHeight"
      :data="menuTable.list"
      style="width: 100%"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="label" label="菜单名称"/>
      <el-table-column prop="name" label="类型">
        <template #default="scope">
          <el-tag v-if="scope.row.type == '0'">目录</el-tag>
          <el-tag type="success" v-else-if="scope.row.type == '1'">菜单</el-tag>
          <el-tag type="danger" v-else-if="scope.row.type == '2'">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="图标">
        <template #default="scope">
          <Icon v-if="scope.row.icon && !scope.row.icon.includes('-')" class="icons" :icon="scope.row.icon"></Icon>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="路由名称"/>
      <el-table-column prop="path" label="路由地址"/>
      <el-table-column prop="url" label="组件路径"/>
      <el-table-column prop="code" label="权限字段"/>
      <el-table-column label="操作" align="center" width="200">
        <template #default="scope">
          <el-button
            type="primary"
            size="mini"
            @click="editBtn(scope.row)"
            :icon="Edit"
          >编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="deleteBtn(scope.row.id)"
            :icon="Delete"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
  <!-- 新增、编辑弹框 -->
  <AddMenu ref="addMenuRef" @save="save"></AddMenu>
</template>
<script setup lang="ts">
import useMenuTable from '@/composables/menu/useMenuTable';
import useMenu from '@/composables/menu/useMenu';
import AddMenu from './AddMenu.vue';
import {Edit, Delete, Plus} from '@element-plus/icons-vue';
import {ref, onMounted, nextTick} from 'vue';

//表格数据获取
const {menuTable, getMenuTable} = useMenuTable()
//表格的操作
const {addBtn, editBtn, deleteBtn, save, addMenuRef} = useMenu(getMenuTable)

//表格高度
const tableHeight = ref(0);
onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 200
  })
})
</script>
<style lang="scss" scoped>
.icons {
  width: 24px;
  height: 18px;
  margin-right: 5px;
}
</style>
```

src/composables/menu/useMenuTable.ts

```
import {reactive, onMounted} from "vue"
import {getMenuTableApi} from "@/services/menuService";

export default function useMenuTable() {
  //表格数据
  const menuTable = reactive({
    list: []
  })

  //获取表格数据
  const getMenuTable = () => {
    getMenuTableApi().then((res) => {
      if (res && res.code == 200) {
        menuTable.list = res.data;
      }
    })
  }

  onMounted(() => {
    getMenuTable()
  })
  return {
    menuTable,
    getMenuTable
  }
}
```

src/composables/menu/useMenu.ts

```
import {Result} from "@/http/ajax"
import {EditType} from "@/type/BaseEnum";
import {ref} from "vue"
import useInstance from "@/hooks/useInstance";
import {AddMenuModel, MenuModel} from "@/services/menuModel";
import {addMenuApi, deleteMenApi, editMenuApi} from "@/services/menuService";

export default function useMenu(getMenuTable: any) {
  const {global} = useInstance()
  //弹框ref
  const addMenuRef = ref<{ show: (type: string, row?: MenuModel) => void }>();
  //新增
  const addBtn = () => {
    addMenuRef.value?.show(EditType.ADD)
  }
  //编辑
  const editBtn = (row: MenuModel) => {
    addMenuRef.value?.show(EditType.EDIT, row)
  }
  //删除
  const deleteBtn = async (id: number) => {
    let confrim = await global.$$myConfirm('确定删除该数据吗?')
    if (confrim) {
      let res = await deleteMenApi(id);
      if (res && res.code == 200) {
        global.$message({message: res.msg, type: 'success'})
        getMenuTable();
      }
    }
  }
  //保存
  const save = async (params: AddMenuModel) => {
    let res: Result;
    if (params.editType == EditType.ADD) {
      res = await addMenuApi(params)
    } else {
      res = await editMenuApi(params)
    }
    if (res && res.code == 200) {
      global.$message({message: res.msg, type: 'success'})
      getMenuTable();
    }
  }
  return {
    addBtn,
    editBtn,
    deleteBtn,
    save,
    addMenuRef
  }
}
```

src/views/system/Menu/AddMenu.vue

```
<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onConfirm="confrim"
    @onClose="onClose"
  >
    <template v-slot:content>
      <el-form
        :model="addMenuModel"
        ref="addMenuForm"
        :rules="rules"
        label-width="80px"
        size="mini"
      >
        <el-row>
          <el-col :span="24" :offset="0">
            <el-form-item prop='type' label="菜单类型">
              <el-radio-group v-model="addMenuModel.type">
                <el-radio :label="'0'">目录</el-radio>
                <el-radio :label="'1'">菜单</el-radio>
                <el-radio :label="'2'">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop='parentName' label="上级菜单">
              <el-input type="hidden" v-model="addMenuModel.parentId"></el-input>
              <el-input @click="selectTree" readonly v-model="addMenuModel.parentName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop='label' label="菜单名称">
              <el-input v-model="addMenuModel.label"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="addMenuModel.type !='2'" :span="12" :offset="0">
            <el-form-item prop='icon' label="菜单图标">
              <el-input v-model="addMenuModel.icon"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="addMenuModel.type =='1'" :span="12" :offset="0">
            <el-form-item prop='name' label="路由名称">
              <el-input v-model="addMenuModel.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col v-if="addMenuModel.type =='1'" :span="12" :offset="0">
            <el-form-item prop='path' label="路由地址">
              <el-input v-model="addMenuModel.path"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="addMenuModel.type =='1'" :span="12" :offset="0">
            <el-form-item prop='url' label="组件路径">
              <el-input v-model="addMenuModel.url"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop='code' label="权限字段">
              <el-input v-model="addMenuModel.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="菜单序号">
              <el-input v-model="addMenuModel.orderNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>
  <!-- 上级菜单弹框 -->
  <SelectTree ref="selectTreeRef" @select="select" :getTreeDataApi="getParentApi" :defaultProps="defaultProps"></SelectTree>
</template>
<script setup lang='ts'>
import SelectTree from '@/components/SelectTree.vue';
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useAddMenu from '@/composables/menu/useAddMenu';
import useSelectParent from '@/composables/department/useSelectTree';
import {getParentApi} from "@/services/menuService"

//注册事件
const emit = defineEmits(['save'])
//弹框属性
const {dialog, onClose, onShow} = useDialog()
const {confrim, show, addMenuModel, rules, addMenuForm, select} = useAddMenu(dialog, onClose, onShow, emit)
//上级部门
const {selectTreeRef, selectTree, defaultProps} = useSelectParent();

//暴露出去
defineExpose({show})
</script>
<style scoped lang='scss'>
</style>
```

src/composables/menu/useAddMenu.ts

```
import {EditType, Title} from "@/type/BaseEnum";
import {DialogModel} from "@/type/BastType"
import {reactive, ref} from "vue";
import {ElForm} from "element-plus";
import useInstance from "@/hooks/useInstance";
import {AddMenuModel, MenuModel} from "@/services/menuModel";
import {SelectNode} from "@/services/departmentModel";

export default function useAddMenu(dialog: DialogModel, onClose: any, onShow: any, emit: any) {
  const {global} = useInstance()
  //表单ref
  const addMenuForm = ref<InstanceType<typeof ElForm>>();
  //表单验证
  const rules = reactive({
    type: [
      {
        required: true,
        trigger: "change",
        message: "请选择菜单类型",
      },
    ],
    parentName: [
      {
        required: true,
        trigger: "change",
        message: "请选择上级菜单",
      },
    ],
    label: [
      {
        required: true,
        trigger: "change",
        message: "请填写菜单名称",
      },
    ],
    name: [
      {
        required: true,
        trigger: "change",
        message: "请填写路由名称",
      },
    ],
    path: [
      {
        required: true,
        trigger: "change",
        message: "请填写路由路径",
      },
    ],
    url: [
      {
        required: true,
        trigger: "change",
        message: "请填写组件路径",
      },
    ],
    code: [
      {
        required: true,
        trigger: "change",
        message: "请填写权限字段",
      },
    ],
    icon: [
      {
        required: true,
        trigger: "change",
        message: "请填写图标",
      },
    ]
  })
  //表单数据
  const addMenuModel = reactive<AddMenuModel>({
    id: '',
    editType: '',
    type: '',
    parentId: '',
    parentName: '',
    label: '',
    icon: '',
    name: '',
    path: '',
    url: '',
    code: '',
    orderNum: '',
  })
  //确定
  const confrim = () => {
    addMenuForm.value?.validate(valid => {
      if (valid) {
        emit('save', addMenuModel)
        onClose();
      }
    })
  }
  //展示弹框
  const show = (type: string, row: MenuModel) => {
    type == EditType.ADD ? (dialog.title = Title.ADD) : (dialog.title = Title.EDIT)
    onShow();
    global.$$resetForm(addMenuForm.value, addMenuModel)
    if (type == EditType.EDIT) global.$$objCopy(row, addMenuModel)
    addMenuModel.editType = type
  }
  //选中上级的数据
  const select = (node: SelectNode) => {
    addMenuModel.parentId = node.id;
    addMenuModel.parentName = node.name
  }
  return {
    confrim,
    show,
    addMenuModel,
    rules,
    addMenuForm,
    select
  }
}
```

src/composables/department/useSelectTree.ts

```
import {ref, reactive} from 'vue'

export default function useSelectTree() {
  //parent组件的ref属性
  const selectTreeRef = ref<{ show: () => void }>()

  //选择上级部门
  const selectTree = () => {
    selectTreeRef.value?.show();
  }

  const defaultProps = reactive({
    children: 'children',
    label: 'label',
  })

  return {
    selectTreeRef,
    selectTree,
    defaultProps
  }
}
```

重新封装选择树

src/components/SelectTree.vue

```
<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <template v-slot:content>
      <el-tree
        ref="parentTree"
        :data="treeData.data"
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :highlight-current="true"
        :expand-on-click-node="false"
        @node-click="handleNodeClick"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-container">
            <!-- 长度为0说明没有下级 -->
            <span v-if="data.children.length == 0">
                            <DocumentRemove
                              style="width: 1.3em; height: 1.3em; margin-right: 5px;color: #8c8c8c;"></DocumentRemove>
                        </span>
            <!-- 点击展开和关闭 -->
            <span v-else @click.stop="openBtn(data)">
                            <component style="width: 1.1em; height: 1.1em; margin-right: 5px;color: #8c8c8c;"
                                       :is="data.open ? Plus : Minus"/>
                        </span>
            <span>{{ node.label }}</span>
          </div>
        </template>
      </el-tree>
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue';
import {DocumentRemove, Plus, Minus} from '@element-plus/icons-vue'
import {ElTree} from 'element-plus';
import useDialog from '@/hooks/useDialog';
import {reactive, ref, defineProps} from 'vue'

const props = defineProps({
  getTreeDataApi: {//弹框标题
    type: Function,
    default: () => {}
  },
  defaultProps: { //控制弹框的展示和影藏
    type: Object,
    default: {
      children: 'children',
      label: 'label',
    }
  }
})

//弹框属性
const {dialog, onClose, onShow} = useDialog()
//树ref
const parentTree = ref<InstanceType<typeof ElTree>>();
//树数据
const treeData = reactive({
  data: []
})
//获取树数据
const getTreeData = async () => {
  let res = await props.getTreeDataApi();
  if (res && res.code == 200) {
    treeData.data = res.data;
  }
}
//树点击事件
const handleNodeClick = (data: any) => {
  selectNode.id = data.id;
  selectNode.name = data.label
}
//树点击后的数据
const selectNode = reactive<any>({
  id: '',
  name: ''
})
//树的属性
// const defaultProps = reactive({
//   children: 'children', //设置树的children
//   label: 'label', //设置树的名字属性字段
// })

//加号和减号的点击事件
const openBtn = (data: any) => {
  //设置展开或者关闭
  data.open = !data.open;
  if (parentTree.value) {
    parentTree.value.store.nodesMap[data.id].expanded = !data.open;
  }
}

//子组件传值给父组件
const emit = defineEmits(['select'])
//弹框确定
const confirm = () => {
  emit('select', selectNode)
  onClose();
}

//供父组件调用，显示弹框
const show = async () => {
  await getTreeData();
  dialog.title = '选择上级菜单'
  dialog.height = 420;
  dialog.width = 300;
  //显示
  onShow();
}

//把方法暴露出去
defineExpose({show})
</script>

<style lang="scss">
.el-tree {
  // 将每一行的设置为相对定位 方便后面before after 使用绝对定位来固定位置
  .el-tree-node {
    position: relative;
    padding-left: 10px;
  }

  // 子集像右偏移 给数线留出距离
  .el-tree-node__children {
    padding-left: 20px;
  }

  //这是竖线
  .el-tree-node :last-child:before {
    height: 40px;
  }

  .el-tree > .el-tree-node:before {
    border-left: none;
  }

  .el-tree > .el-tree-node:after {
    border-top: none;
  }

  //这自定义的线 的公共部分
  .el-tree-node:before,
  .el-tree-node:after {
    content: "";
    left: -4px;
    position: absolute;
    right: auto;
    border-width: 1px;
  }

  .tree :first-child .el-tree-node:before {
    border-left: none;
  }

  // 竖线
  .el-tree-node:before {
    border-left: 1px dotted #d9d9d9;
    bottom: 0px;
    height: 100%;
    top: -25px;
    width: 1px;
  }

  //横线
  .el-tree-node:after {
    border-top: 1px dotted #d9d9d9;
    height: 20px;
    top: 14px;
    width: 24px;
  }

  .el-tree-node__expand-icon.is-leaf {
    width: 8px;
  }

  //去掉elementui自带的展开按钮  一个向下的按钮,打开时向右
  .el-tree-node__content > .el-tree-node__expand-icon {
    display: none;
  }

  //每一行的高度
  .el-tree-node__content {
    line-height: 30px;
    height: 30px;
    padding-left: 10px !important;
  }
}

//去掉最上级的before  after 即是去电最上层的连接线
.el-tree > div {
  &::before {
    display: none;
  }

  &::after {
    display: none;
  }
}
</style>
```

### 第35讲 用户管理->分配角色

src/services/userService.ts

```
import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {AddUserModel, AssignRoleListParm, LoginResult, SelectRoleParm, UserInfo, UserListParams} from './userModel'
import qs from "qs";

const Api = {
  getImg: normalURL + '/api/sysUser/image',
  login: normalURL + '/api/user/login',
  getUserInfo: normalURL + '/api/sysUser/getInfo',
  getLeftTree: normalURL + '/api/department/list',
  getUserList: normalURL + '/api/user/list',
  addAndEdit: normalURL + '/api/user',
  getRoleList: normalURL + '/api/user/getRolistForAssign',
  getRoleId: normalURL + '/api/user/getRoleIdByUserId',
  assignSave: normalURL + '/api/user/assingRole',
  loginOut: normalURL + '/api/sysUser/loginOut',
  restore: normalURL + '/api/backup/restore'
}

//获取验证码
export async function getImageApi() {
  return await http.getImage(Api.getImg)
}
//登录
export async function loginApi(params: any) {
  return await http.postAny<LoginResult>(Api.login, params, {
    transformRequest: [(params) => qs.stringify(params, {indices: false})],
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
  })
}
//获取用户信息
export const getUserInfoApi = async () => {
  return await http.get<UserInfo>(Api.getUserInfo)
}
//获取用户部门树
export const getLeftTreeApi = async () => {
  return await http.get(Api.getLeftTree)
}
//获取用户列表
export const getUserListApi = async (param: UserListParams) => {
  return await http.get(Api.getUserList, param)
}
//新增用户
export const addUserApi = async (params: AddUserModel) => {
  return await http.post(Api.addAndEdit, params)
}
//编辑用户
export const editUserApi = async (params: AddUserModel) => {
  return await http.put(Api.addAndEdit, params)
}
//删除用户
export const deleteUserApi = async (params: any) => {
  return await http.delete(Api.addAndEdit, params)
}
//获取分配角色弹框列表
export const getRoleListApi = async (params: AssignRoleListParm) => {
  return await http.get(Api.getRoleList, params)
}
//查询用户原来用有的角色id
export const getRoleIdApi = async (userId: number | string) => {
  return await http.getRestApi(Api.getRoleId, {userId: userId})
}
//分配角色保存
export const assingRoleSaveApi = async (params: SelectRoleParm) => {
  return await http.post(Api.assignSave, params)
}
//退出登录
export const loginOutApi = async (params: any) => {
  return await http.post(Api.loginOut, params)
}
//还原数据
export const restoreApi = async () => {
  return await http.post(Api.restore, null)
}

// enum Api {
//   getImg = '/api/sysUser/image'
// }
//获取验证码
// export async function getImageApi() {
//   return await http.getImage(api.getImg)
// }
```

src/views/system/User/UserList.vue

```
+ <!-- 分配角色弹框 -->
+ <AssignRole ref='assignRoleRef'></AssignRole>

=============

+ import AssignRole from './AssignRole.vue';
+ const {userAddRef, addBtn, editBtn, deleteBtn, assignBtn, save, assignRoleRef} = useUserBtn(getUserList);
```

src/composables/userManager/useUserBtn.ts

```
+ //分配角色ref
+ const assignRoleRef = ref<{ show: (name: string, useId: string | number) => void }>();
+ //分配角色
+ const assignBtn = (row: AddUserModel) => {
+     assignRoleRef.value?.show(row.loginName, row.id)
+ }

+ return {
+     assignRoleRef,
+     assignBtn
+ }
```

src/views/system/User/AssignRole.vue

```
<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <template v-slot:content>
      <!-- 角色列表 -->
      <el-table size='mini' :height="tableHeight" :data="roleList.list" border stripe>
        <el-table-column width="50" align="center" label="选择">
          <template #default="scope">
            <el-radio
              v-model="selectRoleId"
              :label="scope.row.id"
              @change="getSlectRole(scope.row)"
            >{{ "" }}
            </el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="parms.currentPage"
        :page-sizes="[4, 20, 40, 80, 100]"
        :page-size="parms.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="parms.total"
        background
      ></el-pagination>
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useAssignRole from '@/composables/userManager/useAssignRole';
//弹框属性
const {dialog, onClose, onShow} = useDialog()

const {
  confirm,
  show,
  roleList,
  parms,
  sizeChange,
  currentChange,
  tableHeight,
  selectRoleId,
  getSlectRole
} = useAssignRole(dialog, onClose, onShow)

//暴露方法
defineExpose({show})
</script>
<style scoped lang='scss'>
</style>
```

src/composables/userManager/useAssignRole.ts

```
import {DialogModel} from '@/type/BastType'
import {ref, reactive, onMounted, nextTick} from 'vue'
import {getUserId} from '@/utils/auth';
import useInstance from '@/hooks/useInstance';
import {AssignRoleListParm} from "@/services/userModel";
import {assingRoleSaveApi, getRoleIdApi, getRoleListApi} from "@/services/userService";

export default function useAssignRole(dialog: DialogModel, onClose: any, onShow: any) {
  const {global} = useInstance()
  //表格高度
  const tableHeight = ref(0)
  //被分配角色的用户id
  const selecUserId = ref<string | number>('');
  //选择的角色id
  const selectRoleId = ref('');
  //确定
  const confirm = async () => {
    if (!selectRoleId.value) {
      global.$message({message: '请选择角色', type: 'warning'})
      return;
    }
    let parm = {
      roleId: selectRoleId.value,
      userId: selecUserId.value
    }
    let res = await assingRoleSaveApi(parm)
    if (res && res.code == 200) {
      global.$message({message: '分配成功', type: 'success'})
      onClose();
    }
  }
  //展示弹框
  const show = async (name: string, userId: string | number) => {
    selecUserId.value = userId
    selectRoleId.value = ''
    //查询该用户原来的角色id
    let res = await getRoleIdApi(userId)
    if (res && res.data) {
      selectRoleId.value = res.data.roleId
    }
    //设置弹框标题
    dialog.title = '为【' + name + '】分配角色';
    onShow();
  }
  //角色列表查询参数
  const parms = reactive<AssignRoleListParm>({
    currentPage: 1,
    pageSize: 4,
    userId: getUserId() || '',
    total: 0
  })
  //角色列表数据
  const roleList = reactive({
    list: []
  })
  //获取列表的数据
  const getRoleList = () => {
    getRoleListApi(parms).then((res) => {
      if (res && res.code == 200) {
        roleList.list = res.data.records;
        parms.total = res.data.total;
      }
    })
  }
  onMounted(async () => {
    await nextTick(() => {
      tableHeight.value = window.innerHeight - 690
    })
    getRoleList()
  })
  //页容量改变时触发
  const sizeChange = (size: number) => {
    parms.pageSize = size;
    getRoleList()
  }
  //页数改变时触发
  const currentChange = (page: number) => {
    parms.currentPage = page;
    getRoleList()
  }
  //单选按钮点击事件
  const getSlectRole = (row: any) => {
    console.log(row)
    //设置选中的角色id
    selectRoleId.value = row.id
  }
  return {
    confirm,
    show,
    parms,
    roleList,
    sizeChange,
    currentChange,
    tableHeight,
    selectRoleId,
    getSlectRole
  }
}
```

### 第36讲 角色管理->分配权限

src/services/roleService.ts

```
import http from '@/http'
import {normalURL} from '@/services/serviceHelper'
import {AddRoleModel, AssignSaveParm, AssignTreeParm, DeleteParm, RoleListParm} from "./roleModel"

const Api = {
  getList: normalURL + '/api/role/list',
  add: normalURL + '/api/role',
  assignTree: normalURL + '/api/role/getAssignPermissionTree',
  assignSave: normalURL + '/api/role/roleAssignSave'
}

//角色列表
export const getRoleListApi = async (params: RoleListParm) => {
  return await http.get(Api.getList, params)
}
//新增角色
export const addRoleApi = async (params: AddRoleModel) => {
  return await http.post(Api.add, params)
}
//编辑角色
export const editRoleApi = async (params: AddRoleModel) => {
  return await http.put(Api.add, params)
}
//删除角色
export const deleteRoleApi = async (params: DeleteParm) => {
  return await http.delete(Api.add, params)
}

//分配权限树的数据
export const assignTreeApi = async (params: AssignTreeParm) => {
  return await http.get(Api.assignTree, params)
}
//分配权限保存
export const assignSaveApi = async (params: AssignSaveParm) => {
  return await http.post(Api.assignSave, params)
}
```

src/services/roleModel.ts

```
/**
 * 角色列表查询参数
 */
 export interface RoleListParm{
    userId:string | number;
    currentPage:number;
    pageSize:number;
    name:string;
    total:number;
}
/**
 * 角色类型定义
 */
export interface AddRoleModel{
    id:number | string;
    name:string;
    remark:string;
    createUser:string | number;
    type:string; //区分新增 、 编辑
}
export interface DeleteParm{
    id:number | string;
}
//分配权限树数据查询参数
export interface AssignTreeParm{
    userId:number | string;
    roleId:number | string;
}
/**
 * 分配权限保存参数
 */
export interface AssignSaveParm{
    roleId:string | number;
    list:Array<string | number>
}

export interface AssignTreeData{
  list: any[],
  assignTreeChecked: any[] //原来分配的权限id的集合
}
```

src/views/system/Role/RoleList.vue

```
<el-button
    type="primary"
    size="mini"
    :icon="Setting"
+    @click="assignPermission(scope.row.id, scope.row.name)"
>分配权限
</el-button>

+ <!-- 分配权限弹框 -->
+ <AssignMenu ref="assignMenuRef"></AssignMenu>


+ import AssignMenu from './AssignMenu.vue';
+ const {addBtn, editBtn, deleteBtn, save, addRoleRef, assignMenuRef, assignPermission} = useRole(getRoleList)
```

src/composables/role/useRole.ts

```
+ //分配权限弹框的ref属性
+ const assignMenuRef = ref<{show:(roleId:string,name:string)=>void}>()
+ //分配权限按钮
+ const assignPermission = (roleId:string,name:string) => {
+     assignMenuRef.value?.show(roleId,name)
+ }

return {
    addBtn,
    editBtn,
    deleteBtn,
    save,
    addRoleRef,
+   assignMenuRef,
+   assignPermission
}
```

src/views/system/Role/AssignMenu.vue

```
<template>
  <SysDialog
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @onClose="onClose"
    @onConfirm="confirm"
  >
    <template v-slot:content>
      <el-tree
        ref="assignTree"
        :data="assignTreeData.list"
        node-key="id"
        :props="defaultProps"
        empty-text="暂无数据"
        :show-checkbox="true"
        default-expand-all
        :highlight-current="true"
        :default-checked-keys='assignTreeData.assignTreeChecked'
      ></el-tree>
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import useAssignMenu from '@/composables/role/useAssignMenu';

//弹框属性
const {dialog, onShow, onClose} = useDialog();
//组件业务
const {confirm, show, assignTreeData, defaultProps, assignTree} = useAssignMenu(dialog, onShow, onClose)
//暴露方法给父组件调用
defineExpose({show})
</script>
<style scoped lang='scss'>
</style>
```

src/composables/role/useAssignMenu.ts

```
import {DialogModel} from "@/type/BastType"
import {reactive, ref} from "vue"
import {getUserId} from "@/utils/auth"
import {ElTree} from "element-plus"
import useInstance from "@/hooks/useInstance"
import {AssignSaveParm, AssignTreeData, AssignTreeParm} from "@/services/roleModel";
import {assignSaveApi, assignTreeApi} from "@/services/roleService";

export default function useAssignMenu(dialog: DialogModel, onShow: any, onClose: any) {
  const {global} = useInstance()
  //权限树的ref属性
  const assignTree = ref<InstanceType<typeof ElTree>>()
  //树的属性配置
  const defaultProps = reactive({
    children: 'children',
    label: 'label',
  })
  //权限树数据
  const assignTreeData = reactive<AssignTreeData>({
    list: [],
    assignTreeChecked: [] //原来分配的权限id的集合
  })
  //定义分配权限保存的参数
  const saveParm = reactive<AssignSaveParm>({
    roleId: '',
    list: []
  })
  //确定事件
  const confirm = async () => {
    //获取选中的数据
    let checkedIds = assignTree.value?.getCheckedKeys(false) || []
    //获取半节点ids
    let hlfIds = assignTree.value?.getHalfCheckedKeys() || []
    saveParm.list = checkedIds?.concat(hlfIds)
    //提交保存
    let res = await assignSaveApi(saveParm)
    if (res && res.code == 200) {
      //信息提示
      global.$message({message: res.msg, type: 'success'})
      //关闭弹框
      onClose()
    }
  }
  //弹框展示
  const show = (roleId: string, name: string) => {
    //数据
    assignTreeData.list = []
    assignTreeData.assignTreeChecked = []
    //设置角色id
    saveParm.roleId = roleId;
    const params = {
      roleId: roleId,
      userId: getUserId() || ''
    }
    //查询权限树的数据
    getAssignTree(params);
    //设置弹框的属性
    dialog.height = 420
    dialog.width = 300
    dialog.title = '为【' + name + '】分配权限';
    onShow();
  }
  //获取权限树数据
  const getAssignTree = async (params: AssignTreeParm) => {
    let res = await assignTreeApi(params)
    if (res && res.code == 200) {
      //设置权限树数据
      assignTreeData.list = res.data.listmenu
      //设置角色原来的权限Id
      assignTreeData.assignTreeChecked = res.data.checkList
      //数据回显，判断角色原来是否已经分配过权限，如果有，回显
      if (assignTreeData.assignTreeChecked.length > 0) {
        let newArr: any[] = [];
        assignTreeData.assignTreeChecked.forEach((item => {
          checked(item, assignTreeData.list, newArr)
        }))
        assignTreeData.assignTreeChecked = newArr;
      }
    }
  }
  const checked = (id: any, data: any, newArr: any[]) => {
    data.forEach((item: any) => {
      if (item.id == id) {
        if (item.children && item.children.length == 0) {
          newArr.push(item.id)
        }
      } else {
        if (item.children && item.children.length != 0) {
          //递归调用
          checked(id, item.children, newArr)
        }
      }
    })
  }
  return {
    confirm,
    show,
    assignTreeData,
    defaultProps,
    assignTree
  }
}
```

### 第37讲 退出登录和还原数据对接

src/services/userService.ts

```
+ const Api = {
+   loginOut: normalURL + '/api/sysUser/loginOut',
+   restore: normalURL + '/api/backup/restore'
+ }
+ 
+ //退出登录
+ export const loginOutApi = async (params: any) => {
+   return await http.post(Api.loginOut, params)
+ }
+ //还原数据
+ export const restoreApi = async () => {
+   return await http.post(Api.restore, null)
+ }
```

src/layout/header/Header.vue

```
<div class="right">
+    <UserInfo></UserInfo>
</div>

+ import UserInfo from "@/layout/header/UserInfo.vue"
```

src/layout/header/UserInfo.vue

```
<template>
  <el-dropdown placement="bottom-start">
        <span class="el-dropdown-link">
            <img class="userimg" src="@/assets/avatar.jpg"/>
        </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="restore">还原数据</el-dropdown-item>
        <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang='ts'>
import useInstance from '@/hooks/useInstance';
import {cleanSession, getToken} from '@/utils/auth';
import {loginOutApi, restoreApi} from "@/services/userService";

const {global} = useInstance()
//退出登录
const loginOut = async () => {
  let confirm = await global.$$myConfirm('确定退出登录吗?')
  if (confirm) {
    let parm = {
      token: getToken()
    }
    let res = await loginOutApi(parm)
    if (res && res.code == 200) {
      //跳到登录
      window.location.href = "/login";
      //清空session
      cleanSession();
    }
  }
}
//还原数据
const restore = async () => {
  let confirm = await global.$$myConfirm('确定还原数据吗?')
  if (confirm) {
    let res = await restoreApi();
    if (res && res.code == 200) {
      //信息提示
      global.$message({message: res.msg, type: 'success'})
    }
  }
}
</script>
<style scoped lang='scss'>
.userimg {
  height: 42px;
  width: 42px;
  border-radius: 50%;
}
</style>
```

### 第38讲 自定义指令-按钮权限

语法和vue2有点区别, 但大差不差: https://v3.cn.vuejs.org/guide/migration/custom-directives.html

src/store/modules/user.ts

```
//定义getters
export const getters = {
+   //获取用户的权限字段
+   getPermissions(state: UserState) {
+     return state.permissions
+   }
}
```

src/directives/permission.ts

```
//自定义按钮权限指令
import {Directive} from 'vue'
import {store} from '@/store';

export const permission: Directive = {
  mounted(el, binding) {
    //value按钮上的权限
    const {value} = binding;
    //获取用户所有的权限
    const permissions = store.getters['user/getPermissions'];
    //判断传递进来的按钮权限，是否存在
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;
      //判断传递进来的按钮权限字段，是否存在当前用户的permissions
      const hasPermission = permissions.some((role) => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) { //没有权限时，影藏
        el.style.display = 'none'
      }
    } else {
      throw new Error('need roles! Like v-permission="[\'add\',\'edit\']"')
    }
  }
}
```

src/main.ts

```
import {permission} from './directives/permission'

app.directive('permission', permission)
```

src/views/system/department/department.vue

```
<el-button
+  v-permission="['sys:addDepartment']"
  size="large"
  type="primary"
  :icon="Plus"
  @click="addBtn"
>新增
</el-button>

 <el-button
+    v-permission="['sys:deleteDept']"
    size="mini"
    type="danger"
    :icon="Close"
    @click="deleteBtn(scope.row.id)"
>删除
</el-button>
```

测试: 新增用户->设置角色->角色分配权限->登录用户->看不到按钮即通过测试

### 第39讲 首页->echart使用方式一

安装echarts

```
npm install echarts -S
```

main.ts引入

```
import * as echarts from 'echarts'

app.config.globalProperties.$$echarts = echarts;     // echarts
```

src/layout/homepage/Index.vue

```
<template>
  <el-main :style="{ height: mainHeight + 'px' }">
    <div style="display: flex;">
      <el-card style="flex: 1;">
        <template #header>
          <div class="card-header">
            <span>订单统计</span>
          </div>
        </template>
        <div ref="orderTotalChart" :style="{ width: '400px', height: '300px' }"></div>
      </el-card>
      <el-card style="margin-left: 20px;flex: 1;">
        <template #header>
          <div class="card-header">
            <span>用户统计</span>
          </div>
        </template>
        <div ref="userTotalChart" :style="{ width: '400px', height: '300px' }"></div>
      </el-card>
      <el-card style="margin-left: 20px;flex: 1;">
        <template #header>
          <div class="card-header">
            <span>售后统计</span>
          </div>
        </template>
        <div ref="afterSaleTotalChart" :style="{ width: '400px', height: '300px' }"></div>
      </el-card>
    </div>
  </el-main>
</template>
<script setup lang='ts'>
import {ref, nextTick, onMounted, reactive, onBeforeUnmount} from 'vue'
import useInstance from '@/hooks/useInstance';
import {orderTotalOption, userTotalOption, afterSaleTotalOption} from "./echartDataNode";

const {global} = useInstance()
const mainHeight = ref(0)
const orderTotalChart = ref<HTMLElement>();
const userTotalChart = ref<HTMLElement>();
const afterSaleTotalChart = ref<HTMLElement>();

//柱状图
const loadOrderTotalChart = () => {
  const instance = global.$$echarts.init(orderTotalChart.value);
  orderTotalOption.setSeriesData([120, 200, 150, 80, 70, 110, 130])
  instance.setOption(orderTotalOption)
}
//饼图
const loadUserTotalChart = () => {
  const instance = global.$$echarts.init(userTotalChart.value);
  userTotalOption.setSeriesData([
    {value: 1048, name: 'Search Engine'},
    {value: 735, name: 'Direct'},
    {value: 580, name: 'Email'},
    {value: 484, name: 'Union Ads'},
    {value: 300, name: 'Video Ads'}])
  instance.setOption(userTotalOption)
}
//环图
const loadAfterSaleTotalChart = () => {
  const instance = global.$$echarts.init(afterSaleTotalChart.value);
  afterSaleTotalOption.setSeriesData([
    {value: 1048, name: 'Search Engine'},
    {value: 735, name: 'Direct'},
    {value: 580, name: 'Email'},
    {value: 484, name: 'Union Ads'},
    {value: 300, name: 'Video Ads'}
  ])
  instance.setOption(afterSaleTotalOption)
}

onMounted(() => {
  loadOrderTotalChart();
  loadUserTotalChart();
  loadAfterSaleTotalChart();
  nextTick(() => {
    mainHeight.value = window.innerHeight - 100
  })
})
</script>
<style scoped lang='scss'>
</style>
```

src/layout/homepage/echartDataNode.ts

```
import {reactive} from 'vue'

// 订单统计
export let orderTotalOption = reactive({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'bar'
    }
  ],
  setSeriesData(data: any) {
    this.series[0].data = data
  },
});
//用户统计
export let userTotalOption = reactive({
  title: {
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ],
  setSeriesData(data: any) {
    this.series[0].data = data
  },
});
//售后统计
export let afterSaleTotalOption = reactive({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: []
    }
  ],
  setSeriesData(data: any) {
    this.series[0].data = data
  },
});
```

### 第40讲 首页->echart使用方式二 (封装)

src/components/CommonEcharts.vue (封装组件)

```
<template>
  <div ref="commonEchartRef" :style="{ height: height, width: width }"></div>
</template>
<script setup lang='ts'>
import {ref, onMounted, watchEffect} from 'vue'
import useEcharts from '@/hooks/useEcharts';

//echarts的 ref属性
const commonEchartRef = ref<HTMLElement>()

//接收父组件传来的值
const props = withDefaults(defineProps<{
  width?: string,
  height: string,
  options: any
}>(), {
  width: '100%',
  height: '360px'
})
onMounted(() => {
  const {setOptions, resize} = useEcharts(commonEchartRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
  window.addEventListener('resize', () => {
    resize();
  })
})

</script>
<style scoped lang='scss'>
</style>
```

src/hooks/useEcharts.ts (组合式API)

```
import * as echarts from 'echarts'
import {EChartsOption} from 'echarts'

export default function useEcharts(el: HTMLElement) {
  //创建echarts实例
  const echartInstance = echarts.init(el)
  //设置options
  const setOptions = (options: any) => {
    echartInstance.setOption(options)
  }
  //监听窗口变化做自适应
  const resize = () => {
    echartInstance.resize()
  }
  return {
    setOptions,
    resize
  }
}
```

src/layout/homepage/Index.vue

```
<template>
  <el-main :style="{ height: mainHeight + 'px' }">
    <div style="display: flex;">
      <el-card style="flex: 1;">
        <template #header>
          <div class="card-header">
            <span>订单统计</span>
          </div>
        </template>
<!--        <div ref="orderTotalChart" :style="{ width: '400px', height: '300px' }"></div>-->
        <CommonEcharts :options="orderTotalOption" :height="'30vh'"></CommonEcharts>
      </el-card>
      <el-card style="margin-left: 20px;flex: 1;">
        <template #header>
          <div class="card-header">
            <span>用户统计</span>
          </div>
        </template>
<!--        <div ref="userTotalChart" :style="{ width: '400px', height: '300px' }"></div>-->
        <CommonEcharts :options="userTotalOption" :height="'30vh'"></CommonEcharts>
      </el-card>
      <el-card style="margin-left: 20px;flex: 1;">
        <template #header>
          <div class="card-header">
            <span>售后统计</span>
          </div>
        </template>
<!--        <div ref="afterSaleTotalChart" :style="{ width: '400px', height: '300px' }"></div>-->
        <CommonEcharts :options="afterSaleTotalOption" :height="'30vh'"></CommonEcharts>
      </el-card>
    </div>
  </el-main>
</template>
<script setup lang='ts'>
import {ref, nextTick, onMounted, reactive, onBeforeUnmount} from 'vue'
// import useInstance from '@/hooks/useInstance';
import {orderTotalOption, userTotalOption, afterSaleTotalOption} from "./echartDataNode";
import CommonEcharts from '@/components/CommonEcharts.vue'

// const {global} = useInstance()
const mainHeight = ref(0)
// const orderTotalChart = ref<HTMLElement>();
// const userTotalChart = ref<HTMLElement>();
// const afterSaleTotalChart = ref<HTMLElement>();

//柱状图
const loadOrderTotalChart = () => {
  // const instance = global.$$echarts.init(orderTotalChart.value);
  orderTotalOption.setSeriesData([120, 200, 150, 80, 70, 110, 130])
  // instance.setOption(orderTotalOption)
  setTimeout(() => {
    orderTotalOption.setSeriesData([11, 33, 135, 40, 170, 10, 140])
  }, 2000)
}
//饼图
const loadUserTotalChart = () => {
  // const instance = global.$$echarts.init(userTotalChart.value);
  userTotalOption.setSeriesData([
    {value: 1048, name: 'Search Engine'},
    {value: 735, name: 'Direct'},
    {value: 580, name: 'Email'},
    {value: 484, name: 'Union Ads'},
    {value: 300, name: 'Video Ads'}])
  // instance.setOption(userTotalOption)
}
//环图
const loadAfterSaleTotalChart = () => {
  // const instance = global.$$echarts.init(afterSaleTotalChart.value);
  afterSaleTotalOption.setSeriesData([
    {value: 1048, name: 'Search Engine'},
    {value: 735, name: 'Direct'},
    {value: 580, name: 'Email'},
    {value: 484, name: 'Union Ads'},
    {value: 300, name: 'Video Ads'}
  ])
  // instance.setOption(afterSaleTotalOption)
}

onMounted(() => {
  loadOrderTotalChart();
  loadUserTotalChart();
  loadAfterSaleTotalChart();
  nextTick(() => {
    mainHeight.value = window.innerHeight - 100
  })
})
</script>
<style scoped lang='scss'>
</style>
```

### 第41讲 首页->echarts改CDN方式引入

index.html

```
<script src="https://cdn.jsdelivr.net/npm/echarts@5.2.2/dist/echarts.min.js"></script>
```

vite.config.ts

```
build: {
    rollupOptions: {
+      external: ["vue", 'element-plus', 'echarts'],
      plugins: [
        externalGlobals({
          vue: "Vue",
          "element-plus": "ElementPlus",
+          "echarts": "echarts",
        }),
      ],
    }
},
```

附: 也可以使用官网的按需引入




### 第99讲 坑

#### 1.vue3+vite 热更新失效

答:发现页面文件名和路由引入大小写不一致。改成一致即可

#### 2.webstorm不持之vue3.2的setup简写

下面写法虽然能运行, 但显示太多波浪线了

```
<script setup lang="ts">
    const count = ref(0)
</script>
```

只能使用之前旧的写法了

```
<script lang="ts">
  import { ref, computed, defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'HelloWorld',
    props: {
        msg: String
    }
    setup(prop) {
      const count = ref(0)
      
      return {
        count
      }
    }
  });
</script>
```

---

`.vue文件`在webstorm中类型检测不友好

- 改用vscode好很多

---

#### 3.ts的配置可以直接拿`vue3-webpack脚手架版本`的

```
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "importHelpers": true,
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

#### 4.warning: "@charset" must be the first rule in the file

```
// 添加配置即可
https://www.jianshu.com/p/a45f48448be9
```

#### 5.vite 打包大于500kb控制台警告

```
Some chunks are larger than 500 KiB after minification. Consider

打包出来的vendor.js文件太大(第三方依赖的, element-plus/vue/moment)
```

通过CDN+Vite修改打包配置解决

/index.html

```
<head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
+    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/element-plus/dist/index.css"/>
+    <script src="//cdn.jsdelivr.net/npm/vue@next"></script>
+    <script src="//cdn.jsdelivr.net/npm/element-plus"></script>
    <title>Vite App</title>
  </head>
```

src/main.ts

```
- import 'element-plus/dist/index.css'
```

/vite.config.ts

```
import externalGlobals from "rollup-plugin-external-globals";

export default defineConfig({
  plugins: [vue()],
+  build: {
+    rollupOptions: {
+      external: ["vue", 'element-plus'],
+      plugins: [
+        externalGlobals({
+          vue: "Vue",
+          "element-plus": "ElementPlus",
+        }),
+      ],
+    }
+  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    open: true
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    postcss: {
      plugins: [
        {
          postcssPlugin: 'internal:charset-removal',
          AtRule: {
            charset: (atRule) => {
              if (atRule.name === 'charset') {
                atRule.remove();
              }
            }
          }
        }
      ]
    }
  }
})
```

修改后打包出来为200k（修改前700k）

#### 6.element-plus通过CDN引入怎么使用中文

> https://blog.csdn.net/qq_28011845/article/details/120551247