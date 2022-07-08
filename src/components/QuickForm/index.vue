<script lang="ts" setup>
import { defineProps, toRefs, Ref, defineEmits } from 'vue'
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
const emit = defineEmits(['confirm', 'cancel'])
const handleOk = () => {
  emit('confirm')
}
const handleCancel = () => {
  emit('cancel')
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
          (formType === 'detail' && !item.detailHidden) ||
          !formType
        "
        :label="item.label"
        :label-width="item.labelWidth"
      >
        <template v-if="item.type === 'select'">
          <el-select
            v-model="model[item.vModel]"
            :placeholder="item.placeholder"
            :disabled="
              (formType === 'add' && item.addDisabled) ||
              (formType === 'edit' && item.editDisabled) ||
              (formType === 'detail' && item.detailDisabled)
            "
          >
            <el-option
              v-for="(option, optionsIndex) in item.options"
              :key="optionsIndex"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </template>
        <template v-else-if="item.type === 'cascader'">
          <el-cascader
            v-model="model[item.vModel]"
            :options="item.treeOptions"
            :props="{
              expandTrigger: 'hover',
            }"
            @change="item.change"
          />
        </template>
        <template v-else-if="item.type === 'textarea'">
          <el-input
            v-model="model[item.vModel]"
            :autosize="{ minRows: 5, maxRows: 10 }"
            type="textarea"
          />
        </template>
        <template v-else-if="item.type === 'password'">
          <el-input
            v-model="model[item.vModel]"
            :autocomplete="item.autocomplete"
            :placeholder="item.placeholder"
            type="password"
            show-password
            :readonly="
              (formType === 'add' && item.addReadonly) ||
              (formType === 'edit' && item.editReadonly) ||
              (formType === 'detail' && item.detailReadonly)
            "
          />
        </template>
        <template v-else>
          <el-input
            v-model="model[item.vModel]"
            :autocomplete="item.autocomplete"
            :placeholder="item.placeholder"
            :readonly="
              (formType === 'add' && item.addReadonly) ||
              (formType === 'edit' && item.editReadonly) ||
              (formType === 'detail' && item.detailReadonly)
            "
          />
        </template>
      </el-form-item>
    </template>
    <template v-if="actionSlot">
      <slot name="action"></slot>
    </template>
    <template v-else>
      <el-button type="primary" @click="handleOk">确定</el-button>
      <el-button @click="handleCancel">取消</el-button>
    </template>
  </el-form>
</template>
