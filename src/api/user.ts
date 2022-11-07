import { Menu } from '@/types/menu'
import { ChangePassword, User } from '../types/user'
import request, { QuickResponseData } from '../utils/request'

const Api = {
  export: '/api/v1/user/exportUser',
  pageList: '/api/v1/user',
  list: '/api/v1/user/getUserList',
  detail: '/api/v1/user',
  add: '/api/v1/user',
  update: '/api/v1/user',
  delete: '/api/v1/user',
  info: '/api/v1/user/getUserByUserName',
  permission: '/api/v1/auth',
  changePassword: '/api/changePassword',
  batchDeleteUser: '/api/user/batchRemove',
  resetPassword: '/api/user/resetPassword',
  enabled: '/api/user/enabled',
  disable: '/api/user/disable',
}
export const exportUser = (): // params: object
Promise<QuickResponseData<any>> => {
  return request<QuickResponseData<Array<User>>>({
    url: Api.export,
    method: 'GET',
    responseType: 'arraybuffer',
    // params,
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
export const getUserList = (): Promise<QuickResponseData<Array<User>>> => {
  return request<QuickResponseData<Array<User>>>({
    url: Api.list,
    method: 'GET',
  })
}
export const getUserByUserName = (
  userName: string
): Promise<QuickResponseData<User>> => {
  return request<QuickResponseData<User>>({
    url: `${Api.info}/${userName}`,
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
  const { id } = data
  return request({
    url: `${Api.update}/${id}`,
    method: 'PUT',
    data,
  })
}
export const deleteUser = (id: string) => {
  return request({
    url: `${Api.delete}/${id}`,
    method: 'DELETE',
  })
}

export const getPermission = (
  userId: string
): Promise<QuickResponseData<Array<Menu>>> => {
  return request({
    url: `${Api.permission}/${userId}`,
    method: 'GET',
  })
}
export const changePassword = (data: ChangePassword) => {
  return request({
    url: Api.changePassword,
    method: 'PATCH',
    data,
  })
}

export const batchDeleteUser = (ids: string) => {
  return request({
    url: Api.batchDeleteUser,
    method: 'PATCH',
    data: {
      ids,
    },
  })
}
export const resetUserPassword = (id: string) => {
  return request({
    url: Api.resetPassword,
    method: 'PATCH',
    data: {
      id,
    },
  })
}
export const enableUser = (id: string) => {
  return request({
    url: Api.enabled,
    method: 'PATCH',
    data: {
      id,
    },
  })
}
export const disableUser = (id: string) => {
  return request({
    url: Api.disable,
    method: 'PATCH',
    data: {
      id,
    },
  })
}
