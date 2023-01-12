<script setup lang="ts">
import { ref } from 'vue'

const dataList = [
  {
    id: 1,
    name: 'item1',
    style: {
      order: '0',
      flexGrow: '0',
      flexShrink: '1',
      flexBasis: 'auto',
      flex: '0 1 auto',
      alignSelf: 'auto',
    },
  },
  {
    id: 2,
    name: 'item2',
    style: {
      order: '0',
      flexGrow: '0',
      flexShrink: '1',
      flexBasis: 'auto',
      flex: '0 1 auto',
      alignSelf: 'auto',
    },
  },
  {
    id: 3,
    name: 'item3',
    style: {
      order: '0',
      flexGrow: '0',
      flexShrink: '1',
      flexBasis: 'auto',
      flex: '0 1 auto',
      alignSelf: 'auto',
    },
  },
]

const directionOptions = [
  {
    label: 'row（默认值）：主轴为水平方向，起点在左端。',
    value: 'row',
  },
  {
    label: 'row-reverse主轴为水平方向，起点在右端。',
    value: 'row-reverse',
  },
  {
    label: 'column主轴为垂直方向，起点在上沿。',
    value: 'column',
  },
  {
    label: 'column-reverse主轴为垂直方向，起点在下沿。',
    value: 'column-reverse',
  },
]
const wrapOptions = [
  {
    label: 'nowrap（默认）：不换行。',
    value: 'nowrap',
  },
  {
    label: 'wrap：换行，第一行在上方。',
    value: 'wrap',
  },
  {
    label: 'wrap-reverse：换行，第一行在下方。',
    value: 'wrap-reverse',
  },
]
const justifyContentOptions = [
  {
    label: 'flex-start（默认值）：左对齐',
    value: 'flex-start',
  },
  {
    label: 'flex-end：右对齐',
    value: 'flex-end',
  },
  {
    label: 'center： 居中',
    value: 'center',
  },
  {
    label: 'space-between：两端对齐，项目之间的间隔都相等。',
    value: 'space-between',
  },
  {
    label:
      'space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。',
    value: 'space-around',
  },
]
const alignItemOptions = [
  {
    label:
      'stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。',
    value: 'stretch',
  },
  {
    label: 'flex-start：交叉轴的起点对齐。',
    value: 'flex-start',
  },
  {
    label: 'flex-end：交叉轴的终点对齐。',
    value: 'flex-end',
  },
  {
    label: 'center：交叉轴的中点对齐。',
    value: 'center',
  },
  {
    label: 'baseline: 项目的第一行文字的基线对齐。',
    value: 'baseline',
  },
]
const alignContentOptions = [
  {
    label: 'stretch（默认值）：轴线占满整个交叉轴。',
    value: 'stretch',
  },
  {
    label: 'flex-start：与交叉轴的起点对齐。',
    value: 'flex-start',
  },
  {
    label: 'flex-end：与交叉轴的终点对齐。',
    value: 'flex-end',
  },
  {
    label: 'center：与交叉轴的中点对齐。',
    value: 'center',
  },
  {
    label: 'space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。',
    value: 'space-between',
  },
  {
    label:
      'space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。',
    value: 'space-around',
  },
]
const alignsSelfOptions = [
  {
    label:
      'stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。',
    value: 'stretch',
  },
  { label: 'flex-start：交叉轴的起点对齐。', value: 'flex-start' },
  { label: 'flex-end：交叉轴的终点对齐。', value: 'flex-end' },
  { label: 'center：交叉轴的中点对齐。', value: 'center' },
  { label: 'baseline: 项目的第一行文字的基线对齐。', value: 'baseline' },
]
const direction = ref('row')
const wrap = ref('nowrap')
const justifyContent = ref('flex-start')
const alignItem = ref('stretch')
const alignContent = ref('stretch')

const order = ref('')
const alignsSelf = ref('')
const shrink = ref('')
const basis = ref('')
const growShrink = ref('')
</script>

<template>
  <div class="demo">
    <div class="config left">
      <h3>配置区域</h3>
      <div class="content">
        <div class="container">
          <h5>【容器】有以下6个属性设置在容器上。</h5>
          <div class="item">
            <div class="title">flex-direction</div>
            <div class="description">
              flex-direction属性决定主轴的方向（即项目的排列方向）。
            </div>
            <div class="select">
              <el-select v-model="direction">
                <el-option
                  v-for="item in directionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="title">flex-wrap:</div>
            <div class="description">
              默认情况下，项目都排在一条线（又称”轴线”）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。
            </div>
            <div class="select">
              <el-select v-model="wrap">
                <el-option
                  v-for="item in wrapOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="title">flex-flow</div>
            <div class="description">
              flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row
              nowrap。
            </div>
            <div class="select">
              <el-select v-model="direction">
                <el-option
                  v-for="item in directionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select v-model="wrap">
                <el-option
                  v-for="item in wrapOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>

          <div class="item">
            <div class="title">justify-content</div>
            <div class="description">
              justify-content属性定义了项目在主轴上的对齐方式。
            </div>
            <div class="select">
              <el-select v-model="justifyContent">
                <el-option
                  v-for="item in justifyContentOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="title">align-items</div>
            <div class="description">
              align-items属性定义项目在交叉轴上如何对齐。
            </div>
            <div class="select">
              <el-select v-model="alignItem">
                <el-option
                  v-for="item in alignItemOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="item">
            <div class="title">align-content</div>
            <div class="description">
              align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
            </div>
            <div class="select">
              <el-select v-model="alignContent">
                <el-option
                  v-for="item in alignContentOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div class="project">
          <h5>【项目】有以下6个属性设置在项目上。</h5>
          <div class="item">
            <div class="title">order</div>
            <div class="description">
              order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
            </div>
            <div class="select">
              <el-input-number v-model="order" :min="1" :max="10" />
            </div>
          </div>
          <div class="item">
            <div class="title">flex-grow</div>
            <div class="description">
              <p>
                flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
              </p>
              <p>
                如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。
              </p>
            </div>
            <div class="select">
              <el-input-number v-model="grow" :min="1" :max="10" />
            </div>
          </div>
          <div class="item">
            <div class="title">flex-shrink</div>
            <div class="description">
              <p>
                flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
              </p>
              <p>
                如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。
                负值对该属性无效。
              </p>
            </div>
            <div class="select">
              <input type="number" />
              <el-input-number v-model="shrink" :min="1" :max="10" />
            </div>
          </div>

          <div class="item">
            <div class="title">flex-basis</div>

            <div class="description">
              <p>
                flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main
                size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
              </p>
              <p>
                它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
              </p>
            </div>
            <div class="select">
              <el-input-number v-model="basis" :min="1" :max="10" />
            </div>
          </div>
          <div class="item">
            <div class="title">flex</div>
            <div class="description">
              <p>
                flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0
                1 auto。后两个属性可选。
              </p>
              <p>
                该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
                建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。
              </p>
            </div>
            <div class="select">
              <el-input v-model="growShrink" />
            </div>
          </div>
          <div class="item">
            <div class="title">align-self</div>
            <div class="description">
              <p>
                align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
              </p>
              <p>
                该属性可能取6个值，除了auto，其他都与align-items属性完全一致。
              </p>
            </div>
            <div class="select">
              <el-select v-model="alignsSelf">
                <el-option
                  v-for="item in alignsSelfOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="result">
      <h3>效果区域</h3>
      <div
        class="content"
        :style="{
          flexDirection: direction,
          flexWrap: wrap,
          justifyContent: justifyContent,
          alignItems: alignItem,
          alignContent: alignContent,
        }"
      >
        <div
          v-for="(item, index) in dataList"
          :key="index"
          class="item"
          :style="item.style"
        >
          {{ item.name }}
        </div>
        <!-- <div class="item">2222222</div>
        <div class="item">3333333</div> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo {
  display: flex;
  border: 1px sold green;
  height: 100vh;
  overflow: hidden;
  .config {
    border: 1px solid red;
    width: 50%;
    height: 100%;
    // justify-items: center;
    // align-items: center;
    .content {
      height: 100%;
      .container {
        width: 100%;
        height: 400px;
        overflow-y: auto;
        .item {
          margin-top: 10px;
        }
      }
      .project {
        height: 400px;
        width: 100%;
        overflow-y: auto;
        .item {
          margin-top: 10px;
        }
      }
    }
  }

  .result {
    border: 1px solid red;
    width: 50%;
    height: 100%;
    .content {
      display: flex;
      //   flex-direction: row;
      //   flex-wrap: nowrap;
      //   justify-content: center;
      //   align-items: center;
      //   align-content: center;
      .item {
        width: 100px;
        background: red;
        color: #fff;
        text-align: center;
        margin: 10px;
        height: 100px;
        line-height: 100px;
        border-radius: 10px;
        transition: all 0.5s;
        cursor: pointer;
        opacity: 1;
      }
      .item:hover {
        transform: scale(1.2);
        opacity: 0.3;
      }
    }
  }
}
</style>
