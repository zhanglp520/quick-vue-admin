import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import { Column } from '../../types/table'
import { FormItem, FormTitle } from '../../types/form'
import { Page } from '../../types/page'
import { SearchUser, User } from '../../types/user'
import { useUserStore } from '../../store/modules/user'
import { addUser, updateUser, deleteUser } from '../../api/user'
/**
 * 表单验证
 */
const validateUserName = (rule: any, value: string, callback: any) => {
  const reg = /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/
  if (!reg.test(value)) {
    callback(new Error('非法用户名'))
  }
}
const validateFullName = (rule: any, value: string, callback: any) => {
  const reg = /^[\u4e00-\u9fa5]{2,4}$/
  if (!reg.test(value)) {
    callback(new Error('非法姓名'))
  }
}
const validatePhone = (rule: any, value: string, callback: any) => {
  const reg =
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (!reg.test(value)) {
    callback(new Error('非法手机号'))
  }
}
const validateEmail = (rule: any, value: string, callback: any) => {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  if (!reg.test(value)) {
    callback(new Error('非法邮箱'))
  }
}

/**
 * 属性
 */
const userStore = useUserStore()
export const dataList = reactive<Array<User>>([])
export const searchForm = reactive<SearchUser>({
  userName: '',
})
export const form = reactive<User>({
  id: '',
  userId: '',
  userName: '',
  password: '',
  createTime: '',
})
export const page = reactive<Page>({
  current: 1,
  size: 10,
  total: 0,
  sizes: [10, 20, 30, 40],
})
export const formTitle = reactive<FormTitle>({
  add: '创建用户',
  edit: '修改用户',
  detail: '用户详情',
})
export const searchFormItems = reactive<Array<FormItem>>([
  {
    label: '用户名',
    vModel: 'userName',
    placeholder: '用户名',
  },
])
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
        // validate: validateUserName,
      },
    ],
  },
  {
    label: '姓名',
    labelWidth: '80px',
    vModel: 'fullName',
    placeholder: '姓名',
    // rules: [{ validator: validateFullName, trigger: 'blur' }],
  },
  {
    label: '手机号',
    labelWidth: '80px',
    vModel: 'phone',
    placeholder: '手机号',
    // rules: [{ validator: validatePhone, trigger: 'blur' }],
  },
  {
    label: '邮箱',
    labelWidth: '80px',
    vModel: 'email',
    placeholder: '邮箱',
    // rules: [{ validator: validateEmail, trigger: 'blur' }],
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
export const columns = reactive<Array<Column>>([
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
export const handleClear = () => {
  console.log('handleClear!')
}
export const handleAdd = () => {
  Object.keys(form).forEach((key) => {
    form[key] = ''
  })
}
export const handleEdit = (item: User) => {
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
    deleteUser(item.id).then(() => {
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
export const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
export const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
