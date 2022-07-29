import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { pinia } from '@/store'
import { useLoginStore } from '@/store/modules/login'
import { useUserStore } from '@/store/modules/user'
import { Menu } from '@/types/menu'
import staticRouter from './staticRouter'
import dynamicRouter from './dynamicRouter'

const loginStore = useLoginStore(pinia)
const userStore = useUserStore(pinia)

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...staticRouter, ...dynamicRouter],
})

export const formatRouter = (data: Menu[]) => {
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
          component: import.meta.globEager(
            `@/views/${childElement.path}/index.vue`
          ),
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

router.beforeEach((to, from, next) => {
  NProgress.start()
  debugger
  if (to.path === '/login') {
    next()
  } else if (loginStore.getRefreshToken) {
    if (loginStore.getToken) {
      userStore.getUserInfo(loginStore.userName).then((res) => {
        const user = res
        if (user) {
          const { id } = user
          userStore.getPermission(id.toString()).then(() => {
            const routerData = formatRouter(userStore.getPermissionMenuList)
            routerData.forEach((element) => {
              router.addRoute('home', element)
            })
            next()
          })
        }
      })
    } else {
      loginStore.refreshNewToken()
      next()
    }
  } else {
    next({ path: '/login' })
  }
})
router.afterEach((to, from) => {
  NProgress.done()
})
