<script setup lang="ts">
import { ElMessageBox } from 'element-plus'
import {
  // Document,
  // Location,
  Setting,
  ArrowRight,
  Search,
  Fold,
  // Expand,
  ChatDotRound,
  FullScreen,
  Phone,
} from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
// import AiniLanguage from '@/components/AiniLanguage/index.vue'
import { useAppStore } from '../../../store/modules/app'

const router = useRouter()
const appStore = useAppStore()
const isCollapse = computed(() => appStore.getCollapse)
const collapse = () => {
  appStore.setCollapse(!isCollapse.value)
}
const loginOut = () => {
  ElMessageBox.confirm('你真的要退出系统吗?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    router.push('/login')
  })
}
const personalInfo = () => {
  router.push('/personalInfo')
}
const changePassword = () => {
  router.push('/changePassword')
}
const handleCommand = (cmd: string) => {
  switch (cmd) {
    case 'loginOut':
      loginOut()
      break
    case 'personalInfo':
      personalInfo()
      break
    case 'changePassword':
      changePassword()
      break
    default:
      break
  }
}
</script>

<template>
  <div class="aini-top">
    <div class="left">
      <span class="test" @click="collapse">
        <el-icon><Fold /></el-icon>
      </span>
      <div>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>系统管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="right">
      <span class="test">
        <el-icon><Search /></el-icon>
      </span>
      <span class="test">
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span class="test">
        <el-icon><FullScreen /></el-icon>
      </span>
      <span class="test">
        <el-icon><Phone /></el-icon>
      </span>
      <span class="test">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar :size="30"> user </el-avatar>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Setting" command="personalInfo">
                个人资料
              </el-dropdown-item>
              <el-dropdown-item :icon="Setting" command="changePassword">
                修改密码
              </el-dropdown-item>
              <el-dropdown-item :icon="Setting" command="loginOut">
                退出
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
      <span class="test">
        <el-icon><Setting /></el-icon>
      </span>
    </div>
    <!-- <aini-language></aini-language> -->
  </div>
</template>

<style lang="scss" scoped>
.aini-top {
  display: flex;
  align-items: center;
  height: 50px;
  line-height: 50px;
  justify-content: space-between;
  .test {
    display: flex;
    height: 100%;
    padding: 1px 10px 0;
    cursor: pointer;
    align-items: center;
  }
  .test:hover {
    background-color: #f6f6f6;
  }
  .left {
    display: flex;
    height: 100%;
    align-items: center;
  }
  .right {
    display: flex;
    min-width: 180px;
    align-items: center;
    height: 100%;
  }
}
</style>
