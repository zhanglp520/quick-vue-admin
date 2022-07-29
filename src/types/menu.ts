export interface Menu {
  id: string
  menuId: string
  menuName: string
  path: string
  menuType: number
  icon: string
  sort: number
  pid: string
  link: number
  enabled: number
  status: number
}
export interface MenuTree extends Menu {
  children: MenuTree[]
}
export interface Menubar extends Menu {
  children: Menubar[]
}
