import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { toTuofeng } from './index'
import { Page } from '@/types/page'
import { useLoginStore } from '@/store/modules/login'

export interface QuickResponseData<T = any> {
  status: number
  msg: string
  data: T
  page: Page
}

const baseURL = import.meta.env.VITE_APP_BASE_URL
const quickRequest: AxiosInstance = axios.create({
  baseURL,
  timeout: 1000 * 15,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

// 请求拦截器
quickRequest.interceptors.request.use(
  (config) => {
    const cfg = config
    const loginStore = useLoginStore()
    const token = loginStore.getToken
    if (cfg.headers) {
      cfg.headers.authorization = `Bearer ${token}`
    }
    console.log('request', cfg)
    return cfg
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
quickRequest.interceptors.response.use(
  (res) => {
    console.log('response', res)
    const { data } = res
    const { status, data: payload, page, msg } = data as QuickResponseData<any>
    if (status === 0) {
      // if (!payload) {
      //   return Promise.reject(msg)
      // }
      const jsonStr = toTuofeng(JSON.stringify(payload))
      const result = JSON.parse(jsonStr)
      return Promise.resolve({
        data: result,
        page,
      })
    }
    return Promise.reject(msg)
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

const request = <T>(config: AxiosRequestConfig): Promise<T> => {
  return quickRequest.request<any, T>(config)
}

export default request
