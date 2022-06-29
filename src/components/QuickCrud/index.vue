<script lang="ts" setup>
import {
  defineProps,
  defineEmits,
  ref,
  onMounted,
  toRefs,
  Ref,
  computed,
} from 'vue'
import { ElMessage } from 'element-plus'
import { User } from '../../types/user'
import { Column } from '../../types/table'
import { Page } from '../../types/page'
import { FormItem, FormTitle } from '../../types/form'
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
  formTitle: {
    type: Object,
    default: () => {
      return {}
    },
  },
  page: {
    type: Object,
    default: () => {
      return {}
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
  formTitle,
  page,
} = toRefs(props) as {
  tableData: Ref<any>
  tableColumns: Ref<Column[]>
  searchFormModel: Ref<any>
  searchFormItems: Ref<FormItem[]>
  formModel: Ref<any>
  formItems: Ref<FormItem[]>
  formTitle: Ref<FormTitle>
  page: Ref<Page>
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
const dialogFormType = ref('')

const handleSelectionChange = (val: User[]) => {
  selectDataList.value = val
}
const handleSearch = () => {
  const { current, size } = page.value
  const params = { ...searchFormModel.value, current, size }
  emit('onLoad', params)
  emit('onSearchFormSubmit', searchFormModel.value)
}
const handleReset = () => {
  emit('onSearchFormReset', searchFormModel.value)
}
const handleAdd = () => {
  dialogFormType.value = 'add'
  dialogFormVisible.value = true
}
const handleEdit = () => {
  dialogFormType.value = 'edit'
  if (selectDataList.value.length !== 1) {
    ElMessage({
      type: 'warning',
      message: '请选择一行',
    })
    return
  }
  dialogFormVisible.value = true
  const item = selectDataList.value[0]
  emit('onEdit', item)
}
const handleDelete = () => {
  if (selectDataList.value.length !== 1) {
    ElMessage({
      type: 'warning',
      message: '请选择一行',
    })
    return
  }
  const item = selectDataList.value[0]
  emit('onDelete', item, () => {
    emit('onLoad')
  })
}
const handleCancel = () => {
  dialogFormVisible.value = false
  emit('onFormCancel', formModel.value)
}
const handleOk = () => {
  emit('onFormSubmit', formModel.value, () => {
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
const dialogTitle = computed(() => {
  if (dialogFormType.value === 'add') {
    return formTitle.value.add
  }
  if (dialogFormType.value === 'edit') {
    return formTitle.value.edit
  }
  if (dialogFormType.value === 'detail') {
    return formTitle.value.detail
  }
  return '标题'
})
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
    form-type="search"
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
    v-model:currentPage="page.current"
    v-model:page-size="page.size"
    :page-sizes="page.sizes"
    :small="false"
    :disabled="false"
    :background="false"
    layout="total, sizes, prev, pager, next, jumper"
    :total="page.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
  <el-dialog
    v-model="dialogFormVisible"
    :title="dialogTitle"
    width="35%"
    @close="handleCancel()"
  >
    <quick-form
      :model="formModel"
      :form-items="formItems"
      :form-type="dialogFormType"
    >
    </quick-form>
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
