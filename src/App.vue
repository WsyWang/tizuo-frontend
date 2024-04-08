<script setup lang="ts">
import CommonLayout from '@/layouts/CommonLayout.vue'
import { useRoute } from 'vue-router'
import NotFoundView from '@/views/errorviews/NotFoundView.vue'
import ExamLayout from '@/layouts/ExamLayout.vue'

const route = useRoute()
</script>

<template>
  <div id="app">
    <div v-if="route.path.includes('/lrviews') || route.path.includes('/startExamView')">
      <router-view />
    </div>
    <div v-else-if="route.path.includes('/doExam')">
      <ExamLayout />
    </div>
    <div v-else-if="route.path.startsWith('/404')">
      <NotFoundView />
    </div>
    <div v-else>
      <CommonLayout />
    </div>
  </div>
</template>

<style scoped>
</style>
