<script lang="ts" setup>
import {
  defineProps,
  Ref,
  toRefs,
  reactive,
  ref,
  defineEmits,
  onMounted,
  nextTick,
  onActivated,
} from 'vue'
import { ElMessage, ElTree, FormInstance } from 'element-plus'
import QuickSearch from '@/components/QuickSearch/index.vue'
import QuickTable from '@/components/QuickTable/index.vue'
import QuickToolbar from '@/components/QuickToolbar/index.vue'
import QuickForm from '@/components/QuickForm/index.vue'
import { Actionbar, Toolbar } from '@/types/table'
import { FormItem } from '@/types/form'
import { Page } from '@/types/page'
import { LeftTree, Tree } from '@/types/tree'

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
  formInline: {
    type: Boolean,
    default: false,
  },

  leftTree: {
    type: [Boolean, Object],
    default: false,
  },
  leftTreeRefresh: {
    type: Boolean,
    default: false,
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
  leftTree,
  leftTreeRefresh,
  tableData,
  tableColumns,
  tableActionbar,
  tableToolbar,
  page,
  dialogTitle,
  formModel,
  formItems,
  formInline,
} = toRefs(props) as {
  searchFormModel: Ref<boolean | any>
  searchFormItems: Ref<FormItem[]>
  dialogTitle: Ref<boolean | any>
  formModel: Ref<any>
  formItems: Ref<FormItem[]>
  formInline: Ref<boolean>
  leftTree: Ref<any>
  leftTreeRefresh: Ref<boolean>
  tableData: Ref<any>
  tableColumns: Ref<any>
  tableActionbar: Ref<boolean | Actionbar>
  tableToolbar: Ref<boolean | Toolbar>
  page: Ref<Page>
}
/**
 * 类型转换
 */
const toolbar = tableToolbar.value as Toolbar
const actionbar = tableActionbar.value as Actionbar
const tree = leftTree.value as LeftTree
const treeSpan = tree.treeSpan ? tree.treeSpan : 4
const defaultTreeProps = tree.defaultTreeProps
  ? tree.defaultTreeProps
  : {
      id: 'id',
      label: 'label',
      children: 'children',
    }
const treeData = tree.treeData ? tree.treeData : []
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
  'onTableRef',
])

/**
 * 属性
 */
const quickFormRef = ref<InstanceType<typeof QuickForm>>()
const dialogFormVisible = ref(false)
const dialogFormType = ref('')
const checkDataList = reactive<Array<any>>([])
const selectTree = ref<Tree>({})
const treeRef = ref<InstanceType<typeof ElTree>>()
const title = ref('')
const formTitle = reactive({
  add: '添加',
  edit: '编辑',
  delete: '删除',
  detail: '详情',
})
/**
 * 加载数据
 */

const load = () => {
  const { current, size } = page.value
  const params = { ...searchFormModel.value, current, size }
  emits('onLoad', params)
}
const handleTreeNodeClick = (data: Tree) => {
  selectTree.value = data
  emits('onTreeClick', data, () => {
    load()
  })
}
const treeLoad = () => {
  emits('onTreeLoad', (id: string) => {
    nextTick(() => {
      treeRef.value?.setCurrentKey(id)
      const node = treeRef.value?.getCurrentNode() as Tree
      handleTreeNodeClick(node)
    })
    load()
  })
}
const refresh = () => {
  if (leftTree.value && leftTreeRefresh.value) {
    treeLoad()
  } else {
    load()
  }
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
  Object.keys(formModel.value).forEach((key) => {
    formModel.value[key] = row[key]
  })
  emits('onEdit', formModel.value, (data: any) => {
    Object.keys(formModel.value).forEach((key) => {
      formModel.value[key] = data[key]
    })
    dialogFormVisible.value = true
  })
  dialogFormType.value = 'edit'
  formTitle.edit = dialogTitle.value ? dialogTitle.value.edit : formTitle.edit
  title.value = formTitle.edit
  dialogFormVisible.value = true
}
const handleDelete = (row: any) => {
  emits('onDelete', row, () => {
    refresh()
  })
}
const handleDetail = (row: any) => {
  Object.keys(formModel.value).forEach((key) => {
    formModel.value[key] = row[key]
  })
  emits('onDetail', formModel.value, (data: any) => {
    Object.keys(formModel.value).forEach((key) => {
      formModel.value[key] = data[key]
    })
    dialogFormVisible.value = true
  })
  dialogFormType.value = 'detail'
  formTitle.detail = dialogTitle.value
    ? dialogTitle.value.detail
    : formTitle.detail
  title.value = formTitle.detail
  dialogFormVisible.value = true
}
/**
 * 表单
 */
const handleOk = () => {
  quickFormRef.value?.handleSubmit()
}
const handleCancel = () => {
  Object.keys(formModel.value).forEach((key) => {
    formModel.value[key] = ''
  })
  quickFormRef.value?.handleClear()
  dialogFormVisible.value = false
}
const handleFormSubmit = () => {
  emits('onFormSubmit', formModel.value, () => {
    dialogFormVisible.value = false
    refresh()
  })
}
/**
 * 工具栏
 */
const handleAdd = () => {
  if (leftTree.value && !selectTree.value.id) {
    ElMessage({
      type: 'warning',
      message: '请选择节点',
    })
    return
  }
  emits('onAdd', formModel.value, (data: any) => {
    Object.keys(formModel.value).forEach((key) => {
      formModel.value[key] = data[key]
    })
    dialogFormVisible.value = true
  })
  dialogFormType.value = 'add'
  formTitle.add = dialogTitle.value ? dialogTitle.value.add : formTitle.add
  title.value = formTitle.add
  dialogFormVisible.value = true
}
const handleBatchDelete = () => {
  if (leftTree.value && !selectTree.value.id) {
    ElMessage({
      type: 'warning',
      message: '请选择节点',
    })
    return
  }
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
    refresh()
  })
}
const handleImport = () => {
  if (leftTree.value && !selectTree.value.id) {
    ElMessage({
      type: 'warning',
      message: '请选择节点',
    })
    return
  }
  console.log('handleImport')
  emits('onImport', () => {
    refresh()
  })
}
const handleExport = () => {
  if (leftTree.value && !selectTree.value.id) {
    ElMessage({
      type: 'warning',
      message: '请选择节点',
    })
    return
  }
  console.log('handleExport')
  emits('onExport')
}
const handlePrint = () => {
  if (leftTree.value && !selectTree.value.id) {
    ElMessage({
      type: 'warning',
      message: '请选择节点',
    })
    return
  }
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
const handleCustomToolbarClick = (done: any) => {
  if (leftTree.value && !selectTree.value.id) {
    ElMessage({
      type: 'warning',
      message: '请选择节点',
    })
    return
  }
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
  done({ checkDataList, ids }, () => {
    load()
  })
}
/**
 * 选中
 */
const handleSelectionChange = (selectList: Array<any>) => {
  checkDataList.length = 0
  checkDataList.push(...selectList)
  emits('onSelectionChange', checkDataList)
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
const handleTbaleRef = (tableRef: any): void => {
  emits('onTableRef', tableRef)
}
onMounted(() => {
  if (leftTree.value) {
    treeLoad()
  }
  load()
  // if (autoReFefresh.value) {
  //   timeCount.value = setInterval(() => {
  //     load()
  //   }, autoRefreshTime.value)
  // }
})
onActivated(() => {
  // clearInterval(timeCount.value)
})
</script>
<template>
  <div class="quick-crud">
    <el-row :gutter="40">
      <el-col :span="leftTree ? treeSpan : 0">
        <el-card shadow="never">
          <el-tree
            v-if="leftTree"
            ref="treeRef"
            :data="treeData"
            :props="defaultTreeProps"
            node-key="id"
            :highlight-current="true"
            :expand-on-click-node="false"
            @node-click="handleTreeNodeClick"
          >
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="leftTree ? 24 - treeSpan : 24">
        <quick-search
          v-if="searchFormModel"
          :model="searchFormModel"
          :items="searchFormItems"
          @on-search="handleSearchSubmit"
          @on-clear="handleSearchClear"
        >
        </quick-search>
        <quick-toolbar
          :table-toolbar="tableToolbar"
          :add-button-name="toolbar?.addButtonName"
          :batch-delete-button-name="toolbar?.batchDeleteButtonName"
          :import-button-name="toolbar?.importButtonName"
          :export-button-name="toolbar?.exportButtonName"
          :print-button-name="toolbar?.printButtonName"
          :refresh-button-name="toolbar?.refreshButtonName"
          :hidden-add-button="toolbar?.hiddenAddButton"
          :hidden-batch-delete-button="toolbar?.hiddenBatchDeleteButton"
          :hidden-import-button="toolbar?.hiddenImportButton"
          :hidden-export-button="toolbar?.hiddenExportButton"
          :hidden-print-button="toolbar?.hiddenPrintButton"
          :hidden-refresh-button="toolbar?.hiddenRefreshButton"
          @on-add="handleAdd"
          @on-batch-delete="handleBatchDelete"
          @on-import="handleImport"
          @on-export="handleExport"
          @on-print="handlePrint"
          @on-refresh="handleRefresh"
          @on-custom-toolbar-click="handleCustomToolbarClick"
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
          @on-table-ref="handleTbaleRef"
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
        <!-- 
          :destroy-on-close="true" -->
        <el-dialog
          v-model="dialogFormVisible"
          :title="title"
          :width="formInline ? '60%' : '35%'"
          @close="handleCancel()"
        >
          <quick-form
            ref="quickFormRef"
            :model="formModel"
            :form-items="formItems"
            :form-inline="formInline"
            :form-type="dialogFormType"
            :hidden-action="true"
            :append-to-body="true"
            @on-submit="handleFormSubmit"
          >
          </quick-form>
          <template #footer>
            <span class="dialog-footer">
              <template v-if="dialogFormType === 'detail'">
                <el-button type="primary" @click="handleCancel()"
                  >关闭</el-button
                >
              </template>
              <template v-else>
                <el-button @click="handleCancel()">取消</el-button>
                <el-button type="primary" @click="handleOk()">确定</el-button>
              </template>
            </span>
          </template>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.quick-crud {
  .el-card {
    height: 100%;
  }
}
</style>
