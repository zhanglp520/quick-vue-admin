<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { FormInstance } from 'element-plus'
import QuickForm from '@/components/QuickForm/index.vue'
import { FormItem } from '@/types/form'
import { User } from '@/types/user'

const quickFormRef = ref<InstanceType<typeof QuickForm>>()
const dialogFormVisible = ref(false)
const dialogFormType = ref('')
const dialogTitle = ref('')
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
  phone: '',
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

  {
    label: '手机号',
    labelWidth: '80px',
    vModel: 'phone',
    type: 'phone',
    placeholder: '手机号',
  },
])
const handleAdd = () => {
  console.log('handleAdd', form)
  dialogFormType.value = 'add'
  dialogTitle.value = '新增用户'
  dialogFormVisible.value = true
}
const handleEdit = () => {
  console.log('handleEdit', form)
  dialogFormType.value = 'edit'
  dialogTitle.value = '编辑用户'
  form.fullName = '张三'
  form.phone = '15229380174'
  dialogFormVisible.value = true
}
const handleDetail = () => {
  console.log('handleDetail', form)
  dialogFormType.value = 'detail'
  dialogTitle.value = '用户详情'
  form.fullName = '张三'
  form.phone = '15229380174'
  dialogFormVisible.value = true
}
const handleOk = () => {
  console.log('handleOk', form)
  if (quickFormRef.value) {
    quickFormRef.value.handleSubmit()
  }
}
const handleCancel = () => {
  console.log('handleCancel', form)
  dialogFormVisible.value = false
}
const handleSubmit = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  formRef.validate((valid) => {
    if (!valid) {
      console.log('error submit!')
      return false
    }
    console.log('submit!')
    dialogFormVisible.value = false
    return true
  })
}
</script>
<template>
  <div>
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-button type="primary" @click="handleEdit">编辑</el-button>
    <el-button @click="handleDetail">详情</el-button>
  </div>
  <el-drawer
    v-model="dialogFormVisible"
    :title="dialogTitle"
    direction="rtl"
    :before-close="handleCancel"
  >
    <quick-form
      ref="quickFormRef"
      :model="form"
      :form-items="formItems"
      :form-type="dialogFormType"
      :hidden-action="true"
      @submit="handleSubmit"
    >
    </quick-form>
    <template #footer>
      <span class="dialog-footer">
        <template v-if="dialogFormType === 'detail'">
          <el-button type="primary" @click="handleCancel()">关闭</el-button>
        </template>
        <template v-else>
          <el-button @click="handleCancel()">取消</el-button>
          <el-button type="primary" @click="handleOk()">确定</el-button>
        </template>
      </span>
    </template>
  </el-drawer>
</template>
