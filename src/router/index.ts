import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '../layout/index.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: layout,
      redirect: '/user',
      children: [
        {
          path: '/home',
          component: () => import('../views/home/index.vue'),
        },
        {
          path: '/user',
          component: () => import('../views/user/index.vue'),
        },
        {
          path: '/dictionaryType',
          component: () => import('../views/dictionaryType/index.vue'),
        },
        {
          path: '/dictionary',
          component: () => import('../views/dictionary/index.vue'),
        },
      ],
    },
  ],
})
