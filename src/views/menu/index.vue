<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import QuickCrud from '@/components/QuickCrud/index.vue'
import { tableTreeFormat } from '@/utils/index'
import { Column, Actionbar, Toolbar } from '@/types/table'
import { Menu } from '@/types/menu'
import { FormItem } from '@/types/form'
import { getMenuList, addMenu, updateMenu, deleteMenu } from '@/api/menu'

const dataList = reactive<Array<Menu>>([])
/**
 * 表单
 */
const dialogTitle = reactive({
  add: '创建菜单',
  edit: '修改菜单',
  detail: '菜单详情',
})
const formModel = reactive<Menu>({
  id: '',
  dicTypeId: '',
  name: '',
})
const formItems = reactive<Array<FormItem>>([
  {
    label: '分类编号',
    labelWidth: '80px',
    vModel: 'dicTypeId',
    placeholder: '分类编号',
    editReadonly: true,
    prop: 'dicTypeId',
    rules: [
      {
        required: true,
        message: '分类编号不能为空',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '分类名称',
    labelWidth: '80px',
    vModel: 'name',
    placeholder: '分类名称',
    prop: 'name',
    rules: [
      {
        required: true,
        message: '分类名称不能为空',
        trigger: 'blur',
      },
    ],
  },
])
const handleFormSubmit = (form: Menu, done: any) => {
  console.log('handleFormSubmit', form)
  if (form.id) {
    updateMenu(form).then(() => {
      ElMessage({
        type: 'success',
        message: '菜单修改成功',
      })
      done()
    })
  } else {
    addMenu(form).then(() => {
      ElMessage({
        type: 'success',
        message: '菜单创建成功',
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
 * 表格
 */
const tableColumns = reactive<Array<Column>>([
  {
    width: '50',
    type: 'selection',
  },
  {
    label: '菜单编号',
    prop: 'menuId',
    width: '200',
  },
  {
    label: '菜单名称',
    prop: 'menuName',
    width: '200',
  },
  {
    label: '路由',
    prop: 'path',
    width: '200',
  },
  {
    label: '菜单类型',
    prop: 'menuType',
    width: '200',
    format: (row: Menu) => {
      if (row.menuType === 0) {
        return '目录'
      }
      if (row.menuType === 1) {
        return '菜单'
      }
      if (row.menuType === 2) {
        return '按钮'
      }
      return ''
    },
  },
  {
    label: '菜单图标',
    prop: 'icon',
    width: '200',
  },
  {
    label: '菜单排序',
    prop: 'sort',
    width: '200',
  },
  {
    label: '是否外链',
    prop: 'link',
    width: '200',
    format: (row: Menu) => {
      return row.link === 1 ? '外链' : '非外链'
    },
  },
  {
    label: '启用',
    prop: 'enabled',
    width: '200',
    format: (row: Menu) => {
      return row.enabled === 1 ? '禁用' : '启用'
    },
  },
  {
    label: '是否显示',
    prop: 'status',
    width: '200',
    format: (row: Menu) => {
      return row.status === 1 ? '不显示' : '显示'
    },
  },
  // {
  //   label: '菜单名称',
  //   prop: 'menuName',
  // },
])
const handleDelete = (item: Menu, done: any) => {
  ElMessageBox.confirm(`你真的删除【${item.menuName}】的菜单吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    deleteMenu(item.id).then(() => {
      ElMessage({
        type: 'success',
        message: '菜单删除成功',
      })
      done()
    })
  })
}
const tableActionbar = reactive<Actionbar>({
  width: 150,
})
/**
 * 加载数据
 */
const load = (parmas: object) => {
  getMenuList().then((res) => {
    const { data: menuList } = res
    const menuTree = tableTreeFormat(menuList)
    console.log('menuTree', menuTree)

    dataList.length = 0
    dataList.push(...menuTree)
  })
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
    @on-load="load"
    @on-form-submit="handleFormSubmit"
    @on-delete="handleDelete"
  ></quick-crud>
</template>
