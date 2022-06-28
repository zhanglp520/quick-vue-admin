<script lang="ts" setup>
import {
  // Document,
  Menu as IconMenu,
  // Location,
  Setting,
} from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useAppStore } from '../../../store/modules/app'

const appStore = useAppStore()
const isCollapse = computed(() => appStore.getCollapse)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <div class="aini-sidebar">
    <div class="aini-title">
      <img src="@/assets/logo.png" />
      <h5 v-if="!isCollapse">quick框架</h5>
    </div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      :collapse="isCollapse"
      text-color="#fff"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>系统管理</span>
        </template>
        <el-sub-menu index="1-4">
          <template #title>用户管理</template>
          <el-menu-item index="1-4-1">用户列表</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>角色管理</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <span>权限管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>菜单管理</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.aini-sidebar {
  .aini-title {
    display: flex;
    align-items: center;
    padding-left: 7px;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: #545c64;
    height: 48px px;
    padding: 10px 4px 10px 10px;
    img {
      width: 32px;
      height: 32px;
    }
    h5 {
      text-align: center;
      color: #fff;
      font-weight: 700;
      font-size: 16px;
      margin: 0;
      padding: 0;
    }
  }
}
</style>
<style>
.el-menu {
  border-right: solid 0;
}
</style>
