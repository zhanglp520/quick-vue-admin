import { defineStore } from 'pinia'
import { userLogin } from '../../api/login'
import { Login } from '../../types/user'
import { quickMd5 } from '../../utils'

interface UserState {
  token: string
  age: number
}

export const useUserStore = defineStore('userStore', {
  state: (): UserState => {
    return {
      token: '',
      age: 0,
    }
  },
  getters: {
    getToken(): string {
      return this.token
    },
    getAge(): number {
      return this.age
    },
  },
  actions: {
    login(form: Login) {
      const { tenant, userName, userPassword } = form
      return new Promise((resolve, reject) => {
        userLogin({
          tenant,
          userName,
          userPassword: quickMd5(userPassword),
        })
          .then((res) => {
            const { payload } = res
            this.setToken(payload.token)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    setToken(token: string) {
      this.token = token
    },
    setAge(age: number) {
      this.age = age
    },
  },
  persist: {
    enabled: true, // 默认会以模块id为key，存储当前模块所有的状态；路由跳转会刷新掉store，尽量放在路由刷新后存储。
    strategies: [
      {
        key: 'token', // 默认userStore
        // storage: sessionStorage, // sessionStorage|localStorage//默认sessionStorage
        // paths: ['token'],
      },
      {
        key: 'userInfo',
        storage: localStorage,
        paths: ['tenant', 'userName'],
      },
    ],
  },
})
