/**导入第三方库 */
import { createApp } from "vue";
import * as echarts from "echarts";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import en from "element-plus/es/locale/lang/en";
import * as Elicons from "@element-plus/icons-vue";
import quickUI from "@ainiteam/quick-vue3-ui";
import "@ainiteam/quick-vue3-ui/dist/style.css";

/**导入项目文件 */
import App from "./App.vue";
import { router } from "./router";
import i18n from "./i18n";
import pinia from "./store";
import { useAppStore } from "./store/modules/app";
import "./assets/styles/element-plus/index.scss";
// import './assets/main.css'

/**创建vue实例 */
const app = createApp(App);

Object.keys(Elicons).forEach((key) => {
    app.component(key, Elicons[key]);
});
app.config.globalProperties.$echarts = echarts;
const appStore = useAppStore(pinia);

/**加载插件 */
app.use(ElementPlus, {
    locale: appStore.getLanguage === "zh" ? zhCn : en
})
    .use(quickUI)
    .use(pinia)
    .use(router)
    .use(i18n);

//渲染
app.mount("#app");
console.log("ElementPlus", ElementPlus);
console.log("quickUI", quickUI);
