import { Column } from '../../types/table'
import { FormItem, FormTitle } from '../../types/form'
import { User } from '../../types/user'
import { Page } from '../../types/page'

export const page: Page = {
  current: 1,
  size: 10,
  total: 0,
  sizes: [100, 200, 300, 400],
}

export const formTitle: FormTitle = {
  add: '创建用户',
  edit: '修改用户',
  detail: '用户详情',
}

export const searchFormItems: FormItem[] = [
  {
    label: '用户编号',
    vModel: 'user_id',
  },
  {
    label: '用户名',
    vModel: 'user_name',
    type: 'select',
    options: [
      {
        label: 'admin',
        value: '111',
      },
      {
        label: 'zhanglp',
        value: '222',
      },
    ],
  },
]

export const formItems: FormItem[] = [
  {
    label: '用户编号',
    labelWidth: '80px',
    vModel: 'user_id',
    addHidden: true,
    editReadonly: true,
  },
  {
    label: '用户名',
    labelWidth: '80px',
    vModel: 'user_name',
    autocomplete: 'off',
  },
  {
    label: '邮箱',
    labelWidth: '80px',
    vModel: 'email',
  },
  {
    label: '地址',
    labelWidth: '80px',
    vModel: 'address',
  },
]

export const columns: Column[] = [
  {
    width: '100',
    type: 'selection',
    align: 'center',
  },
  {
    label: '编号',
    prop: 'user_id',
    width: '100',
    format: (row: User) => {
      return `bh_${row.user_id}`
    },
  },
  {
    label: '用户名',
    prop: 'user_name',
    width: '100',
  },
  {
    label: '邮箱',
    prop: 'email',
    width: '300',
  },
  {
    label: '创建时间',
    prop: 'create_time',
    width: '300',
  },
  {
    label: '地址',
    prop: 'address',
  },
]
