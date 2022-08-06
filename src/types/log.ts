export interface Log {
  id: string | number
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
  operateUserId?: string
  logTime: string
}
