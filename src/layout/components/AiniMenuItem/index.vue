<script lang="ts" setup>
import {
  HomeFilled,
  // Document,
  Menu as IconMenu,
  // Location,
  Setting,
} from '@element-plus/icons-vue'
import { Ref, computed, defineProps, toRefs } from 'vue'
import { router } from '@/router'
import { useAppStore } from '@/store/modules/app'
import { useMenuStore } from '@/store/modules/menu'
import { useTabStore } from '@/store/modules/tab'
import { Menubar } from '@/types/menu'
import { Tab } from '@/types/tab'

const props = defineProps({
  menu: {
    type: Object,
    default: () => {
      return {}
    },
  },
  parent: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const { menu, parent } = toRefs(props) as {
  menu: Ref<Menubar>
  parent: Ref<Menubar>
}

const appStore = useAppStore()
const menuStore = useMenuStore()
const tabStore = useTabStore()
const isCollapse = computed(() => appStore.getCollapse)
const tabList = computed(() => tabStore.getMenuList)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const menuClick = (item: any) => {
  const { id, menuName, path } = menu.value
  const routerPath = `${parent.value.path}/${path}`
  const tab: Tab = {
    id,
    name: menuName,
    path: routerPath,
  }
  tabStore.addTab(tab)
  // menuStore.setActiveMenu(menu.value)
}
</script>
<template>
  <el-menu-item :index="menu.id" @click="menuClick">
    {{ menu.menuName }}
  </el-menu-item>
</template>
