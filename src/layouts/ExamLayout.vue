<template>
  <div id="examLayout">
    <a-layout style="height: 100vh;">
      <a-layout-header style="height: 48px">
        <ExamHeader />
      </a-layout-header>
      <a-layout-content class="examLayoutContent">
        <router-view />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup lang="ts">


import ExamHeader from '@/components/ExamHeader.vue'
</script>

<style scoped>
#examLayout {
}

#examLayout .examLayoutContent {
  padding: 20px;
}
</style>
