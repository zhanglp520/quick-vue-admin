import { createApp, App as AppInstance } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import * as Elicons from '@element-plus/icons-vue'
import quickUI from '@ainiteam/quick-vue3-ui'
import '@ainiteam/quick-vue3-ui/dist/style.css'
import * as echarts from 'echarts'
import App from './App.vue'
import { RouterHistory, Router } from 'vue-router'
import pinia from './store'
import i18n from './i18n'
import { useAppStore } from './store/modules/app'
// import './style.css'
import { history, router } from '@/router/index'

declare const window: any;
const handleMicroData = (router: Router) => {
  if (window.eventCenterForApp_Demo) {
    console.log('微应用【app-tools】 getData:', window.eventCenterForApp_Demo.getData())
    window.eventCenterForApp_Demo.addDataListener((data: Record<string, unknown>) => {
      console.log('微应用【app-tools】addDataListener:', data)
      if (data.path && typeof data.path === 'string') {
        data.path = data.path.replace(/^#/, '')
        if (data.path && data.path !== router.currentRoute.value.path) {
          router.push(data.path as string)
        }
      }
    })
    setTimeout(() => {
      window.eventCenterForApp_Demo.dispatch({ myname: 'app-tools' })
    }, 3000)
  }
}
let app: AppInstance | null = null
let quickRouter: Router | null = router
let qucikHistory: RouterHistory | null = history
const mount = () => {
  app = createApp(App)
  const appStore = useAppStore(pinia)
app.config.globalProperties.$echarts = echarts
Object.keys(Elicons).forEach((key) => {
  app.component(key, Elicons[key])
})
app
  .use(ElementPlus, {
    locale: appStore.getLanguage === 'zh' ? zhCn : en,
  })
  .use(quickUI)
  .use(pinia)
  .use(router)
  .use(i18n)
  app.mount('#app-tools')
  console.log('微应用【app-tools】渲染了')
  handleMicroData(router)
}
const unmount = () => {
  app?.unmount()
  history?.destroy()
  window.eventCenterForApp_Demo?.clearDataListener()
  app = null
  quickRouter = null
  qucikHistory = null
  console.log('微应用【app-tools】卸载了')
}
if (window.__MICRO_APP_BASE_APPLICATION__) {
  // @ts-ignore
  window['micro-app-app-tools'] = { mount, unmount }
} else {
  mount()
}

