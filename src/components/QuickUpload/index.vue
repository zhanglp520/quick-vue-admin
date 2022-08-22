<script lang="ts" setup>
import { ref, defineProps, toRefs, Ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

/**
 * props
 */
const props = defineProps({
  action: {
    type: String,
    default: 'https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15',
  },
  type: {
    type: [Boolean, String],
    default: false,
  },
})
/**
 * props toRefs
 */
const { action, type } = toRefs(props) as {
  action: Ref<string>
  type: Ref<boolean | string>
}
const imageUrl = ref('')
</script>

<template>
  <el-upload :action="action">
    <template v-if="type === 'avatar'">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </template>
    <template v-else>
      <el-button type="primary">上传</el-button>
    </template>
  </el-upload>
</template>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
<style>
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color) !important;
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
