import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Column } from '../../types/table'
import { FormItem, FormTitle } from '../../types/form'
import { Dictionary } from '../../types/dictionary'
import {
  addDictionary,
  updateDictionary,
  removeDictionary,
  getDictionaryList,
} from '../../api/dictionary'
import { dicFormat, treeFormat } from '../../utils'
import { Tree } from '../../types/tree'
import { getDictionaryTypeList } from '../../api/dictionaryType'
import { Options } from '../../types/options'
/**
 * 属性
 */
export const currentTreeData = ref<Tree>({
  id: '',
  label: '',
  children: [],
})
const dicTypeList = reactive<Array<Options>>([])
export const treeDataList = reactive<Array<Tree>>([])
export const dataList = reactive<Array<Dictionary>>([])
export const form = reactive<Dictionary>({
  id: '',
  dicTypeId: '',
  dicId: '',
  name: '',
})
export const formTitle = reactive<FormTitle>({
  add: '创建字典',
  edit: '修改字典',
  detail: '字典详情',
})
export const formItems = reactive<Array<FormItem>>([
  // TODO:待字典类型完善后使用级联
  // {
  //   label: '字典类型',
  //   labelWidth: '80px',
  //   vModel: 'dicTypeId',
  //   placeholder: '字典类型',
  //   type: 'cascader',
  //   treeOptions: treeDataList,
  //   change: (val: string) => {
  //     console.log('change', val)
  //   },
  // },
  {
    label: '字典类型',
    labelWidth: '80px',
    vModel: 'dicTypeId',
    placeholder: '字典类型',
    type: 'select',
    options: dicTypeList,
    change: (val: string) => {
      console.log('change', val)
    },
  },
  {
    label: '字典编号',
    labelWidth: '80px',
    vModel: 'dicId',
    placeholder: '字典编号',
    editReadonly: true,
  },
  {
    label: '字典名称',
    labelWidth: '80px',
    vModel: 'name',
    placeholder: '字典名称',
  },
])
export const columns = reactive<Array<Column>>([
  {
    width: '50',
    type: 'selection',
  },
  {
    label: '字典编号',
    prop: 'dicId',
    width: '200',
  },
  {
    label: '字典名称',
    prop: 'name',
  },
])
/**
 * 函数
 */
export const load = () => {
  const { id } = currentTreeData.value
  getDictionaryList(id).then((res) => {
    const { data: dictionaryList } = res
    dataList.length = 0
    dataList.push(...dictionaryList)
  })
}
export const treeLoad = (done: any) => {
  getDictionaryTypeList().then((res) => {
    const { data: dictionaryTypeList } = res
    const data = treeFormat(dictionaryTypeList, {
      id: 'dicTypeId',
      label: 'name',
      children: 'children',
    })
    treeDataList.length = 0
    treeDataList.push(...data)

    const data1 = dicFormat(dictionaryTypeList, {
      value: 'dicTypeId',
      label: 'name',
    })
    dicTypeList.length = 0
    dicTypeList.push(...data1)

    currentTreeData.value.id = treeDataList[0].id
    done(currentTreeData.value.id)
  })
}
export const handleAdd = () => {
  form.dicTypeId = ''
  form.id = ''
  form.dicTypeId = currentTreeData.value.id
  form.name = ''
}
export const handleEdit = (item: Dictionary) => {
  form.dicTypeId = item.dicTypeId
  form.id = item.id
  form.dicId = item.dicId
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
export const handleTreeClick = (data: Tree, done: any) => {
  currentTreeData.value = data
  done()
}
