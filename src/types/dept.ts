export interface Dept {
  id: number
  deptId: string
  deptName: string
  pId: number | string
}
export interface DeptTree extends Dept {
  children: DeptTree[]
}
