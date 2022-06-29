export interface Column {
  label?: string
  prop?: string
  width?: string | number
  type?: string
  align?: string
  format?(row: any, column: any, cellValue: any, index: number): void
}
