<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadInstance } from 'element-plus'
import QuickCrud from '@/components/QuickCrud/index.vue'
import { Column, Actionbar, Toolbar } from '@/types/table'
import { Role } from '@/types/role'
import { FormItem } from '@/types/form'
import { getRoleList, addRole, updateRole, deleteRole } from '@/api/role'
import { SearchUser } from '@/types/user'

const uploadRef = ref<UploadInstance>()

const dataList = reactive<Array<Role>>([])
/**
 * 表单
 */
const dialogTitle = reactive({
  add: '新增普通存储',
  edit: '编辑普通存储',
  detail: '普通存储详情',
})
const formModel = reactive<Role>({
  id: '',
  roleId: '',
  roleName: '',
})
const formItems = reactive<Array<FormItem>>([
  {
    label: 'FTP地址',
    labelWidth: '80px',
    vModel: 'roleId',
    placeholder: 'FTP地址',
    editReadonly: true,
    prop: 'roleId',
    rules: [
      {
        required: true,
        message: '角色编号不能为空',
        trigger: 'blur',
      },
    ],
  },
  {
    label: 'FTP账号',
    labelWidth: '80px',
    vModel: 'roleName',
    placeholder: 'FTP账号',
    prop: 'roleName',
    rules: [
      {
        required: true,
        message: '角色名称不能为空',
        trigger: 'blur',
      },
    ],
  },
  {
    label: 'FTP密码',
    labelWidth: '80px',
    vModel: 'roleName',
    placeholder: 'FTP密码',
    prop: 'roleName',
    rules: [
      {
        required: true,
        message: '角色名称不能为空',
        trigger: 'blur',
      },
    ],
  },
])
const handleFormSubmit = (form: Role, done: any) => {
  console.log('handleFormSubmit', form)
  if (form.id) {
    updateRole(form).then(() => {
      ElMessage({
        type: 'success',
        message: '角色修改成功',
      })
      done()
    })
  } else {
    addRole(form).then(() => {
      ElMessage({
        type: 'success',
        message: '角色创建成功',
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
    label: '空间名称',
    vModel: 'userName',
    placeholder: '空间名称',
  },
  {
    label: '类型',
    vModel: 'userName',
    placeholder: '类型',
  },
])

/**
 * 工具栏
 */
const tableToolbar = reactive<Toolbar>({
  hiddenExportButton: true,
  hiddenPrintButton: true,
  hiddenImportButton: true,
  hiddenBatchDeleteButton: true,
})

/**
 * 表格
 */
const tableColumns = reactive<Array<Column>>([
  {
    width: '50',
    type: 'selection',
  },
  {
    label: 'FTP地址',
    prop: 'roleName',
    fixed: true,
  },
  {
    label: 'FTP账号',
    prop: 'roleName',
  },
  {
    label: 'FTP密码',
    prop: 'roleId',
    width: '200',
  },
  {
    label: '状态',
    prop: 'roleId',
    width: '200',
  },
])
const handleDelete = (item: Role, done: any) => {
  ElMessageBox.confirm(`你真的删除【${item.roleName}】的角色吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteRole(item.id).then(() => {
      ElMessage({
        type: 'success',
        message: '角色删除成功',
      })
      done()
    })
  })
}

const tableActionbar = reactive<Actionbar>({
  width: 250,
  btns: [
    {
      name: '启用',
      size: 'small',
      click: (item: any, done: any) => {
        console.log('左边自定义按钮click', item)
        done()
      },
    },
    {
      name: '禁用',
      size: 'small',
      click: (item: any, done: any) => {
        console.log('右边自定义按钮click', item)
        done()
      },
    },
  ],
})
/**
 * 加载数据
 */
const load = () => {
  getRoleList().then((res) => {
    const { data: roleList } = res
    dataList.length = 0
    dataList.push(...roleList)
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
    @on-load="load"
    @on-form-submit="handleFormSubmit"
    @on-delete="handleDelete"
  ></quick-crud>
</template>
