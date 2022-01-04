import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 全局引用
import ElementPlus from 'element-plus'
// 引用所有样式
import 'element-plus/dist/index.css'
import SvgIcon from '@/components/SvgIcon'// svg component

export const app = createApp(App)
app.component('svg-icon', SvgIcon)

app.use(store).use(router).use(SvgIcon).use(ElementPlus).mount("#app")

const req = require.context('./icons/svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
