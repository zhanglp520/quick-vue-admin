<script lang="ts" setup>
import { defineProps, defineEmits, ref, onMounted, toRefs, Ref } from 'vue'
import { User } from '../../types/user'
import { Column } from '../../types/table'
import { FormItem } from '../../types/form'
import QuickTable from '../QuickTable/index.vue'
import QuickForm from '../QuickForm/index.vue'

const props = defineProps({
  tableData: {
    type: Array,
    default: () => {
      return []
    },
  },
  tableColumns: {
    type: Array,
    default: () => {
      return []
    },
  },
  formModel: {
    type: Object,
    default: () => {
      return {}
    },
  },
  formItems: {
    type: Array,
    default: () => {
      return []
    },
  },
  searchFormModel: {
    type: Object,
    default: () => {
      return {}
    },
  },
  searchFormItems: {
    type: Array,
    default: () => {
      return []
    },
  },
})

const {
  tableData,
  tableColumns,
  searchFormModel,
  searchFormItems,
  formModel,
  formItems,
} = toRefs(props) as {
  tableData: Ref<any>
  tableColumns: Ref<Column[]>
  searchFormModel: Ref<any>
  searchFormItems: Ref<FormItem[]>
  formModel: Ref<any>
  formItems: Ref<FormItem[]>
}
const emit = defineEmits([
  'onLoad',
  'onAdd',
  'onEdit',
  'onDelete',
  'onSearchFormSubmit',
  'onSearchFormReset',
  'onFormSubmit',
  'onFormCancel',
  'onSizeChange',
  'onCurrentChange',
])
const selectDataList = ref<Array<User>>([])
const dialogFormVisible = ref(false)
const currentPage = ref(4)
const pageSize = ref(100)

const handleSelectionChange = (val: User[]) => {
  selectDataList.value = val
}
const handleSearch = () => {
  emit('onSearchFormSubmit', searchFormModel)
}
const handleReset = () => {
  emit('onSearchFormReset', searchFormModel)
}
const handleAdd = () => {
  dialogFormVisible.value = true
}
const handleEdit = () => {
  if (selectDataList.value.length !== 1) {
    console.log('请选择一行')
    return
  }
  dialogFormVisible.value = true
  const item = selectDataList.value[0]
  emit('onEdit', item)
}
const handleDelete = () => {
  const item = selectDataList.value[0]
  emit('onDelete', item, () => {
    emit('onLoad')
  })
}
const handleCancel = () => {
  dialogFormVisible.value = false
  emit('onFormCancel', formModel)
}
const handleOk = () => {
  emit('onFormSubmit', formModel, () => {
    dialogFormVisible.value = false
    emit('onLoad')
  })
}
const handleSizeChange = (val: number) => {
  emit('onSizeChange', val)
}
const handleCurrentChange = (val: number) => {
  emit('onCurrentChange', val)
}
onMounted(() => {
  emit('onLoad')
})
</script>
<template>
  <quick-form
    :inline="true"
    :model="searchFormModel"
    class="demo-form-inline"
    :form-items="searchFormItems"
  >
    <template #action>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </template>
  </quick-form>
  <el-button-group class="ml-4 action">
    <el-button type="primary" @click="handleAdd">新增</el-button>
    <el-button type="primary" @click="handleEdit">编辑</el-button>
    <el-button type="primary" @click="handleDelete">删除</el-button>
  </el-button-group>
  <quick-table
    :data="tableData"
    :columns="tableColumns"
    @selection-change="handleSelectionChange"
  >
  </quick-table>
  <el-pagination
    v-model:currentPage="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[100, 200, 300, 400]"
    :small="false"
    :disabled="false"
    :background="false"
    layout="total, sizes, prev, pager, next, jumper"
    :total="400"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  <el-dialog
    v-model="dialogFormVisible"
    title="用户表单"
    width="35%"
    @close="handleCancel()"
  >
    <quick-form :model="formModel" :form-items="formItems"> </quick-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel()">取消</el-button>
        <el-button type="primary" @click="handleOk()">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
@import './index.scss';
</style>
