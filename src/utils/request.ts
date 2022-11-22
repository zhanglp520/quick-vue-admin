import { ElMessage, ElMessageBox } from 'element-plus'
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useRouter } from 'vue-router'
import { useLoginStore } from '@/store/modules/login'

export interface QuickResponseData<T = any> {
  status: number
  msg: string
  data: T
  total: number
}
let errNum = 0
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
    if (res.config.url === '/api/v1/user/exportUser') {
      return resultData
    }
    const { status, data, msg } = resultData as QuickResponseData<any>
    if (status === 1) {
      ElMessage.error(msg)
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
    return Promise.reject(msg)
  },
  (error) => {
    const { response } = error
    const { status } = response
    if (status === 401) {
      if (errNum === 0) {
        ElMessageBox.confirm('登录过期，请重新登录', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          errNum = 0
          localStorage.clear()
          sessionStorage.clear()
          window.location.href = '/'
        })
        errNum += 1
      }
    } else {
      // ElMessage.error(error)
      console.error('error', error)
    }
    return Promise.reject(error)
  }
)

const request = <T>(config: AxiosRequestConfig): Promise<T> => {
  return quickRequest.request<any, T>(config)
}

export default request
