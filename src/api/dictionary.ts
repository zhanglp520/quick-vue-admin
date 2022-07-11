import { Dictionary } from '../types/dictionary'
import request, { QuickResponseData } from '../utils/request'

const Api = {
  list: '/api/dictionary/getList',
  add: '/api/dictionary/add',
  update: '/api/dictionary/update',
  remove: '/api/dictionary/remove',
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
export const removeDictionary = (id: string) => {
  return request({
    url: Api.remove,
    method: 'POST',
    params: {
      id,
    },
  })
}
