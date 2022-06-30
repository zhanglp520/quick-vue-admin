import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

const baseURL = import.meta.env.VITE_APP_BASE_URL
const request: AxiosInstance = axios.create({
  baseURL,
  timeout: 1000 * 15,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

// 请求拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log('request', config)
    //   const token = ''
    //   config.headers.token = `Bearer ${token}`
    return config
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (res: AxiosResponse) => {
    console.log('response', res)
    const { data } = res
    const { status, data: payload, page: pagination, msg } = data
    if (status === 0) {
      return Promise.resolve({
        payload,
        pagination,
      })
    }
    return Promise.reject(msg)
  },
  (error) => {
    console.error(error)
    return Promise.reject(error)
  }
)

export default request
