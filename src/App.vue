<script setup lang="ts">
const onRouteChange=()=>{
  if (window.eventCenterForApp_Demo) {
    window.eventCenterForApp_Demo.setGlobalData({ name: 'app-demo' })
  }
}
</script>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>
