<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadInstance } from 'element-plus'
import { Column, Actionbar, Toolbar, FormItem } from '@ainiteam/quick-vue3-ui'
import { Role } from '@/types/role'
import { SearchUser } from '@/types/user'
import { getRoleList, addRole, updateRole, deleteRole } from '@/api/system/role'

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
    label: '名称',
    vModel: 'userName',
    placeholder: '名称',
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
  hiddenAddButton: true,
  hiddenExportButton: true,
  hiddenPrintButton: true,
  hiddenImportButton: true,
  importButtonName: '上传',
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
  width: 150,
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
    label: '上传时间',
    prop: 'roleName',
  },
  {
    label: '名称',
    prop: 'roleId',
    width: '200',
  },
  {
    label: '原文件名称',
    prop: 'roleName',
  },
  {
    label: '类型',
    prop: 'roleName',
  },
  {
    label: '大小',
    prop: 'roleName',
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

// 上传
const upload = ref(null)

const handleImport = (done: any) => {
  // done()
  //  this.$refs['upload'].$refs['upload-inner'].handleClick()

  //  this.$refs['centerIcon'][0].$children[0].$refs.input.click()
  // el-upload__input
  if (upload.value) {
    upload.value.handleStart()
  }
}

const submitUpload = () => {
  uploadRef.value!.submit()
}
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
    @on-import="handleImport"
  >
    <el-upload
      ref="uploadRef"
      class="upload-demo"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :auto-upload="true"
    >
      <template #trigger>
        <el-button type="primary">上传</el-button>
      </template>
    </el-upload>
  </quick-crud>
</template>
