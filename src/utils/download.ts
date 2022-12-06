/*
 *@Description: 导出文件，请求参数增参数responseType: blob或arraybuffer
 *@Author: 土豆哥
 *@Date: 2022-12-02 01:03:27
 */
export const exportFile = (file: any, fileName: string, type: string) => {
  const blob = new Blob([file], { type })
  const link = document.createElement('a')
  const href = window.URL.createObjectURL(blob)
  link.href = href
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(href)
}
export const downloadExcel = (file: any, fileName: string) => {
  exportFile(file, `${fileName}.xlsx`, 'application/vnd.ms-excel')
}
export const downloadWord = (file: any, fileName: string) => {
  exportFile(file, `${fileName}.docx`, 'application/msword')
}
