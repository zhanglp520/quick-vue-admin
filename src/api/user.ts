import { User } from '../interface/user'
import request from '../utils/request'

export const getUserList = () => {
  return request({
    url: '/api/user/getUserList',
    // url:'https://console-mock.apipost.cn/app/mock/project/1cee3669-4ecb-431e-a7b7-67c5298e06ab/api/user/getUserList',
    method: 'GET',
  })
}
export const addUser = (data: User) => {
  return request({
    url: '/api/user/addUser',
    method: 'POST',
    data,
  })
}
export const updateUser = (data: User) => {
  return request({
    url: '/api/user/updateUser',
    method: 'POST',
    data,
  })
}
export const deleteUser = (id: string) => {
  return request({
    url: '/api/user/deleteUser',
    method: 'POST',
    params: {
      id,
    },
  })
}
