<script setup lang="ts">
import DefaultLayout from './DefaultLayout.vue'
import WebosLayout from './WebosLayout.vue'
import config from '@/config/index'
</script>
<template>
  <webos-layout v-if="config.layoutType === 'webos'"></webos-layout>
  <default-layout v-else></default-layout>
</template>
