import { Menu } from '../types/menu'
import request, { QuickResponseData } from '../utils/request'

const Api = {
  roleMenuLsit: '/api/menu/getRoleMenuLsit',
  permissionMenuList: '/api/menu/getPermission',
  list: '/api/menu/getList',
  add: '/api/menu/add',
  update: '/api/menu/update',
  delete: '/api/menu/delete',
  assign: '/api/menu/assignPermission',
}
export const getRoleMenuLsit = (
  roleId: string
): Promise<QuickResponseData<Array<Menu>>> => {
  return request<QuickResponseData<Array<Menu>>>({
    url: Api.roleMenuLsit,
    method: 'GET',
    params: {
      id: roleId,
    },
  })
}
export const getPermissionMenuList = (
  userId: string
): Promise<QuickResponseData<Array<Menu>>> => {
  return request<QuickResponseData<Array<Menu>>>({
    url: Api.permissionMenuList,
    method: 'GET',
    params: {
      id: userId,
    },
  })
}
export const getMenuList = (): Promise<QuickResponseData<Array<Menu>>> => {
  return request<QuickResponseData<Array<Menu>>>({
    url: Api.list,
    method: 'GET',
  })
}
export const addMenu = (data: Menu) => {
  return request({
    url: Api.add,
    method: 'POST',
    data,
  })
}
export const updateMenu = (data: Menu) => {
  return request({
    url: Api.update,
    method: 'POST',
    data,
  })
}
export const deleteMenu = (id: string) => {
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
    url: Api.assign,
    method: 'POST',
    data,
  })
}
