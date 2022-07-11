<script setup lang="ts">
import QuickCrud from '../../components/QuickCrud/index.vue'
import {
  dataList,
  columns,
  formItems,
  formTitle,
  form,
  load,
  handleAdd,
  handleEdit,
  handleDelete,
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
    :form-title="formTitle"
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
