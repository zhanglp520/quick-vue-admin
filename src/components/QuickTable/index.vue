<script lang="ts" setup>
import { defineProps, defineEmits, toRefs, Ref } from 'vue'
import { Actions, Column } from '../../types/table'

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
  operate: {
    type: Object,
    default: () => {
      return {}
    },
  },
})

const emit = defineEmits([
  'selectionChange',
  'onRowEdit',
  'onRowDelete',
  'onRowDetail',
  'onDone',
])

const { data, columns, operate } = toRefs(props) as {
  data: Ref<any>
  columns: Ref<Column[]>
  operate: Ref<Actions>
}

const handleSelectionChange = (val: any) => {
  emit('selectionChange', val)
}
const isShowActionBtn = (row: any, item: any) => {
  if (item.hidden) {
    return false
  }
  if (!item.render) {
    return true
  }
  return item.render(row)
}
</script>
<template>
  <!-- show-summary 合计 -->
  <el-table
    :data="data"
    style="width: 100%"
    :height="575"
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
    >
      <template v-if="item.slot" #default="scope">
        <template v-if="item.type === 'link' && item.label === 'QQ号'">
          <el-link
            target="_blank"
            :href="`http://wpa.qq.com/msgrd?v=3&uin=${
              item.format && item.format(scope.row)
            }&site=1841031740&menu=yes`"
            >({{ item.format && item.format(scope.row) }})加好友</el-link
          >
        </template>
      </template>
    </el-table-column>
    <el-table-column label="操作" :width="operate.width">
      <template #default="scope">
        <el-button
          :link="true"
          type="primary"
          size="small"
          @click.prevent="emit('onRowEdit', scope.row)"
        >
          编辑
        </el-button>
        <el-button
          :link="true"
          type="primary"
          size="small"
          @click.prevent="emit('onRowDelete', scope.row)"
        >
          删除
        </el-button>
        <el-button
          :link="true"
          type="primary"
          size="small"
          @click.prevent="emit('onRowDetail', scope.row)"
        >
          详情
        </el-button>
        <template v-for="(item, index) in operate.btns" :key="index">
          <el-button
            v-if="isShowActionBtn(scope.row, item)"
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
      </template>
    </el-table-column>
  </el-table>
</template>
<style lang="scss" scoped>
@import './index.scss';
</style>
