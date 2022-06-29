export interface FormTitle {
  add: string
  edit: string
  detail: string
}
export interface Options {
  label: string
  value: string
}

export interface FormItem {
  label?: string
  value?: string
  vModel: string
  placeholder?: string
  labelWidth?: string
  type?: string
  autocomplete?: string
  options?: Options[]
  addHidden?: boolean
  editHidden?: boolean
  detailHidden?: boolean
  addReadonly?: boolean
  editReadonly?: boolean
  detailReadonly?: boolean
}
