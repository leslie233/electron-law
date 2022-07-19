import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import outputErrorLog from '@/utils/errorLog';
import { sequelizeInit } from './service/initSequelize';

sequelizeInit();

const apps = createApp(App);

if (process.env.NODE_ENV !== 'development') {
  apps.config.errorHandler = outputErrorLog;
}

apps.use(router).mount('#app');
apps.use(ElementPlus)
