<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
// import AiniBottom from './components/AiniBottom/index.vue'
import AiniTop from './components/AiniTop/index.vue'
import AiniSidebar from './components/AiniSidebar/index.vue'
import { useAppStore } from '../store/modules/app'

const appStore = useAppStore()
const isCollapse = computed(() => appStore.getCollapse)

const { t } = useI18n()
console.log('i18n', t('title'))

const tabIndex = 2
const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: '首页',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: '用户管理',
    name: '2',
    content: 'Tab 2 content',
  },
])

const handleTabsEdit = (targetName: string, action: 'remove' | 'add') => {
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
          <el-card shadow="always" style="height: 100%">
            <el-tabs
              v-model="editableTabsValue"
              type="card"
              editable
              class="demo-tabs"
              @edit="handleTabsEdit"
            >
              <el-tab-pane
                v-for="item in editableTabs"
                :key="item.name"
                :label="item.title"
                :name="item.name"
              >
                <router-view></router-view>
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
  padding: 10px;
  overflow: hidden;
}
.el-container {
  height: 100%;
}
.el-aside {
  background-color: #545c64;
  width: 200px;
}
</style>
