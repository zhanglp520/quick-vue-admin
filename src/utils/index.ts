import md5 from 'js-md5'
import { Options, TreeOptions } from '../types/options'
import { Tree } from '../types/tree'

export const quickMd5 = (str: string) => {
  return md5(str)
}
export const dicFormat = (data: any, options: Options) => {
  const arr: Options[] = []
  const defaultOptions = {
    label: 'label',
    value: 'value',
  }
  const label = options && options.label ? options.label : defaultOptions.label
  const value = options && options.value ? options.value : defaultOptions.value
  data.forEach((element: any) => {
    arr.push({
      label: element[label],
      value: element[value],
    })
  })
  return arr
}
export const treeFormat = (data: any, options: TreeOptions) => {
  const arr: Tree[] = []
  const defaultOptions = {
    id: 'id',
    label: 'label',
    children: 'children',
  }
  const label = options && options.label ? options.label : defaultOptions.label
  const id = options && options.id ? options.id : defaultOptions.id
  const children =
    options && options.children ? options.children : defaultOptions.children
  data.forEach((element: Tree) => {
    const obj: Tree = {
      label: element[label],
      id: element[id],
      children: [],
    }
    if (element[children] && element[children].length > 0) {
      obj.children = treeFormat(element[children], options)
    }
    arr.push(obj)
  })
  return arr
}
