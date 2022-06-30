<script lang="ts" setup>
import { defineProps, defineEmits, toRefs, Ref } from 'vue'
import { Column } from '../../types/table'

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
      return {}
    },
  },
})

const emit = defineEmits(['selectionChange'])

const { data, columns } = toRefs(props) as {
  data: Ref<any>
  columns: Ref<Column[]>
}

const handleSelectionChange = (val: any) => {
  emit('selectionChange', val)
}
</script>
<template>
  <!-- show-summary 合计 -->
  <el-table
    :data="data"
    style="width: 100%"
    :height="500"
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
  </el-table>
</template>
<style lang="scss" scoped>
@import './index.scss';
</style>
