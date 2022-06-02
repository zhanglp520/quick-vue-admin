<script setup lang="ts">
import { computed, ref, reactive, watch, toRef } from 'vue'
import userForm from './userForm.vue'
import { useUserStore } from '../../store/modules/user'
import { getUserList, deleteUser } from '../../api/user'
import { Page, User } from '../../interface/user'

const userStore = useUserStore()
const page: Page = reactive({
  pageNum: 1,
  pageSize: 10,
  pageTotal: 0,
})
const user: User = reactive({
  userId: '',
  userName: '',
  password: '',
  email: '',
  address: '',
  createTime: '',
})
const dataList: User[] = reactive([])
const selectDataList = ref<Array<User>>([])
const isShowForm = ref(false)
userStore.setToken('1111')
userStore.setAge(18)
// const token = computed(() => userStore.getToken)
// const age = computed(() => userStore.age)

// const getList = () => {
// getPageList(page, parmas).then(res => {
//   const { total } = res
//   page.pageTotal = total
//   console.log('userList', res)
// })
// }

// const getList = () => {

// }
const load = () => {
  getUserList().then((res: User[]) => {
    dataList.length = 0
    dataList.push(...res)
  })
}
const handleSelectionChange = (val: User[]) => {
  selectDataList.value = val
}
const handleAdd = () => {
  isShowForm.value = true
  // addUser(form)
}
const handleEdit = () => {
  if (selectDataList.value.length !== 1) {
    console.log('请选择一行')
    return
  }
  isShowForm.value = true
  Object.assign(user, selectDataList.value[0])
}
const handleDelete = () => {
  Object.assign(user, selectDataList.value[0])
  const { userId } = user
  deleteUser(userId).then(() => {
    load()
  })
}
const closeForm = () => {
  isShowForm.value = false
}
const confirmForm = () => {
  isShowForm.value = false
  load()
}

load()
</script>
<template>
  <!-- {{ dataList }} -->
  <!-- <div>用户列表</div>
  <div>token：{{ token }}</div> -->
  <el-row>
    <el-button type="primary" @click="handleAdd()">新增</el-button>
    <el-button type="primary" @click="handleEdit()">编辑</el-button>
    <el-button type="primary" @click="handleDelete()">删除</el-button>
  </el-row>
  <el-table
    :data="dataList"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column prop="user_id" label="编号" width="100" />
    <el-table-column prop="user_name" label="用户名" width="100" />
    <el-table-column prop="email" label="邮箱" width="180" />
    <el-table-column prop="address" label="地址" />
    <el-table-column prop="create_time" label="创建时间" />
  </el-table>
  <user-form
    :is-show-form="isShowForm"
    :user="user"
    @confim-form="confirmForm()"
    @close-form="closeForm()"
  ></user-form>
</template>
<style lang="scss" scoped></style>
