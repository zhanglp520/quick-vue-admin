import { defineStore } from 'pinia'
import { listToTree, menuFormat } from '@/utils/index'
import { router } from '@/router'
import { User } from '@/types/user'
import { QuickResponseData } from '@/utils/request'
import { Menu, Menubar } from '@/types/menu'
import { getUserInfo, getUserPageList, getPermission } from '@/api/user'

interface UserState {
  user: User
  permissionMenuList: Array<Menu>
  menuList: Array<Menubar>
}
export const useUserStore = defineStore('userStore', {
  state: (): UserState => {
    return {
      user: {
        id: '',
        userId: '',
        userName: '',
        fullName: '',
        phone: '',
        avatar: '',
        email: '',
        address: '',
        createTime: '',
      },
      permissionMenuList: [],
      menuList: [],
    }
  },
  getters: {
    getMenuList(): Array<Menubar> {
      return this.menuList
    },
    getPermissionMenuList(): Array<Menu> {
      return this.permissionMenuList
    },
    userInfo(): User {
      return this.user
    },
  },
  actions: {
    getPermission(id: string): Promise<QuickResponseData<Array<Menu>>> {
      return new Promise((resolve) => {
        const userId = id
        getPermission(userId).then((res) => {
          const { data: userPermissionMenuList } = res
          this.permissionMenuList = userPermissionMenuList
          const dt = JSON.parse(JSON.stringify(userPermissionMenuList))
          // const userMenuList = menuFormat(dt)
          const dtNew = dt.filter((x) => x.menuType !== 2)
          const userMenuList = listToTree(dtNew, 0, {
            pId: 'pId',
          })

          const m = JSON.parse(JSON.stringify(userMenuList))
          this.menuList = m
          resolve(res)
        })
      })
    },
    // getUserPageList(parmas: object): Promise<QuickResponseData<Array<User>>> {
    //   return new Promise((resolve) => {
    //     getUserPageList(parmas).then((res) => {
    //       const { data: userList } = res
    //       this.userList = userList

    //       resolve(res)
    //     })
    //   })
    // },
    getUserInfo(userName: string): Promise<User> {
      return new Promise((resolve) => {
        getUserInfo(userName).then((res) => {
          const { data: user } = res
          this.user = user
          resolve(user)
        })
      })
    },
  },
  persist: {
    enabled: true,
  },
})
