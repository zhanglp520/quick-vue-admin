<script lang="ts" setup>
import { reactive, ref, toRefs, computed, defineEmits } from 'vue'
import flowNode from './components/flowNode.vue'
import flowLine from './components/flowLine.vue'
import { IQuickFlowNode, IQuickFlowLine } from "./type";

const emit = defineEmits(['nodeClick', 'nodeDelete', 'createLine'])
const props = defineProps({
  data: {
    type: Object,
    default: () => [],
  },
})
const { data } = toRefs(props)
const { nodes, lines } = data.value

const currentNode = reactive<IQuickFlowNode>({
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
const handleNodeClick = (item: IQuickFlowNode) => {
  const {
    id,
    name,
    type,
    color,
    backgroundColor,
    width,
    height,
    x,
    y } = item
  currentNode.id = id
  currentNode.name = name
  currentNode.type = type
  currentNode.color = color
  currentNode.backgroundColor = backgroundColor
  currentNode.width = width
  currentNode.height = height
  currentNode.x = x
  currentNode.y = y
  emit('nodeClick', item)
}
const handleNodeDelete = (item: IQuickFlowNode) => {
  emit('nodeDelete', item)
}
const createLine = (item: IQuickFlowLine) => {
  emit('createLine', item)
}


const scale = ref(1)
const x = ref(0)
const y = ref(0)
const handleMousewhell = (e: any) => {
  console.log('handleMousewhell', e.wheelDelta);
  if (e.wheelDelta > 0) {
    if (scale.value < 10) {
      scale.value = scale.value + 0.1
      console.log('scale.value+', scale.value);
    }
  } else {
    if (scale.value > 0) {
      scale.value = scale.value - 0.1
      console.log('scale.value-', scale.value);
    }

  }
}
const cavasClick = () => {
  currentNode.id = ''
  emit('nodeClick', {})
}

const vDrag = {
  mounted(el: any) {
    const odiv = el
    odiv.onmousedown = (e: any) => {
      const disX = e.clientX - odiv.offsetLeft
      const disY = e.clientY - odiv.offsetTop
      document.onmousemove = (e1: any) => {
        const left = e1.clientX - disX
        const top = e1.clientY - disY
        odiv.style.left = `${left}px`
        odiv.style.top = `${top}px`
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  },
}
const vMove = {
  mounted(el: any) {
    const odiv = el
    odiv.onmousedown = (e: any) => {
      const disX = e.clientX - odiv.offsetLeft
      const disY = e.clientY - odiv.offsetTop
      document.onmousemove = (e1: any) => {
        const left = e1.clientX - disX
        const top = e1.clientY - disY
        // odiv.style.left = `${left}px`
        // odiv.style.top = `${top}px`

        x.value = left
        y.value = top
      }
      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  },
}
</script>
<template>
  <div class="quick-flow">
    <svg style="height: 100%; width: 100%;" class="quick-canvas">
      <pattern id="pattern-vue-flow-0" :x="x" :y="y" width="32" height="32" patternUnits="userSpaceOnUse"
        :patternTransform="`translate(${x},${y})`">
        <circle cx="2" cy="2" r="2" fill="#409eff"></circle>
      </pattern>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-vue-flow-0)"></rect>
    </svg>
    <div @click="cavasClick" class="container" :style="{ transform: `translate(${x}px,${y}px) scale(${scale})` }"
      @mousewheel="handleMousewhell">
      <div class="node-list">
        <svg width="100%" class="line" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <flow-line v-for="(item, index) in lines" :key="index" :item="item" :active="item.id === currentNode.id"
            @nodeClick="handleNodeClick"></flow-line>
        </svg>
        <template v-for="(item, index) in nodes" :key="index">
          <flow-node :item="item" :active="item.id === currentNode.id" @nodeClick="handleNodeClick"
            @nodeDelete="handleNodeDelete" @createLine="createLine"></flow-node>
        </template>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
@keyframes dashdraw {
  0% {
    stroke-dashoffset: 10
  }
}

.quick-flow {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  cursor: grab;
  pointer-events: all;
  visibility: visible;
  z-index: 1;

  .container {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;

    .node-list {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;

      .line {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }

}
</style>