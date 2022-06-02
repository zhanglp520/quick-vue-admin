<script setup lang="ts">
import AiniLanguage from '@/components/AiniLanguage/index.vue'
</script>

<template>
  <div class="aini-top">
    <aini-language></aini-language>
    <div>{{ $t('title') }}</div>
  </div>
</template>

<style lang="scss" scoped>
.aini-top {
}
</style>
