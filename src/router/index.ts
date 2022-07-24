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
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '事务所管理系统'
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
      },
      {
        path: '/custom',
        name: 'custom',
        component: () => import('../views/custom/index.vue'),
        meta: {
          title: '客户管理'
        }
      },
      {
        path: '/addCustom',
        name: 'addCustom',
        component: () => import('../views/custom/addCustom.vue'),
        meta: {
          title: '客户信息'
        }
      },
      {
        path: '/judge',
        name: 'judge',
        component: () => import('../views/judge/index.vue'),
        meta: {
          title: '法官管理'
        }
      },
      {
        path: '/addJudge',
        name: 'addJudge',
        component: () => import('../views/judge/addJudge.vue'),
        meta: {
          title: '法官信息'
        }
      },
      {
        path: '/adviser',
        name: 'adviser',
        component: () => import('../views/adviser/index.vue'),
        meta: {
          title: '法律顾问'
        }
      },
      {
        path: '/addAdviser',
        name: 'addAdviser',
        component: () => import('../views/adviser/addAdviser.vue'),
        meta: {
          title: '顾问信息'
        }
      },
      {
        path: '/finance',
        name: 'finance',
        component: () => import('../views/finance/index.vue'),
        meta: {
          title: '财务收支'
        }
      },
      {
        path: '/addIncome',
        name: 'addIncome',
        component: () => import('../views/finance/addIncome.vue'),
        meta: {
          title: '收入信息'
        }
      },
      {
        path: '/addOutcome',
        name: 'addOutcome',
        component: () => import('../views/finance/addOutcome.vue'),
        meta: {
          title: '支出信息'
        }
      },
    ]
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router;
