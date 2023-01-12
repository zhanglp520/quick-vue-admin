<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref('first')
const formLayout = ref('horizontal')
const labelAlign = ref('left')
let dom: any = null
const dragstart = (e) => {
  console.log('拖起')
  dom = e.currentTarget.cloneNode(true)
}
const allowDrop = (e) => {
  console.log('允许')

  e.preventDefault()
}
const drop = (e) => {
  console.log('放下')
  e.preventDefault()
  const node = e.target
  if (node) {
    node.appendChild(dom)
  }
}
</script>
<template>
  <el-row>
    <el-col :span="4">
      <div class="basic-field">
        <div class="field-title">基础字段</div>
        <div class="control-wrap">
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>单行文本</span>
          </div>
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>密码框</span>
          </div>
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>计数器</span>
          </div>
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>多行文本</span>
          </div>
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>单选组</span>
          </div>
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>多选组</span>
          </div>
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>时间选择器</span>
          </div>
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>日期选择器</span>
          </div>
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>评分</span>
          </div>
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>下拉选择框</span>
          </div>
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>开关</span>
          </div>
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>文字</span>
          </div>
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>滑块</span>
          </div>
        </div>
      </div>
      <div class="basic-field">
        <div class="field-title">高级字段</div>
        <div class="control-wrap">
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>图片</span>
          </div>
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>富文本编辑器</span>
          </div>
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>级联选择器</span>
          </div>
        </div>
      </div>
      <div class="basic-field">
        <div class="field-title">布局字段</div>
        <div class="control-wrap">
          <div class="control" :draggable="true" @dragstart="dragstart">
            <el-icon style="vertical-align: middle" :size="20"
              ><Checked
            /></el-icon>
            <span>栅格布局</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="16">
      <div class="toolbar">
        <el-button type="primary">预览</el-button>
        <el-button type="success">重置</el-button>
        <el-button type="info">导入JSON</el-button>
        <el-button type="warning">导出JSON</el-button>
        <el-button type="danger">生成代码</el-button>
      </div>
      <div class="form-design" @drop="drop" @dragover="allowDrop"></div>
    </el-col>
    <el-col :span="4">
      <div class="attribute">
        <el-tabs v-model="activeName" class="demo-tabs">
          <el-tab-pane label="表单属性" name="first">
            <div class="wrap">
              <div class="item">
                <div class="title">表单布局</div>
                <div class="value">
                  <el-radio-group v-model="formLayout" size="large">
                    <el-radio-button label="horizontal">水平</el-radio-button>
                    <el-radio-button label="vertical">垂直</el-radio-button>
                    <el-radio-button label="inline">内联</el-radio-button>
                  </el-radio-group>
                </div>
              </div>
              <div class="item">
                <div class="title">标签对齐方式</div>
                <div class="value">
                  <el-radio-group v-model="labelAlign" size="large">
                    <el-radio-button label="left">水平</el-radio-button>
                    <el-radio-button label="right">垂直</el-radio-button>
                  </el-radio-group>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="字段属性" name="second">字段属性</el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </el-row>
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
.form-design {
  margin-top: 10px;
  background: #fff;
  border: 1px dashed #999;
  min-height: calc(100vh - 180px);
}
.attribute {
  .wrap {
    .item {
      .title {
        margin-top: 30px;
        margin-left: 10px;
      }
      .value {
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }
}
</style>
