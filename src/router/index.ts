import { createRouter, createWebHashHistory, RouterHistory, Router,RouteRecordRaw } from 'vue-router'

export interface QuickRouter extends Router{

}
export const routes:Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
    },
  ]
  export const history= createWebHashHistory()
  export const router =createRouter({
    history,
    routes,
  })
  