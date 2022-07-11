import { defineStore } from 'pinia'
import { getUserInfo, getUserPageList } from '../../api/user'
import { User } from '../../types/user'
import { QuickResponseData } from '../../utils/request'

interface UserState {
  userList: Array<User>
  user: User
}
export const useUserStore = defineStore('userStore', {
  state: (): UserState => {
    return {
      userList: [],
      user: {
        userId: '',
        userName: '',
        fullName: '',
        phone: '',
        avatar: '',
        email: '',
        address: '',
        createTime: '',
      },
    }
  },
  getters: {},
  actions: {
    getUserPageList(parmas: object): Promise<QuickResponseData<Array<User>>> {
      return new Promise((resolve) => {
        getUserPageList(parmas).then((res) => {
          const { data: userList } = res
          this.userList = userList
          resolve(res)
        })
      })
    },
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
