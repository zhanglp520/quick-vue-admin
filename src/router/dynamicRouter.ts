import { Router, RouteRecordRaw } from 'vue-router'
import { Menu } from '@/types/menu'
import pinia from '@/store'
import { useLoginStore } from '@/store/modules/login'
import { useUserStore } from '@/store/modules/user'

const modules = import.meta.glob('../views/**/*.vue')
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
const formatRouter = (data: Menu[]) => {
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
export const addRoutes = (router: Router) => {
  const userStore = useUserStore(pinia)
  const menuList = userStore.getPermissionMenuList
  const routerData = formatRouter(menuList)
  router.addRoute({
    path: '/',
    name: 'fist',
    component: layout['../layout/index.vue'],
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  })
  routerData.forEach((element) => {
    router.addRoute(element)
  })
}
