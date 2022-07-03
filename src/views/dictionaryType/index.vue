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
  handleReset,
  handleOk,
  handleCancel,
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
    :page="page"
    :show-page="false"
    @on-tree-load="treeLoad"
    @on-load="load"
    @on-add="handleAdd"
    @on-edit="handleEdit"
    @on-delete="handleDelete"
    @on-search-form-submit="handleSearch"
    @on-search-form-reset="handleReset"
    @on-form-submit="handleOk"
    @on-form-cancel="handleCancel"
  ></quick-crud>
</template>
<style lang="scss" scoped>
@import './index.scss';
</style>
