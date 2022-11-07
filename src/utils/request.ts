import { ElMessage, ElMessageBox } from 'element-plus'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/store/modules/login'

export interface QuickResponseData<T = any> {
  code: number
  message: string
  data: T
  total: number
}

const router = useRouter()
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
    console.info('request', cfg)
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
    console.info('response', res)
    const { data: resultData } = res
    debugger
    if (res.config.url === '/api/v1/user/exportUser') {
      return resultData
    }
    const { code, data, message } = resultData as QuickResponseData<any>
    if (code === 1) {
      ElMessage.error(message)
    } else {
      const { payload, total } = data
      if (payload) {
        return Promise.resolve({
          data: payload,
          total,
        })
      }
      return Promise.resolve({
        data,
      })
    }
    return Promise.reject(message)
  },
  (error) => {
    const { response } = error
    const { status } = response
    if (status === 401) {
      ElMessageBox.confirm('登录过期，请重新登录', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        localStorage.clear()
        sessionStorage.clear()
        router.push('/login')
      })
    } else {
      ElMessage.error(error)
    }
    return Promise.reject(error)
  }
)

const request = <T>(config: AxiosRequestConfig): Promise<T> => {
  return quickRequest.request<any, T>(config)
}

export default request
