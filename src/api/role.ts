import { Menu } from '@/types/menu'
import { User } from '@/types/user'
import { Role } from '../types/role'
import request, { QuickResponseData } from '../utils/request'

const Api = {
  menuList: '/api/role/getMenuPermission',
  userList: '/api/role/getUserPermission',
  list: '/api/role/getList',
  add: '/api/role/add',
  update: '/api/role/update',
  delete: '/api/role/delete',
  assignPermission: '/api/role/assignPermission',
  assignUser: '/api/role/assignUser',
}
export const getMenuPermission = (
  roleId: string
): Promise<QuickResponseData<Array<Menu>>> => {
  return request<QuickResponseData<Array<Menu>>>({
    url: Api.menuList,
    method: 'GET',
    params: {
      id: roleId,
    },
  })
}
export const getUserPermission = (
  roleId: string
): Promise<QuickResponseData<Array<User>>> => {
  return request<QuickResponseData<Array<User>>>({
    url: Api.userList,
    method: 'GET',
    params: {
      id: roleId,
    },
  })
}

export const getRoleList = (): Promise<QuickResponseData<Array<Role>>> => {
  return request<QuickResponseData<Array<Role>>>({
    url: Api.list,
    method: 'GET',
  })
}

export const addRole = (data: Role) => {
  return request({
    url: Api.add,
    method: 'POST',
    data,
  })
}
export const updateRole = (data: Role) => {
  return request({
    url: Api.update,
    method: 'POST',
    data,
  })
}
export const deleteRole = (id: string) => {
  return request({
    url: Api.delete,
    method: 'POST',
    data: {
      id,
    },
  })
}
export const assignPermission = (data: any) => {
  return request({
    url: Api.assignPermission,
    method: 'POST',
    data,
  })
}
export const assignUser = (data: any) => {
  return request({
    url: Api.assignUser,
    method: 'POST',
    data,
  })
}
