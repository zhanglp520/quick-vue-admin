import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import * as Elicons from '@element-plus/icons-vue'
import quickUI from '@ainiteam/quick-vue3-ui'
import '@ainiteam/quick-vue3-ui/dist/style.css'
import * as echarts from 'echarts'
import App from './App.vue'
import { router } from './router'
import pinia from './store'
import i18n from './i18n'
import { useAppStore } from './store/modules/app'

const app = createApp(App)
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
  .mount('#app')
