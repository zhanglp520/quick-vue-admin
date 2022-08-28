<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadInstance } from 'element-plus'
import { Column, Actionbar, Toolbar, FormItem } from '@ainiteam/quick-vue3-ui'
import { Role } from '@/types/role'
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
    label: '空间名称',
    prop: 'roleName',
  },
  {
    label: '类型',
    prop: 'roleName',
  },
  {
    label: 'accessKey',
    prop: 'roleId',
    width: '200',
  },
  {
    label: 'secretKey',
    prop: 'roleName',
  },
  {
    label: '状态',
    prop: 'roleName',
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
        done()
      },
    },
    {
      name: '禁用',
      size: 'small',
      click: (item: any, done: any) => {
        done()
      },
    },
  ],
})
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
  add: '新增对象存储',
  edit: '编辑对象存储',
  detail: '对象存储详情',
})
const formModel = reactive<Role>({
  id: '',
  roleId: '',
  roleName: '',
})
const formItems = reactive<Array<FormItem>>([
  {
    label: '空间名称',
    labelWidth: '90px',
    vModel: 'roleId',
    placeholder: '空间名称',
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
    label: '类型',
    labelWidth: '90px',
    vModel: 'roleName',
    placeholder: '类型',
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
    label: 'accessKey',
    labelWidth: '90px',
    vModel: 'roleName',
    placeholder: 'accessKey',
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
    label: 'secretKey',
    labelWidth: '90px',
    vModel: 'roleName',
    placeholder: 'secretKey',
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
