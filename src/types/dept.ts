export interface Dept {
  id: string
  deptId: string
  deptName: string
  pId: string
}
export interface DeptTree extends Dept {
  children: DeptTree[]
}
