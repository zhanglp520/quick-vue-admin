import { Role } from '../types/role'
import request, { QuickResponseData } from '../utils/request'

const Api = {
  list: '/api/role/getList',
  add: '/api/role/add',
  update: '/api/role/update',
  delete: '/api/role/delete',
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
