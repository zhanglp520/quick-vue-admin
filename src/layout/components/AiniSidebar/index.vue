<script lang="ts" setup>
import { computed } from 'vue'
import { useAppStore } from '../../../store/modules/app'
import AiniMenu from '@/layout/components/AiniMenu/index.vue'

const appStore = useAppStore()
const isCollapse = computed(() => appStore.getCollapse)
</script>

<template>
  <div class="aini-sidebar">
    <div class="aini-title">
      <img src="@/assets/logo.png" />
      <h5 v-if="!isCollapse">quick框架</h5>
    </div>
    <aini-menu></aini-menu>
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
