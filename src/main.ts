import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import App from './App.vue'
import { router } from './router'
import { pinia } from './store'

import i18n from './i18n'

import { useAppStore } from './store/modules/app'

const app = createApp(App)

const appStore = useAppStore(pinia)
app.use(ElementPlus, {
  locale: appStore.getLanguage === 'zh' ? zhCn : en,
})
app.use(router)
app.use(pinia)
app.use(i18n)

app.mount('#app')
