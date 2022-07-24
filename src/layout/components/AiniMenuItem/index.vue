<script lang="ts" setup>
import { Ref, defineProps, toRefs } from 'vue'
import { useTabStore } from '@/store/modules/tab'
import { Menubar } from '@/types/menu'
import { Tab } from '@/types/tab'

const tabStore = useTabStore()
/**
 * props
 */
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
/**
 * props toRefs
 */
const { menu, parent } = toRefs(props) as {
  menu: Ref<Menubar>
  parent: Ref<Menubar>
}
const menuClick = () => {
  const { id, menuName, path } = menu.value
  const routerPath = `${parent.value.path}/${path}`
  const tab: Tab = {
    id,
    name: menuName,
    path: routerPath,
  }
  tabStore.addTab(tab)
}
</script>
<template>
  <el-menu-item :index="menu.id" @click="menuClick">
    {{ menu.menuName }}
  </el-menu-item>
</template>
