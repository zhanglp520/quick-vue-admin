<script lang="ts" setup>
import { reactive, ref } from 'vue'
import QuickForm from '@/components/QuickForm/index.vue'
import { FormItem } from '@/types/form'
import { User } from '@/types/user'

const quickFormRef = ref<InstanceType<typeof QuickForm>>()
const validateFullName = (rule: any, value: string, callback: any) => {
  const reg = /^[\u4e00-\u9fa5]{2,4}$/
  if (!value) {
    callback()
  } else if (!reg.test(value)) {
    callback(new Error('非法姓名'))
  } else {
    callback()
  }
}
const form = reactive<User>({
  fullName: '',
})
const formItems = reactive<Array<FormItem>>([
  {
    label: '姓名',
    labelWidth: '80px',
    vModel: 'fullName',
    placeholder: '姓名',
    prop: 'fullName',
    rules: [
      {
        required: true,
        message: '姓名不能为空',
        trigger: 'blur',
      },
      {
        validator: validateFullName,
        trigger: 'blur',
      },
    ],
  },
])
const handleSubmit = (formRef: any) => {
  if (!formRef) return
  formRef.validate((valid) => {
    if (!valid) {
      console.log('error submit!')
      return false
    }
    console.log('submit!')
    return true
  })
  console.log('handleSubmit', form)
}
const handleClear = () => {
  Object.keys(form).forEach((key) => {
    form[key] = ''
  })
  console.log('handleClear', form)
}
</script>
<template>
  <quick-form
    ref="quickFormRef"
    :model="form"
    :form-items="formItems"
    @submit="handleSubmit"
    @clear="handleClear"
  >
  </quick-form>
</template>
