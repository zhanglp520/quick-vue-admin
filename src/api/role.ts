import { Menu } from '@/types/menu'
import { User } from '@/types/user'
import { Role } from '../types/role'
import request, { QuickResponseData } from '../utils/request'

const Api = {
  menuList: '/api/v1/auth/getMenuListByRoleId',
  userList: '/api/v1/auth/getUserListByRoleId',
  list: '/api/v1/role/getRoleList',
  add: '/api/v1/role',
  update: '/api/v1/role',
  delete: '/api/v1/role',
  assignPermission: '/api/role/assignPermission',
  assignUser: '/api/role/assignUser',
}
export const getMenuPermission = (
  roleId: string
): Promise<QuickResponseData<Array<Menu>>> => {
  return request<QuickResponseData<Array<Menu>>>({
    url: `${Api.menuList}/${roleId}`,
    method: 'GET',
  })
}
export const getUserPermission = (
  roleId: string
): Promise<QuickResponseData<Array<string>>> => {
  return request<QuickResponseData<Array<string>>>({
    url: `${Api.userList}/${roleId}`,
    method: 'GET',
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
    method: 'PUT',
    data,
  })
}
export const deleteRole = (id: string) => {
  return request({
    url: Api.delete,
    method: 'DELETE',
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
