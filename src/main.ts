import { createApp, App as AppInstance } from 'vue'
import { RouterHistory, Router } from 'vue-router'
// import './style.css'
import App from './App.vue'
import { history, router } from '@/router/index'

declare const window: any;
const handleMicroData = (router: Router) => {
  if (window.eventCenterForApp_Demo) {
    console.log('微应用【app-demo】 getData:', window.eventCenterForApp_Demo.getData())
    window.eventCenterForApp_Demo.addDataListener((data: Record<string, unknown>) => {
      console.log('微应用【app-demo】addDataListener:', data)
      if (data.path && typeof data.path === 'string') {
        data.path = data.path.replace(/^#/, '')
        if (data.path && data.path !== router.currentRoute.value.path) {
          router.push(data.path as string)
        }
      }
    })
    setTimeout(() => {
      window.eventCenterForApp_Demo.dispatch({ myname: 'app-demo' })
    }, 3000)
  }
}
let app: AppInstance | null = null
let quickRouter: Router | null = router
let qucikHistory: RouterHistory | null = history
const mount = () => {
  app = createApp(App)
  app.use(router)
  app.mount('#app-demo')
  console.log('微应用【app-demo】渲染了')
  handleMicroData(router)
}
const unmount = () => {
  app?.unmount()
  history?.destroy()
  window.eventCenterForApp_Demo?.clearDataListener()
  app = null
  quickRouter = null
  qucikHistory = null
  console.log('微应用【app-demo】卸载了')
}
if (window.__MICRO_APP_BASE_APPLICATION__) {
  // @ts-ignore
  window['micro-app-app-demo'] = { mount, unmount }
} else {
  mount()
}

