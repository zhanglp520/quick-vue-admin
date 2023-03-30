export interface IQuickFlowNode {
  id: string
  name: string
  type: string
  color: string
  backgroundColor: string
  border: string
  borderRadius?: string
  width: number
  height: number
  x: number
  y: number
  icon: string
}
export interface IQuickFlowLine {
  id: string;
  type: string
  backgroundColor: string
  x1: number
  y1: number
  x2: number
  y2: number
  fromNodeId: string
  toNodeId: string
}
export interface IQuickFlow {
  id: string
  name: string
  description: string
  nodes: Array<IQuickFlowNode>
  lines: Array<IQuickFlowLine>
}