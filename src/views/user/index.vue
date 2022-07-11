<script setup lang="ts">
import QuickCrud from '../../components/QuickCrud/index.vue'
import {
  dataList,
  columns,
  formItems,
  searchFormItems,
  formTitle,
  page,
  searchForm,
  form,
  load,
  handleAdd,
  handleEdit,
  handleDelete,
  handleSearch,
  handleClear,
  handleOk,
  handleCancel,
  handleSizeChange,
  handleCurrentChange,
} from './index'
</script>
<template>
  <quick-crud
    :table-data="dataList"
    :table-columns="columns"
    :form-model="form"
    :form-items="formItems"
    :search-form-model="searchForm"
    :search-form-items="searchFormItems"
    :form-title="formTitle"
    :show-search="true"
    :show-page="true"
    :page="page"
    @on-load="load"
    @on-add="handleAdd"
    @on-edit="handleEdit"
    @on-delete="handleDelete"
    @on-search-form-submit="handleSearch"
    @on-search-form-clear="handleClear"
    @on-form-submit="handleOk"
    @on-form-cancel="handleCancel"
    @on-size-change="handleSizeChange"
    @on-current-change="handleCurrentChange"
  ></quick-crud>
</template>
<style lang="scss" scoped>
@import './index.scss';
</style>
