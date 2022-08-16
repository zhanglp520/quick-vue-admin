export interface User {
  id: string
  userId: string
  userName: string
  password?: string
  deleted?: number
  enabled?: number
  createTime?: string
  avatar?: string
  fullName?: string
  phone?: string
  email?: string
  address?: string
  remark?: string
}
export interface SearchUser {
  userName: string
}
export interface ChangePassword {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
