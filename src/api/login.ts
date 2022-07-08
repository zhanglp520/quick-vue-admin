import { Login } from '../types/user'
import request from '../utils/request'

const Api = {
  login: '/api/login',
  loginOut: '/api/loginOut',
}
export const userLogin = (data: Login) => {
  return request({
    url: Api.login,
    // url:'https://console-mock.apipost.cn/app/mock/project/1cee3669-4ecb-431e-a7b7-67c5298e06ab/api/user/getUserList',
    method: 'POST',
    data,
  })
}
