import { reactive } from 'vue'
import { FormItem } from '../../types/form'
import { ChangePassword } from '../../types/user'
/**
 * 属性
 */
export const form = reactive<ChangePassword>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})
export const formItems = reactive<Array<FormItem>>([
  {
    label: '原密码',
    labelWidth: '80px',
    vModel: 'oldPassword',
    type: 'password',
    placeholder: '原密码',
  },
  {
    label: '新密码',
    labelWidth: '80px',
    vModel: 'newPassword',
    type: 'password',
    placeholder: '新密码',
  },
  {
    label: '确认密码',
    labelWidth: '80px',
    vModel: 'confirmPassword',
    type: 'password',
    placeholder: '确认密码',
  },
])
/**
 * 函数
 */
export const handleSubmit = () => {
  console.log('handleSubmit')
}
export const handleClear = () => {
  console.log('handleClear')
}
