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
  readonly?: boolean
  autocomplete?: string
  isEdit?: boolean
  options?: Options[]
}
