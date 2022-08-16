<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import QuickCrud from '@/components/QuickCrud/index.vue'
import { listToTableTree, selectTreeFormat } from '@/utils'
import { Column, Actionbar, Toolbar } from '@/types/table'
import { Dept } from '@/types/dept'
import { FormItem } from '@/types/form'
import { Options } from '@/types/options'
import { Tree, LeftTree } from '@/types/tree'
import { getDeptList, addDept, updateDept, deleteDept } from '@/api/dept'

/**
 * 属性
 */
const deptDdataListTemp = reactive<Array<Dept>>([])
const dicTypeList = reactive<Array<Options>>([])
const dataList = reactive<Array<Dept>>([])
const currentTreeData = ref<Tree>({
  id: '',
  label: '',
  children: [],
})
/**
 * 表单
 */
const dialogTitle = reactive({
  add: '创建部门',
  edit: '修改部门',
  detail: '部门详情',
})
const formModel = reactive<Dept>({
  id: '',
  deptId: '',
  name: '',
  pId: '',
})
const formItems = reactive<Array<FormItem>>([
  {
    label: '部门编号',
    labelWidth: '80px',
    vModel: 'deptId',
    placeholder: '部门编号',
    editReadonly: true,
    prop: 'deptId',
    rules: [
      {
        required: true,
        message: '部门编号不能为空',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '部门名称',
    labelWidth: '80px',
    vModel: 'name',
    placeholder: '部门名称',
    prop: 'name',
    rules: [
      {
        required: true,
        message: '部门名称不能为空',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '父级部门',
    labelWidth: '80px',
    vModel: 'pId',
    placeholder: '父级部门',
    type: 'tree',
    addDisabled: true,
    editDisabled: true,
    detailDisabled: true,
    options: dicTypeList,
    prop: 'pId',
  },
])
const handleFormSubmit = (form: Dept, done: any) => {
  if (form.id) {
    updateDept(form).then(() => {
      ElMessage({
        type: 'success',
        message: '部门修改成功',
      })
      done()
    })
  } else {
    addDept(form).then(() => {
      ElMessage({
        type: 'success',
        message: '部门创建成功',
      })
      done()
    })
  }
}
/**
 * 工具栏
 */
const tableToolbar = reactive<Toolbar>({
  hiddenBatchDeleteButton: true,
  hiddenImportButton: true,
  hiddenExportButton: true,
  hiddenPrintButton: true,
})
/**
 * 操作栏
 */
const handleEdit = (form: any, done: any) => {
  const model = form
  model.pId = model.pId.toString()
  done(model)
}
const handleDelete = (item: Dept, done: any) => {
  ElMessageBox.confirm(`你真的删除【${item.name}】的部门吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteDept(item.id).then(() => {
      ElMessage({
        type: 'success',
        message: '部门删除成功',
      })
      done()
    })
  })
}
const tableActionbar = reactive<Actionbar>({
  width: 300,
  hiddenDetailButton: true,
})
/**
 * 表格
 */
const tableColumns = reactive<Array<Column>>([
  {
    width: '50',
    type: 'selection',
  },
  {
    label: '部门编号',
    prop: 'deptId',
    width: '200',
  },
  {
    label: '部门名称',
    prop: 'name',
  },
])
const deptTreeFormat = (data: Array<Dept>, pId = '0') => {
  const arr: Array<Tree> = []
  const obj: Tree = {
    id: '',
    label: '',
    children: [],
  }
  const parentData = data.find((x: Dept) => x.pId === pId)
  if (parentData) {
    obj.id = parentData.id.toString()
    obj.label = parentData.name
    const parentId = parentData.id
    const companyData = data.filter((x: Dept) => x.pId === parentId)
    companyData.forEach((item: Dept) => {
      if (companyData) {
        const companyObj: Tree = {
          id: item.id.toString(),
          label: item.name,
          children: [],
        }
        const companyPid = item.id
        const deptData = data.filter((x: Dept) => x.pId === companyPid)
        deptData.forEach((deptItem) => {
          companyObj.children.push({
            id: deptItem.id.toString(),
            label: deptItem.name,
            children: [],
          })
        })
        obj.children.push(companyObj)
      }
    })
  }
  arr.push(obj)
  return arr
}
/**
 * 加载数据
 */
const load = () => {
  const { id } = currentTreeData.value
  const pId = id
  const deptTree = listToTableTree(deptDdataListTemp, pId)
  dataList.length = 0
  dataList.push(...deptTree)
}

/**
 * 左树
 */

const leftTree = reactive<LeftTree>({
  treeData: [],
  treeSpan: 6,
})
const treeLoad = (done: any) => {
  getDeptList().then((res) => {
    const { data: deptList } = res
    deptDdataListTemp.length = 0
    deptDdataListTemp.push(...deptList)
    const data = deptTreeFormat(deptList)
    leftTree.treeData.length = 0
    leftTree.treeData.push(...data)
    const selectTreeData = selectTreeFormat(data, {
      value: 'id',
    })
    dicTypeList.length = 0
    dicTypeList.push(...selectTreeData)
    if (!currentTreeData.value.id) {
      currentTreeData.value.id = data[0].id
    }
    done(currentTreeData.value.id)
  })
}
const handleTreeClick = (data: Tree, done: any) => {
  currentTreeData.value = data
  done()
}
</script>
<template>
  <quick-crud
    :dialog-title="dialogTitle"
    :form-model="formModel"
    :form-items="formItems"
    :table-data="dataList"
    :table-columns="tableColumns"
    :table-actionbar="tableActionbar"
    :table-toolbar="tableToolbar"
    dialog-titles="dialogTitles"
    :left-tree="leftTree"
    :left-tree-refresh="true"
    @on-edit="handleEdit"
    @on-load="load"
    @on-tree-load="treeLoad"
    @on-tree-click="handleTreeClick"
    @on-form-submit="handleFormSubmit"
    @on-delete="handleDelete"
  ></quick-crud>
</template>
