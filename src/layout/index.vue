<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, onMounted, ref } from 'vue'
// import AiniBottom from './components/AiniBottom/index.vue'
import { useRoute, useRouter } from 'vue-router'
import AiniTop from './components/AiniTop/index.vue'
import AiniSidebar from './components/AiniSidebar/index.vue'
import { useAppStore } from '../store/modules/app'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const isCollapse = computed(() => appStore.getCollapse)

const { t } = useI18n()
console.log('i18n', t('title'))

const tabIndex = 1
const editableTabsValue = ref('1')
const editableTabs = ref([
  {
    title: '首页',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: '订单管理',
    name: '2',
    content: 'Tab 2 content',
  },
])

const handleTabsEdit = (targetName: string, action: 'remove' | 'add'): void => {
  if (action === 'add') {
    const newTabName = `${tabIndex + 1}`
    editableTabs.value.push({
      title: 'New Tab',
      name: newTabName,
      content: 'New Tab content',
    })
    editableTabsValue.value = newTabName
  } else if (action === 'remove') {
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
  }
}
const handleClick = (activeName: string) => {
  editableTabsValue.value = activeName
  if (editableTabsValue.value === '1') {
    router.push('/home')
  }
  if (editableTabsValue.value === '2') {
    router.push('/business/order')
  }
}
</script>

<template>
  <div class="aini-layout">
    <el-container>
      <el-aside :style="{ width: isCollapse ? '70px' : '200px' }">
        <aini-sidebar></aini-sidebar>
      </el-aside>
      <el-container>
        <el-header>
          <el-card shadow="never" :body-style="{ padding: 0 }">
            <aini-top></aini-top>
          </el-card>
        </el-header>
        <el-main>
          <el-card shadow="always" :body-style="{ padding: 10 }">
            <el-tabs
              v-model="editableTabsValue"
              type="card"
              editable
              class="demo-tabs"
              @edit="handleTabsEdit"
              @tab-change="handleClick"
            >
              <el-tab-pane
                v-for="item in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
              >
                <!-- <router-view></router-view> -->
                <router-view :key="route.fullPath" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-main>
        <!-- <el-footer>
          <aini-bottom></aini-bottom>
        </el-footer> -->
      </el-container>
    </el-container>
  </div>

  <!-- <div class="aini-layout">
    <aini-sidebar></aini-sidebar>
    <aini-top></aini-top>
    <div class="aini-layout-content">
      <el-main>
        <router-view></router-view>
      </el-main>
    </div>
    <aini-bottom></aini-bottom>
  </div> -->
</template>

<style lang="scss" scoped>
.aini-layout {
  background: #f0f2f5;
  height: 100%;
  .aini-layout-content {
  }
}
</style>
<style>
.demo-tabs > .el-tabs__content {
  padding: 10px;
  color: #6b778c;
  font-size: 32px;
}
.el-header {
  padding: 0;
  height: 50px;
}
.el-main {
  /* height: calc(100vh - 60px - 100px); */
  padding: 20px;
  /* overflow: hidden; */
}
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #545c64;
  width: 200px;
}
</style>
