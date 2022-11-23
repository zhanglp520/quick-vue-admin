import { Log } from '../types/log'
import request, { QuickResponseData } from '../utils/request'

const Api = {
  pageList: '/api/v1/log',
  remove: '/api/v1/log/remove',
  batchRemove: '/api/v1/log/batchRemove',
}

export const getLogPageList = (
  params: any
): Promise<QuickResponseData<Array<Log>>> => {
  return request<QuickResponseData<Array<Log>>>({
    url: Api.pageList,
    method: 'GET',
    params,
  })
}

export const removeLog = (id: string) => {
  return request({
    url: Api.remove,
    method: 'POST',
    data: {
      id,
    },
  })
}

export const batchRemove = (ids: string) => {
  return request({
    url: Api.batchRemove,
    method: 'POST',
    data: {
      ids,
    },
  })
}
