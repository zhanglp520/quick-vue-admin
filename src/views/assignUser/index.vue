<script lang="ts" setup>
import { ElMessage, ElMessageBox, ElTable } from 'element-plus'
import { reactive, ref } from 'vue'
import { treeFormat } from '@/utils'
import QuickCrud from '@/components/QuickCrud/index.vue'
import { Column, Actionbar, Toolbar } from '@/types/table'
import { User } from '@/types/user'
import { FormItem } from '@/types/form'
import { Options } from '@/types/options'
import { Tree, LeftTree } from '@/types/tree'
import { Page } from '@/types/page'
import { getRoleList, assignUser } from '@/api/role'
import { getUserPageList } from '@/api/user'

/**
 * 常规属性
 */
const dicTypeList = reactive<Array<Options>>([])
const treeDataList = reactive<Array<Tree>>([])
const dataList = reactive<Array<User>>([])
const userList = reactive<Array<User>>([])
const currentTreeData = ref<Tree>({
  id: '',
  label: '',
  children: [],
})
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const checkDataList = ref<Array<User>>([])

/**
 * 工具栏
 */
const handleAssign = (data: any, done: any) => {
  const { id, label } = currentTreeData.value
  if (!id) {
    ElMessage({
      type: 'warning',
      message: '请选择一个角色',
    })
    return
  }
  ElMessageBox.confirm(`你真的要给【${label}】角色分配用户吗？`, {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  })
    .then(() => {
      const userIds = checkDataList.value
        .map((x) => {
          return x.id
        })
        .join(',')
      assignUser({
        roleId: id,
        userIds,
      }).then(() => {
        ElMessage({
          type: 'success',
          message: '分配用户成功',
        })
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '您已取消分配用户',
      })
    })
}
const tableToolbar = reactive<Toolbar>({
  hiddenBatchDeleteButton: true,
  hiddenImportButton: true,
  hiddenExportButton: true,
  hiddenPrintButton: true,
  hiddenAddButton: true,
  btns: [
    {
      name: '分配',
      position: 'left',
      type: 'primary',
      click(data: any, done: any) {
        handleAssign(data, done)
      },
    },
  ],
})

const handleSelectionChange = (selectDataList: Array<User>) => {
  checkDataList.value = selectDataList
}
/**
 * 表格
 */
const tableColumns = reactive<Array<Column>>([
  {
    width: '50',
    type: 'selection',
  },
  {
    label: '用户编号',
    prop: 'userId',
    width: '200',
  },
  {
    label: '用户名',
    prop: 'userName',
  },
  {
    label: '姓名',
    prop: 'fullName',
  },
  {
    label: '手机号',
    prop: 'phone',
  },
  {
    label: '邮箱',
    prop: 'email',
    width: '200',
  },
])
const tableActionbar = reactive<Actionbar>({
  width: 300,
  hiddenDetailButton: true,
})
/**
 * 加载数据
 */
const load = (parmas: object) => {
  const { id } = currentTreeData.value
  getUserPageList(parmas).then((res) => {
    const { data: userDataList } = res
    userList.length = 0
    userList.push(...userDataList)
    console.log(`userList`, userList)
  })
}
/**
 * 左树
 */
const leftTree = reactive<LeftTree>({
  treeData: [],
  treeSpan: 6,
})
const treeLoad = (done: any) => {
  getRoleList().then((res) => {
    const { data: roleList } = res
    const data = treeFormat(roleList, {
      label: 'roleName',
      children: 'children',
    })
    treeDataList.length = 0
    treeDataList.push(...data)
    leftTree.treeData.length = 0
    leftTree.treeData.push(...treeDataList)
    currentTreeData.value.id = treeDataList[0].id
    done(currentTreeData.value.id)
  })
}

const hanleTableRef = (tableRef: any) => {
  multipleTableRef.value = tableRef
}
const toggleSelection = (rows?: User[]) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(row, true)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const handleTreeClick = (data: Tree, done: any) => {
  debugger
  console.log('userList1', userList)
  currentTreeData.value = data
  dataList.length = 0
  dataList.push(...userList)
  // const roleId = '1'
  // getUserPermission(roleId).then((res) => {
  //   const { data: userPermissionList } = res
  //   const arr = []
  //   userPermissionList.forEach((userId) => {
  //     console.log('userId', userId)
  //     const user = userList.filter((x) => {
  //       console.log('xxxxx', x)
  //       return x.id == userId
  //     })
  //     console.log(user, `user`)
  //     arr.push(user)
  //   })
  //   toggleSelection(userPermissionList)
  // })
  done()
}

/**
 * 分页
 */
const page = reactive<Page>({
  current: 1,
  size: 100,
  sizes: [10, 20, 30, 40, 50],
  total: 100,
})
</script>
<template>
  <quick-crud
    :table-data="dataList"
    :table-columns="tableColumns"
    :table-toolbar="tableToolbar"
    dialog-titles="dialogTitles"
    :left-tree="leftTree"
    :page="page"
    @on-selection-change="handleSelectionChange"
    @on-load="load"
    @on-tree-load="treeLoad"
    @on-tree-click="handleTreeClick"
    @on-table-ref="hanleTableRef"
  ></quick-crud>
</template>
