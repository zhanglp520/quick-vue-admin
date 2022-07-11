import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Column } from '../../types/table'
import { FormItem, FormTitle } from '../../types/form'
import { DictionaryType } from '../../types/dictionaryType'
import {
  addDictionaryType,
  updateDictionaryType,
  removeDictionaryType,
  getDictionaryTypeList,
} from '../../api/dictionaryType'
/**
 * 属性
 */
export const dataList: DictionaryType[] = reactive([])
export const form: DictionaryType = reactive({
  id: '',
  dicTypeId: '',
  name: '',
})
export const formTitle: FormTitle = reactive({
  add: '创建字典分类',
  edit: '修改字典分类',
  detail: '字典分类详情',
})
export const formItems: FormItem[] = reactive([
  {
    label: '分类编号',
    labelWidth: '80px',
    vModel: 'dicTypeId',
    placeholder: '分类编号',
    editReadonly: true,
  },
  {
    label: '分类名称',
    labelWidth: '80px',
    vModel: 'name',
    placeholder: '分类名称',
  },
])
export const columns: Column[] = reactive([
  {
    width: '50',
    type: 'selection',
  },
  {
    label: '分类编号',
    prop: 'dicTypeId',
    width: '200',
  },
  {
    label: '字典分类',
    prop: 'name',
  },
])
/**
 * 函数
 */
export const load = () => {
  getDictionaryTypeList().then((res) => {
    const { data: dictionaryTypeList } = res
    dataList.length = 0
    dataList.push(...dictionaryTypeList)
  })
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
