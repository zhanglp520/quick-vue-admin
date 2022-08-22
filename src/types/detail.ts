import { Column } from './table'

export interface Tab {
  label: string
  name: string
  type?: string
  title?: string
  column?: number
  border?: boolean
  direction?: string
  columns: Array<Column>
  titles?: Array<string>
}

export interface Detail {
  tabName: string
  data: Array<object>
}
