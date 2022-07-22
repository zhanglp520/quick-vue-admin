export interface User {
  id: string | number
  userId: string
  userName: string
  password?: string
  deleted?: number
  enabled?: number
  createTime?: string | null
  avatar?: string | null
  fullName?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  remark?: string | null
}
export interface SearchUser {
  userName: string
}
export interface ChangePassword {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}
