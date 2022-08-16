<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import QuickCrud from '@/components/QuickCrud/index.vue'
import { Column, Actionbar, Toolbar } from '@/types/table'
import { DictionaryType } from '@/types/dictionaryType'
import { FormItem } from '@/types/form'
import {
  getDictionaryTypeList,
  addDictionaryType,
  updateDictionaryType,
  deleteDictionaryType,
} from '@/api/dictionaryType'

/**
 * 属性
 */
const dataList = reactive<Array<DictionaryType>>([])
/**
 * 表单
 */
const dialogTitle = reactive({
  add: '创建字典分类',
  edit: '修改字典分类',
  detail: '字典分类详情',
})
const formModel = reactive<DictionaryType>({
  id: '',
  dicTypeId: '',
  name: '',
})
const formItems = reactive<Array<FormItem>>([
  {
    label: '分类编号',
    labelWidth: '80px',
    vModel: 'dicTypeId',
    placeholder: '分类编号',
    editReadonly: true,
    prop: 'dicTypeId',
    rules: [
      {
        required: true,
        message: '分类编号不能为空',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '分类名称',
    labelWidth: '80px',
    vModel: 'name',
    placeholder: '分类名称',
    prop: 'name',
    rules: [
      {
        required: true,
        message: '分类名称不能为空',
        trigger: 'blur',
      },
    ],
  },
])
const handleFormSubmit = (form: DictionaryType, done: any) => {
  console.log('handleFormSubmit', form)
  if (form.id) {
    updateDictionaryType(form).then(() => {
      ElMessage({
        type: 'success',
        message: '用户修改成功',
      })
      done()
    })
  } else {
    addDictionaryType(form).then(() => {
      ElMessage({
        type: 'success',
        message: '用户创建成功',
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
 * 操作栏
 */
const handleDelete = (item: DictionaryType, done: any) => {
  ElMessageBox.confirm(`你真的删除【${item.name}】的字典分类吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteDictionaryType(item.id).then(() => {
      ElMessage({
        type: 'success',
        message: '字典分类删除成功',
      })
      done()
    })
  })
}
const tableActionbar = reactive<Actionbar>({
  width: 100,
  hiddenDetailButton: true,
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
    label: '分类编号',
    prop: 'dicTypeId',
    width: '200',
  },
  {
    label: '字典分类',
    prop: 'name',
  },
])
/**
 * 加载数据
 */
const load = () => {
  getDictionaryTypeList().then((res) => {
    const { data: dictionaryTypeList } = res
    dataList.length = 0
    dataList.push(...dictionaryTypeList)
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
