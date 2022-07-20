import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import outputErrorLog from '@/utils/errorLog';
import { sequelizeInit } from './service/initSequelize';

sequelizeInit();

const apps = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  apps.component(key, component)
}

if (process.env.NODE_ENV !== 'development') {
  apps.config.errorHandler = outputErrorLog;
}

apps.use(router).mount('#app');
apps.use(ElementPlus, {
  locale: zhCn
})
