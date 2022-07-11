<script lang="ts" setup>
import { onMounted } from 'vue'
import QuickForm from '../../components/QuickForm/index.vue'
import { userStore, form, formItems, handleSubmit, handleClear } from './idnex'

onMounted(() => {
  const { user } = userStore.$state
  form.avatar = user.avatar
  form.fullName = user.fullName
  form.userName = user.userName
  form.phone = user.phone
  form.email = user.email
  form.address = user.address
})
</script>

<template>
  <div class="personalInfo">
    <quick-form
      :model="form"
      :form-items="formItems"
      @submit="handleSubmit"
      @clear="handleClear"
    >
    </quick-form>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
