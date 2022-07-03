<script lang="ts" setup>
import {
  defineProps,
  defineEmits,
  ref,
  onMounted,
  toRefs,
  Ref,
  computed,
  onActivated,
  nextTick,
} from 'vue'
import { ElMessage, ElTree } from 'element-plus'
import { User } from '../../types/user'
import { Column } from '../../types/table'
import { FormItem } from '../../types/form'
import QuickTable from '../QuickTable/index.vue'
import QuickForm from '../QuickForm/index.vue'
import { Tree } from '../../types/tree'

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
  showPage: {
    type: Boolean,
    default: true,
  },
  showTree: {
    type: Boolean,
    default: false,
  },
  treeData: {
    type: Array,
    default: () => {
      return []
    },
  },
  defaultTreeProps: {
    type: Object,
    default: () => {
      return {
        id: 'id',
        label: 'label',
        children: 'children',
      }
    },
  },
  treeSpan: {
    type: Number,
    default: 4,
  },
  autoFefresh: {
    type: Boolean,
    default: false,
  },
  interval: {
    type: Number,
    default: 1000 * 30,
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
  showPage,
  showTree,
  treeData,
  defaultTreeProps,
  treeSpan,
  // autoReFefresh,
  // autoRefreshTime,
} = toRefs(props) as {
  tableData: Ref<any>
  tableColumns: Ref<Column[]>
  searchFormModel: Ref<any>
  searchFormItems: Ref<FormItem[]>
  formModel: Ref<any>
  formItems: Ref<FormItem[]>
  formTitle: Ref<any>
  page: Ref<any>
  showPage: Ref<boolean>
  showTree: Ref<boolean>
  treeData: Ref<any>
  defaultTreeProps: Ref<any>
  treeSpan: Ref<number>
  // autoReFefresh: Ref<boolean>
  // autoRefreshTime: Ref<number>
}

const emit = defineEmits([
  'onTreeClick',
  'onLoad',
  'onTreeLoad',
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
const treeRef = ref<InstanceType<typeof ElTree>>()
const selectDataList = ref<Array<User>>([])
const dialogFormVisible = ref(false)
const dialogFormType = ref('')
const autoReFefresh = ref(true)
const timeCount = ref()
const autoRefreshTime = ref(1000 * 60)
/**
 * 函数
 */
const load = () => {
  const { current, size } = page.value
  const params = { ...searchFormModel.value, current, size }
  emit('onLoad', params)
}
const treeLoad = () => {
  emit('onTreeLoad', (id: string) => {
    nextTick(() => {
      treeRef.value?.setCurrentKey(id)
    })
    load()
  })
}
const handleSelectionChange = (val: User[]) => {
  selectDataList.value = val
}
const handleSearch = () => {
  emit('onSearchFormSubmit', searchFormModel.value)
  load()
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
    load()
  })
}
const handleCancel = () => {
  dialogFormVisible.value = false
  emit('onFormCancel', formModel.value)
}
const handleOk = () => {
  emit('onFormSubmit', formModel.value, () => {
    dialogFormVisible.value = false
    load()
  })
}
const handleSizeChange = (val: number) => {
  page.value.size = val
  emit('onSizeChange', val)
  load()
}
const handleCurrentChange = (val: number) => {
  page.value.current = val
  emit('onCurrentChange', val)
  load()
}
const handleTreeNodeClick = (data: Tree) => {
  emit('onTreeClick', data, () => {
    load()
  })
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
  // TODO:onMounted会执行两次，待解决
  // console.log('onMounted')
  if (showTree.value) {
    treeLoad()
  } else {
    load()
  }
  if (autoReFefresh.value) {
    timeCount.value = setInterval(() => {
      load()
    }, autoRefreshTime.value)
  }
})
onActivated(() => {
  clearInterval(timeCount.value)
})
</script>
<template>
  <el-row :gutter="40">
    <el-col :span="showTree ? treeSpan : 0">
      <el-tree
        v-if="showTree"
        ref="treeRef"
        :data="treeData"
        :props="defaultTreeProps"
        node-key="id"
        :highlight-current="true"
        @node-click="handleTreeNodeClick"
      >
      </el-tree>
    </el-col>
    <el-col :span="showTree ? 24 - treeSpan : 24">
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
        v-if="showPage"
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
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
@import './index.scss';
</style>
