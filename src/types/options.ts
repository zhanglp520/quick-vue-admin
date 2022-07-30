export interface Options {
  label?: string
  value?: string
}
export interface TreeOptions {
  id?: string
  label?: string
  children?: string
}

export interface SelectTreeOptions extends Options {
  children?: string
}
