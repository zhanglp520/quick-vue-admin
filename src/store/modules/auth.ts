import { defineStore } from 'pinia'
import { userLogin, refreshToken } from '@/api/auth'
import { LoginData, LoginParams, Token } from '@/types/auth'
import { quickMd5 } from '@/utils'

interface LoginState {
  quickAccessToken: string
  quickRefreshToken: string
  expiresIn: number
  tenant: string
  userName: string
}
export const useAuthStore = defineStore('loginStore', {
  state: (): LoginState => {
    return {
      quickAccessToken: '',
      quickRefreshToken: '',
      expiresIn: 0,
      tenant: '',
      userName: '',
    }
  },
  getters: {
    getRefreshToken(): string | undefined {
      return this.quickRefreshToken
    },
    getAccessToken(): string | undefined {
      return this.quickAccessToken
    },
    getExpiresIn(): number | undefined {
      return this.expiresIn
    },
  },
  actions: {
    login(form: LoginParams): Promise<LoginData> {
      const { tenant, userName, password } = form
      return new Promise((resolve, reject) => {
        userLogin({
          tenant,
          userName,
          password: quickMd5(password),
        })
          .then((res) => {
            const { data: loginData } = res
            const { quickAccessToken, quickRefreshToken, expiresIn } = loginData
            if (quickAccessToken) {
              this.quickAccessToken = quickAccessToken
            }
            if (quickRefreshToken) {
              this.quickRefreshToken = quickRefreshToken
            }
            if (expiresIn) {
              this.expiresIn = expiresIn
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
    refreshToken(token: Token) {
      return new Promise((resolve, reject) => {
        refreshToken(token)
          .then((res) => {
            const { data: loginData } = res
            const { quickAccessToken, quickRefreshToken, expiresIn } = loginData
            if (quickAccessToken) {
              this.quickAccessToken = quickAccessToken
            }
            if (quickRefreshToken) {
              this.quickRefreshToken = quickRefreshToken
            }
            if (expiresIn) {
              this.expiresIn = expiresIn
            }
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
