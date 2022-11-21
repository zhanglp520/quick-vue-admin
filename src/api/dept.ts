import { Dept } from '../types/dept'
import request, { QuickResponseData } from '../utils/request'

const Api = {
  list_pid: '/api/v1/dept/getListByPId',
  list: '/api/v1/dept',
  add: '/api/v1/dept/add',
  update: '/api/v1/dept/update',
  delete: '/api/v1/dept/delete',
}
export const getDeptListByPId = (
  pId: number
): Promise<QuickResponseData<Array<Dept>>> => {
  return request<QuickResponseData<Array<Dept>>>({
    url: Api.list_pid,
    method: 'GET',
    params: {
      pId,
    },
  })
}
export const getDeptList = (): Promise<QuickResponseData<Array<Dept>>> => {
  return request<QuickResponseData<Array<Dept>>>({
    url: Api.list,
    method: 'GET',
  })
}
export const addDept = (data: Dept) => {
  return request({
    url: Api.add,
    method: 'POST',
    data,
  })
}
export const updateDept = (data: Dept) => {
  return request({
    url: Api.update,
    method: 'POST',
    data,
  })
}
export const deleteDept = (id: string) => {
  return request({
    url: Api.delete,
    method: 'POST',
    data: {
      id,
    },
  })
}
