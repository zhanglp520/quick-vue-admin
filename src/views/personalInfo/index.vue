<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { ElMessage, UploadProps } from 'element-plus'
import { FormItem } from '@ainiteam/quick-vue3-ui'
import { User } from '@/types/user'
import { useUserStore } from '@/store/modules/user'
import { updateUser } from '@/api/system/user'
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
const userStore = useUserStore()
const form = reactive<User>({
  id: '',
  userId: '',
  avatar: '',
  fullName: '',
  userName: '',
  phone: '',
  email: '',
  address: '',
})
const formItems = reactive<Array<FormItem>>([
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
const handleSubmit = () => {
  updateUser(form).then(() => {
    ElMessage({
      type: 'success',
      message: '修改个人资料成功.',
    })
  })
}
const handleClear = () => {
  Object.keys(form).forEach((key) => {
    form[key] = ''
  })
}

onMounted(() => {
  const { user } = userStore.$state
  const { id, userName, userId, avatar, fullName, phone, email, address } = user
  form.id = id
  form.userId = userId
  form.userName = userName
  form.avatar = avatar
  form.fullName = fullName
  form.phone = phone
  form.email = email
  form.address = address
})
</script>

<template>
  <div class="personalInfo">
    <quick-form
      :model="form"
      :form-items="formItems"
      :show-action="true"
      :action-slot="true"
    >
      <template #action>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleClear">清空</el-button>
        </el-form-item>
      </template>
    </quick-form>
  </div>
</template>

<style lang="scss" scoped>
.personalInfo {
  width: 50%;
}
</style>
