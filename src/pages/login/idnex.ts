import { reactive } from 'vue'
import { router } from '../../router'
import { FormItem } from '../../types/form'
import { Login } from '../../types/user'
import { useLoginStore } from '../../store/modules/login'
/**
 * 属性
 */
const loginStore = useLoginStore()
export const form = reactive<Login>({
  tenant: '',
  userName: '',
  userPassword: '',
})
export const formItems = reactive<Array<FormItem>>([
  {
    label: '租户',
    labelWidth: '80px',
    vModel: 'tenant',
    type: 'text',
    placeholder: '租户',
  },
  {
    label: '用户名',
    labelWidth: '80px',
    vModel: 'userName',
    type: 'text',
    placeholder: '用户名',
  },
  {
    label: '密码',
    labelWidth: '80px',
    vModel: 'userPassword',
    type: 'password',
    placeholder: '密码',
  },
])
/**
 * 函数
 */
export const handleLogin = (): void => {
  loginStore.login(form).then(() => {
    console.log('登录成功')
    router.push('/')
  })
}
