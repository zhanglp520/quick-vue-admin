<script lang="ts" setup>
import { defineProps, defineEmits, toRefs, Ref } from 'vue'
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
    type: Number,
    default: 575,
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
  tableActionbar,
  editButtonName,
  deleteButtonName,
  detailButtonName,
  hiddenEditButton,
  hiddenDeleteButton,
  hiddenDetailButton,
} = toRefs(props) as {
  data: Ref<any>
  columns: Ref<Column[]>
  height: Ref<number>
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
console.log('tableActionbar', tableActionbar)

const actionbar = tableActionbar.value as Actionbar
/**
 * emits
 */
const emits = defineEmits([
  'onSelectionChange',
  'onRowEdit',
  'onRowDelete',
  'onRowDetail',
  'onDone',
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
</script>
<template>
  <el-table
    :data="data"
    style="width: 100%"
    :height="height"
    stripe
    border
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
            v-if="item.position === 'left'"
            :link="item.link ? item.link : false"
            :type="item.type ? item.type : 'default'"
            :size="item.size"
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
            v-if="item.position !== 'left'"
            :link="item.link ? item.link : false"
            :type="item.type ? item.type : 'default'"
            :size="item.size"
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
