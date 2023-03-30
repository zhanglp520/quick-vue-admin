<script setup lang="ts">
const onRouteChange = () => {
  if (window.eventCenterForApp_Demo) {
    window.eventCenterForApp_Demo.setGlobalData({ name: 'app-tools' })
  }
}
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

#app-tools {
  width: 100%;
  height: 100%;
  background: #f0f2f5;
}
</style>