import { defineStore } from 'pinia'
import { userLogin } from '../../api/login'
import { Login, User } from '../../types/user'
import { quickMd5 } from '../../utils'
import { useUserStore } from './user'

const userStore = useUserStore()

interface UserState {
  token: string
  tenant: string
  userName: string
}
export const useLoginStore = defineStore('loginStore', {
  state: (): UserState => {
    return {
      token: '',
      tenant: '',
      userName: '',
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
            if (token) {
              this.token = token
            }
            this.tenant = tenant
            this.userName = userName
            userStore.getUserInfo(userName)
            resolve(user)
          })
          .catch((err) => {
            reject(err)
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
