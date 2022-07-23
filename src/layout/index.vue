<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed, watch, ref } from 'vue'
// import AiniBottom from './components/AiniBottom/index.vue'
import { useRoute, useRouter } from 'vue-router'
import AiniTop from './components/AiniTop/index.vue'
import AiniSidebar from './components/AiniSidebar/index.vue'
import { useAppStore } from '../store/modules/app'
import { useMenuStore } from '../store/modules/menu'
import { useTabStore } from '../store/modules/tab'
import { Tab } from '../types/tab'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const menuStore = useMenuStore()
const tabStore = useTabStore()
const isCollapse = computed(() => appStore.getCollapse)
const activeTab = computed(() => tabStore.getActiveTab)
const menuList = computed(() => menuStore.getMenuList)
const tabList = computed(() => tabStore.getTabList)

const { t } = useI18n()
console.log('i18n', t('title'))
const editableTabsValue = ref('home')
router.push('/home')
const editableTabs = ref([])
watch(activeTab, (val) => {
  if (val) {
    const { id, path } = val
    editableTabsValue.value = id
    router.push(path)
  }
})
watch(tabList, (val) => {
  editableTabs.value = val
})

const handleTabsEdit = (targetName: string, action: 'remove' | 'add'): void => {
  if (action === 'remove') {
    tabStore.deleteTab(targetName)
  }
}
const handleClick = (activeName: string) => {
  const index = tabList.value.findIndex((x) => x.id === activeName)
  if (index !== -1) {
    tabStore.setActiveTab(tabList.value[index])
    menuStore.setActiveMenuId(activeName)
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
              closable
              class="demo-tabs"
              @edit="handleTabsEdit"
              @tab-change="handleClick"
            >
              <el-tab-pane
                v-for="item in tabList"
                :key="item.id"
                :label="item.name"
                :name="item.id"
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
