<script lang="ts" setup>
import QuickForm from '../../components/QuickForm/index.vue'
import { form, formItems, handleLogin } from './idnex'
</script>

<template>
  <div class="login">
    <quick-form :model="form" :form-items="formItems" :action-slot="true">
      <template #action>
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </template>
    </quick-form>
  </div>
</template>

<style lang="scss" scoped>
@import './index.scss';
</style>
