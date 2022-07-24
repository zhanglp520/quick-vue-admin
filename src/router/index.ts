import { createRouter, createWebHashHistory } from 'vue-router'
import layout from '../layout/index.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/:catchAll(.*)',
      name: '404',
      component: () => import('@/pages/404/index.vue'),
    },
    {
      path: '/login',
      component: () => import('../pages/login/index.vue'),
    },
    {
      path: '/personalInfo',
      component: layout,
      redirect: '/personalInfo/index',
      children: [
        {
          path: 'index',
          component: () => import('../views/personalInfo/index.vue'),
        },
      ],
    },
    {
      path: '/changePassword',
      component: layout,
      redirect: '/changePassword/index',
      children: [
        {
          path: 'index',
          component: () => import('../views/changePassword/index.vue'),
        },
      ],
    },
    {
      path: '/',
      component: layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('../views/home/index.vue'),
        },
      ],
    },
    {
      path: '/system',
      component: layout,
      redirect: 'user',
      children: [
        {
          path: 'user',
          component: () => import('../views/user/index.vue'),
        },
        {
          path: 'role',
          component: () => import('../views/role/index.vue'),
        },
        {
          path: 'menu',
          component: () => import('../views/menu/index.vue'),
        },
        {
          path: 'dictionaryType',
          component: () => import('../views/dictionaryType/index.vue'),
        },
        {
          path: 'dictionary',
          component: () => import('../views/dictionary/index.vue'),
        },
      ],
    },
    {
      path: '/permission',
      component: layout,
      redirect: 'rolePermission',
      children: [
        {
          path: 'rolePermission',
          component: () => import('../views/rolePermission/index.vue'),
        },
      ],
    },
  ],
})
