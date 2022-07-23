<script lang="ts" setup>
import {
  HomeFilled,
  // Document,
  Menu as IconMenu,
  // Location,
  Setting,
} from '@element-plus/icons-vue'
import { computed, reactive, watch, ref } from 'vue'
import { router } from '@/router'
import { useAppStore } from '@/store/modules/app'
import { useMenuStore } from '@/store/modules/menu'
import { useTabStore } from '@/store/modules/tab'
import { MenuBar } from '@/types/menu'

import AiniMenuItem from '../AiniMenuItem/index.vue'
import { Tab } from '../../../types/tab'

const appStore = useAppStore()
const menuStore = useMenuStore()
const tabStore = useTabStore()
const defaultActive = ref('home')
const menuNewList = reactive<Array<MenuBar>>([])
const isCollapse = computed(() => appStore.getCollapse)
const activeMenuId = computed(() => menuStore.getAciveMenuId)
const menuList = computed(() => menuStore.getMenuList)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const menuClick = (menu: MenuBar) => {
  const { id, menuName, path } = menu
  const tab: Tab = {
    id,
    name: menuName,
    path,
  }
  // menuStore.setActiveMenu(menu)
  tabStore.setActiveTab(tab)
}
const homeMenuClick = () => {
  const menu: MenuBar = {
    id: 'home',
    menuName: '首页',
    path: '/home',
  }
  menuClick(menu)
}
watch(activeMenuId, (val: string) => {
  debugger
  defaultActive.value = val
})
</script>
<template>
  <!-- :router="true" -->
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    :collapse="isCollapse"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="home" @click="homeMenuClick">
      <el-icon><HomeFilled /></el-icon>
      <span>首页</span>
    </el-menu-item>
    <template v-for="(menu, index) in menuList" :key="index">
      <template v-if="menu.children.length > 0">
        <el-sub-menu :index="menu.id">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>{{ menu.menuName }}</span>
          </template>
          <template
            v-for="(childMenu, childIndex) in menu.children"
            :key="childIndex"
          >
            <aini-menu-item :menu="childMenu" :parent="menu"></aini-menu-item>
          </template>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="menu.id" @click="menuClick(menu)">{{
          menu.menuName
        }}</el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
