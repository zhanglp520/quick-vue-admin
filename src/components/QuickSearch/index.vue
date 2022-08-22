<script lang="ts" setup>
import { defineProps, defineEmits, toRefs, Ref } from 'vue'
import QuickForm from '@/components/QuickForm/index.vue'
import { FormItem } from '@/types/form'

const props = defineProps({
  model: {
    type: Object,
    default: () => {
      return {}
    },
  },
  items: {
    type: Array,
    default: () => {
      return []
    },
  },
  searchButtonName: {
    type: String,
    default: '查询',
  },
  resetButtonName: {
    type: String,
    default: '清空',
  },
  hiddenResetButton: {
    type: Boolean,
    default: false,
  },
})
const { model, items, searchButtonName, resetButtonName, hiddenResetButton } =
  toRefs(props) as {
    model: Ref<any>
    items: Ref<Array<FormItem>>
    searchButtonName: Ref<any>
    resetButtonName: Ref<any>
    hiddenResetButton: Ref<any>
  }
const emits = defineEmits(['onSearch', 'onClear'])
</script>
<template>
  <quick-form
    :inline="true"
    :model="model"
    class="demo-form-inline"
    :form-items="items"
    form-type="search"
    :show-action="true"
    :action-slot="true"
  >
    <template #action>
      <el-form-item>
        <el-button type="primary" @click="emits('onSearch')">{{
          searchButtonName
        }}</el-button>
      </el-form-item>
      <el-form-item v-if="!hiddenResetButton">
        <el-button @click="emits('onClear')">{{ resetButtonName }}</el-button>
      </el-form-item>
    </template>
  </quick-form>
</template>
