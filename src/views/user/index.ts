import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Column } from '../../types/table'
import { FormItem, FormTitle } from '../../types/form'
import { Page } from '../../types/page'
import { User } from '../../types/user'
import { useUserStore } from '../../store/modules/user'
import {
  getUserPageList,
  addUser,
  updateUser,
  deleteUser,
} from '../../api/user'
/**
 * 属性
 */
const userStore = useUserStore()
export const dataList: User[] = reactive([])
export const searchForm = reactive({})
export const form: User = reactive({
  userId: '',
  userName: '',
  password: '',
  email: '',
  address: '',
  createTime: '',
})
export const page: Page = reactive({
  current: 1,
  size: 10,
  total: 0,
  sizes: [10, 20, 30, 40],
})
export const formTitle: FormTitle = reactive({
  add: '创建用户',
  edit: '修改用户',
  detail: '用户详情',
})
export const searchFormItems: FormItem[] = reactive([
  {
    label: '用户名',
    vModel: 'userName',
  },
])
export const formItems: FormItem[] = reactive([
  {
    label: '用户编号',
    labelWidth: '80px',
    vModel: 'userId',
    addHidden: true,
    editReadonly: true,
  },
  {
    label: '用户名',
    labelWidth: '80px',
    vModel: 'userName',
    autocomplete: 'off',
  },
  {
    label: '邮箱',
    labelWidth: '80px',
    vModel: 'email',
  },
  {
    label: '地址',
    labelWidth: '80px',
    vModel: 'address',
  },
])
export const columns: Column[] = reactive([
  {
    width: '100',
    type: 'selection',
    align: 'center',
  },
  {
    label: '编号',
    prop: 'userId',
    width: '100',
    format: (row: User) => {
      return `bh_${row.userId}`
    },
  },
  {
    label: '用户名',
    prop: 'userName',
    width: '100',
  },
  {
    label: '邮箱',
    prop: 'email',
    width: '300',
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: '300',
  },
  {
    label: '地址',
    prop: 'address',
  },
])
/**
 * 函数
 */
export const load = (parmas: object) => {
  userStore.getUserPageList(parmas).then((res) => {
    const { page: pagination } = res
    const { userList } = userStore.$state
    if (userList) {
      dataList.length = 0
      dataList.push(...userList)
    }
    if (pagination) {
      page.total = pagination.total
    }
  })
}
export const handleSearch = () => {
  console.log('handleSearch!')
}
export const handleReset = () => {
  console.log('handleReset!')
}
export const handleAdd = () => {
  form.userId = ''
  form.userName = ''
  form.email = ''
  form.createTime = ''
  form.address = ''
}
export const handleEdit = (item: User) => {
  form.userId = item.userId
  form.userName = item.userName
  form.email = item.email
  form.createTime = item.createTime
  form.address = item.address
}

export const handleDelete = (item: User, done: any) => {
  ElMessageBox.confirm(`你真的删除【${item.userName}】的用户吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteUser(item.userId).then(() => {
      ElMessage({
        type: 'success',
        message: '用户删除成功',
      })
      done()
    })
  })
}
export const handleCancel = () => {
  console.log('handleCancel')
}
export const handleOk = (item: User, done: any) => {
  if (item.userId) {
    updateUser(item).then(() => {
      ElMessage({
        type: 'success',
        message: '用户修改成功',
      })
      done()
    })
  } else {
    addUser(item).then(() => {
      ElMessage({
        type: 'success',
        message: '用户创建成功',
      })
      done()
    })
  }
}
export const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
export const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
