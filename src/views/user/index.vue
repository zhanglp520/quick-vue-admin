<script setup lang="ts">
import { ref, reactive } from 'vue'
import userForm from './userForm.vue'
import { useUserStore } from '../../store/modules/user'
import { getUserList, deleteUser } from '../../api/user'
import { User } from '../../interface/user'

const currentPage4 = ref(4)
const pageSize4 = ref(100)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const userStore = useUserStore()
// const page: Page = reactive({
//   pageNum: 1,
//   pageSize: 10,
//   pageTotal: 0,
// })

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
const form = reactive({
  email: '',
  name: '',
})

const onSubmit = () => {
  console.log('submit!')
}
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
  getUserList().then((res) => {
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
  <!-- <q-button>我是按钮</q-button> -->
  <el-form :inline="true" :model="form" class="demo-form-inline">
    <el-form-item label="邮箱">
      <el-input v-model="form.email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="用户名">
      <el-select v-model="form.name" placeholder="请选择">
        <el-option label="admin" value="admin" />
        <el-option label="zhanglp" value="zhanglp" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Query</el-button>
    </el-form-item>
  </el-form>
  <el-button-group class="ml-4 action">
    <el-button type="primary" @click="handleAdd()">新增</el-button>
    <el-button type="primary" @click="handleEdit()">编辑</el-button>
    <el-button type="primary" @click="handleDelete()">删除</el-button>
  </el-button-group>
  <el-table
    :data="dataList"
    style="width: 100%"
    show-summary
    stripe
    border
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column prop="user_id" label="编号" width="100" />
    <el-table-column prop="user_name" label="用户名" width="100" />
    <el-table-column prop="email" label="邮箱" width="300" />
    <el-table-column prop="create_time" label="创建时间" width="300" />
    <el-table-column prop="address" label="地址" />
  </el-table>
  <el-pagination
    v-model:currentPage="currentPage4"
    v-model:page-size="pageSize4"
    :page-sizes="[100, 200, 300, 400]"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  <user-form
    :is-show-form="isShowForm"
    :user="user"
    @confim-form="confirmForm()"
    @close-form="closeForm()"
  ></user-form>
</template>
<style lang="scss" scoped>
.action {
  margin-bottom: 10px;
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
.el-pagination {
  margin-top: 10px;
}
</style>
