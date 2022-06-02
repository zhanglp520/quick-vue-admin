<script lang="ts" setup>
import { reactive, ref, defineProps, watch, defineEmits } from 'vue'
import { addUser, updateUser } from '../../api/user'
import { User } from '../../interface/user'

const props = defineProps({
  isShowForm: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['closeForm', 'confimForm'])
const dialogFormVisible = ref(false)
const formLabelWidth = '80px'
const isEdit = ref(false)
const form: User = reactive({
  userId: '',
  userName: '',
  password: '',
  email: '',
  address: '',
  createTime: '',
})
watch(
  () => props.isShowForm,
  (val: boolean) => {
    dialogFormVisible.value = val
    Object.assign(form, props.user)
    isEdit.value = form.userId !== ''
  }
)

const handleClose = () => {
  dialogFormVisible.value = false
  emit('closeForm')
}
const handleCancel = () => {
  handleClose()
}
const handleOk = () => {
  if (form.userId) {
    updateUser(form).then(() => {
      emit('confimForm')
    })
  } else {
    addUser(form).then(() => {
      emit('confimForm')
    })
  }
}
</script>
<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="用户表单"
    width="35%"
    @close="handleClose()"
  >
    <el-form :model="form">
      <el-form-item
        v-if="isEdit"
        label="用户编号"
        :label-width="formLabelWidth"
      >
        <el-input v-model="form.userId" autocomplete="off" readonly />
      </el-form-item>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input v-model="form.userName" autocomplete="off" />
      </el-form-item>
      <!-- <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off" />
      </el-form-item> -->
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off" />
      </el-form-item>
      <el-form-item label="地址" :label-width="formLabelWidth">
        <el-input v-model="form.address" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel()">取消</el-button>
        <el-button type="primary" @click="handleOk()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
