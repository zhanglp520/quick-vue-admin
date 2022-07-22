<script lang="ts" setup>
import {
  HomeFilled,
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
      :router="true"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="/home">
        <el-icon><HomeFilled /></el-icon>
        <template #title>首页</template>
      </el-menu-item>
      <el-sub-menu index="/system">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>系统管理</span>
        </template>
        <el-menu-item index="/system/user">用户管理</el-menu-item>
        <el-menu-item index="/system/role">角色管理</el-menu-item>
        <el-menu-item index="/system/menu">菜单管理</el-menu-item>
        <el-menu-item index="/system/dictionaryType">字典分类</el-menu-item>
        <el-menu-item index="/system/dictionary">字典管理</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="/permission ">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>权限管理</span>
        </template>
        <el-menu-item index="/permission/user">用户权限</el-menu-item>
        <el-menu-item index="/permission/role">角色权限</el-menu-item>
        <el-menu-item index="/permission/dictionaryType">接口权限</el-menu-item>
        <el-menu-item index="/permission/dictionary">数据权限</el-menu-item>
      </el-sub-menu>
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
