<template>
  <div id="noAuthView">
    <a-result
      status="403"
      subtitle="拒绝访问，权限不足！"
    >
      <template #extra>
        <a-space>
          <a-button type="primary" @click="doBack">返回</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">

import { useRouter } from 'vue-router'

const router = useRouter()

const doBack = () => {
  router.back()
}
</script>

<style scoped>
#noAuthView {
}
</style>
