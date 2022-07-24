import { Menu } from '@/types/menu'
import { ChangePassword, User } from '../types/user'
import request, { QuickResponseData } from '../utils/request'

const Api = {
  permission: '/api/user/getPermission',
  getUserInfo: '/api/getUserInfo',
  changePassword: '/api/changePassword',
  pageList: '/api/user/getPageList',
  info: '/api/user/getInfo',
  add: '/api/user/add',
  update: '/api/user/update',
  delete: '/api/user/delete',
  batchDeleteUser: '/api/user/batchRemove',
  resetPassword: '/api/user/resetPassword',
  enabled: '/api/user/enabled',
  disable: '/api/user/disable',
}
export const getPermission = (
  userId: string
): Promise<QuickResponseData<Array<Menu>>> => {
  return request({
    url: Api.permission,
    method: 'GET',
    params: {
      id: userId,
    },
  })
}
export const changePassword = (data: ChangePassword) => {
  return request({
    url: Api.changePassword,
    method: 'POST',
    data,
  })
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
export const deleteUser = (id: string) => {
  return request({
    url: Api.delete,
    method: 'POST',
    data: {
      id,
    },
  })
}
export const batchDeleteUser = (ids: string) => {
  return request({
    url: Api.batchDeleteUser,
    method: 'POST',
    data: {
      ids,
    },
  })
}
export const resetUserPassword = (id: string) => {
  return request({
    url: Api.resetPassword,
    method: 'POST',
    data: {
      id,
    },
  })
}
export const enableUser = (id: string) => {
  return request({
    url: Api.enabled,
    method: 'POST',
    data: {
      id,
    },
  })
}
export const disableUser = (id: string) => {
  return request({
    url: Api.disable,
    method: 'POST',
    data: {
      id,
    },
  })
}
