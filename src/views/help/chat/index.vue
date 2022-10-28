<script setup lang="ts">
import { io } from 'socket.io-client'

import { onMounted } from 'vue'

let wsClinet: any = null

onMounted(() => {
  wsClinet = io('http://localhost:3000')
  wsClinet.emit('events', (res: any) => {
    console.log('res', res)
  })
  wsClinet.emit('events', (res: any) => {
    console.log('res', res)
  })
})
// client.on('connect', () => {
//   console.log('socket connect success')
//   const content = {
//     username: 'admin',
//     password: '123456',
//   }
//   console.log('开始登录', content)
//   client.emit('events', content)
// })
// client.on('message', (data) => {
//   console.log('message', data)
// })
</script>
<template>
  <div>聊天</div>
</template>
