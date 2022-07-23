<script lang="ts" setup>
import { computed, onMounted, reactive, ref, nextTick } from 'vue'
import { ElTree, ElMessage, ElMessageBox } from 'element-plus'
import { getRoleList } from '@/api/role'
import { getRoleMenuLsit, getMenuList, assignPermission } from '@/api/menu'
import { menuTreeFormat } from '../../utils'
import { MenuTree } from '../../types/menu'
import { Toolbar } from '@/types/table'
import QuickToolbar from '@/components/QuickToolbar/index.vue'

const treeRef = ref<InstanceType<typeof ElTree>>()

const defaultProps = reactive({
  id: 'roleId',
  label: 'roleName',
  children: 'children',
})
const menuProps = reactive({
  id: 'menuId',
  label: 'menuName',
  children: 'children',
})
const roleTreeData = reactive<Array<MenuTree>>([])
const treeLoad = () => {
  getRoleList().then((res) => {
    const { data: roleList } = res
    roleTreeData.length = 0
    roleTreeData.push(...roleList)
  })
}

const menuTreeData = reactive<Array<MenuTree>>([])
const menuLoad = () => {
  getMenuList().then((res) => {
    const { data: menuList } = res
    const menuTree = menuTreeFormat(menuList)
    menuTreeData.length = 0
    menuTreeData.push(...menuTree)
  })
}

const setCheckedKeys = (val: any) => {
  nextTick(() => {
    treeRef.value!.setCheckedKeys(val, false)
  })
}
const roleId = ref('')
const handleNodeClick = (data: any) => {
  roleId.value = data.id
  getRoleMenuLsit(roleId.value).then((res) => {
    console.log(`menuLIst`, res)
    const { data: menuList } = res
    const value = menuList.map((x) => x.id)
    setCheckedKeys(value)
    // const menuTree = menuTreeFormat(menuList)
    // menuTreeData.length = 0
    // menuTreeData.push(...menuTree)
  })
}
const handleGrant = (data: any, done: any) => {
  if (!roleId.value) {
    ElMessage({
      type: 'warning',
      message: '请选择一个角色',
    })
    return
  }
  ElMessageBox.confirm(`你真的要给${roleId.value}角色分配权限吗？`, {
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    type: 'warning',
  })
    .then(() => {
      const menuIdArr = treeRef.value!.getCheckedKeys(false)
      console.log(`menuIdArr`, menuIdArr)
      const menuIds = menuIdArr.join(',')
      assignPermission({
        roleId: roleId.value,
        menuIds,
      }).then((res) => {
        ElMessage({
          type: 'success',
          message: '分配权限成功',
        })
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '您已取消分配权限',
      })
    })
}
const tableToolbar = reactive<Toolbar>({
  btns: [
    {
      name: '分配权限',
      position: 'left',
      type: 'primary',
      size: 'small',
      click(data: any, done: any) {
        handleGrant(data, done)
      },
    },
  ],
})

onMounted(() => {
  treeLoad()
  menuLoad()
})
</script>

<template>
  <el-row>
    <el-col :span="4">
      <el-tree
        :data="roleTreeData"
        :props="defaultProps"
        @node-click="handleNodeClick"
      />
    </el-col>
    <el-col :span="20">
      <quick-toolbar
        :table-toolbar="tableToolbar"
        :hidden-add-button="true"
        :hidden-batch-delete-button="true"
        :hidden-import-button="true"
        :hidden-export-button="true"
        :hidden-print-button="true"
        :hidden-refresh-button="true"
      ></quick-toolbar>
      <!-- :default-checked-keys="" -->
      <el-tree
        ref="treeRef"
        :data="menuTreeData"
        :props="menuProps"
        show-checkbox
        node-key="id"
        highlight-current
      />
    </el-col>
  </el-row>
</template>
