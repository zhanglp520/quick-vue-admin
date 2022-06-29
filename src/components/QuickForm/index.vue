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
  formType: {
    type: String,
    default: '',
  },
})
const {
  model,
  inline = false,
  formItems,
  formType,
} = toRefs(props) as {
  model: Ref<any>
  inline: Ref<boolean>
  formItems: Ref<FormItem[]>
  formType: Ref<string>
}
</script>
<template>
  <el-form :model="model" :inline="inline">
    <template v-for="(item, index) in formItems" :key="index">
      <el-form-item
        v-if="
          formType === 'search' ||
          (formType === 'add' && !item.addHidden) ||
          (formType === 'edit' && !item.editHidden) ||
          (formType === 'detail' && !item.detailHidden)
        "
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
        <template v-else-if="item.type === 'textarea'">
          <el-input
            v-model="model[item.vModel]"
            :autosize="{ minRows: 5, maxRows: 10 }"
            type="textarea"
          />
        </template>
        <template v-else>
          <el-input
            v-model="model[item.vModel]"
            :autocomplete="item.autocomplete"
            :readonly="
              (formType === 'add' && item.addReadonly) ||
              (formType === 'edit' && item.editReadonly) ||
              (formType === 'detail' && item.detailReadonly)
            "
          />
        </template>
      </el-form-item>
    </template>
    <slot name="action"></slot>
  </el-form>
</template>
