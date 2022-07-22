<script lang="ts" setup>
import { reactive } from 'vue'
import { router } from '../../router'
import { FormItem } from '../../types/form'
import { LoginParams } from '@/types/login'
import { useLoginStore } from '../../store/modules/login'
import { useUserStore } from '../../store/modules/user'
import { useMenuStore } from '../../store/modules/menu'

import QuickForm from '../../components/QuickForm/index.vue'
/**
 * 属性
 */
const loginStore = useLoginStore()
const userStore = useUserStore()
const menuStore = useMenuStore()
const form = reactive<LoginParams>({
  tenant: '',
  userName: '',
  userPassword: '',
})
const formItems = reactive<Array<FormItem>>([
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
const handleLogin = async (): Promise<void> => {
  const { userName } = form
  await loginStore.login(form)
  const user = await userStore.getUserInfo(userName)
  if (user) {
    const { id } = user
    await menuStore.getMenuListByUserId(id.toString())
    router.push('/')
  }
}
</script>

<template>
  <div class="login">
    <quick-form
      :model="form"
      :form-items="formItems"
      :show-action="true"
      :action-slot="true"
    >
      <template #action>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </template>
    </quick-form>
  </div>
</template>

<style lang="scss" scoped></style>
