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
const modules = import.meta.glob('../views/**/*.vue')
console.log('modules', modules)

const layout = import.meta.glob('../layout/*.vue')

const getComponent = (childElement: Menu) => {
  let component = {}
  if (childElement.viewPath) {
    const viewPath = modules[`../views/${childElement.viewPath}.vue`]
    if (!viewPath) {
      console.error(
        `Menu view path configuration error or view does not exist ../views/${childElement.viewPath}.vue`
      )
    } else {
      component = viewPath
    }
  } else {
    const path = modules[`../views/${childElement.path}/index.vue`]
    if (!path) {
      console.error(
        `Menu routing address configuration error or view does not exist ../views/${childElement.path}/index.vue`
      )
    } else {
      component = path
    }
  }
  return component
}

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
      component: layout['../layout/index.vue'],
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
      childMenu.forEach((childElement: Menu) => {
        const component = getComponent(childElement)
        const childRouterObj: RouteRecordRaw = {
          name: childElement.menuId,
          path: childElement.path,
          component,
          meta: {
            title: childElement.menuName,
            icon: childElement.icon,
            link: childElement.link,
          },
        }
        if (routerObj.children) {
          routerObj.children.push(childRouterObj)
        }
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
let isRefresh = true
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const loginStore = useLoginStore(pinia)
  if (loginStore.getToken) {
    if (to.path === '/login') {
      isRefresh = true
      next()
    } else if (to.name && !isRefresh) {
      isRefresh = true
      next()
    } else {
      isRefresh = false
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
