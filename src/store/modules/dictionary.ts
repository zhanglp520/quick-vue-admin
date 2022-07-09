import { defineStore } from 'pinia'
import { getDictionaryList } from '../../api/dictionary'
import { getDictionaryTypeList } from '../../api/dictionaryType'
import { Dictionary } from '../../types/dictionary'
import { DictionaryType } from '../../types/dictionaryType'

interface DictionaryState {
  dictionaryList: Array<Dictionary>
  dictionaryTypeList: Array<DictionaryType>
}

export const useDictionaryStore = defineStore('dictionaryStore', {
  state: (): DictionaryState => {
    return {
      dictionaryList: [],
      dictionaryTypeList: [],
    }
  },
  getters: {},
  actions: {
    getDictionaryList(id: string): Promise<Array<Dictionary>> {
      return new Promise((resolve) => {
        getDictionaryList(id).then((res) => {
          const { data: dictionaryList } = res
          this.dictionaryList = dictionaryList
          resolve(dictionaryList)
        })
      })
    },
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
