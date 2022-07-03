import { DictionaryType } from '../types/dictionaryType'
import request from '../utils/request'

const Api = {
  list: '/api/dictionaryType/getList',
  add: '/api/dictionaryType/add',
  update: '/api/dictionaryType/update',
  remove: '/api/dictionaryType/remove',
}
export const getDictionaryTypeList = () => {
  return request({
    url: Api.list,
    // url:'https://console-mock.apipost.cn/app/mock/project/1cee3669-4ecb-431e-a7b7-67c5298e06ab/api/dictionaryType/getDictionaryTypeList',
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
export const removeDictionaryType = (id: string) => {
  return request({
    url: Api.remove,
    method: 'POST',
    params: {
      id,
    },
  })
}
