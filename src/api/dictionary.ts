import { Dictionary } from '../types/dictionary'
import request from '../utils/request'

const Api = {
  list: '/api/dictionary/getList',
  add: '/api/dictionary/add',
  update: '/api/dictionary/update',
  remove: '/api/dictionary/remove',
}
export const getDictionaryList = (dicTypeId: string) => {
  return request({
    url: Api.list,
    // url:'https://console-mock.apipost.cn/app/mock/project/1cee3669-4ecb-431e-a7b7-67c5298e06ab/api/dictionary/getDictionaryList',
    method: 'GET',
    params: {
      dic_type_id: dicTypeId,
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
