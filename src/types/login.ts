export interface LoginParams {
  tenant: string
  userName: string
  userPassword: string
}
export interface LoginData {
  token: string
  refreshToken: string
  tenant: string
  userName: string
}
