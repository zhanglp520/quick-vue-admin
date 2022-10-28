import { LoginData, LoginParams } from '@/types/lgoin'
import request, { QuickResponseData } from '@/utils/request'

const Api = {
  login: '/api/v1/auth/login',
  loginOut: '/api/v1/auth/loginOut',
}
export const userLogin = (
  data: LoginParams
): Promise<QuickResponseData<LoginData>> => {
  return request<QuickResponseData<LoginData>>({
    url: Api.login,
    method: 'POST',
    data,
  })
}
export const userLoginOut = (data: LoginParams) => {
  return request({
    url: Api.loginOut,
    method: 'POST',
    data,
  })
}
