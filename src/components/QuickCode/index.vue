<script lang="ts" setup>
import { defineProps, toRefs, ref, Ref, watch } from 'vue'

const props = defineProps({
  code: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: '',
  },
  autodetect: {
    type: Boolean,
    default: true,
  },
})
const { code, language, autodetect } = toRefs(props) as {
  code: Ref<any>
  language: Ref<string>
  autodetect: Ref<boolean>
}
</script>
<template>
  <!-- :language="language" -->
  <el-collapse>
    <el-collapse-item title="查看源码">
      <highlightjs :autodetect="autodetect" :code="code" />
    </el-collapse-item>
  </el-collapse>
</template>
