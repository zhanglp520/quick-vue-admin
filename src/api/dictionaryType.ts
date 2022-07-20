import { DictionaryType } from '../types/dictionaryType'
import request, { QuickResponseData } from '../utils/request'

const Api = {
  list: '/api/dictionaryType/getList',
  add: '/api/dictionaryType/add',
  update: '/api/dictionaryType/update',
  delete: '/api/dictionaryType/delete',
}
export const getDictionaryTypeList = (): Promise<
  QuickResponseData<Array<DictionaryType>>
> => {
  return request<QuickResponseData<Array<DictionaryType>>>({
    url: Api.list,
    method: 'GET',
  })
}

export const addDictionaryType = (data: DictionaryType) => {
  return request({
    url: Api.add,
    method: 'POST',
    data,
  })
}
export const updateDictionaryType = (data: DictionaryType) => {
  return request({
    url: Api.update,
    method: 'POST',
    data,
  })
}
export const deleteDictionaryType = (id: string) => {
  return request({
    url: Api.delete,
    method: 'POST',
    data: {
      id,
    },
  })
}
