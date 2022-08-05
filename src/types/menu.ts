export interface Menu {
  id: number
  menuId: string
  menuName: string
  path: string
  viewPath: string
  menuType: number
  icon: string
  sort: number
  pid: number
  link: number
  linkUrl: string
  enabled: number
  status: number
}
export interface MenuTree extends Menu {
  children: MenuTree[]
}
export interface Menubar extends Menu {
  children: Menubar[]
}
