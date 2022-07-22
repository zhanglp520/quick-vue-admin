export interface Menu {
  id: string
  menuId: string
  menuName: string
  path: string
  menuType: string
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
export interface MenuBar extends Menu {
  children: MenuBar[]
}
