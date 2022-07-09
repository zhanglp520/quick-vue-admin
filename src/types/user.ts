export interface User {
  tenant: string
  userId: string
  avator: string
  fullName: string
  userName: string
  phone: string
  email: string
  address: string
  createTime?: string
  token: string
}
export interface Login {
  tenant: string
  userName: string
  userPassword: string
}
