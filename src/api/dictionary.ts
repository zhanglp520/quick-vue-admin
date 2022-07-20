import { Dictionary } from '../types/dictionary'
import request, { QuickResponseData } from '../utils/request'

const Api = {
  list: '/api/dictionary/getList',
  add: '/api/dictionary/add',
  update: '/api/dictionary/update',
  delete: '/api/dictionary/delete',
}
export const getDictionaryList = (
  dicTypeId: string
): Promise<QuickResponseData<Array<Dictionary>>> => {
  return request<QuickResponseData<Array<Dictionary>>>({
    url: Api.list,
    method: 'GET',
    params: {
      dicTypeId,
    },
  })
}
export const addDictionary = (data: Dictionary) => {
  return request({
    url: Api.add,
    method: 'POST',
    data,
  })
}
export const updateDictionary = (data: Dictionary) => {
  return request({
    url: Api.update,
    method: 'POST',
    data,
  })
}
export const deleteDictionary = (id: string) => {
  return request({
    url: Api.delete,
    method: 'POST',
    data: {
      id,
    },
  })
}
