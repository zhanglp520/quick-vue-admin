<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import QuickCrud from '@/components/QuickCrud/index.vue'
import { Column, Actionbar, Toolbar } from '@/types/table'
import { User, SearchUser } from '@/types/user'
import { FormItem } from '@/types/form'
import { Page } from '@/types/page'
import { useUserStore } from '@/store/modules/user'
import {
  addUser,
  updateUser,
  deleteUser,
  batchDeleteUser,
  resetUserPassword,
  enableUser,
  disableUser,
} from '../../api/user'

const userStore = useUserStore()
const dataList = reactive<Array<User>>([])
/**
 * 表单
 */
const dialogTitle = reactive({
  add: '添加用户',
  edit: '编辑用户',
  delete: '删除用户',
  detail: '用户详情',
})
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
const formModel = reactive<User>({
  id: '',
  userId: '',
  userName: '',
  password: '',
  createTime: '',
})
const formItems = reactive<Array<FormItem>>([
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
const handleFormSubmit = (form: User, done: any) => {
  console.log('handleFormSubmit', form)
  if (form.id) {
    updateUser(form).then(() => {
      ElMessage({
        type: 'success',
        message: '用户修改成功',
      })
      done()
    })
  } else {
    addUser(form).then(() => {
      ElMessage({
        type: 'success',
        message: '用户创建成功',
      })
      done()
    })
  }
}
/**
 * 搜索
 */
const searchForm = reactive<SearchUser>({
  userName: '',
})
const searchFormItems = reactive<Array<FormItem>>([
  {
    label: '用户名',
    vModel: 'userName',
    placeholder: '用户名',
  },
])
/**
 * 工具栏
 */
const tableToolbar = reactive<Toolbar>({
  hiddenBatchDeleteButton: false,
})
const handleBatchDelete = (data: any, done: any) => {
  const { checkDataList, ids } = data
  ElMessageBox.confirm(`你真的删除选择的用户吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    batchDeleteUser(ids).then(() => {
      ElMessage({
        type: 'success',
        message: '用户删除成功',
      })
      done()
    })
  })
}
const handleImport = (done: any) => {
  done()
}
const handleExport = () => {
  // window.open(`${window.location.origin}/用户报表.xlsx`)//TODO:导出bug
}
const handlePrint = () => {
  window.print()
}
/**
 * 表格
 */
const tableColumns = reactive<Array<Column>>([
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
const tableActionbar = reactive<Actionbar>({
  width: 200,
})
const handleDelete = (item: User, done: any) => {
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
/**
 * 分页
 */
const page = reactive<Page>({
  current: 1,
  size: 10,
  sizes: [10, 20, 30, 40, 50],
  total: 100,
})
/**
 * 加载数据
 */
const load = (parmas: object) => {
  userStore.getUserPageList(parmas).then((res: any) => {
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
</script>
<template>
  <quick-crud
    :dialog-title="dialogTitle"
    :form-model="formModel"
    :form-items="formItems"
    :table-data="dataList"
    :table-columns="tableColumns"
    :table-actionbar="tableActionbar"
    :table-toolbar="tableToolbar"
    :search-form-items="searchFormItems"
    :search-form-model="searchForm"
    dialog-titles="dialogTitles"
    :page="page"
    @on-load="load"
    @on-form-submit="handleFormSubmit"
    @on-delete="handleDelete"
    @on-batch-delete="handleBatchDelete"
    @on-print="handlePrint"
    @on-export="handleExport"
  ></quick-crud>
</template>
