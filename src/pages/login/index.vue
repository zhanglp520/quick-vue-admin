<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import { userLogin } from '../../api/login'
import QuickForm from '../../components/QuickForm/index.vue'
import { router } from '../../router'
import { FormItem } from '../../types/form'
import { Login } from '../../types/user'
import { useUserStore } from '../../store/modules/user'

const userStore = useUserStore()

const form = reactive<Login>({
  tenant: '',
  userName: '',
  userPassword: '',
})
const formItems = reactive<FormItem[]>([
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

const handleLogin = () => {
  userStore.login(form).then(() => {
    console.log('登录成功')
    router.push('/')
  })
}

onMounted(() => {
  console.log('onMounted-login')
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
