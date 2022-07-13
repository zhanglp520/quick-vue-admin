<script setup lang="ts">
import QuickCrud from '../../components/QuickCrud/index.vue'
import {
  form,
  formItems,
  page,
  searchForm,
  searchFormItems,
  dataList,
  tableColumns,
  tableOperate,
  tableToolBar,
  load,
  handleAdd,
  handleBatchDelete,
  handleImport,
  handleExport,
  handlePrint,
  handleEdit,
  handleDelete,
  handleDetail,
  handleSearch,
  handleClear,
  handleOk,
  handleCancel,
  handleSizeChange,
  handleCurrentChange,
  handleSelectionChange,
} from './index'
</script>
<template>
  <quick-crud
    :form-model="form"
    :form-items="formItems"
    :show-search="true"
    :show-page="true"
    :page="page"
    :table-data="dataList"
    :table-columns="tableColumns"
    :table-operate="tableOperate"
    :table-tool-bar="tableToolBar"
    :search-form-model="searchForm"
    :search-form-items="searchFormItems"
    @on-search-form-submit="handleSearch"
    @on-search-form-clear="handleClear"
    @on-load="load"
    @on-add="handleAdd"
    @on-edit="handleEdit"
    @on-delete="handleDelete"
    @on-detail="handleDetail"
    @on-batch-delete="handleBatchDelete"
    @on-import="handleImport"
    @on-export="handleExport"
    @on-print="handlePrint"
    @on-form-submit="handleOk"
    @on-form-cancel="handleCancel"
    @on-size-change="handleSizeChange"
    @on-current-change="handleCurrentChange"
    @on-selection-change="handleSelectionChange"
  ></quick-crud>
</template>
<style lang="scss" scoped>
@import './index.scss';
</style>
