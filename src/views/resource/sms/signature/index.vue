<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadInstance } from 'element-plus'
import { Column, Actionbar, Toolbar } from '@/types/table'
import { Role } from '@/types/role'
import { FormItem } from '@/types/form'
import { SearchUser } from '@/types/user'
import { getRoleList, addRole, updateRole, deleteRole } from '@/api/role'

/**
 * 属性
 */
const loading = ref(false)
const uploadRef = ref<UploadInstance>()
const dataList = reactive<Array<Role>>([])
/**
 * 搜索
 */
const searchForm = reactive<SearchUser>({
  userName: '',
})
const searchFormItems = reactive<Array<FormItem>>([
  {
    label: '签名名称',
    vModel: 'userName',
    placeholder: '签名名称',
  },
  {
    label: '签名类型',
    vModel: 'userName',
    placeholder: '签名类型',
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
 * 操作栏
 */
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
      name: '审核',
      size: 'small',
      click: (item: any, done: any) => {
        done()
      },
    },
  ],
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
    label: '签名名称',
    prop: 'roleName',
  },
  {
    label: '签名用途',
    prop: 'roleName',
  },
  {
    label: '签名类型',
    prop: 'roleName',
  },
  {
    label: '签名内容',
    prop: 'roleId',
    width: '200',
  },
  {
    label: '证明类型',
    prop: 'roleId',
    width: '200',
  },
  {
    label: '证明上传',
    prop: 'roleId',
    width: '200',
  },
  {
    label: '联系人',
    prop: 'roleId',
    width: '200',
  },
])
/**
 * 加载数据
 */
const load = () => {
  loading.value = true
  getRoleList().then((res) => {
    loading.value = false
    const { data: roleList } = res
    dataList.length = 0
    dataList.push(...roleList)
  })
}
/**
 * 表单
 */
const dialogTitle = reactive({
  add: '新增签名管理',
  edit: '编辑签名管理',
  detail: '签名管理详情',
})
const formModel = reactive<Role>({
  id: '',
  roleId: '',
  roleName: '',
})
const formItems = reactive<Array<FormItem>>([
  {
    label: '签名名称',
    labelWidth: '80px',
    vModel: 'roleId',
    placeholder: '签名名称',
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
    label: '签名用途',
    labelWidth: '80px',
    vModel: 'roleName',
    placeholder: '签名用途',
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
    label: '签名类型',
    labelWidth: '80px',
    vModel: 'roleName',
    placeholder: '签名类型',
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
    label: '签名内容',
    labelWidth: '80px',
    vModel: 'roleName',
    placeholder: '签名内容',
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
    label: '证明类型',
    labelWidth: '80px',
    vModel: 'roleName',
    placeholder: '证明类型',
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
    label: '证明上传',
    labelWidth: '80px',
    vModel: 'roleName',
    placeholder: '证明上传',
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
    label: '联系人',
    labelWidth: '80px',
    vModel: 'roleName',
    placeholder: '联系人',
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
    :loading="loading"
    @on-load="load"
    @on-form-submit="handleFormSubmit"
    @on-delete="handleDelete"
  ></quick-crud>
</template>
