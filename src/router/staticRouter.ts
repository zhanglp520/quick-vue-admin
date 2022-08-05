import layout from '../layout/index.vue'

const staticRouter = [
  {
    path: '/:catchAll(.*)',
    component: () => import('@/pages/404/index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../pages/login/index.vue'),
  },
  {
    path: '/personalInfo',
    name: 'PersonalInfo',
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
    name: 'ChangePassword',
    component: layout,
    redirect: '/changePassword/index',
    children: [
      {
        path: 'index',
        component: () => import('../views/changePassword/index.vue'),
      },
    ],
  },
]
export default staticRouter
