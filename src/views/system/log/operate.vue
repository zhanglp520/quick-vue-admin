<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Column, Actionbar, Toolbar } from '@/types/table'
import { Log, SearchLog } from '@/types/log'
import { FormItem } from '@/types/form'
import { Page } from '@/types/page'
import QuickCrud from '@/components/QuickCrud/index.vue'
import { getLogPageList, removeLog, batchRemove } from '@/api/log'

/**
 * 属性
 */
const loading = ref(false)
const dataList = reactive<Array<Log>>([])
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
 * 搜索
 */
const searchForm = reactive<SearchLog>({
  startTime: '',
  endTime: '',
  logTime: '',
})
const searchFormItems = reactive<Array<FormItem>>([
  {
    label: '日志时间',
    vModel: 'logTime',
    placeholders: ['开始时间', '结束时间'],
    type: 'datetimerange',
  },
])
/**
 * 工具栏
 */
const handleBatchDelete = (data: any, done: any) => {
  const { ids } = data
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
const tableToolbar = reactive<Toolbar>({
  hiddenImportButton: true,
  hiddenExportButton: true,
  hiddenAddButton: true,
  hiddenPrintButton: true,
})
/**
 * 操作栏
 */
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
const handleDetail = (item: Log, done: any) => {
  const form: Log = { ...item }
  if (form.requestParams) {
    const params = JSON.parse(form.requestParams)
    form.requestParams = JSON.stringify(params, null, 4)
    done(form)
  }
}
const tableActionbar = reactive<Actionbar>({
  width: 150,
  hiddenEditButton: true,
})
/**
 * 表格
 */
const tableColumns = reactive<Array<Column>>([
  {
    width: '50',
    type: 'selection',
    align: 'center',
  },
  {
    label: '日志时间',
    prop: 'logTime',
    width: '200',
  },
  {
    label: 'IP',
    prop: 'ip',
    width: '120',
  },
  {
    label: '操作接口',
    prop: 'operateApi',
    width: '300',
  },
  {
    label: '请求参数',
    prop: 'requestParams',
  },
])
/**
 * 加载数据
 */
const load = (params: any) => {
  let obj = {}
  const { logTime } = params
  if (logTime) {
    obj = {
      ...params,
      logType: 0,
      startTime: logTime[0],
      endTime: logTime[1],
      logTime: null,
    }
  } else {
    obj = { ...params, logType: 0, logTime: null }
  }
  loading.value = true
  getLogPageList(obj).then((res) => {
    loading.value = false
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
/**
 * 表单
 */
const dialogTitle = reactive({
  detail: '日志详情',
})
const formModel = reactive<Log>({
  id: 0,
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
    label: 'IP',
    labelWidth: '80px',
    vModel: 'ip',
  },
  {
    label: '操作接口',
    labelWidth: '80px',
    vModel: 'operateApi',
  },
  {
    label: '请求参数',
    labelWidth: '80px',
    vModel: 'requestParams',
    type: 'textarea',
  },
])
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
    :loading="loading"
    @on-load="load"
    @on-detail="handleDetail"
    @on-delete="handleDelete"
    @on-batch-delete="handleBatchDelete"
  ></quick-crud>
</template>
