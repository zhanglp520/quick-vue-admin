<script setup lang="ts">
import { reactive } from 'vue'
import { User } from '../../types/user'
import QuickCrud from '../../components/QuickCrud/index.vue'
import { getUserList, addUser, updateUser, deleteUser } from '../../api/user'
import { columns, formItems, searchFormItems } from './index'

const dataList: User[] = reactive([])
const searchForm = reactive({
  email: '',
  name: '',
})
const form: User = reactive({
  user_id: '',
  user_name: '',
  password: '',
  email: '',
  address: '',
  create_time: '',
})
const load = () => {
  getUserList().then((res: User[]) => {
    dataList.length = 0
    dataList.push(...res)
  })
}
const handleSearch = () => {
  console.log('handleSearch!')
}
const handleReset = () => {
  console.log('handleReset!')
}

const handleAdd = () => {
  form.user_id = ''
  form.user_name = ''
  form.email = ''
  form.create_time = ''
  form.address = ''
}
const handleEdit = (item: User) => {
  form.user_id = item.user_id
  form.user_name = item.user_name
  form.email = item.email
  form.create_time = item.create_time
  form.address = item.address
}
const handleDelete = (item: User, done: any) => {
  deleteUser(item.user_id).then(() => {
    done()
  })
}
const handleCancel = () => {
  console.log('handleCancel')
}
const handleOk = (item: User, done: any) => {
  if (item.user_id) {
    updateUser(item).then(() => {
      done()
    })
  } else {
    addUser(item).then(() => {
      done()
    })
  }
}
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>
<template>
  <quick-crud
    :table-data="dataList"
    :table-columns="columns"
    :form-model="form"
    :form-items="formItems"
    :search-form-model="searchForm"
    :search-form-items="searchFormItems"
    @on-load="load"
    @on-add="handleAdd"
    @on-edit="handleEdit"
    @on-delete="handleDelete"
    @on-search-form-submit="handleSearch"
    @on-search-form-reset="handleReset"
    @on-form-submit="handleOk"
    @on-form-cancel="handleCancel"
    @on-size-change="handleSizeChange"
    @on-current-change="handleCurrentChange"
  ></quick-crud>
</template>
<style lang="scss" scoped>
@import './index.scss';
</style>
