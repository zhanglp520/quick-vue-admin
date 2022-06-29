import { User } from '../types/user'
import request from '../utils/request'

const Api = {
  pageList: '/api/user/getPageList',
  list: '/api/user/getList',
  add: '/api/user/add',
  update: '/api/user/update',
  remove: '/api/user/remove',
}
export const getUserPageList = (params) => {
  return request({
    url: Api.pageList,
    // url:'https://console-mock.apipost.cn/app/mock/project/1cee3669-4ecb-431e-a7b7-67c5298e06ab/api/user/getUserList',
    method: 'GET',
    params,
  })
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
export const deleteUser = (userId: string) => {
  return request({
    url: Api.remove,
    method: 'POST',
    params: {
      user_id: userId,
    },
  })
}
