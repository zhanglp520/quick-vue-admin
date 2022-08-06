<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import QuickCrud from '@/components/QuickCrud/index.vue'
import { Column, Actionbar, Toolbar } from '@/types/table'
import { Log, SearchLog } from '@/types/log'
import { FormItem } from '@/types/form'
import { Page } from '@/types/page'
import { getLogPageList, removeLog, batchRemove } from '@/api/log'

const dataList = reactive<Array<Log>>([])
/**
 * 表单
 */
const dialogTitle = reactive({
  // add: '添加日志',
  // edit: '编辑日志',
  detail: '日志详情',
})
const formModel = reactive<Log>({
  id: '',
  logTime: '',
  operateApi: '',
  requestParams: '',
  errorMessage: '',
  exceptionMessage: '',
  ip: '',
  logType: 0,
})
const formItems = reactive<Array<FormItem>>([
  {
    label: '编号',
    labelWidth: '80px',
    vModel: 'id',
  },
  {
    label: '日志时间',
    labelWidth: '80px',
    vModel: 'logTime',
  },
  {
    label: '操作接口',
    labelWidth: '80px',
    vModel: 'operateApi',
  },
  {
    label: 'IP',
    labelWidth: '80px',
    vModel: 'ip',
  },
  {
    label: '请求参数',
    labelWidth: '80px',
    vModel: 'requestParams',
  },
  {
    label: '操作人',
    labelWidth: '80px',
    vModel: 'operateUserId',
  },
  {
    label: '错误信息',
    labelWidth: '80px',
    vModel: 'errorMessage',
  },
  {
    label: '异常信息',
    labelWidth: '80px',
    vModel: 'exceptionMessage',
    type: 'textarea',
  },
])

/**
 * 搜索
 */
const searchForm = reactive<SearchLog>({
  startTime: '',
  endTime: '',
  operateUserId: '',
  logTime: '',
})
const searchFormItems = reactive<Array<FormItem>>([
  {
    label: '日志时间',
    vModel: 'logTime',
    placeholders: ['开始时间', '结束时间'],
    type: 'datetimerange',
  },
  {
    label: '操作人',
    vModel: 'operateUserId',
    placeholder: '操作人',
  },
])
/**
 * 工具栏
 */
const tableToolbar = reactive<Toolbar>({
  hiddenImportButton: true,
  hiddenExportButton: true,
  hiddenAddButton: true,
  hiddenPrintButton: true,
})
const handleBatchDelete = (data: any, done: any) => {
  const { checkDataList, ids } = data
  ElMessageBox.confirm(`你真的删除选择的日志吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    batchRemove(ids).then(() => {
      ElMessage({
        type: 'success',
        message: '日志删除成功',
      })
      done()
    })
  })
}
const handleImport = (done: any) => {
  done()
}
const handleExport = () => {
  // window.open(`${window.location.origin}/日志报表.xlsx`)//TODO:导出bug
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
    label: '日志时间',
    prop: 'logTime',
    width: '200',
  },
  {
    label: '操作接口',
    prop: 'operateApi',
    width: '300',
  },
  {
    label: 'IP',
    prop: 'ip',
    width: '120',
  },
  {
    label: '请求参数',
    prop: 'requestParams',
    width: '180',
  },
  {
    label: '操作人',
    prop: 'operateUserId',
    width: '100',
    //   format: (row: Log) => {
    //   return row.enabled === 1 ? '禁用' : '启用'
    // },
  },
  {
    label: '错误信息',
    prop: 'errorMessage',
    width: '200',
  },
])
const handleDelete = (item: Log, done: any) => {
  ElMessageBox.confirm(`你真的删除【${item.id}】的日志吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    removeLog(item.id.toString()).then(() => {
      ElMessage({
        type: 'success',
        message: '日志删除成功',
      })
      done()
    })
  })
}
const tableActionbar = reactive<Actionbar>({
  width: 150,
  hiddenEditButton: true,
})
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
const load = (params: any) => {
  let obj = {}
  const { logTime } = params
  if (logTime) {
    obj = { ...params, startTime: logTime[0], endTime: logTime[1] }
  } else {
    obj = { ...params }
  }

  getLogPageList(obj).then((res: any) => {
    const { data: logList, page: pagination } = res
    if (logList) {
      dataList.length = 0
      dataList.push(...logList)
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
    :form-inline="true"
    @on-load="load"
    @on-form-submit="handleFormSubmit"
    @on-delete="handleDelete"
    @on-batch-delete="handleBatchDelete"
    @on-import="handleImport"
    @on-export="handleExport"
    @on-print="handlePrint"
  ></quick-crud>
</template>
