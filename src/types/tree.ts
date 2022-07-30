export interface Tree {
  id: string
  label: string
  children: Tree[]
}
export interface SelectTree {
  value: string
  label: string
  children: SelectTree[]
}
export interface LeftTree {
  treeSpan?: number
  treeData: Tree[]
  defaultTreeProps?: object
}
