import { LoginData, LoginParams, Token } from '@/types/auth'
import request, { QuickResponseData } from '@/utils/request'
import { defaultVersion } from './version'

const api = `${defaultVersion}/auth`
export const userLogin = (
  data: LoginParams
): Promise<QuickResponseData<LoginData>> => {
  return request<QuickResponseData<LoginData>>({
    url: `${api}/login`,
    method: 'POST',
    data,
  })
}
export const userLogout = (data: LoginParams) => {
  return request({
    url: `${api}/logout`,
    method: 'POST',
    data,
  })
}
export const refreshToken = (
  data: Token
): Promise<QuickResponseData<LoginData>> => {
  return request<QuickResponseData<LoginData>>({
    url: `${api}/refreshToken`,
    method: 'POST',
    data,
  })
}
