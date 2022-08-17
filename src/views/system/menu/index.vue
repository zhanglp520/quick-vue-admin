<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { selectTreeFormat, listToTree } from '@/utils/index'
import elementPlusIcons from '@/config/custormIcons.json'
import { Column, Actionbar, Toolbar } from '@/types/table'
import { Menu } from '@/types/menu'
import { FormItem } from '@/types/form'
import { Options } from '@/types/options'
import QuickCrud from '@/components/QuickCrud/index.vue'
import { getMenuList, addMenu, updateMenu, deleteMenu } from '@/api/menu'

/**
 * 属性
 */
const loading = ref(false)
const dataList = reactive<Array<Menu>>([])
const parentTreeList = reactive<Array<Options>>([])
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
const handleEdit = (form: Menu, done: any) => {
  const model = { ...form }
  if (!model.pid) {
    model.pid = ''
  } else {
    model.pid = model.pid.toString()
  }
  done(model)
}
const handleDetail = (form: Menu, done: any) => {
  const model = { ...form }
  if (!model.pid) {
    model.pid = ''
  } else {
    model.pid = model.pid.toString()
  }
  done(model)
}
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
    fixed: true,
  },
  {
    label: '路由',
    prop: 'path',
    width: '200',
  },
  {
    label: '视图',
    prop: 'viewPath',
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
    label: '是否启用',
    prop: 'enabled',
    width: '200',
    format: (row: Menu) => {
      return row.enabled === 1 ? '启用' : '禁用'
    },
  },
  {
    label: '是否显示',
    prop: 'status',
    width: '200',
    format: (row: Menu) => {
      return row.status === 1 ? '显示' : '不显示'
    },
  },
])
/**
 * 加载数据
 */
const load = () => {
  loading.value = true
  getMenuList().then((res) => {
    loading.value = false
    const { data: menuList } = res
    const menuTree = listToTree(menuList, 0, {
      pId: 'pid',
    })
    dataList.length = 0
    dataList.push(...menuTree)

    const parentMenuList = menuList.filter((x) => x.menuType !== 2)
    const parentTree = listToTree(parentMenuList, 0, {
      pId: 'pid',
    })
    const selectTreeData = selectTreeFormat(parentTree, {
      value: 'id',
      label: 'menuName',
    })
    parentTreeList.length = 0
    parentTreeList.push(...selectTreeData)
  })
}
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
  menuId: '',
  menuName: '',
  path: '',
  viewPath: '',
  menuType: 0,
  icon: '',
  sort: 0,
  pid: '',
  link: 0,
  linkUrl: '',
  enabled: 1,
  status: 1,
})
const formItems = reactive<Array<FormItem>>([
  {
    label: '菜单编号',
    labelWidth: '80px',
    vModel: 'menuId',
    placeholder: '菜单编号',
    editReadonly: true,
    prop: 'menuId',
    width: '400px',
    rules: [
      {
        required: true,
        message: '菜单编号不能为空',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '菜单名称',
    labelWidth: '80px',
    vModel: 'menuName',
    placeholder: '菜单名称',
    prop: 'menuName',
    width: '400px',
    rules: [
      {
        required: true,
        message: '菜单名称不能为空',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '菜单类型',
    labelWidth: '80px',
    vModel: 'menuType',
    placeholder: '菜单类型',
    prop: 'menuType',
    type: 'select',
    width: '400px',
    options: [
      {
        label: '目录',
        value: 0,
      },
      {
        label: '菜单',
        value: 1,
      },
      {
        label: '按钮',
        value: 2,
      },
    ],
    rules: [
      {
        required: true,
        message: '菜单类型不能为空',
        trigger: 'blur',
      },
    ],
  },
  {
    label: '菜单图标',
    labelWidth: '80px',
    vModel: 'icon',
    placeholder: '菜单图标',
    prop: 'icon',
    type: 'icon',
    options: elementPlusIcons,
    width: '400px',
    select: (val) => {
      formModel.icon = val
    },
  },
  {
    label: '路由',
    labelWidth: '80px',
    vModel: 'path',
    placeholder: '路由',
    width: '400px',
    prop: 'path',
  },
  {
    label: '视图',
    labelWidth: '80px',
    vModel: 'viewPath',
    placeholder: '视图',
    width: '400px',
    prop: 'viewPath',
  },
  {
    label: '排序',
    labelWidth: '80px',
    vModel: 'sort',
    placeholder: '排序',
    prop: 'sort',
    width: '400px',
  },
  {
    label: '父级菜单',
    labelWidth: '80px',
    vModel: 'pid',
    placeholder: '父级菜单',
    type: 'tree',
    options: parentTreeList,
    width: '400px',
    prop: 'pid',
  },
  {
    label: '是否启用',
    labelWidth: '80px',
    vModel: 'enabled',
    placeholder: '是否启用',
    prop: 'enabled',
    type: 'switch',
    width: '400px',
  },
  {
    label: '是否显示',
    labelWidth: '80px',
    vModel: 'status',
    placeholder: '是否显示',
    prop: 'status',
    type: 'switch',
    width: '400px',
  },
  {
    label: '外链',
    labelWidth: '80px',
    vModel: 'link',
    placeholder: '外链',
    prop: 'link',
    type: 'switch',
    width: '400px',
  },
  {
    label: '链接地址',
    labelWidth: '80px',
    vModel: 'linkUrl',
    placeholder: '链接地址',
    width: '400px',
    prop: 'linkUrl',
  },
])
const handleFormSubmit = (form: Menu, done: any) => {
  const model = { ...form }
  if (!model.pid) {
    model.pid = '0'
  }
  if (model.id) {
    updateMenu(model).then(() => {
      ElMessage({
        type: 'success',
        message: '菜单修改成功',
      })
      done()
    })
  } else {
    addMenu(model).then(() => {
      ElMessage({
        type: 'success',
        message: '菜单创建成功',
      })
      done()
    })
  }
}
</script>
<template>
  <quick-crud
    :form-inline="true"
    :dialog-title="dialogTitle"
    :form-model="formModel"
    :form-items="formItems"
    :table-data="dataList"
    :table-columns="tableColumns"
    :table-actionbar="tableActionbar"
    :table-toolbar="tableToolbar"
    dialog-titles="dialogTitles"
    :loading="loading"
    @on-load="load"
    @on-form-submit="handleFormSubmit"
    @on-delete="handleDelete"
    @on-edit="handleEdit"
    @on-detail="handleDetail"
  ></quick-crud>
</template>
