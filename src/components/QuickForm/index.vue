<script lang="ts" setup>
import { defineExpose, defineProps, toRefs, Ref, defineEmits, ref } from 'vue'
import { Plus, Setting } from '@element-plus/icons-vue'
import { FormInstance, TabsPaneContext } from 'element-plus'
import { FormItem } from '@/types/form'
import elementPlusIcons from '@/config/elementPlusIcon.json'

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
  formInline: {
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
const { model, formInline, formItems, formType, actionSlot, hiddenAction } =
  toRefs(props) as {
    model: Ref<any>
    formInline: Ref<boolean>
    formItems: Ref<FormItem[]>
    formType: Ref<string>
    actionSlot: Ref<boolean>
    hiddenAction: Ref<boolean>
  }

/**
 * emits
 */
const emits = defineEmits(['submit', 'clear'])
const iconVisible = ref(false)
/**
 * tabs
 */
const activeName = ref('element')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const selectIcon = (item, option) => {
  item.select(option.value)
  iconVisible.value = false
}
const iconClick = () => {
  iconVisible.value = true
}
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
  <el-form ref="formRef" :model="model" :inline="formInline" size="default">
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
            :style="{ width: formInline ? '400px' : '100%' }"
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
            :style="{ width: formInline ? '400px' : '100%' }"
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
            :style="{ width: formInline ? '400px' : '100%' }"
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
            :style="{ width: formInline ? '400px' : '100%' }"
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
            :style="{ width: formInline ? '400px' : '100%' }"
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
            :style="{ width: formInline ? '400px' : '100%' }"
            :readonly="
              (formType === 'add' && item.addReadonly) ||
              (formType === 'edit' && item.editReadonly) ||
              formType === 'detail'
            "
          />
        </template>
        <template v-else-if="item.type === 'switch'">
          <el-switch
            v-model="model[item.vModel]"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
        <template v-else-if="item.type === 'tree'">
          <el-tree-select
            v-model="model[item.vModel]"
            :data="item.options"
            :check-strictly="true"
            :render-after-expand="false"
            :style="{ width: formInline ? '400px' : '100%' }"
            :disabled="
              (formType === 'add' && item.addDisabled) ||
              (formType === 'edit' && item.editDisabled) ||
              formType === 'detail'
            "
          />
        </template>
        <template v-else-if="item.type == 'icon'">
          <!-- v-model:visible="iconVisible" -->
          <el-popover placement="bottom" width="1000px" trigger="click">
            <template #reference>
              <el-input
                v-model="model[item.vModel]"
                :autocomplete="item.autocomplete"
                :placeholder="item.placeholder"
                :style="{ width: formInline ? '400px' : '100%' }"
                :readonly="
                  (formType === 'add' && item.addReadonly) ||
                  (formType === 'edit' && item.editReadonly) ||
                  formType === 'detail'
                "
                @click="iconClick()"
              >
                <template #append>
                  <el-icon>
                    <component :is="model[item.vModel]" />
                  </el-icon>
                </template>
              </el-input>
            </template>
            <el-tabs
              v-model="activeName"
              class="demo-tabs"
              @tab-click="handleClick"
            >
              <el-tab-pane label="element官方" name="element">
                <ul class="icon-list">
                  <li
                    v-for="(option, index) in elementPlusIcons"
                    :key="index"
                    class="icon-item"
                    @click="selectIcon(item, option)"
                  >
                    <span class="svg-icon">
                      <el-icon style="font-size: 20px">
                        <component :is="option.value" />
                      </el-icon>
                      <span style="margin-top: 8px">
                        {{ option.label }}
                      </span>
                    </span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="自定义" name="custorm">
                <ul class="icon-list">
                  <li
                    v-for="(option, index) in item.options"
                    :key="index"
                    class="icon-item"
                  >
                    <span class="svg-icon">
                      <el-icon style="font-size: 20px">
                        <component :is="option.value" />
                      </el-icon>
                      <span style="margin-top: 8px">
                        {{ option.label }}
                      </span>
                    </span>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </el-popover>
        </template>
        <template v-else>
          <el-input
            v-model="model[item.vModel]"
            :autocomplete="item.autocomplete"
            :placeholder="item.placeholder"
            :style="{ width: formInline ? '400px' : '100%' }"
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
.icon-list {
  overflow-y: scroll;
  list-style: none;
  padding: 0 !important;
  border-top: 1px solid var(--el-border-color);
  border-left: 1px solid var(--el-border-color);
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  height: 300px;
  .icon-item {
    text-align: center;
    color: var(--el-text-color-regular);
    height: 90px;
    font-size: 13px;
    border-right: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    transition: background-color var(--el-transition-duration);
  }
  .svg-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;
  }
}
</style>
