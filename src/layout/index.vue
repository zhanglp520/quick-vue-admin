<script setup lang="ts">
import DefaultLayout from './DefaultLayout.vue'
import WebosLayout from './WebosLayout.vue'
import LedvLayout from './LedvLayout.vue'
import config from '@/config/index'
</script>
<template>
  <ledv-layout v-if="config.layoutType === 'ledv'"></ledv-layout>
  <webos-layout v-else-if="config.layoutType === 'webos'"></webos-layout>
  <default-layout v-else></default-layout>
</template>
