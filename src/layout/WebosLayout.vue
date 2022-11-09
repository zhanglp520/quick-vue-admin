<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore()
const permissionMenuList = computed(() => userStore.getPermissionMenuList)
const dialogVisible = ref(false)
const title = ref('')
const open = (item: any) => {
  dialogVisible.value = true
  title.value = item.name
  router.push(item.path)
}
const shortcutDataList = ref<any>([])
onMounted(() => {
  const menuList = permissionMenuList.value.filter((x) => x.menuType === 1)
  menuList.forEach((element) => {
    console.log('element.icon', element.icon)

    shortcutDataList.value.push({
      id: element.menuId,
      name: element.menuName,
      path: element.path,
      icon: element.icon,
    })
  })
})
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
          <el-icon size="large" color="#fff">
            <component :is="item.icon" />
          </el-icon>
          <!-- <el-image
            style="width: 50px; height: 50px"
            :src="item.icon"
            fit="fill"
          /> -->
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
      font-size: 12px;
    }
  }
  .shortcut:hover {
    transform: scale(1.2);
    // opacity: 0.5;
  }
}
</style>
