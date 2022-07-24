import { defineStore } from 'pinia'
import { menuFormat } from '@/utils/index'
import { QuickResponseData } from '@/utils/request'
import { Menu, Menubar, MenuTree } from '@/types/menu'
import { getPermissionMenuList } from '../../api/menu'

interface MenuState {
  activeMenuId: string
  permissionMenuTreeList: Array<MenuTree>
}
export const useMenuStore = defineStore('menuStore', {
  state: (): MenuState => {
    return {
      activeMenuId: 'home',
      permissionMenuTreeList: [],
    }
  },
  getters: {
    getAciveMenuId(): string {
      return this.activeMenuId
    },
    getPermissionMenuTreeList(): Array<MenuTree> {
      return this.permissionMenuTreeList
    },
  },
  actions: {
    setActiveMenuId(activeMenuId: string) {
      this.activeMenuId = activeMenuId
    },
  },
  persist: {
    enabled: true,
  },
})
