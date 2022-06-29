<script lang="ts" setup>
import { defineProps, toRefs, Ref } from 'vue'
import { FormItem } from '../../types/form'

const props = defineProps({
  model: {
    type: Object,
    default: () => {
      return {}
    },
  },
  formItems: {
    type: Array,
    default: () => {
      return []
    },
  },
  inline: {
    type: Boolean,
    default: false,
  },
})
const {
  model,
  inline = false,
  formItems,
} = toRefs(props) as {
  model: Ref<any>
  inline: Ref<boolean>
  formItems: Ref<FormItem[]>
}
</script>
<template>
  <el-form :model="model" :inline="inline">
    <template v-for="(item, index) in formItems" :key="index">
      <el-form-item
        v-if="!item.isEdit"
        :label="item.label"
        :label-width="item.labelWidth"
      >
        <template v-if="item.type === 'select'">
          <el-select
            v-model="model[item.vModel]"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="(option, optionsIndex) in item.options"
              :key="optionsIndex"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </template>
        <template v-else>
          <el-input
            v-model="model[item.vModel]"
            :autocomplete="item.autocomplete"
            :readonly="item.readonly"
          />
        </template>
      </el-form-item>
    </template>
    <slot name="action"></slot>
  </el-form>
</template>
