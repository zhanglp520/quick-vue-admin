import md5 from 'js-md5'
import { Options, SelectTreeOptions, TreeOptions } from '../types/options'
import { SelectTree, Tree } from '../types/tree'

export const quickMd5 = (str: string) => {
  return md5(str)
}
export const dicFormat = (data: any, options: Options = {}) => {
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
export const selectTreeFormat = (data: any, options: SelectTreeOptions) => {
  const arr: SelectTree[] = []
  const defaultOptions = {
    value: 'value',
    label: 'label',
    children: 'children',
  }
  const label = options && options.label ? options.label : defaultOptions.label
  const value = options && options.value ? options.value : defaultOptions.value
  const children =
    options && options.children ? options.children : defaultOptions.children
  data.forEach((element: SelectTree) => {
    const obj: SelectTree = {
      label: element[label].toString(),
      value: element[value].toString(),
      children: [],
    }
    if (element[children] && element[children].length > 0) {
      obj.children = selectTreeFormat(element[children], options)
    }
    arr.push(obj)
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
export const tableTreeFormat = (data: any) => {
  const forderArr = []
  const menuArr = []
  const btnArr = []
  data.forEach((element) => {
    if (element.menuType === 0) {
      forderArr.push(element)
    }
    if (element.menuType === 1) {
      menuArr.push(element)
    }
    if (element.menuType === 2) {
      btnArr.push(element)
    }
  })
  menuArr.forEach((element, index) => {
    const children = btnArr.filter((x) => x.pId === element.id)
    menuArr[index].children = children
  })
  forderArr.forEach((element, index) => {
    const children = menuArr.filter((x) => x.pId === element.id)
    forderArr[index].children = children
  })
  return forderArr
}

export const menuTreeFormat = (data: any) => {
  const forderArr = []
  const menuArr = []
  const btnArr = []
  data.forEach((element) => {
    if (element.menuType === 0) {
      forderArr.push(element)
    }
    if (element.menuType === 1) {
      menuArr.push(element)
    }
    if (element.menuType === 2) {
      btnArr.push(element)
    }
  })
  menuArr.forEach((element, index) => {
    const children = btnArr.filter((x) => x.pId === element.id)
    menuArr[index].children = children
  })
  forderArr.forEach((element, index) => {
    const children = menuArr.filter((x) => x.pId === element.id)
    forderArr[index].children = children
  })
  return forderArr
}

export const menuFormat = (data: any) => {
  const forderArr = []
  const menuArr = []
  data.forEach((element) => {
    if (element.menuType === 0) {
      forderArr.push(element)
    }
    if (element.menuType === 1) {
      menuArr.push(element)
    }
  })
  forderArr.forEach((element, index) => {
    const children = menuArr.filter((x) => x.pId === element.id)
    forderArr[index].children = children
  })
  return forderArr
}

// json的key下划线转驼峰
export const toTuofeng = (str: string) => {
  if (!str) {
    return str
  }
  return str.replace(/"(\w)+":/g, (all) => {
    if (all.indexOf('_') === -1) {
      return all
    }
    let str1 = ''
    all.split('_').forEach((element, index) => {
      if (index <= 0) {
        str1 += element
      } else {
        str1 += element.slice(0, 1).toUpperCase() + element.slice(1)
      }
    })
    return str1
  })
}
export const listToTree = (data, pId, options) => {
  const defaultOptions = {
    id: 'id',
    pId: 'pId',
    sort: 'sort',
  }
  const value = options && options.id ? options.id : defaultOptions.id
  const parentId = options && options.pId ? options.pId : defaultOptions.pId
  const sort = options && options.sort ? options.sort : defaultOptions.sort
  const arr = []
  let children = []
  const nodeData = data.filter((x) => x[parentId] === pId)
  const nodeSort = nodeData.sort((a, b) => {
    return a[sort] - b[sort]
  })
  nodeSort.forEach((element) => {
    children = listToTree(data, element[value], options)
    arr.push({ ...element, children })
  })
  return arr
}

// 导出文件：请求参数增参数responseType: 'blob'
export const exportFile = (file: any, fileName: string, type: string) => {
  const blob = new Blob([file], { type })
  const link = document.createElement('a')
  const href = window.URL.createObjectURL(blob)
  link.href = href
  link.download = `${fileName}.xlsx`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(href) // 释放掉blob对象
}

export const downloadExcel = (file: any, fileName: string) => {
  exportFile(file, fileName, 'application/vnd.ms-excel')
}

export const downloadWord = (file: any, fileName: string) => {
  exportFile(file, fileName, 'application/msword')
}
