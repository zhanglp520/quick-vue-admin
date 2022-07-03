import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Column } from '../../types/table'
import { FormItem, FormTitle } from '../../types/form'
import { Page } from '../../types/page'
import { User } from '../../types/user'
import {
  getUserPageList,
  addUser,
  updateUser,
  deleteUser,
} from '../../api/user'
/**
 * 属性
 */
export const dataList: User[] = reactive([])
export const searchForm = reactive({})
export const form: User = reactive({
  user_id: '',
  user_name: '',
  password: '',
  email: '',
  address: '',
  create_time: '',
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
    vModel: 'user_name',
  },
])
export const formItems: FormItem[] = reactive([
  {
    label: '用户编号',
    labelWidth: '80px',
    vModel: 'user_id',
    addHidden: true,
    editReadonly: true,
  },
  {
    label: '用户名',
    labelWidth: '80px',
    vModel: 'user_name',
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
    prop: 'user_id',
    width: '100',
    format: (row: User) => {
      return `bh_${row.user_id}`
    },
  },
  {
    label: '用户名',
    prop: 'user_name',
    width: '100',
  },
  {
    label: '邮箱',
    prop: 'email',
    width: '300',
  },
  {
    label: '创建时间',
    prop: 'create_time',
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
  getUserPageList(parmas).then((res) => {
    const { payload, pagination } = res
    page.total = pagination.total
    dataList.length = 0
    dataList.push(...payload)
  })
}
export const handleSearch = () => {
  console.log('handleSearch!')
}
export const handleReset = () => {
  console.log('handleReset!')
}
export const handleAdd = () => {
  form.user_id = ''
  form.user_name = ''
  form.email = ''
  form.create_time = ''
  form.address = ''
}
export const handleEdit = (item: User) => {
  form.user_id = item.user_id
  form.user_name = item.user_name
  form.email = item.email
  form.create_time = item.create_time
  form.address = item.address
}

export const handleDelete = (item: User, done: any) => {
  ElMessageBox.confirm(`你真的删除【${item.user_name}】的用户吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteUser(item.user_id).then(() => {
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
  if (item.user_id) {
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
