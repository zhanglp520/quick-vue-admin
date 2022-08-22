<script lang="ts" setup>
import { ElTable } from 'element-plus'
import {
  defineProps,
  defineEmits,
  toRefs,
  Ref,
  ref,
  onMounted,
  nextTick,
} from 'vue'
import { Column, Actionbar } from '../../types/table'
/**
 * props
 */
const props = defineProps({
  data: {
    type: Array,
    default: () => {
      return {}
    },
  },
  columns: {
    type: Array,
    default: () => {
      return []
    },
  },
  height: {
    type: [Boolean, Number],
    default: false,
  },
  rowKey: {
    type: String,
    default: 'id',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  tableActionbar: {
    type: [Boolean, Object],
    default: false,
  },
  editButtonName: {
    type: String,
    default: '编辑',
  },
  deleteButtonName: {
    type: String,
    default: '删除',
  },
  detailButtonName: {
    type: String,
    default: '详情',
  },
  hiddenEditButton: {
    type: Boolean,
    default: false,
  },
  hiddenDeleteButton: {
    type: Boolean,
    default: false,
  },
  hiddenDetailButton: {
    type: Boolean,
    default: false,
  },
})
/**
 * props toRefs
 */
const {
  data,
  columns,
  height,
  rowKey,
  loading,
  tableActionbar,
  editButtonName,
  deleteButtonName,
  detailButtonName,
  hiddenEditButton,
  hiddenDeleteButton,
  hiddenDetailButton,
} = toRefs(props) as {
  data: Ref<any>
  columns: Ref<Array<Column>>
  height: Ref<boolean | number>
  rowKey: Ref<string>
  loading: Ref<boolean>
  tableActionbar: Ref<boolean | Actionbar>
  editButtonName: Ref<string>
  deleteButtonName: Ref<string>
  detailButtonName: Ref<string>
  hiddenEditButton: Ref<boolean>
  hiddenDeleteButton: Ref<boolean>
  hiddenDetailButton: Ref<boolean>
}
/**
 * 类型转换
 */
const actionbar = tableActionbar.value as Actionbar
const tableRef = ref<InstanceType<typeof ElTable>>()
const tableHeight = height.value as number
/**
 * emits
 */
const emits = defineEmits([
  'onSelectionChange',
  'onRowEdit',
  'onRowDelete',
  'onRowDetail',
  'onDone',
  'onTableRef',
])
/**
 *函数
 */
const getActionbarWidth = () => {
  if (actionbar.width) {
    return actionbar.width
  }
  return 150
}
const handleSelectionChange = (val: any) => {
  emits('onSelectionChange', val)
}
onMounted(() => {
  nextTick(() => {
    emits('onTableRef', tableRef)
  })
})
</script>
<template>
  <!-- :height="560" -->
  <el-table
    ref="tableRef"
    v-loading="loading"
    :data="data"
    style="width: 100%"
    :height="tableHeight"
    max-height="660"
    stripe
    border
    :row-key="rowKey"
    @selection-change="handleSelectionChange"
  >
    <el-table-column
      v-for="(item, index) in columns"
      :key="index"
      :prop="item.prop"
      :width="item.width"
      :type="item.type"
      :label="item.label"
      :align="item.align"
      :formatter="item.format"
      show-overflow-tooltip
      :fixed="item.fixed"
    ></el-table-column>
    <el-table-column
      v-if="tableActionbar"
      label="操作"
      :width="getActionbarWidth()"
    >
      <template #default="scope">
        <slot name="leftActionbar" :row="scope.row"></slot>
        <template v-for="(item, index) in actionbar.btns" :key="index">
          <el-button
            v-if="
              item.position &&
              item.position === 'left' &&
              (item.render ? item.render(scope.row) : true)
            "
            :link="!item.link ? true : false || item.link ? item.link : false"
            :type="item.type ? item.type : 'primary'"
            :size="item.size ? item.size : 'small'"
            @click.prevent="
              item.click(scope.row, () => {
                emits('onDone')
              })
            "
          >
            {{ item.name }}
          </el-button>
        </template>
        <el-button
          v-if="!hiddenEditButton"
          :link="true"
          type="primary"
          size="small"
          @click.prevent="emits('onRowEdit', scope.row)"
        >
          {{ editButtonName }}
        </el-button>
        <el-button
          v-if="!hiddenDeleteButton"
          :link="true"
          type="primary"
          size="small"
          @click.prevent="emits('onRowDelete', scope.row)"
        >
          {{ deleteButtonName }}
        </el-button>
        <el-button
          v-if="!hiddenDetailButton"
          :link="true"
          type="primary"
          size="small"
          @click.prevent="emits('onRowDetail', scope.row)"
        >
          {{ detailButtonName }}
        </el-button>
        <template v-for="(item, index) in actionbar.btns" :key="index">
          <el-button
            v-if="
              item.position !== 'left' &&
              (item.render ? item.render(scope.row) : true)
            "
            :link="!item.link ? true : false || item.link ? item.link : false"
            :type="item.type ? item.type : 'primary'"
            :size="item.size ? item.size : 'small'"
            @click.prevent="
              item.click(scope.row, () => {
                emits('onDone')
              })
            "
          >
            {{ item.name }}
          </el-button>
        </template>
        <slot name="rightActionbar" :row="scope.row"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<style lang="scss" scoped>
.el-table {
  margin-bottom: 15px;
}
</style>
