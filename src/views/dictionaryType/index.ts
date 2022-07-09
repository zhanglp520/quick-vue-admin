import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Column } from '../../types/table'
import { FormItem, FormTitle } from '../../types/form'
import { Page } from '../../types/page'
import { DictionaryType } from '../../types/dictionaryType'
import { useDictionaryTypeStore } from '../../store/modules/dictionaryType'
import {
  addDictionaryType,
  updateDictionaryType,
  removeDictionaryType,
} from '../../api/dictionaryType'
/**
 * 属性
 */
const dictionaryTypeStore = useDictionaryTypeStore()
export const dataList: DictionaryType[] = reactive([])
export const searchForm = reactive({})
export const form: DictionaryType = reactive({
  id: '',
  dicTypeId: '',
  name: '',
})
export const page: Page = reactive({
  current: 1,
  size: 10,
  total: 0,
  sizes: [10, 20, 30, 40],
})
export const formTitle: FormTitle = reactive({
  add: '创建字典分类',
  edit: '修改字典分类',
  detail: '字典分类详情',
})
export const searchFormItems: FormItem[] = reactive([
  {
    label: '字典分类',
    vModel: 'name',
  },
])
export const formItems: FormItem[] = reactive([
  {
    label: '字典分类编号',
    labelWidth: '80px',
    vModel: 'dicTypeId',
    addHidden: true,
    editReadonly: true,
  },
  {
    label: '字典分类',
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
    prop: 'dic_type_id',
    width: '100',
  },
  {
    label: '字典分类',
    prop: 'name',
    width: '300',
  },
])
/**
 * 函数
 */
export const load = () => {
  dictionaryTypeStore.getDictionaryTypeList().then(() => {
    const { dictionaryTypeList } = dictionaryTypeStore.$state
    dataList.length = 0
    dataList.push(...dictionaryTypeList)
  })
}
export const handleSearch = () => {
  console.log('handleSearch!')
}
export const handleReset = () => {
  console.log('handleReset!')
}
export const handleAdd = () => {
  form.dicTypeId = ''
  form.id = ''
  form.name = ''
}
export const handleEdit = (item: DictionaryType) => {
  form.dicTypeId = item.dicTypeId
  form.id = item.id
  form.name = item.name
}

export const handleDelete = (item: DictionaryType, done: any) => {
  ElMessageBox.confirm(`你真的删除【${item.name}】的字典分类吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    removeDictionaryType(item.id).then(() => {
      ElMessage({
        type: 'success',
        message: '字典分类删除成功',
      })
      done()
    })
  })
}
export const handleCancel = () => {
  console.log('handleCancel')
}
export const handleOk = (item: DictionaryType, done: any) => {
  if (item.id) {
    updateDictionaryType(item).then(() => {
      ElMessage({
        type: 'success',
        message: '字典分类修改成功',
      })
      done()
    })
  } else {
    addDictionaryType(item).then(() => {
      ElMessage({
        type: 'success',
        message: '字典分类创建成功',
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
