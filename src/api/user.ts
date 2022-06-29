import { User } from '../types/user'
import request from '../utils/request'

const Api = {
  list: '/api/user/getUserList',
  add: '/api/user/addUser',
  update: '/api/user/updateUser',
  remove: '/api/user/deleteUser',
}

export const getUserList = () => {
  return request({
    url: Api.list,
    // url:'https://console-mock.apipost.cn/app/mock/project/1cee3669-4ecb-431e-a7b7-67c5298e06ab/api/user/getUserList',
    method: 'GET',
  })
}
export const addUser = (data: User) => {
  return request({
    url: Api.add,
    method: 'POST',
    data,
  })
}
export const updateUser = (data: User) => {
  return request({
    url: Api.update,
    method: 'POST',
    data,
  })
}
export const deleteUser = (id: string) => {
  return request({
    url: Api.remove,
    method: 'POST',
    params: {
      id,
    },
  })
}
