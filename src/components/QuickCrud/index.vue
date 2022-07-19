<script lang="ts" setup>
import {
  defineProps,
  Ref,
  toRefs,
  reactive,
  ref,
  defineEmits,
  onMounted,
} from 'vue'
import { ElMessage, ElMessageBox, FormInstance } from 'element-plus'
import QuickSearch from '@/components/QuickSearch/index.vue'
import QuickTable from '@/components/QuickTable/index.vue'
import QuickToolbar from '@/components/QuickToolbar/index.vue'
import QuickForm from '@/components/QuickForm/index.vue'
import { Actionbar, Toolbar } from '@/types/table'
import { FormItem } from '@/types/form'
import { Page } from '@/types/page'

/**
 * 属性
 */
const formTitle = reactive({
  add: '添加',
  edit: '编辑',
  delete: '删除',
  detail: '详情',
})
const title = ref('')
const quickFormRef = ref<InstanceType<typeof QuickForm>>()
const dialogFormVisible = ref(false)
const dialogFormType = ref('')
const checkDataList = reactive<Array<any>>([])
/**
 * props
 */
const props = defineProps({
  searchFormModel: {
    type: [Boolean, Object],
    default: false,
  },
  searchFormItems: {
    type: Array,
    default: () => {
      return []
    },
  },
  dialogTitle: {
    type: [Boolean, Object],
    default: false,
  },
  formModel: {
    type: Object,
    default: () => {
      return {}
    },
  },
  formItems: {
    type: Array,
    default: () => {
      return []
    },
  },
  tableData: {
    type: Array,
    default: () => {
      return []
    },
  },
  tableColumns: {
    type: Array,
    default: () => {
      return []
    },
  },
  tableActionbar: {
    type: [Boolean, Object],
    default: false,
  },
  tableToolbar: {
    type: [Boolean, Object],
    default: false,
  },
  page: {
    type: [Boolean, Object],
    default: false,
  },
})
/**
 * props to ref
 */
const {
  searchFormModel,
  searchFormItems,
  tableData,
  tableColumns,
  tableActionbar,
  tableToolbar,
  page,
  dialogTitle,
  formModel,
  formItems,
} = toRefs(props) as {
  searchFormModel: Ref<boolean | any>
  searchFormItems: Ref<FormItem[]>
  dialogTitle: Ref<boolean | any>
  formModel: Ref<any>
  formItems: Ref<FormItem[]>
  tableData: Ref<any>
  tableColumns: Ref<any>
  tableActionbar: Ref<boolean | Actionbar>
  tableToolbar: Ref<boolean | Toolbar>
  page: Ref<Page>
}
/**
 * 类型转换
 */
const toolbar = tableToolbar as Toolbar
const actionbar = tableToolbar as Toolbar
/**
 * emits
 */
const emits = defineEmits([
  'onTreeClick',
  'onLoad',
  'onTreeLoad',
  'onAdd',
  'onEdit',
  'onDelete',
  'onDetail',
  'onBatchDelete',
  'onImport',
  'onExport',
  'onPrint',
  'onRefresh',
  'onSearchFormSubmit',
  'onSearchFormClear',
  'onFormSubmit',
  'onFormCancel',
  'onSizeChange',
  'onCurrentChange',
  'onSelectionChange',
])
/**
 * 加载数据
 */
const load = () => {
  const { current, size } = page.value
  const params = { ...searchFormModel.value, current, size }
  emits('onLoad', params)
}
/**
 * 搜索
 */
const handleSearchSubmit = () => {
  emits('onSearchFormSubmit', searchFormModel.value)
  load()
}
const handleSearchClear = () => {
  Object.keys(searchFormModel.value).forEach((key) => {
    searchFormModel.value[key] = ''
  })
  emits('onSearchFormClear', searchFormModel.value)
  load()
}
/**
 * 操作栏
 */
const handleEdit = (row: any) => {
  dialogFormType.value = 'edit'
  formTitle.edit = dialogTitle.value ? dialogTitle.value.edit : formTitle.edit
  title.value = formTitle.edit
  Object.keys(formModel.value).forEach((key) => {
    formModel.value[key] = row[key]
  })
  dialogFormVisible.value = true
}
const handleDelete = (row: any) => {
  emits('onDelete', row, () => {
    load()
  })
}
const handleDetail = (row: any) => {
  dialogFormType.value = 'detail'
  formTitle.detail = dialogTitle.value
    ? dialogTitle.value.detail
    : formTitle.detail
  title.value = formTitle.detail
  Object.keys(formModel.value).forEach((key) => {
    formModel.value[key] = row[key]
  })
  dialogFormVisible.value = true
}
/**
 * 表单
 */
const handleOk = () => {
  if (quickFormRef.value) {
    quickFormRef.value.handleSubmit()
  }
}
const handleCancel = () => {
  dialogFormVisible.value = false
}
const handleSubmit = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  formRef.validate((valid) => {
    if (!valid) {
      console.log('error submit!')
      return false
    }
    console.log('submit!')
    emits('onFormSubmit', formModel.value, () => {
      dialogFormVisible.value = false
      load()
    })
  })
}
/**
 * 工具栏
 */
const handleAdd = () => {
  dialogFormType.value = 'add'
  formTitle.add = dialogTitle.value ? dialogTitle.value.add : formTitle.add
  title.value = formTitle.add
  dialogFormVisible.value = true
}
const handleBatchDelete = () => {
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
  emits('onBatchDelete', { checkDataList, ids }, () => {
    load()
  })
}
const handleImport = () => {
  console.log('handleImport')
  emits('onImport', () => {
    load()
  })
}
const handleExport = () => {
  console.log('handleExport')
  emits('onExport')
}
const handlePrint = () => {
  console.log('handlePrint')
  emits('onPrint')
}
const handleRefresh = () => {
  console.log('handleRefresh')
  load()
  // emits('onRefresh', () => {
  //   load()
  // })
}
/**
 * 选中
 */
const handleSelectionChange = (userList: Array<any>) => {
  checkDataList.length = 0
  checkDataList.push(...userList)
}
/**
 * 分页
 */
const handleSizeChange = (val: number) => {
  page.value.size = val
  emits('onSizeChange', val)
  load()
}
const handleCurrentChange = (val: number) => {
  page.value.current = val
  emits('onCurrentChange', val)
  load()
}
const handleDone = () => {
  load()
}
onMounted(() => {
  load()
})
</script>
<template>
  <quick-search
    v-if="searchFormModel"
    :model="searchFormModel"
    :items="searchFormItems"
    @on-search="handleSearchSubmit"
    @on-clear="handleSearchClear"
  >
  </quick-search>
  <quick-toolbar
    v-if="tableToolbar"
    :add-button-name="toolbar?.addButtonName"
    :batch-delete-button-name="toolbar?.batchDeleteButtonName"
    :import-button-name="toolbar?.importButtonName"
    :export-button-name="toolbar?.exportButtonName"
    :print-button-name="toolbar?.printButtonName"
    :refresh-button-name="toolbar?.refreshButtonName"
    :hidden-add-button="toolbar?.hiddenAddButton"
    :hidden-batch-delete-button="toolbar?.hiddenBatchDeleteButton"
    :hidde-import-button="toolbar?.hiddenImportButton"
    :hidden-export-button="toolbar?.hiddenExportButton"
    :hidden-print-button="toolbar?.hiddenPrintButton"
    :hidden-refres-hbutton="toolbar?.hiddenRefreshButton"
    @on-add="handleAdd"
    @on-batch-delete="handleBatchDelete"
    @on-import="handleImport"
    @on-export="handleExport"
    @on-print="handlePrint"
    @on-refresh="handleRefresh"
  ></quick-toolbar>
  <quick-table
    :data="tableData"
    :columns="tableColumns"
    :table-actionbar="tableActionbar"
    :edit-button-name="actionbar?.editButtonName"
    :delete-button-name="actionbar?.deleteButtonName"
    :detail-button-name="actionbar?.detailButtonName"
    :hidden-edit-button="actionbar?.hiddenEditButton"
    :hidden-delete-button="actionbar?.hiddenDeleteButton"
    :hidden-detail-button="actionbar?.hiddenDetailButton"
    @on-row-edit="handleEdit"
    @on-row-delete="handleDelete"
    @on-row-detail="handleDetail"
    @on-selection-change="handleSelectionChange"
    @on-done="handleDone"
  >
  </quick-table>
  <el-pagination
    v-if="page"
    v-model:currentPage="page.current"
    v-model:page-size="page.size"
    :page-sizes="page.sizes"
    :small="false"
    :disabled="false"
    :background="false"
    layout="total, sizes, prev, pager, next, jumper"
    :total="page.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  <el-dialog
    v-model="dialogFormVisible"
    :title="title"
    width="35%"
    @close="handleCancel()"
  >
    <quick-form
      ref="quickFormRef"
      :model="formModel"
      :form-items="formItems"
      :form-type="dialogFormType"
      :hidden-action="true"
      @submit="handleSubmit"
    >
    </quick-form>
    <template #footer>
      <span class="dialog-footer">
        <template v-if="dialogFormType === 'detail'">
          <el-button type="primary" @click="handleCancel()">关闭</el-button>
        </template>
        <template v-else>
          <el-button @click="handleCancel()">取消</el-button>
          <el-button type="primary" @click="handleOk()">确定</el-button>
        </template>
      </span>
    </template>
  </el-dialog>
</template>
