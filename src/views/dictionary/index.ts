import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Column } from '../../types/table'
import { FormItem, FormTitle } from '../../types/form'
import { Page } from '../../types/page'
import { Dictionary } from '../../types/dictionary'
import { getDictionaryTypeList } from '../../api/dictionaryType'
import {
  getDictionaryList,
  addDictionary,
  updateDictionary,
  removeDictionary,
} from '../../api/dictionary'
import { treeFormat } from '../../utils'
import { Tree } from '../../types/tree'

/**
 * 属性
 */
export const currentTreeData = ref<Tree>({
  id: '',
  label: '',
  children: [],
})

export const treeDataList: Tree[] = reactive([])
export const dataList: Dictionary[] = reactive([])
export const searchForm = reactive({})
export const form: Dictionary = reactive({
  dic_type_id: '',
  name: '',
})
export const page: Page = reactive({
  current: 1,
  size: 10,
  total: 0,
  sizes: [10, 20, 30, 40],
})
export const formTitle: FormTitle = reactive({
  add: '创建字典',
  edit: '修改字典',
  detail: '字典详情',
})
export const searchFormItems: FormItem[] = reactive([
  {
    label: '字典名称',
    vModel: 'name',
  },
])
export const formItems: FormItem[] = reactive([
  {
    label: '字典类型',
    labelWidth: '80px',
    vModel: 'dic_type_id',
    type: 'cascader',
    treeOptions: treeDataList,
    change: (val: string) => {
      console.log('change', val)
    },
  },
  {
    label: '字典编号',
    labelWidth: '80px',
    vModel: 'dic_id',
    addHidden: true,
    editReadonly: true,
  },
  {
    label: '字典名称',
    labelWidth: '80px',
    vModel: 'name',
    autocomplete: 'off',
  },
])
export const columns: Column[] = reactive([
  {
    width: '100',
    type: 'selection',
    align: 'center',
  },
  {
    label: '编号',
    prop: 'dic_id',
    width: '100',
  },
  {
    label: '字典名称',
    prop: 'name',
    width: '100',
  },
])
/**
 * 函数
 */
export const load = () => {
  // getTypeList()
  const { id } = currentTreeData.value
  getDictionaryList(id).then((res) => {
    const { payload } = res
    dataList.length = 0
    dataList.push(...payload)
  })
}
export const treeLoad = (done: any) => {
  getDictionaryTypeList().then((res) => {
    const { payload } = res
    const data = treeFormat(payload, {
      id: 'dic_type_id',
      label: 'name',
      children: 'children',
    })
    treeDataList.length = 0
    treeDataList.push(...data)
    currentTreeData.value.id = treeDataList[0].id
    done(currentTreeData.value.id)
  })
}
export const handleSearch = () => {
  console.log('handleSearch!')
}
export const handleReset = () => {
  console.log('handleReset!')
}
export const handleAdd = () => {
  form.dic_type_id = ''
  form.id = ''
  form.dic_id = ''
  form.name = ''
}
export const handleEdit = (item: Dictionary) => {
  form.dic_type_id = item.dic_type_id
  form.id = item.id
  form.dic_id = item.dic_id
  form.name = item.name
}

export const handleDelete = (item: Dictionary, done: any) => {
  ElMessageBox.confirm(`你真的删除【${item.name}】的字典吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    removeDictionary(item.id).then(() => {
      ElMessage({
        type: 'success',
        message: '字典删除成功',
      })
      done()
    })
  })
}
export const handleCancel = () => {
  console.log('handleCancel')
}
export const handleOk = (item: Dictionary, done: any) => {
  if (item.id) {
    updateDictionary(item).then(() => {
      ElMessage({
        type: 'success',
        message: '字典修改成功',
      })
      done()
    })
  } else {
    addDictionary(item).then(() => {
      ElMessage({
        type: 'success',
        message: '字典创建成功',
      })
      done()
    })
  }
}
export const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
export const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
export const handleTreeClick = (data: Tree, done: any) => {
  currentTreeData.value = data
  done()
}
