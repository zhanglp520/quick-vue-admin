export interface Column {
  label?: string
  prop?: string
  width?: string | number
  type?: string
  align?: string
  slot?: boolean
  format?(row: any, column?: any, cellValue?: any, index?: number): void
}
export interface Btns {
  name: string
  link?: boolean
  type?: string
  size?: string
  hidden?: boolean
  click(item?: any, done?: any): void
  render?(row: any): boolean
}
export interface Actionbar {
  width: number
  editButtonName: string
  deleteButtonName: string
  detailButtonName: string
  hiddenEditButton: boolean
  hiddenDeleteButton: boolean
  hiddenDetailButton: boolean
  btns: Array<Btns>
}
export interface ToolBar {
  btns: Array<Btns>
}
