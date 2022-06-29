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

const handleSelectionChange = (val) => {
  emit('selectionChange', val)
}
</script>
<template>
  <el-table
    :data="data"
    style="width: 100%"
    show-summary
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
    >
    </el-table-column>
  </el-table>
</template>
<style lang="scss" scoped>
@import './index.scss';
</style>
