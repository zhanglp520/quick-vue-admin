<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import '@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css'
import * as GC from '@grapecity/spread-sheets'
import '@grapecity/spread-sheets-vue'
import DataService from '@/assets/mock/dataService'

const hostClass = ref('spread-host')
const initWorkbook = (spread: any) => {
  const sheet = spread.getSheet(0)
  const person = {
    name: 'Peter Winston',
    age: 25,
    gender: 'Male',
    address: { postcode: '10001' },
  }
  const source = new GC.Spread.Sheets.Bindings.CellBindingSource(person)
  sheet.setBindingPath(2, 2, 'name')
  sheet.setBindingPath(3, 2, 'age')
  sheet.setBindingPath(4, 2, 'gender')
  sheet.setBindingPath(5, 2, 'address.postcode')
  sheet.setDataSource(source)
}
const columnStyle = () => {
  const style = new GC.Spread.Sheets.Style()
  style.backColor = 'lightgray'
  return style
}
const comboBoxCellType = () => {
  const cellType = new GC.Spread.Sheets.CellTypes.ComboBox()
  cellType.items([
    { text: 'US', value: 'US' },
    { text: 'UK', value: 'UK' },
    { text: 'Germany', value: 'Germany' },
    { text: 'Maxico', value: 'Maxico' },
  ])
  return cellType
}
</script>
<template>
  <div>
    <div>
      官网地址：https://demo.grapecity.com.cn/spreadjs/SpreadJSTutorial/quickstart/quickstart-vue
    </div>
    <gc-spread-sheets
      :new-tab-visible="true"
      :tab-strip-visible="true"
      :tab-strip-ratio="true"
      :tab-navigation-visible="true"
      :scrollbar-show-max="true"
      :scrollbar-max-align="true"
      :show-horizontal-scrollbar="true"
      :show-vertical-scrollbar="true"
      :allow-user-zoom="true"
      :allow-user-resize="true"
      gray-area-back-color="#E4E4E4"
      back-color="#ffffff"
      host-class="spread-host"
    >
      <gc-worksheet :data-source="DataService.getPersonAddressData()">
        <gc-column
          :width="'150'"
          :data-field="'Name'"
          :column-style="columnStyle"
        ></gc-column>
        <!-- :cell-type="comboBoxCellType" -->
        <gc-column :width="'150'" :data-field="'CountryRegionCode'"></gc-column>
        <!-- :cell-type="new GC.Spread.Sheets.CellTypes.HyperLink()" -->
        <gc-column :width="'150'" :data-field="'City'"></gc-column>
        <!-- :cell-type="new GC.Spread.Sheets.CellTypes.CheckBox()" -->
        <gc-column
          :width="'150'"
          :data-field="'AddressLine'"
          :cell-type="new GC.Spread.Sheets.CellTypes.CheckBox()"
        >
        </gc-column>
        <gc-column :width="'150'" :data-field="'PostalCode'"></gc-column>
      </gc-worksheet>
    </gc-spread-sheets>
  </div>
</template>
<style>
.spread-host {
  width: 100%;
  height: 600px;
}
</style>
