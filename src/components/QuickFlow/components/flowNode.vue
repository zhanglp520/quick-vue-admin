<script lang="ts" setup>
import { toRefs, computed, defineEmits, reactive, Ref } from 'vue'
import { v4 as uuid } from 'uuid'
import { IQuickFlowNode, IQuickFlowLine } from "../type";

const emit = defineEmits(['nodeClick', 'nodeDelete', 'createLine'])
const props = defineProps({
    item: {
        type: Object,
        default: () => {
        },
    },
    active: {
        type: Boolean,
        default: false
    }
})
const { item, active } = toRefs(props) as {
    item: Ref<IQuickFlowNode>
    active: Ref<boolean>
}
console.log('active', active.value);

const activeClassName = computed(() => {
    if (active.value) {
        return 'active'
    } else {
        return ''
    }
})
const typeClassName = computed(() => {
    if (item.value.type === 'start') {
        return 'circular'
    } else if (item.value.type === 'end') {
        return 'circular'
    } else {
        return 'rectangle'
    }
})
const nodeClick = (element: any) => {
    // emit('nodeClick', element)
}
const nodeMouseover = (element: IQuickFlowNode) => {
    emit('nodeClick', element)
}
const nodeMouseout = (element: IQuickFlowNode) => {
    // emit('nodeClick', {})
}
const nodePointMousedown = (element: IQuickFlowNode, postion: string) => {
    let x1 = item.value.x
    let y1 = item.value.y
    if (postion === 'top') {
        x1 = x1 + item.value.width / 2
    } else if (postion === 'bottom') {
        x1 = x1 + item.value.width / 2
        y1 = y1 + item.value.height
    } else if (postion === 'left') {
        y1 = y1 + item.value.height / 2
    } else if (postion === 'right') {
        x1 = x1 + item.value.width
        y1 = y1 + item.value.height / 2
    }
    const lineStart = reactive<IQuickFlowLine>({
        id: uuid(),
        type: 'line',
        backgroundColor: 'gray',
        x1: x1,
        y1: y1,
        x2: 0,
        y2: 0,
        fromNodeId: item.value.id,
        toNodeId: '',
    })
    localStorage.setItem('line', JSON.stringify(lineStart))
}
const nodePointMouseup = (element: IQuickFlowNode, postion: string) => {
    // emit('nodeClick', {})
    let x2 = item.value.x
    let y2 = item.value.y
    if (postion === 'top') {
        x2 = x2 + item.value.width / 2
    } else if (postion === 'bottom') {
        x2 = x2 + item.value.width / 2
        y2 = y2 + item.value.height
    } else if (postion === 'left') {
        y2 = y2 + item.value.height / 2
    } else if (postion === 'right') {
        x2 = x2 + item.value.width
        y2 = y2 + item.value.height / 2
    }
    const lineStr = localStorage.getItem('line')
    const lineEnd: IQuickFlowLine = lineStr && JSON.parse(lineStr)
    lineEnd.x2 = x2
    lineEnd.y2 = y2
    lineEnd.toNodeId = item.value.id
    console.log('x2', x2, postion);
    console.log('y2', y2, postion);
    emit('createLine', lineEnd)
}
const nodeDelete = (e) => {
    debugger
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
                item.value.x = left
                item.value.y = top
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
    <div v-move
        :style="{ top: '' + item.y + 'px', left: '' + item.x + 'px', backgroundColor: item.backgroundColor, width: item.width + 'px', height: item.height + 'px', lineHeight: item.height + 'px', border: item.border, borderRadius: item.borderRadius }"
        class="node-item" :class="activeClassName, typeClassName" @click.stop="nodeClick(item)"
        @mouseover.stop="nodeMouseover(item)" @mouseout.stop="nodeMouseout(item)">
        <template v-if="active">
            <div class="top node-point" @mousedown.stop="nodePointMousedown(item, 'top')"
                @mouseup.stop="nodePointMouseup(item, 'top')">
            </div>
            <div class="bottom node-point" @mousedown.stop="nodePointMousedown(item, 'bottom')"
                @mouseup.stop="nodePointMouseup(item, 'bottom')"></div>
            <div class="left node-point" @mousedown.stop="nodePointMousedown(item, 'left')"
                @mouseup.stop="nodePointMouseup(item, 'left')"></div>
            <div class="right node-point" @mousedown.stop="nodePointMousedown(item, 'right')"
                @mouseup.stop="nodePointMouseup(item, 'right')"></div>
        </template>
        <div class="icon">
            <el-icon style="vertical-align: middle" :size="40" color="#fff">
                <component :is="item.icon" />
            </el-icon>
        </div>
        <div class="title" :style="{ color: item.color, }">
            {{ item.name }}
        </div>
    </div>
</template>
<style scoped lang="scss">
.node-item {
    position: absolute;
    top: 0;
    left: 0;
    background-color: red;
    height: 100px;
    width: 200px;
    text-align: center;
    line-height: 100px;
    pointer-events: all;
    visibility: visible;
    border-radius: 20px;
    color: #fff;
    font-size: 14px;

    .node-point {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: rgb(0, 255, 21);
        border-radius: 100%;
        pointer-events: all;
        cursor: crosshair;
    }

    .top {
        top: -8px;
        left: 50%;
    }

    .bottom {
        bottom: -8px;
        left: 50%;
    }

    .left {
        top: 50%;
        left: -8px;
    }

    .right {
        top: 50%;
        right: -8px;
    }

    .icon {
        height: 48px;
        width: 48px;
        position: absolute;
        left: 10px;
        top: 50%;
        margin-top: -24px;
        line-height: 48px;
        border-radius: 50%;
        background-color: #a7d1e6;
    }

    .title {
        text-align: right;
        height: 100%;
        width: 60%;
        position: absolute;
        right: 22px;
    }
}

.active {
    border: 3px solid green;
}

.circular {
    border-radius: 100%;
    width: 85px;
    height: 85px;
    background-color: green;
}

.rectangle {
    width: 150px;
    height: 85px;
    background-color: red;
}
</style>