<template>
  <div id="notFoundView">
    <a-result
      status="404"
      subtitle="页面跑丢啦！404 Not Found!"
    >
      <template #extra>
        <a-space>
          <a-button type="primary" @click="doReTry">重试</a-button>
        </a-space>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const doReTry = () => {
  router.replace('/');
}
</script>

<style scoped>
#noAuthView {
}
</style>
