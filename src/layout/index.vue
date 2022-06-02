<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AiniBottom from './components/AiniBottom/index.vue'
import AiniTop from './components/AiniTop/index.vue'
import AiniSidebar from './components/AiniSidebar/index.vue'

const { t } = useI18n()
console.log('i18n', t('title'))
</script>

<template>
  <div class="aini-layout">
    <aini-sidebar></aini-sidebar>
    <aini-top></aini-top>
    <div class="aini-layout-content">
      <router-view></router-view>
    </div>
    <aini-bottom></aini-bottom>
  </div>
</template>

<style lang="scss" scoped>
.aini-layout {
  .aini-layout-content {
  }
}
</style>
