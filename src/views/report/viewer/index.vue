<script lang="ts" setup>
// import 'polyfill-library-node'
import { Viewer } from '@grapecity/activereports-vue'
// import '@grapecity/activereports/styles/ar-js-ui.css'
// import '@grapecity/activereports/styles/ar-js-viewer.css'
// import * as GC from '@grapecity/activereports'
// import { XlsxExport } from '@grapecity/activereports'
// const expExcel = () => {
//   const ARJS = GC.ActiveReports.Core
//   const Excel = XlsxExport

//   const settings = {
//     sheetName: '快递单',
//     pageSettings: {
//       size: 'A4',
//       orientation: 'portrait',
//     },
//   }
//   const pageReport = new ARJS.PageReport()
//   pageReport
//     .load('时间转换.rdlx-json')
//     .then(function () {
//       return pageReport.run()
//     })
//     .then(function (pageDocument) {
//       return Excel.exportDocument(pageDocument, settings)
//     })
//     .then(function (result) {
//       result.download('arjs-excel')
//     })
// }
</script>
<template>
  <div>
    <!-- <button @click="expExcel">Excel</button> -->
    <!-- <button @click="expPDF">PDF</button> -->
  </div>
  <div id="viewer-host">
    <Viewer
      :available-exports="['pdf', 'xlsx', 'html']"
      :report="{ Uri: 'report.rdlx-json' }"
    ></Viewer>
  </div>
</template>
<style></style>
