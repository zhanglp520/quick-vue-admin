import { Login, User } from '../types/user'
import request, { QuickResponseData } from '../utils/request'

const Api = {
  login: '/api/login',
  loginOut: '/api/loginOut',
  getUserInfo: '/api/getUserInfo',
  changePassword: '/api/changePassword',
}
export const userLogin = (data: Login): Promise<QuickResponseData<User>> => {
  return request<QuickResponseData<User>>({
    url: Api.login,
    method: 'POST',
    data,
  })
}
export const userLoginOut = (data: Login) => {
  return request({
    url: Api.loginOut,
    method: 'POST',
    data,
  })
}
export const getUserInfo = (userName: string) => {
  return request({
    url: Api.getUserInfo,
    method: 'GET',
    params: {
      userName,
    },
  })
}
export const changePassword = (data: Login) => {
  return request({
    url: Api.changePassword,
    method: 'POST',
    data,
  })
}
