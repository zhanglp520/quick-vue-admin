<script lang="ts" setup>
import { defineProps, toRefs, Ref,defineEmits } from 'vue'
import { Column } from '@/types/table'
import { Tab, Detail } from '@/types/detail'

/**
 * props
 */
const props = defineProps({
  activeName:{
    type:String,
    default:''
  },
  data: {
    type: Array<Detail>,
    default: () => {
      return []
    },
  },
  tabs: {
    type: Array<Tab>,
    default: () => {
      return []
    },
  },
  position: {
    type: String,
    default: 'top',
  },
  enableSlot:{
    type: Boolean,
    default: false,
  }
})
/**
 * props toRefs
 */
const { activeName,data, tabs, position,enableSlot } = toRefs(props) as {
  activeName:Ref<string>
  data: Ref<Array<Detail>>
  tabs: Ref<Array<Tab>>
  position: Ref<string>
  enableSlot:Ref<boolean>
}
/**
 * emits
 */
const emits=defineEmits(['onChange'])
/**
 * 函数
 */
const getData=(tab:Tab)=>{
const item=data.value.find(x=>x.tabName===tab.name)
return item?.data
}
const getRow=(tab:Tab,index:number)=>{
 const rows=getData(tab)
  if(!rows){
    return null
  }
return rows[index]&&rows[index]
}
const getValue=(tab:Tab,columnItem:Column,index:number)=>{
  const tabData=getData(tab)
  if(!tabData){
    return ''
  }
  return tabData[index]&&tabData[index][columnItem.prop]
}
const handleChange=(name: any)=>{
 emits('onChange', name);
}
</script>

<template>
  <el-tabs
    v-model="activeName"
    :tab-position="position"
    @tab-change="handleChange"
  >
    <template v-if="enableSlot"> <slot></slot> </template>
    <template v-else>
      <el-tab-pane
        v-for="(item, index) in tabs"
        :key="index"
        :label="item.label"
        :name="item.name"
      >
        <template v-if="item.type === 'table'">
          <el-table
            :data="getData(item)"
            style="width: 100%"
            row-key="id"
            border
            stripe
          >
            <el-table-column
              v-for="(columnItem, columnIndex) in item.columns"
              :key="columnIndex"
              :prop="columnItem.prop"
              :width="columnItem.width"
              :type="columnItem.type"
              :label="columnItem.label"
              :align="columnItem.align"
              :formatter="columnItem.format"
              show-overflow-tooltip
            />
            <el-table-column label="操作" width="120">
              <template #default="scope">
                <slot name="tablebar" :row="scope.row"></slot>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <template v-else-if="item.type === 'title'">
          <template
            v-for="(title, titleIndex) in item.titles"
            :key="titleIndex"
          >
            <el-descriptions
              :column="item.column"
              :border="item.border"
              :direction="item.direction"
              :title="title"
            >
              <template #extra>
                <slot name="action" :row="getRow(item, titleIndex)"></slot>
              </template>
              <el-descriptions-item
                v-for="(detacItem, detacIndex) in item.columns"
                :key="detacIndex"
                :label="detacItem.label"
              >
                {{ getValue(item, detacItem, titleIndex) }}
              </el-descriptions-item>
            </el-descriptions>
          </template>
        </template>
        <template v-else>
          <el-descriptions
            :column="item.column"
            :border="item.border"
            :direction="item.direction"
          >
            <template #extra>
              <slot name="action" :row="getRow(item, 0)"></slot>
            </template>
            <el-descriptions-item
              v-for="(detacItem, detacIndex) in item.columns"
              :key="detacIndex"
              :label="detacItem.label"
            >
              {{ getValue(item, detacItem, 0) }}
            </el-descriptions-item>
          </el-descriptions>
        </template>
      </el-tab-pane>
    </template>
  </el-tabs>
</template>

<style lang="scss"></style>
