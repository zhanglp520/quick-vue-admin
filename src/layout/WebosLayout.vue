<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const dialogVisible = ref(false)
const title = ref('')
const open = (item: any) => {
  dialogVisible.value = true
  title.value = item.name
  router.push(item.path)
}
const shortcutDataList = ref([
  {
    id: 1,
    name: '腾讯QQ',
    path: '/system/user',
    icon: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.d3sy.com%2Fd%2Ffile%2Fapp%2F20220417%2Fktlopkjx3wv.png&refer=http%3A%2F%2Fwww.d3sy.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1670431259&t=e2b2811328fad37ab0c4a9e5471c11dc',
  },
  {
    id: 2,
    name: '用户管理',
    path: '/system/user',
    icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  },
  {
    id: 3,
    name: '角色管理',
    path: '/system/role',
    icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  },
  {
    id: 4,
    name: '菜单管理',
    path: '/system/menu',
    icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  },
  {
    id: 5,
    name: '组织管理',
    path: '/system/org',
    icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  },
  {
    id: 5,
    name: '组织管理',
    icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  },
  {
    id: 5,
    name: '组织管理',
    icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  },
  {
    id: 5,
    name: '组织管理',
    icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  },
  {
    id: 5,
    name: '组织管理',
    icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  },
  {
    id: 5,
    name: '组织管理',
    icon: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  },
])
</script>

<template>
  <div class="layout-wrap">
    <div class="desk">
      <div
        v-for="(item, index) in shortcutDataList"
        :key="index"
        class="shortcut"
        @dblclick="open(item)"
      >
        <div>
          <el-image
            style="width: 50px; height: 50px"
            :src="item.icon"
            fit="fill"
          />
        </div>
        <div class="title">
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- <div class="toolbar"></div> -->
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      width="50%"
      :append-to-body="true"
      :close-on-click-modal="false"
      :draggable="true"
      :modal="true"
    >
      <router-view></router-view>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.layout-wrap {
  //   display: flex;
  background: url('@/assets/desk/win11.jpg');
  height: 100%;
  width: 100%;
  position: fixed;
  background-size: 100% 100%;
  .desk {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: flex-start;
    margin-top: 10px;
  }
  .shortcut {
    order: 0;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;
    flex: 0 1 auto;
    align-self: auto;
    width: 100px;
    background: transparent;
    color: #fff;
    text-align: center;
    margin: 10px;
    height: 100px;
    border-radius: 10px;
    transition: all 0.5s;
    cursor: pointer;
    // opacity: 1;
    .title {
      color: #fff;
    }
  }
  .shortcut:hover {
    transform: scale(1.2);
    // opacity: 0.5;
  }
}
</style>
