import { User } from '../types/user'
import request, { QuickResponseData } from '../utils/request'

const Api = {
  pageList: '/api/user/getPageList',
  list: '/api/user/getList',
  info: '/api/user/getInfo',
  add: '/api/user/add',
  update: '/api/user/update',
  remove: '/api/user/remove',
}
export const getUserPageList = (
  params: object
): Promise<QuickResponseData<Array<User>>> => {
  return request<QuickResponseData<Array<User>>>({
    url: Api.pageList,
    method: 'GET',
    params,
  })
}
export const getUserList = () => {
  return request({
    url: Api.list,
    method: 'GET',
  })
}
export const getUserInfo = (
  userName: string
): Promise<QuickResponseData<User>> => {
  return request<QuickResponseData<User>>({
    url: Api.info,
    method: 'GET',
    params: {
      userName,
    },
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
      userId,
    },
  })
}
