<script lang="ts" setup>
import { defineExpose, defineProps, toRefs, Ref, defineEmits, ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { FormInstance } from 'element-plus'
import { FormItem } from '@/types/form'

/**
 * form
 */
const formRef = ref<FormInstance>()
/**
 * props
 */
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
    default: 'form',
  },
  actionSlot: {
    type: Boolean,
    default: false,
  },
  hiddenAction: {
    type: Boolean,
    default: false,
  },
})
/**
 * props toRefs
 */
const {
  model,
  inline = false,
  formItems,
  formType,
  actionSlot = false,
  hiddenAction = false,
} = toRefs(props) as {
  model: Ref<any>
  inline: Ref<boolean>
  formItems: Ref<FormItem[]>
  formType: Ref<string>
  actionSlot: Ref<boolean>
  hiddenAction: Ref<boolean>
}
/**
 * emits
 */
const emits = defineEmits(['submit', 'clear'])
/**
 * 函数
 */
const handleSubmit = () => {
  emits('submit', formRef.value)
}
const handleClear = () => {
  emits('clear')
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
          formType === 'form'
        "
        :label="item.label"
        :label-width="item.labelWidth"
        :prop="formType === 'detail' ? undefined : item.prop"
        :rules="formType === 'detail' ? undefined : item.rules"
      >
        <template v-if="item.type === 'select'">
          <el-select
            v-model="model[item.vModel]"
            :placeholder="item.placeholder"
            :disabled="
              (formType === 'add' && item.addDisabled) ||
              (formType === 'edit' && item.editDisabled) ||
              formType === 'detail'
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
              formType === 'detail'
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
              formType === 'detail'
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
            v-model.number="model[item.vModel]"
            type="number"
            :autocomplete="item.autocomplete"
            :placeholder="item.placeholder"
            :readonly="
              (formType === 'add' && item.addReadonly) ||
              (formType === 'edit' && item.editReadonly) ||
              formType === 'detail'
            "
          />
        </template>
        <template v-else-if="item.type === 'switch'">
          <el-switch v-model="model[item.vModel]" />
        </template>
        <template v-else-if="item.type === 'tree'">
          <el-tree-select
            v-model="model[item.vModel]"
            :data="item.options"
            :check-strictly="true"
            :render-after-expand="false"
            :disabled="
              (formType === 'add' && item.addDisabled) ||
              (formType === 'edit' && item.editDisabled) ||
              formType === 'detail'
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
              formType === 'detail'
            "
          />
        </template>
      </el-form-item>
    </template>
    <template v-if="!hiddenAction">
      <el-form-item>
        <template v-if="actionSlot">
          <slot name="action" :form-ref="formRef"></slot>
        </template>
        <template v-else>
          <el-button type="primary" @click="handleSubmit">提交</el-button>
          <el-button @click="handleClear">清空</el-button>
        </template>
      </el-form-item>
    </template>
  </el-form>
</template>
<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
