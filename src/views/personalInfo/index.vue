<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import QuickForm from '../../components/QuickForm/index.vue'
import { router } from '../../router'
import { FormItem } from '../../types/form'
import { User } from '../../types/user'
import { useUserStore } from '../../store/modules/user'
import { getUserInfo } from '../../api/login'

const userStore = useUserStore()

const form = reactive<User>({
  userId: '',
  avator: '',
  fullName: '',
  userName: '',
  password: '',
  phone: '',
  email: '',
  address: '',
})
const formItems = reactive<FormItem[]>([
  {
    label: '头像',
    labelWidth: '80px',
    vModel: 'avator',
    placeholder: '头像',
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
    vModel: 'userName',
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
    vModel: 'userName',
    placeholder: '地址',
  },
])

const handleLogin = () => {
  userStore.login(form).then(() => {
    console.log('登录成功')
    router.push('/')
  })
}
const getPersonalInfo = () => {
  const userName = '111'
  getUserInfo(userName).then((res) => {
    const { payload } = res
    const userInfo: User = payload
    form.avator = userInfo.avator
    form.fullName = userInfo.fullName
    form.userName = userInfo.userName
    form.phone = userInfo.phone
    form.email = userInfo.email
    form.address = userInfo.address
  })
}
onMounted(() => {
  getPersonalInfo()
})
</script>

<template>
  <div class="login">
    <quick-form :model="form" :form-items="formItems" @confirm="handleLogin">
    </quick-form>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
