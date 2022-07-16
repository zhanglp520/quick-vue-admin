<script lang="ts" setup>
import { defineProps, defineEmits, toRefs, Ref } from 'vue'
import { Column, Operates } from '../../types/table'

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
  operate: {
    type: [Boolean, Object],
    default: false,
  },
  rowEditName: {
    type: String,
    default: '编辑',
  },
  rowDeleteName: {
    type: String,
    default: '删除',
  },
  rowDetailName: {
    type: String,
    default: '详情',
  },
})
const {
  data,
  columns,
  height,
  operate,
  rowEditName,
  rowDeleteName,
  rowDetailName,
} = toRefs(props) as {
  data: Ref<any>
  columns: Ref<Column[]>
  height: Ref<number>
  operate: Ref<boolean | Operates>
  rowEditName: Ref<string>
  rowDeleteName: Ref<string>
  rowDetailName: Ref<string>
}
const emit = defineEmits([
  'selectionChange',
  'onRowEdit',
  'onRowDelete',
  'onRowDetail',
  'onDone',
])
const getOperateWidth = () => {
  debugger
  const oper = operate.value as Operates
  if (oper.width) {
    return oper.width
  }
  return 150
}
</script>
<template>
  <el-table :data="data" style="width: 100%" :height="height" stripe border>
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
    <el-table-column v-if="operate" label="操作" :width="getOperateWidth()">
      <template #default="scope">
        <slot name="leftOperate" :row="scope.row"></slot>
        <template
          v-for="(item, index) in (operate as Operates).btns"
          :key="index"
        >
          <el-button
            v-if="item.position === 'left'"
            :link="item.link ? item.link : false"
            :type="item.type ? item.type : 'default'"
            :size="item.size"
            @click.prevent="
              item.click(scope.row, () => {
                emit('onDone')
              })
            "
          >
            {{ item.name }}
          </el-button>
        </template>
        <el-button
          :link="true"
          type="primary"
          size="small"
          @click.prevent="emit('onRowEdit', scope.row)"
        >
          {{ rowEditName }}
        </el-button>
        <el-button
          :link="true"
          type="primary"
          size="small"
          @click.prevent="emit('onRowDelete', scope.row)"
        >
          {{ rowDeleteName }}
        </el-button>
        <el-button
          :link="true"
          type="primary"
          size="small"
          @click.prevent="emit('onRowDetail', scope.row)"
        >
          {{ rowDetailName }}
        </el-button>
        <template
          v-for="(item, index) in (operate as Operates).btns"
          :key="index"
        >
          <el-button
            v-if="item.position !== 'left'"
            :link="item.link ? item.link : false"
            :type="item.type ? item.type : 'default'"
            :size="item.size"
            @click.prevent="
              item.click(scope.row, () => {
                emit('onDone')
              })
            "
          >
            {{ item.name }}
          </el-button>
        </template>
        <slot name="rightOperate" :row="scope.row"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
