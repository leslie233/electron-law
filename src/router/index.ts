/*
 * @Author: zhh zhanghaohan@boulderai.com
 * @Date: 2022-07-19 11:39:16
 * @LastEditors: zhh zhanghaohan@boulderai.com
 * @LastEditTime: 2022-07-20 13:09:00
 * @FilePath: \electron-vue3-inote\src\router\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import main from '../views/main.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: main,
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('../views/index/index.vue'),
        meta: {
          title: 'I便笺'
        }
      },
      {
        path: '/editor',
        name: 'editor',
        component: () => import('../views/editor/index.vue'),
        meta: {
          title: ''
        }
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('../views/setting/index.vue'),
        meta: {
          title: '设置'
        }
      },
      {
        path: '/case',
        name: 'case',
        component: () => import('../views/case/index.vue'),
        meta: {
          title: '案件管理'
        }
      },
      {
        path: '/addCase',
        name: 'addCase',
        component: () => import('../views/case/addCase.vue'),
        meta: {
          title: '案件受理'
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router;
