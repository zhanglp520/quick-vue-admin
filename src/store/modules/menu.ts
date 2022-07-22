import { defineStore } from 'pinia'
import { menuFormat } from '@/utils/index'
import { QuickResponseData } from '@/utils/request'
import { Menu, MenuBar } from '@/types/menu'
import { getPermissionMenuList } from '../../api/menu'

interface MenuState {
  activeMenuId: string
  menuList: Array<MenuBar>
  permissionMenuList: Array<Menu>
}
export const useMenuStore = defineStore('menuStore', {
  state: (): MenuState => {
    return {
      activeMenuId: 'home',
      menuList: [],
      permissionMenuList: [],
    }
  },
  getters: {
    getAciveMenuId(): string {
      return this.activeMenuId
    },
    getMenuList(): Array<MenuBar> {
      return this.menuList
    },
  },
  actions: {
    setActiveMenuId(activeMenuId: string) {
      this.activeMenuId = activeMenuId
    },
    getMenuListByUserId(
      userId: string
    ): Promise<QuickResponseData<Array<Menu>>> {
      return new Promise((resolve) => {
        getPermissionMenuList(userId).then((res) => {
          const { data: permissionMenuList } = res
          this.permissionMenuList = permissionMenuList
          const menuList = menuFormat(permissionMenuList)
          this.menuList = menuList
          resolve(res)
        })
      })
    },
  },
  persist: {
    enabled: true,
  },
})
