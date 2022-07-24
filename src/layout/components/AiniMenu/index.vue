<script lang="ts" setup>
import { HomeFilled, Setting } from '@element-plus/icons-vue'
import { computed, watch, ref } from 'vue'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import { useMenuStore } from '@/store/modules/menu'
import { useTabStore } from '@/store/modules/tab'
import { Menubar } from '@/types/menu'
import { Tab } from '@/types/tab'
import AiniMenuItem from '@/layout/components/AiniMenuItem/index.vue'

const appStore = useAppStore()
const userStore = useUserStore()
const menuStore = useMenuStore()
const tabStore = useTabStore()

const isCollapse = computed(() => appStore.getCollapse)

const defaultActive = ref('home')
const activeMenuId = computed(() => menuStore.getAciveMenuId)
const menuList = computed(() => userStore.getMenuList)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const menuClick = (menu: Menubar) => {
  const { id, menuName, path } = menu
  const tab: Tab = {
    id,
    name: menuName,
    path,
  }
  tabStore.setActiveTab(tab)
}
const homeMenuClick = () => {
  const menu: Menubar = {
    id: 'home',
    menuId: 'home',
    menuName: '首页',
    menuType: '0',
    icon: '',
    sort: 0,
    pid: '0',
    link: 0,
    enabled: 0,
    status: 0,
    path: '/home',
    children: [],
  }
  menuClick(menu)
}
watch(activeMenuId, (val: string) => {
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
