import { Menu } from '@/types/menu'
import { ChangePassword, User } from '../types/user'
import request, { QuickResponseData } from '../utils/request'
import { defaultVersion } from './version'

const api = `${defaultVersion}/user`
export const exportUser = (): Promise<QuickResponseData<any>> => {
  return request<QuickResponseData<Array<User>>>({
    url: `${api}/exportUser`,
    method: 'GET',
    responseType: 'arraybuffer',
  })
}
export const getUserPageList = (
  params: object
): Promise<QuickResponseData<Array<User>>> => {
  return request<QuickResponseData<Array<User>>>({
    url: api,
    method: 'GET',
    params,
  })
}
export const getUserList = (): Promise<QuickResponseData<Array<User>>> => {
  return request<QuickResponseData<Array<User>>>({
    url: `${api}/getUserList`,
    method: 'GET',
  })
}
export const getUserByUserName = (
  userName: string
): Promise<QuickResponseData<User>> => {
  return request<QuickResponseData<User>>({
    url: `${api}/getUserByUserName/${userName}`,
    method: 'GET',
  })
}
export const addUser = (data: User) => {
  return request({
    url: api,
    method: 'POST',
    data,
  })
}
export const updateUser = (data: User) => {
  const { id } = data
  return request({
    url: `${api}/${id}`,
    method: 'PUT',
    data,
  })
}
export const deleteUser = (id: string) => {
  return request({
    url: `${api}/${id}`,
    method: 'DELETE',
  })
}

export const getPermission = (
  userId: string
): Promise<QuickResponseData<Array<Menu>>> => {
  return request({
    url: `${defaultVersion}/auth/${userId}`,
    method: 'GET',
  })
}
export const changePassword = (id: number, data: ChangePassword) => {
  const { oldPassword, newPassword } = data
  return request({
    url: `${api}/changePassword/${id}`,
    method: 'PATCH',
    data: {
      oldPassword,
      newPassword,
    },
  })
}

export const batchDeleteUser = (ids: string) => {
  return request({
    url: `${api}/batchRemove/${ids}`,
    method: 'PATCH',
  })
}
export const resetUserPassword = (id: string) => {
  return request({
    url: `${api}/resetPassword/${id}`,
    method: 'PATCH',
  })
}
export const enableUser = (id: string) => {
  return request({
    url: `${api}/enabled/${id}`,
    method: 'PATCH',
  })
}
export const disableUser = (id: string) => {
  return request({
    url: `${api}/disable/${id}`,
    method: 'PATCH',
  })
}
