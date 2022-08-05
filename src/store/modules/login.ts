import { defineStore } from 'pinia'
import Cookies from 'js-cookie'
import { userLogin } from '@/api/login'
import { LoginData, LoginParams } from '@/types/login'
import { quickMd5 } from '@/utils'
import { router } from '@/router'

interface LoginState {
  token: string
  refreshToken: string
  tenant: string
  userName: string
}
export const useLoginStore = defineStore('loginStore', {
  state: (): LoginState => {
    return {
      token: '',
      refreshToken: '1111',
      tenant: '',
      userName: '',
    }
  },
  getters: {
    getRefreshToken(): string | undefined {
      return this.refreshToken
    },
    getToken(): string | undefined {
      return this.token
    },
  },
  actions: {
    refreshNewToken() {
      this.refreshToken = '1111'
    },
    login(form: LoginParams): Promise<LoginData> {
      const { tenant, userName, userPassword } = form
      return new Promise((resolve, reject) => {
        userLogin({
          tenant,
          userName,
          userPassword: quickMd5(userPassword),
        })
          .then((res) => {
            const { data: loginData } = res
            const { token } = loginData
            if (token) {
              this.token = token
            }
            this.tenant = tenant
            this.userName = userName
            resolve(this.$state)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },
  persist: {
    enabled: true,
    // encryptionKey: 'myTest',
    // strategies: [
    //   {
    //     key: 'login',
    //     storage: sessionStorage,
    //     // paths: ['token', 'refreshToken'],
    //   },
    // ],
    // enabled: true, // 默认会以模块id为key，存储当前模块所有的状态；路由跳转会刷新掉store，尽量放在路由刷新后存储。
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
