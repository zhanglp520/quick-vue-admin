export interface Dept {
  id: string
  deptId: string
  name: string
  pId: string
}
export interface DeptTree extends Dept {
  children: DeptTree[]
}
