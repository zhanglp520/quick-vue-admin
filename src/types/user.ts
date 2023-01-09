export interface User {
  id: string | undefined
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
  keyword: string
}
export interface ChangePassword {
  oldPassword: string
  newPassword: string
  confirmPassword?: string
}
export interface PermissionButton {
  add?: boolean
  edit?: boolean
  delete?: boolean
  detail?: boolean
  batchDelete?: boolean
  import?: boolean
  export?: boolean
  download?: boolean
  print?: boolean
  enabled?: boolean
  disabled?: boolean
}
export interface UserPermissionButton extends PermissionButton {
  resetPassword?: boolean
}
