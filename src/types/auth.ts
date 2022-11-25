export interface Token {
  quickAccessToken?: string
  quickRefreshToken?: string
  expiresIn?: number
}
export interface LoginParams {
  tenant: string
  userName: string
  password: string
}
export interface LoginData extends Token {
  tenant: string
  userName: string
}
