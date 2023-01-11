<script setup lang="ts">
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css'
import GC from '@grapecity/spread-sheets'
import '@grapecity/spread-sheets-resources-zh'

GC.Spread.Common.CultureManager.culture('zh-cn')
</script>

<template>
  <router-view></router-view>
</template>

<style>
html,
body {
  width: 100%;
  height: 100%;
  overflow: visible;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
}
</style>
