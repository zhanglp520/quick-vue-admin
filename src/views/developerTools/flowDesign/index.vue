<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { v4 as uuid } from 'uuid'
import QuickFlow from "@/components/QuickFlow/index.vue";
import { IQuickFlowNode, IQuickFlowLine, IQuickFlow } from "@/components/QuickFlow/type";

interface IQuickFlowForm {
  id: string
  name: string
  description: string
}
interface IQuickFlowNodeForm extends IQuickFlowNode {

}
interface IQuickFlowLineForm extends IQuickFlowLine {

}
interface IQuickToolItem {
  value: number
  label: string
  icon: string
  type: string
}
interface IQuickTool {
  value: number
  label: string
  chidren?: Array<IQuickToolItem>
}
interface IQuickOption {
  value: string
  label: string
}
interface IQuickForm {
  value: string
  label: string
  type?: string
  options?: Array<IQuickOption>
}
interface IQuickAttribute {
  value: string
  label: string
  model: any
  chidren?: Array<IQuickForm>
}
const dragNodeType = ref('')
const activeName = ref('second')
const toolData = ref<Array<IQuickTool>>([
  {
    value: 1,
    label: '基本流程图组件',
    chidren: [
      {
        value: 1,
        label: '开始',
        icon: 'video-play',
        type: 'start'
      },
      {
        value: 2,
        label: '结束',
        icon: 'video-pause',
        type: 'end'
      },
      {
        value: 3,
        label: '活动',
        icon: 'crop',
        type: 'node'
      }
    ]
  },
  {
    value: 1,
    label: '规则流程图组件',
    chidren: [
      {
        value: 1,
        label: '指针',
        icon: 'Edit',
        type: 'hand'
      },
      {
        value: 2,
        label: '步骤连线',
        icon: 'crop',
        type: 'step-line'
      },
      {
        value: 3,
        label: '结论',
        icon: 'crop',
        type: 'result'
      },
      {
        value: 4,
        label: '输入节点',
        icon: 'crop',
        type: 'in'
      },
      {
        value: 5,
        label: '常量节点',
        icon: 'crop',
        type: 'n'
      },
      {
        value: 6,
        label: '乘法节点',
        icon: 'crop',
        type: '*'
      },
      {
        value: 7,
        label: '除法节点',
        icon: 'crop',
        type: '/'
      },
      {
        value: 8,
        label: '加法节点',
        icon: 'crop',
        type: '+'
      },
      {
        value: 9,
        label: '减法节点',
        icon: 'crop',
        type: '-'
      },
      {
        value: 10,
        label: '大于节点',
        icon: 'crop',
        type: '>'
      },
      {
        value: 11,
        label: '等于节点',
        icon: 'crop',
        type: '='
      },
      {
        value: 12,
        label: '逻辑与',
        icon: 'crop',
        type: 'and'
      },
      {
        value: 13,
        label: '逻辑或',
        icon: 'crop',
        type: 'or'
      }
    ]
  }
])
const flowForm = reactive<IQuickFlowForm>({
  id: '',
  name: '',
  description: ''
})
const nodeForm = reactive<IQuickFlowNodeForm>({
  id: '',
  name: '',
  type: '',
  color: '',
  backgroundColor: '',
  border: '',
  borderRadius: '',
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  icon: ''
})
const lineForm = reactive<IQuickFlowLineForm>({
  id: '',
  type: '',
  backgroundColor: '',
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  fromNodeId: '',
  toNodeId: '',
})
const attributeData = ref<Array<IQuickAttribute>>([
  {
    value: 'first',
    label: '流程属性',
    model: flowForm,
    chidren: [
      {
        value: 'id',
        label: '流程标识',
      },
      {
        value: 'name',
        label: '流程名称',
      },
      {
        value: 'description',
        label: '流程描述',
      },
    ]
  },
  {
    value: 'second',
    label: '节点属性',
    model: nodeForm,
    chidren: [
      {
        value: 'id',
        label: '标识',
      },
      {
        value: 'name',
        label: '节点名称',
      },
      {
        value: 'type',
        label: '节点类型',
        type: 'select',
        options: [
          {
            label: '开始',
            value: 'start'
          },
          {
            label: '结束',
            value: 'end'
          },
          {
            label: '活动',
            value: 'node'
          },
        ]
      },
      {
        value: 'color',
        label: '字体颜色',
      },
      {
        value: 'backgroundColor',
        label: '背景色',
      },
      {
        value: 'border',
        label: '边框样式',
      },
      {
        value: 'borderRadius',
        label: '圆角样式',
      },
      {
        value: 'width',
        label: '宽度',
      },
      {
        value: 'height',
        label: '高度',
      },
      {
        value: 'x',
        label: 'x轴',
      },
      {
        value: 'y',
        label: 'y轴',
      },
      {
        value: 'icon',
        label: '图标',
      },
    ]
  }, {
    value: 'three',
    label: '连接线属性',
    model: lineForm,
    chidren: [
      {
        value: 'id',
        label: '标识',
      },
      {
        value: 'type',
        label: '线类型',
        type: 'select',
        options: [
          {
            label: '实线',
            value: 'solid'
          },
          {
            label: '虚线',
            value: 'd'
          },
          {
            label: '流动线',
            value: 'd1'
          },
          {
            label: '箭头线',
            value: 'jt'
          },
        ]
      },
      {
        value: 'backgroundColor',
        label: '背景色',
      },
      {
        value: 'x1',
        label: 'x1轴',
      },
      {
        value: 'y1',
        label: 'y1轴',
      }, {
        value: 'x2',
        label: 'x2轴',
      },
      {
        value: 'y2',
        label: 'y2轴',
      },
    ]
  }
])
const nodeDataList = ref<Array<IQuickFlowNode>>([])
const lineDataList = ref<Array<IQuickFlowLine>>([])
const flowData = reactive<IQuickFlow>({
  id: '1',
  name: '测试',
  description: '测试流程',
  nodes: nodeDataList.value,
  lines: lineDataList.value
})
const handleNodeClick = (node: any) => {
  const {
    id,
    name,
    type,
    color,
    backgroundColor,
    width,
    height,
    x,
    y
  } = node
  nodeForm.id = id
  nodeForm.name = name
  nodeForm.type = type
  nodeForm.color = color
  nodeForm.backgroundColor = backgroundColor
  nodeForm.width = width
  nodeForm.height = height
  nodeForm.x = x
  nodeForm.y = y
}
const handleDeleteNode = (node: any) => {
  const index = nodeDataList.value.findIndex(x => x.id === nodeForm.id)
  if (index !== -1) {
    nodeDataList.value.splice(index, 1)
  }
}
const createLine = (line: any) => {
  console.log('createLine-flow', line);

  lineDataList.value.push({
    ...line
  })
}
const dragstart = (item: any) => {
  console.log('拖起')
  dragNodeType.value = item.type
}
const allowDrop = (e: any) => {
  console.log('允许')

  e.preventDefault()
}
const drop = (e: any) => {
  console.log('放下')
  e.preventDefault()
  const left = e.clientX - 550//TODO:不准确，但不影响使用  510 
  const top = e.clientY - 220//TODO:不准确，但不影响使用   210

  // const left = e.clientX//TODO:不准确，但不影响使用  510 
  // const top = e.clientY//TODO:不准确，但不影响使用   210
  // buildNode(left, top)
  buildRuleNode(left, top)
}
const buildNode = (x: any, y: any) => {
  switch (dragNodeType.value) {
    case 'start':
      nodeDataList.value.push({
        id: uuid(),
        name: '开始',
        type: 'start',
        color: '#fff',
        backgroundColor: 'red',
        border: '1px solid gray',
        borderRadius: '100%',
        width: 100,
        height: 100,
        x,
        y,
      },)
      break;
    case 'end':
      nodeDataList.value.push({
        id: uuid(),
        name: '结束',
        type: 'end',
        color: '#fff',
        backgroundColor: 'red',
        border: '1px solid gray',
        borderRadius: '100%',
        width: 100,
        height: 100,
        x,
        y,
      },)
      break;
    default:
      nodeDataList.value.push({
        id: uuid(),
        name: '节点3',
        type: 'node',
        color: '#fff',
        backgroundColor: 'red',
        border: '1px solid gray',
        width: 200,
        height: 100,
        x,
        y,
      })
      break;
  }
  console.log('nodeDataList', nodeDataList.value);

}
const buildRuleNode = (x: any, y: any) => {
  switch (dragNodeType.value) {
    case 'hand':
      nodeDataList.value.push({
        id: uuid(),
        name: '指针',
        type: 'hand',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #4a5b79',
        width: 150,
        height: 65,
        x,
        y,
        icon: 'Edit'
      },)
      break;
    case 'step-line':
      nodeDataList.value.push({
        id: uuid(),
        name: '步骤连线',
        type: 'step-line',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #4a5b79',
        width: 150,
        height: 65,
        x,
        y,
        icon: 'Plus'
      },)
      break;
    case 'result':
      nodeDataList.value.push({
        id: uuid(),
        name: '结论',
        type: 'result',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #4a5b79',
        width: 150,
        height: 65,
        x,
        y,
        icon: 'Edit'
      },)
      break;
    case 'in':
      nodeDataList.value.push({
        id: uuid(),
        name: '输入节点',
        type: 'in',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #4a5b79',
        width: 150,
        height: 65,
        x,
        y,
        icon: 'Edit'
      },)
      break;
    case 'n':
      nodeDataList.value.push({
        id: uuid(),
        name: '常量节点',
        type: 'n',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #4a5b79',
        width: 150,
        height: 65,
        x,
        y,
        icon: 'Edit'
      },)
      break;
    case '*':
      nodeDataList.value.push({
        id: uuid(),
        name: '乘法节点',
        type: '*',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #4a5b79',
        width: 150,
        height: 65,
        x,
        y,
        icon: 'Edit'
      },)
      break;
    case '/':
      nodeDataList.value.push({
        id: uuid(),
        name: '除法节点',
        type: '/',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #4a5b79',
        width: 150,
        height: 65,
        x,
        y,
        icon: 'Edit'
      },)
      break;
    case '+':
      nodeDataList.value.push({
        id: uuid(),
        name: '加法节点',
        type: '+',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #4a5b79',
        width: 150,
        height: 65,
        x,
        y,
        icon: 'Edit'
      },)
      break;
    case '-':
      nodeDataList.value.push({
        id: uuid(),
        name: '减法节点',
        type: '-',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #4a5b79',
        width: 150,
        height: 65,
        x,
        y,
        icon: 'Edit'
      },)
      break;
    case '>':
      nodeDataList.value.push({
        id: uuid(),
        name: '大于节点',
        type: '>',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #4a5b79',
        width: 150,
        height: 65,
        x,
        y,
        icon: 'Edit'
      },)
      break;
    case '=':
      nodeDataList.value.push({
        id: uuid(),
        name: '等于节点',
        type: '=',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #4a5b79',
        width: 150,
        height: 65,
        x,
        y,
        icon: 'Edit'
      },)
      break;
    case 'and':
      nodeDataList.value.push({
        id: uuid(),
        name: '逻辑与',
        type: 'and',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #4a5b79',
        width: 150,
        height: 65,
        x,
        y,
        icon: 'Edit'
      },)
      break;
    case 'or':
      nodeDataList.value.push({
        id: uuid(),
        name: '逻辑或',
        type: 'or',
        color: '#000',
        backgroundColor: '#fff',
        border: '1px solid #4a5b79',
        width: 150,
        height: 65,
        x,
        y,
        icon: 'Edit'
      },)
      break;
  }
  console.log('nodeDataList', nodeDataList.value);

}
const clearCavas = () => {
  nodeDataList.value.length = 0
  lineDataList.value.length = 0
  // flowData.nodes = []
  // flowData.lines = []
  // flowData.nodes.push(...nodeDataList.value)
  // flowData.lines.push(...lineDataList.value)
  console.log('clearCavas-flowData', flowData);
}
const importDialogVisible = ref(false)
const importJsonContent = ref('')
const importJson = () => {
  importDialogVisible.value = true
}
const handleImport = () => {
  const flow: IQuickFlow = JSON.parse(importJsonContent.value)
  flowData.nodes.push(...flow.nodes)
  flowData.lines.push(...flow.lines)
  importDialogVisible.value = false
}
const exportDialogVisible = ref(false)
const exportJsonContent = ref('')
const exportJson = () => {
  exportDialogVisible.value = true
  exportJsonContent.value = JSON.stringify(flowData, null, 8)
}
watch(() => nodeForm, (val) => {
  console.log('watch-nodeForm', val);
  nodeDataList.value.map((element) => {
    if (element.id === val.id) {
      element.name = val.name
      element.x = val.x
      element.y = val.y
      element.width = val.width
      element.height = val.height
      element.color = val.color
      element.backgroundColor = val.backgroundColor
    }
  })
  console.log('nodeDataList1', nodeDataList.value)
}, { deep: true })
</script>
<template>
  <div>
    <el-row>
      <el-col :span="4">
        <template v-for="(item, index) in toolData" :key="index">
          <div class="basic-field">
            <div class="field-title">{{ item.label }}</div>
            <div class="control-wrap">
              <template v-for="(childItem, childIndex) in item.chidren" :key="childIndex">
                <div class="control" :draggable="true" @dragstart="dragstart(childItem)">
                  <el-icon style="vertical-align: middle" :size="20">
                    <component :is="childItem.icon" />
                  </el-icon>
                  <span style="margin-left:5px;">{{ childItem.label }}</span>
                </div>
              </template>
            </div>
          </div>
        </template>
      </el-col>
      <el-col :span="16">
        <div class="toolbar">
          <el-button :disabled="nodeDataList.length > 0 && nodeForm.id !== undefined ? false : true" type="primary"
            @click="handleDeleteNode">删除</el-button>
          <!--  <el-button type="primary" @click="prview">预览</el-button> -->
          <el-button :disabled="nodeDataList.length > 0 ? false : true" type="success"
            @click="clearCavas">清空画布</el-button>
          <el-button type="info" @click="importJson">导入JSON</el-button>
          <el-button type="warning" @click="exportJson">导出JSON</el-button>
        </div>
        <div class="flow-design" @drop="drop" @dragover="allowDrop">
          <quick-flow :data="flowData" @nodeClick="handleNodeClick" @nodeDelete="handleDeleteNode"
            @createLine="createLine"></quick-flow>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="attribute">
          <el-tabs v-model="activeName" class="demo-tabs">
            <template v-for="(item, index) in attributeData">
              <el-tab-pane :label="item.label" :name="item.value">
                <div class="wrap">
                  <template v-for="(childItem, childIndex) in item.chidren" :key="childIndex">
                    <div class="item">
                      <div class="title">{{ childItem.label }}</div>
                      <div class="value">
                        <el-form ref="formRef" :model="item.model" :inline="true" size="default">
                          <template v-if="childItem.type === 'select'">
                            <el-select disabled v-model="item.model[childItem.value]">
                              <el-option v-for=" (option, optionsIndex) in childItem.options" :key="optionsIndex"
                                :label="option.label" :value="option.value" />
                            </el-select>
                          </template>
                          <template v-else>
                            <el-input :readonly="childItem.value === 'id'" v-model="item.model[childItem.value]" />
                          </template>
                        </el-form>
                      </div>
                    </div>
                  </template>
                </div>
              </el-tab-pane>
            </template>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
    <el-dialog v-model="importDialogVisible" title="导入JSON" width="30%">
      <div class="title">
        JSON格式如下，直接复制生成的json覆盖此处代码点击确定即可
      </div>
      <div>
        <el-input v-model="importJsonContent" :rows="20" type="textarea" placeholder="Please input" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="importDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleImport"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="exportDialogVisible" title="导出JSON" width="30%">
      <div class="title">
        JSON格式如下，直接复制生成的json覆盖代码的配置项即可
      </div>
      <div>
        <el-input v-model="exportJsonContent" :rows="20" type="textarea" placeholder="Please input" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="exportDialogVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.field-title {
  padding: 10px;
}

.control-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .control {
    width: 100px;
    padding: 10px;
    font-size: 14px;
    border: 1px solid transparent;
  }

  .control:hover {
    border: dashed 1px #409eff;
    cursor: move;
  }
}

.toolbar {
  text-align: right;
  margin-right: 20px;
}

.flow-design {
  width: 100%;
  border: 1px dashed #999;
  min-height: calc(100vh - 180px);
  position: relative;
  overflow: hidden;
  margin-top: 10px;
  background: #fff;
  // padding: 30px;
}

.form-design {
  margin-top: 10px;
  background: #fff;
  border: 1px dashed #999;
  min-height: calc(100vh - 180px);
  padding: 30px;

  .el-form-item {
    border: 1px solid transparent;
    padding: 10px;
  }

  .el-form-item:hover {
    border: dashed 1px #409eff;
    padding: 10px;
    cursor: move;
  }
}

.attribute {
  .wrap {
    .item {
      .title {
        margin-left: 10px;
      }

      .value {
        margin-top: 10px;
        margin-bottom: 30px;
        margin-left: 10px;
      }
    }
  }
}

// .icon {
//   width: 1rem;
//   height: 1rem;
//   position: relative;
//   vertical-align: -2px;
//   fill: currentColor;
// }
</style>
