<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import QuickCrud from '@/components/QuickCrud/index.vue'
import { Column, Actionbar, Toolbar } from '@/types/table'
import { Role } from '@/types/role'
import { FormItem } from '@/types/form'
import { getRoleList, addRole, updateRole, deleteRole } from '@/api/role'

const dataList = reactive<Array<Role>>([])
/**
 * 表单
 */
const dialogTitle = reactive({
  add: '新增角色',
  edit: '编辑角色',
  detail: '角色详情',
})
const formModel = reactive<Role>({
  id: '',
  roleId: '',
  roleName: '',
})
const formItems = reactive<Array<FormItem>>([
  {
    label: '角色编号',
    labelWidth: '80px',
    vModel: 'roleId',
    placeholder: '角色编号',
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
    label: '角色名称',
    labelWidth: '80px',
    vModel: 'roleName',
    placeholder: '角色名称',
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
 * 工具栏
 */
const tableToolbar = reactive<Toolbar>({
  hiddenBatchDeleteButton: true,
  hiddenImportButton: true,
  hiddenExportButton: true,
  hiddenPrintButton: true,
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
    label: '角色编号',
    prop: 'roleId',
    width: '200',
  },
  {
    label: '角色名称',
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
  width: 150,
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
    dialog-titles="dialogTitles"
    @on-load="load"
    @on-form-submit="handleFormSubmit"
    @on-delete="handleDelete"
  ></quick-crud>
</template>
