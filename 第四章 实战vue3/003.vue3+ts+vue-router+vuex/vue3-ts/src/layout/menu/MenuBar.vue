<template>
  <MenuLogo v-show="!isCollapse"></MenuLogo>
  <el-menu
      :default-active="activeIndex"
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
<script lang="ts">
import {reactive, defineComponent} from 'vue'
import MenuItem from "@/layout/menu/MenuItem.vue"
import MenuLogo from "@/layout/menu/MenuLogo.vue"
import {IMenuList} from "@/layout/menu/IMenu"
import {useRoute} from "vue-router";
import {computed} from 'vue'
import {useStore} from "@/store";

export default defineComponent({
  name: "MenuBar",
  setup() {
    let store = useStore()
    let isCollapse = computed(() => {
      return store.getters['getCollapse']
    })
    const handleOpen = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }

    let mockDataMenu: IMenuList[] = [
      {
        path: '/homepage',
        component: 'Layout',
        meta: {
          title: '首页',
          icon: 'el-icon-s-home',
          icon2: 'HomeFilled',
          roles: ['sys:manage']
        },
        children: []
      },
      {
        path: '/system',
        component: 'Layout',
        alwaysShow: true,
        name: 'system',
        meta: {
          title: '系统管理',
          icon: 'el-icon-menu',
          icon2: 'Menu',
          roles: ['sys:manage'],
          parentId: 0
        },
        children: [
          {
            path: '/department',
            component: '/system/department/department',
            alwaysShow: false,
            name: 'department',
            meta: {
              title: '机构管理',
              icon: 'el-icon-document',
              icon2: 'Document',
              roles: ['sys:dept'],
              parentId: 17
            },
          },
          {
            path: '/userList',
            component: '/system/User/UserList',
            alwaysShow: false,
            name: 'userList',
            meta: {
              title: '用户管理',
              icon: 'el-icon-s-custom',
              icon2: 'UserFilled',
              roles: ['sys:user'],
              parentId: 17
            }
          },
          {
            path: '/roleList',
            component: '/system/Role/RoleList',
            alwaysShow: false,
            name: 'roleList',
            meta: {
              title: '角色管理',
              icon: 'el-icon-s-tools',
              icon2: 'Tools',
              roles: ['sys:role'],
              parentId: 17
            },
          },
          {
            path: '/menuList',
            component: '/system/Menu/MenuList',
            alwaysShow: false,
            name: 'menuList',
            meta: {
              title: '权限管理',
              icon: 'el-icon-document',
              icon2: 'Document',
              roles: ['sys:menu'],
              parentId: 17
            },
          }
        ]
      },
      {
        path: '/goods',
        component: 'Layout',
        alwaysShow: true,
        name: 'goods',
        meta: {
          title: '商品管理',
          icon: 'el-icon-document',
          icon2: 'Document',
          roles: ['sys:goods'],
          parentId: 0,
        },
        children: [
          {
            path: '/goodCategory',
            component: 'goods/goodsCategory/goodCategory',
            alwaysShow: false,
            name: 'goodCategory',
            meta: {
              title: '商品分类',
              icon: 'el-icon-document',
              icon2: 'Document',
              roles: ['sys:goodsCategory'],
              parentId: 34
            },
          }
        ]
      },
      {
        path: '/systemConfig',
        component: 'Layout',
        alwaysShow: true,
        name: 'systemConfig',
        meta: {
          title: '系统工具',
          icon: 'el-icon-document',
          icon2: 'Document',
          roles: ['sys:systemConfig'],
          parentId: 0,
        },
        children: [
          {
            path: '/document',
            component: '/system/config/systemDocument',
            alwaysShow: false,
            name: 'https://42.193.158.170：8089/swagger-ui/index.html',
            meta: {
              title: '接口文档',
              icon: 'el-icon-document',
              icon2: 'Document',
              roles: ['sys:document'],
              parentId: 42
            },
          }
        ]
      },
    ]
    let menuList = reactive(mockDataMenu)
    let {path} = useRoute()
    let activeIndex = computed(() => {
      return path
    })
    return {
      isCollapse,
      handleOpen,
      handleClose,
      menuList,
      activeIndex
    }
  },
  components: {
    MenuItem,
    MenuLogo
  }
});
</script>

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
:deep .el-sub-menu .el-sub-menu__title {
  color: #ffffff !important;
}
:deep .el-menu-item {
  color: #ffffff;
}
:deep .el-menu .el-menu-item {
  color: #bfcbd9;
}
:deep .el-menu-item.is-active {
  color:  #4093ff !important;
}
:deep .is-opened .el-menu-item {
  background-color: #1f2d3d !important;
}
:deep .el-menu-item:hover {
  background-color: #001528 !important;
}
</style>