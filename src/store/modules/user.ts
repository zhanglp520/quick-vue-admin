import { defineStore } from 'pinia'
import { userLogin } from '../../api/login'
import { getUserPageList } from '../../api/user'
import { Login, User } from '../../types/user'
import { quickMd5 } from '../../utils'
import { QuickResponseData } from '../../utils/request'

interface UserState {
  token: string
  user: User
  userList: Array<User>
}
export const useUserStore = defineStore('userStore', {
  state: (): UserState => {
    return {
      token: '',
      user: {
        tenant: '',
        userId: '',
        avator: '',
        fullName: '',
        userName: '',
        phone: '',
        email: '',
        address: '',
        createTime: '',
      },
      userList: [],
    }
  },
  getters: {
    getToken(): string | undefined {
      return this.token
    },
  },
  actions: {
    login(form: Login): Promise<User> {
      const { tenant, userName, userPassword } = form
      return new Promise((resolve, reject) => {
        userLogin({
          tenant,
          userName,
          userPassword: quickMd5(userPassword),
        })
          .then((res) => {
            const { data: user } = res
            const { token } = user
            this.token = token
            this.user.tenant = tenant
            this.user.userName = userName
            resolve(user)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getUserPageList(parmas: object): Promise<QuickResponseData<Array<User>>> {
      return new Promise((resolve) => {
        getUserPageList(parmas).then((res) => {
          const { data: userList } = res
          this.userList = userList
          resolve(res)
        })
      })
    },
  },
  persist: {
    enabled: true, // 默认会以模块id为key，存储当前模块所有的状态；路由跳转会刷新掉store，尽量放在路由刷新后存储。
    // strategies: [
    //   {
    //     key: 'token', // 默认userStore
    //     // storage: sessionStorage, // sessionStorage|localStorage//默认sessionStorage
    //     // paths: ['token'],
    //   },
    //   {
    //     key: 'userInfo',
    //     storage: localStorage,
    //     paths: ['tenant', 'userName'],
    //   },
    // ],
  },
})
