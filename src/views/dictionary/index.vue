<script setup lang="ts">
import QuickCrud from '../../components/QuickCrud/index.vue'
import {
  treeDataList,
  dataList,
  columns,
  formItems,
  formTitle,
  form,
  treeLoad,
  load,
  handleAdd,
  handleEdit,
  handleDelete,
  handleOk,
  handleCancel,
  handleTreeClick,
} from './index'
</script>
<template>
  <quick-crud
    :tree-span="5"
    :show-tree="true"
    :tree-data="treeDataList"
    :table-data="dataList"
    :table-columns="columns"
    :form-model="form"
    :form-items="formItems"
    :form-title="formTitle"
    @on-tree-load="treeLoad"
    @on-tree-click="handleTreeClick"
    @on-load="load"
    @on-add="handleAdd"
    @on-edit="handleEdit"
    @on-delete="handleDelete"
    @on-form-submit="handleOk"
    @on-form-cancel="handleCancel"
  ></quick-crud>
</template>
<style lang="scss" scoped>
@import './index.scss';
</style>
