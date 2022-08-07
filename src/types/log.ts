export interface Log {
  id: number
  logTime: string
  operateApi: string
  requestParams?: string
  errorMessage?: string
  exceptionMessage?: string
  ip: string
  logType: number
}
export interface SearchLog {
  startTime?: string
  endTime?: string
  logTime: string
}
