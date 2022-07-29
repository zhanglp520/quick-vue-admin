import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import pinia from '@/store'
import { useLoginStore } from '@/store/modules/login'
import { useUserStore } from '@/store/modules/user'
import { Menu } from '@/types/menu'
import staticRouter from './staticRouter'
import dynamicRouter from './dynamicRouter'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...dynamicRouter],
})
const modules = import.meta.glob('../views/*/*.vue')
export const formatRouter = (data: Menu[]) => {
  console.log('data', data)

  const arr: RouteRecordRaw[] = []
  const firstMenuArr: Menu[] = []
  const secondMenuArr: Menu[] = []
  data.forEach((element: Menu) => {
    if (element.menuType === 0) {
      firstMenuArr.push(element)
    } else if (element.menuType === 1) {
      secondMenuArr.push(element)
    }
  })
  firstMenuArr.forEach((element) => {
    const routerObj: RouteRecordRaw = {
      name: element.menuId,
      path: element.path,
      component: import('@/layout/index.vue'),
      redirect: '',
      children: [],
      meta: {
        title: element.menuName,
        icon: element.icon,
        link: element.link,
      },
    }
    const childMenu = secondMenuArr.filter((x) => x.pid === element.id)
    if (childMenu.length > 0) {
      routerObj.redirect = childMenu[0].path
      childMenu.forEach((childElement) => {
        const childRouterObj: RouteRecordRaw = {
          name: childElement.menuId,
          path: childElement.path,
          component: modules[`../views/${childElement.path}/index.vue`],
          meta: {
            title: childElement.menuName,
            icon: childElement.icon,
            link: childElement.link,
          },
        }
        routerObj.children.push(childRouterObj)
      })
    }
    arr.push(routerObj)
  })
  return arr
}

const addRoutes = async () => {
  const loginStore = useLoginStore(pinia)
  const userStore = useUserStore(pinia)
  const user = await userStore.getUserInfo(loginStore.userName)
  const { id } = user
  await userStore.getPermission(id.toString())
  const dt = JSON.parse(JSON.stringify(userStore.getPermissionMenuList))
  const routerData = formatRouter(dt)
  routerData.forEach((element) => {
    router.addRoute(element)
  })
}

router.beforeEach(async (to, from, next) => {
  const loginStore = useLoginStore(pinia)
  if (loginStore.getToken) {
    if (to.path === '/login') {
      next('/')
    } else if (to.name) {
      next()
    } else {
      await addRoutes()
      next({ ...to, replace: true })
    }
  } else if (to.path === '/login') {
    next()
  } else {
    next('/login')
  }
})
router.afterEach((to, from) => {
  NProgress.done()
})
