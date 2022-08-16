<script lang="ts" setup>
import { defineProps, defineEmits, toRefs, Ref } from 'vue'
import { Toolbar } from '../../types/table'

/**
 * props
 */
const props = defineProps({
  addButtonName: {
    type: String,
    default: '新增',
  },
  batchDeleteButtonName: {
    type: String,
    default: '批量删除',
  },
  importButtonName: {
    type: String,
    default: '导入',
  },
  exportButtonName: {
    type: String,
    default: '导出',
  },
  printtButtonName: {
    type: String,
    default: '打印',
  },
  refreshButtonName: {
    type: String,
    default: '刷新',
  },
  hiddenAddButton: {
    type: Boolean,
    default: false,
  },
  hiddenBatchDeleteButton: {
    type: Boolean,
    default: false,
  },
  hiddenImportButton: {
    type: Boolean,
    default: false,
  },
  hiddenExportButton: {
    type: Boolean,
    default: false,
  },
  hiddenPrintButton: {
    type: Boolean,
    default: false,
  },
  hiddenRefreshButton: {
    type: Boolean,
    default: false,
  },
  tableToolbar: {
    type: [Boolean, Object],
    default: false,
  },
})
/**
 * props toRefs
 */
const {
  addButtonName,
  batchDeleteButtonName,
  importButtonName,
  exportButtonName,
  printtButtonName,
  refreshButtonName,
  hiddenAddButton,
  hiddenBatchDeleteButton,
  hiddenImportButton,
  hiddenExportButton,
  hiddenPrintButton,
  hiddenRefreshButton,
  tableToolbar,
} = toRefs(props) as {
  addButtonName: Ref<string>
  batchDeleteButtonName: Ref<string>
  importButtonName: Ref<string>
  exportButtonName: Ref<string>
  printtButtonName: Ref<string>
  refreshButtonName: Ref<string>
  hiddenAddButton: Ref<boolean>
  hiddenBatchDeleteButton: Ref<boolean>
  hiddenImportButton: Ref<boolean>
  hiddenExportButton: Ref<boolean>
  hiddenPrintButton: Ref<boolean>
  hiddenRefreshButton: Ref<boolean>
  tableToolbar: Ref<boolean | Toolbar>
}
/**
 * 类型转换
 */
const toolbar = tableToolbar.value as Toolbar
/**
 * emits
 */
const emits = defineEmits([
  'onAdd',
  'onBatchDelete',
  'onImport',
  'onExport',
  'onPrint',
  'onRefresh',
  'onCustomToolbarClick',
])
const handleCustomClick = (item: any) => {
  emits('onCustomToolbarClick', item.click)
}
</script>
<template>
  <div v-if="tableToolbar" class="ml-4 toobar">
    <slot name="leftToolbar"></slot>
    <el-button
      v-if="!hiddenImportButton"
      type="primary"
      @click="emits('onImport')"
      >{{ importButtonName }}</el-button
    >
    <el-button
      v-if="!hiddenExportButton"
      type="primary"
      @click="emits('onExport')"
      >{{ exportButtonName }}</el-button
    >
    <template v-for="(item, index) in toolbar.btns" :key="index">
      <el-button
        v-if="item.position === 'left'"
        :type="item.type ? item.type : 'primary'"
        @click.prevent="item.click()"
      >
        {{ item.name }}
      </el-button>
    </template>
    <el-button v-if="!hiddenAddButton" type="primary" @click="emits('onAdd')">{{
      addButtonName
    }}</el-button>
    <el-button
      v-if="!hiddenBatchDeleteButton"
      type="primary"
      @click="emits('onBatchDelete')"
      >{{ batchDeleteButtonName }}</el-button
    >
    <template v-for="(item, index) in toolbar.btns" :key="index">
      <el-button
        v-if="item.position !== 'left'"
        :type="item.type ? item.type : 'primary'"
        @click.prevent="handleCustomClick(item)"
      >
        {{ item.name }}
      </el-button>
    </template>
    <el-button
      v-if="!hiddenPrintButton"
      type="primary"
      @click="emits('onPrint')"
      >{{ printtButtonName }}</el-button
    >
    <el-button
      v-if="!hiddenRefreshButton"
      type="primary"
      @click="emits('onRefresh')"
      >{{ refreshButtonName }}</el-button
    >
    <slot name="rightToolbar"></slot>
  </div>
</template>
<style lang="scss" scoped>
.toobar {
  margin-bottom: 10px;
}

.el-upload {
  display: inline-flex;
}
</style>
