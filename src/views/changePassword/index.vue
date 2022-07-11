<script lang="ts" setup>
import { onMounted } from 'vue'
import QuickForm from '../../components/QuickForm/index.vue'
import { form, formItems, handleSubmit, handleClear } from './idnex'

onMounted(() => {
  console.log('onMounted-login')
})
</script>

<template>
  <div class="change-password">
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
