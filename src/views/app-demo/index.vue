<script setup lang="ts">
import {reactive, ref} from 'vue'
import { EventCenterForMicroApp } from '@micro-zoe/micro-app'

window.eventCenterForApp_Demo = new EventCenterForMicroApp('app-demo')
const url=ref(`${import.meta.env.VITE_APP_DEMO_URL}/app-demo/`)
const microAppData=ref({
  msg:'来自基座的数据'
})
const handleCreate=():void=>{
  console.log('微应用【app-demo】创建了')
}
const handleBeforeMount=():void=>{
  console.log('微应用【app-demo】即将被渲染')
}
const handleMount=():void=>{
  console.log('微应用【app-demo】已经渲染完成')
  setTimeout(() => {
    microAppData.value = {msg:'来自基座的新数据'}        
      }, 2000)
}
const handleUnmount=():void=>{
  console.log('微应用【app-demo】卸载了')
}
const handleError=():void=>{
  console.log('微应用【app-demo】加载出错了')
}
const handleDataChange=(e: CustomEvent):void=>{
  console.log('微应用【app-demo】的数据:', e.detail.data)
}
</script>

<template>
<div>
    <micro-app
      name='app-demo'
      :url='url'
      inline
      disablesandbox
      :data='microAppData'
      baseroute='/app-demo'
      @created='handleCreate'
      @beforemount='handleBeforeMount'
      @mounted='handleMount'
      @unmount='handleUnmount'
      @error='handleError'
      @datachange='handleDataChange'
    ></micro-app>
  </div>
</template>

<style scoped>

</style>
