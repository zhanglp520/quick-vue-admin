import { Menu } from '../types/menu'
import request, { QuickResponseData } from '../utils/request'

const Api = {
  list: '/api/v1/menu',
  add: '/api/v1/menu',
  update: '/api/v1/menu',
  delete: '/api/v1/menu',
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
    method: 'PUT',
    data,
  })
}
export const deleteMenu = (id: string) => {
  return request({
    url: Api.delete,
    method: 'DELETE',
    data: {
      id,
    },
  })
}
