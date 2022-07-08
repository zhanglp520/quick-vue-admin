export interface User {
  user_id: string
  user_name: string
  password: string
  email: string
  address: string
  create_time: string
}
export interface Login {
  tenant: string
  userName: string
  userPassword: string
}
