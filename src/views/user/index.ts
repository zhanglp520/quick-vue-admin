/**
 * 用户管理模块ts
 */
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { Operates, Column, ToolBar } from '../../types/table'
import { FormItem, FormTitle } from '../../types/form'
import { Page } from '../../types/page'
import { SearchUser, User } from '../../types/user'
import { useUserStore } from '../../store/modules/user'
import {
  addUser,
  updateUser,
  removeUser,
  batchRemoveUser,
  resetUserPassword,
  enableUser,
  disableUser,
} from '../../api/user'

const userStore = useUserStore()
/**
 * 表单-自定义校验
 */
const validateUserId = (rule: any, value: string, callback: any) => {
  const reg = /^YH_\d+$/
  if (!reg.test(value)) {
    callback(new Error('用户编号必须是以YH_开头和数字组合'))
  } else {
    callback()
  }
}
const validateUserName = (rule: any, value: string, callback: any) => {
  const reg = /^[a-zA-Z0-9]{4,16}$/
  if (!reg.test(value)) {
    callback(new Error('用户必须是4-16位的字母、数字'))
  } else {
    callback()
  }
}
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
const validatePhone = (rule: any, value: string, callback: any) => {
  const reg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (!value) {
    callback()
  } else if (!reg.test(value)) {
    callback(new Error('非法手机号'))
  } else {
    callback()
  }
}
const validateEmail = (rule: any, value: string, callback: any) => {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (!value) {
    callback()
  } else if (!reg.test(value)) {
    callback(new Error('非法邮箱'))
  } else {
    callback()
  }
}
/**
 * 表单
 */
export const dialogFormVisible = ref(false)
const dialogFormType = ref('')
export const formTitle = reactive<FormTitle>({
  add: '创建用户',
  edit: '修改用户',
  detail: '用户详情',
})
export const formItems = reactive<Array<FormItem>>([
  {
    label: '用户编号',
    labelWidth: '80px',
    vModel: 'userId',
    editReadonly: true,
    placeholder: '用户编号',
    prop: 'userId',
    rules: [
      {
        required: true,
        message: '用户编号不能为空',
        trigger: 'blur',
      },
      {
        validator: validateUserId,
        trigger: 'blur',
      },
    ],
  },
  {
    label: '用户名',
    labelWidth: '80px',
    vModel: 'userName',
    placeholder: '用户名',
    prop: 'userName',
    rules: [
      {
        required: true,
        message: '用户名不能为空',
        trigger: 'blur',
      },
      {
        validator: validateUserName,
        trigger: 'blur',
      },
    ],
  },
  {
    label: '姓名',
    labelWidth: '80px',
    vModel: 'fullName',
    placeholder: '姓名',
    prop: 'fullName',
    rules: [
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
    placeholder: '手机号',
    prop: 'phone',
    rules: [
      {
        validator: validatePhone,
        trigger: 'blur',
      },
    ],
  },
  {
    label: '邮箱',
    labelWidth: '80px',
    vModel: 'email',
    placeholder: '邮箱',
    prop: 'email',
    rules: [
      {
        validator: validateEmail,
        trigger: 'blur',
      },
    ],
  },
  {
    label: '地址',
    labelWidth: '80px',
    vModel: 'address',
    placeholder: '地址',
  },
  {
    label: '备注',
    labelWidth: '80px',
    vModel: 'remark',
    placeholder: '备注',
    type: 'textarea',
  },
])
export const form = reactive<User>({
  id: '',
  userId: '',
  userName: '',
  password: '',
  createTime: '',
})
export const handleCancel = () => {
  dialogFormVisible.value = false
  console.log('handleCancel')
}
export const handleOk = (formRef: FormInstance, item: User, done: any) => {
  if (!formRef) return
  formRef.validate((valid) => {
    if (!valid) {
      console.log('error submit!')
      return false
    }
    console.log('submit!')
    if (item.id) {
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
  })
}
/**
 * 列表
 */
export const dataList = reactive<Array<User>>([])
export const selectDataList = reactive<Array<User>>([])
/**
 * 列表-分页
 */
export const page = reactive<Page>({
  current: 1,
  size: 10,
  total: 0,
  sizes: [10, 20, 30, 40],
})
export const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
export const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
/**
 * 列表-搜索
 */
export const searchForm = reactive<SearchUser>({
  userName: '',
})
export const searchFormItems = reactive<Array<FormItem>>([
  {
    label: '用户名',
    vModel: 'userName',
    placeholder: '用户名',
  },
])
export const handleSearch = () => {
  console.log('handleSearch!')
}
export const handleClear = () => {
  console.log('handleClear!')
}
/**
 * 列表-工具栏
 */
export const handleAdd = () => {
  // Object.keys(form).forEach((key) => {
  //   form[key] = ''
  // })
}
export const handleBatchDelete = (checkDataList: User[], done: any) => {
  if (checkDataList.length < 1) {
    ElMessage({
      type: 'warning',
      message: '至少选择一行',
    })
    return
  }
  const ids = checkDataList
    .map((x) => {
      return x.id
    })
    .join(',')
  ElMessageBox.confirm(`你真的删除选择的用户吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    batchRemoveUser(ids).then(() => {
      ElMessage({
        type: 'success',
        message: '用户删除成功',
      })
      done()
    })
  })
}
export const handleImport = (done: any) => {
  console.log('import')
  done()
}
export const handleExport = () => {
  console.log('export')
}
export const handlePrint = () => {
  console.log('print')
}
export const tableToolBar = reactive<ToolBar>({
  btns: [
    {
      name: '自定义按钮',
      type: 'danger',
      click: (item: any, done: any) => {
        console.log('item', item)
        done()
      },
    },
  ],
})
/**
 * 列表-表格
 */
export const handleSelectionChange = (userList: Array<User>) => {
  selectDataList.length = 0
  selectDataList.push(...userList)
}
/**
 * 表格-操作
 */
export const handleEdit = (item: User) => {
  dialogFormVisible.value = true
  dialogFormType.value = 'edit'
  Object.keys(item).forEach((key) => {
    form[key] = item[key]
  })
}
export const handleDelete = (item: User, done: any) => {
  ElMessageBox.confirm(`你真的删除【${item.userName}】的用户吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    removeUser(item.id).then(() => {
      ElMessage({
        type: 'success',
        message: '用户删除成功',
      })
      done()
    })
  })
}
export const handleDetail = (item: User) => {
  dialogFormVisible.value = true
  dialogFormType.value = 'detail'
  Object.keys(item).forEach((key) => {
    form[key] = item[key]
  })
}
const handleResetPassword = (item: User, done: any) => {
  ElMessageBox.confirm(`你真的重置【${item.userName}】用户的密码吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    resetUserPassword(item.id).then(() => {
      ElMessage({
        type: 'success',
        message: '置用户密码重成功',
      })
      done()
    })
  })
}
const handleEnable = (item: User, done: any) => {
  ElMessageBox.confirm(`你真的启用【${item.userName}】的用户吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    enableUser(item.id).then(() => {
      ElMessage({
        type: 'success',
        message: '用户启用成功',
      })
      done()
    })
  })
}
const handleDisable = (item: User, done: any) => {
  ElMessageBox.confirm(`你真的禁用【${item.userName}】的用户吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    disableUser(item.id).then(() => {
      ElMessage({
        type: 'success',
        message: '用户禁用成功',
      })
      done()
    })
  })
}
export const tableColumns = reactive<Array<Column>>([
  {
    width: '100',
    type: 'selection',
    align: 'center',
  },
  {
    label: '用户编号',
    prop: 'userId',
    width: '100',
  },
  {
    label: '用户名',
    prop: 'userName',
    width: '100',
  },
  {
    label: '姓名',
    prop: 'fullName',
    width: '100',
  },
  {
    label: '手机号',
    prop: 'phone',
    width: '180',
  },
  {
    label: '邮箱',
    prop: 'email',
    width: '200',
  },
  {
    label: '创建时间',
    prop: 'createTime',
    width: '200',
  },
  {
    label: '地址',
    prop: 'address',
    width: '200',
  },
  {
    label: '备注',
    prop: 'remark',
  },
])
export const tableOperate = reactive<Operates>({
  width: 300,
  btns: [
    {
      name: '重置密码',
      link: true,
      type: 'primary',
      size: 'small',
      click: (item: any, done: any) => {
        handleResetPassword(item, done)
      },
    },
    {
      name: '启用',
      link: true,
      type: 'primary',
      size: 'small',
      render: (row: any) => {
        return !(row.enabled === 0)
      },
      click: (item: any, done: any) => {
        handleEnable(item, done)
      },
    },
    {
      name: '禁用',
      link: true,
      type: 'primary',
      size: 'small',
      render: (row: any) => {
        return !(row.enabled !== 0)
      },
      click: (item: any, done: any) => {
        handleDisable(item, done)
      },
    },
  ],
})
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
