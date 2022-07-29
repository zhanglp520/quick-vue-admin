import layout from '../layout/index.vue'

const dynamicRouter = [
  {
    path: '/',
    name: 'home',
    component: layout,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('../views/home/index.vue'),
      },
    ],
  },
]
export default dynamicRouter
