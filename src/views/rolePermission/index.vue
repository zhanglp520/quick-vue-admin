<script lang="ts" setup>
import { nextTick, onMounted, reactive, ref } from 'vue'
import { ElTree, ElMessage, ElMessageBox } from 'element-plus'
import { TreeKey } from 'element-plus/es/components/tree/src/tree.type'
import { menuTreeFormat, treeFormat } from '@/utils'
import { MenuTree } from '@/types/menu'
import { Toolbar } from '@/types/table'
import { Tree } from '@/types/tree'
import { getRoleList, getMenuPermission, assignPermission } from '@/api/role'
import { getMenuList } from '@/api/menu'
import QuickToolbar from '@/components/QuickToolbar/index.vue'

const treeRef = ref<InstanceType<typeof ElTree>>()

/**
 * 菜单tree
 */
const menuProps = reactive({
  id: 'menuId',
  label: 'menuName',
  children: 'children',
})
const menuTreeData = reactive<Array<MenuTree>>([])
const menuTreeList = reactive<Array<MenuTree>>([])
const menuLoad = () => {
  getMenuList().then((res) => {
    const { data: menuList } = res
    const menuTree = menuTreeFormat(menuList)
    menuTreeList.length = 0
    menuTreeList.push(...menuTree)
  })
}
/**
 * 角色tree
 */
const roleProps = reactive({
  id: 'id',
  label: 'label',
  children: 'children',
})
const roleTreeData = reactive<Array<Tree>>([])
const roleTreeLoad = () => {
  getRoleList().then((res) => {
    const { data: roleList } = res
    const roleTree = treeFormat(roleList, {
      id: 'id',
      label: 'roleName',
      children: 'children',
    })
    roleTreeData.length = 0
    roleTreeData.push(...roleTree)
  })
}
const roleId = ref('')
const handleNodeClick = (data: any) => {
  roleId.value = data.id
  getMenuPermission(roleId.value).then((res) => {
    const { data: menuList } = res
    const value = menuList.map((x) => x.id)
    menuTreeData.length = 0
    menuTreeData.push(...menuTreeList)
    nextTick(() => {
      if (treeRef.value) {
        treeRef.value.setCheckedKeys(value, false)
      }
    })
  })
}
/**
 * 工具栏
 */
const handleGrant = () => {
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
      if (!treeRef.value) {
        return
      }
      // const checkMenuIdArr: TreeKey[] = treeRef.value.getCheckedKeys(false)
      // const parentMenuIdArr: TreeKey[] = treeRef.value.getHalfCheckedKeys()
      // const menuIdArr = [...parentMenuIdArr, ...checkMenuIdArr]
      const menuIdArr = treeRef.value.getCheckedKeys(false)
      const menuIds = menuIdArr.join(',')
      assignPermission({
        roleId: roleId.value,
        menuIds,
      }).then(() => {
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
      click() {
        handleGrant()
      },
    },
  ],
})
onMounted(() => {
  roleTreeLoad()
  menuLoad()
})
</script>

<template>
  <div clas="content">
    <el-row :gutter="20">
      <el-col :span="4">
        <el-card shadow="never">
          <el-tree
            :data="roleTreeData"
            :props="roleProps"
            @node-click="handleNodeClick"
          />
        </el-card>
      </el-col>
      <el-col :span="20">
        <el-card shadow="never">
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.content {
  .el-card {
    height: 575px;
  }
}
</style>
