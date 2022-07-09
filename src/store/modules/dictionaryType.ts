import { defineStore } from 'pinia'
import { getDictionaryTypeList } from '../../api/dictionaryType'
import { DictionaryType } from '../../types/dictionaryType'

interface DictionaryTypeState {
  dictionaryTypeList: Array<DictionaryType>
}

export const useDictionaryTypeStore = defineStore('dictionaryTypeStore', {
  state: (): DictionaryTypeState => {
    return {
      dictionaryTypeList: [],
    }
  },
  getters: {},
  actions: {
    getDictionaryTypeList(): Promise<Array<DictionaryType>> {
      return new Promise((resolve) => {
        getDictionaryTypeList().then((res) => {
          const { data: dictionaryTypeList } = res
          this.dictionaryTypeList = dictionaryTypeList
          resolve(dictionaryTypeList)
        })
      })
    },
  },
  persist: {
    enabled: true,
  },
})
