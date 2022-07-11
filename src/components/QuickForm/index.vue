<script lang="ts" setup>
import { defineProps, toRefs, Ref, defineEmits, ref, defineExpose } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { FormInstance } from 'element-plus'
import { FormItem } from '../../types/form'

const formRef = ref<FormInstance>()
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
  actionSlot: {
    type: Boolean,
    default: false,
  },
  showAction: {
    type: Boolean,
    default: false,
  },
})
const {
  model,
  inline = false,
  formItems,
  formType,
  actionSlot = false,
  showAction = false,
} = toRefs(props) as {
  model: Ref<any>
  inline: Ref<boolean>
  formItems: Ref<FormItem[]>
  formType: Ref<string>
  actionSlot: Ref<boolean>
  showAction: Ref<boolean>
}
const emit = defineEmits(['submit', 'clear'])
const handleSubmit = () => {
  emit('submit', formRef.value)
}
const handleClear = () => {
  emit('clear')
}
defineExpose({ handleSubmit })
</script>
<template>
  <el-form ref="formRef" :model="model" :inline="inline" size="default">
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
        :prop="item.prop"
        :rules="item.rules"
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
            :autocomplete="item.autocomplete"
            :placeholder="item.placeholder"
            :readonly="
              (formType === 'add' && item.addReadonly) ||
              (formType === 'edit' && item.editReadonly) ||
              (formType === 'detail' && item.detailReadonly)
            "
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
        <template v-else-if="item.type === 'avatar'">
          <el-upload
            class="avatar-uploader"
            :action="item.actionUrl"
            :show-file-list="false"
            :on-success="item.success"
            :before-upload="item.beforeUpload"
          >
            <img v-if="item.imgUrl" :src="item.imgUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </template>
        <template v-else-if="item.type === 'number'">
          <el-input
            v-model="model[item.vModel]"
            type="number"
            :autocomplete="item.autocomplete"
            :placeholder="item.placeholder"
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
    <template v-if="showAction">
      <template v-if="actionSlot">
        <slot name="action" :form-ref="formRef">
          {{ formRef }}
        </slot>
      </template>
      <template v-else>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
        <el-button @click="handleClear">清空</el-button>
      </template>
    </template>
  </el-form>
</template>
<style lang="scss">
@import './index.scss';
</style>
