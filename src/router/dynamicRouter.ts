import layout from '@/layout/index.vue'

const dynamicRouter = [
  {
    path: '/',
    name: 'fist',
    component: layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
]
export default dynamicRouter
