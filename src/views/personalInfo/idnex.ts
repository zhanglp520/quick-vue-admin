import { reactive, ref } from 'vue'
import { ElMessage, UploadProps } from 'element-plus'
import { FormItem } from '../../types/form'
import { User } from '../../types/user'
import { useUserStore } from '../../store/modules/user'
/**
 * 上传
 */
const imageUrl = ref('')
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  }
  if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}
/**
 * 属性
 */
export const userStore = useUserStore()
export const form = reactive<User>({
  id: '',
  userId: '',
  avatar: '',
  fullName: '',
  userName: '',
  phone: '',
  email: '',
  address: '',
})
export const formItems = reactive<Array<FormItem>>([
  {
    label: '头像',
    labelWidth: '80px',
    vModel: 'avatar',
    placeholder: '头像',
    type: 'avatar',
    actionUrl: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
    imgUrl: '',
    success: handleAvatarSuccess,
    beforeUpload: beforeAvatarUpload,
  },
  {
    label: '姓名',
    labelWidth: '80px',
    vModel: 'fullName',
    placeholder: '姓名',
  },
  {
    label: '用户名',
    labelWidth: '80px',
    vModel: 'userName',
    placeholder: '用户名',
  },
  {
    label: '手机号',
    labelWidth: '80px',
    vModel: 'phone',
    type: 'phone',
    placeholder: '手机号',
  },
  {
    label: '邮箱',
    labelWidth: '80px',
    vModel: 'email',
    type: 'email',
    placeholder: '邮箱',
  },
  {
    label: '地址',
    labelWidth: '80px',
    vModel: 'address',
    placeholder: '地址',
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
