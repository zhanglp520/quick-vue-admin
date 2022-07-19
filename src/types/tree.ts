export interface Tree {
  id: string
  label: string
  children: Tree[]
}
export interface LeftTree {
  treeSpan?: number
  treeData: Tree[]
  defaultTreeProps?: object
}
