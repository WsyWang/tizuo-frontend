<template>
  <div id="commonLayout">
    <a-layout class="layout-container">
      <a-layout-header class="layout-header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout>
        <a-layout-sider collapsible class="layout-sider">
          <GlobalMenu />
          <template #trigger="{ collapsed }">
            <IconCaretRight v-if="collapsed"></IconCaretRight>
            <IconCaretLeft v-else></IconCaretLeft>
          </template>
        </a-layout-sider>
        <a-layout>
          <a-scrollbar
            :style="
            {
            height:'84vh',
            overflow: 'auto',
            borderLeft: '1px var(--color-neutral-3) solid',
          }"
          >
            <a-layout-content class="layout-content">
              <router-view />
            </a-layout-content>
          </a-scrollbar>
          <a-layout-footer class="layout-footer">
            <div class="layout-footer-title">Tiz</div>
            <div class="layout-footer-github">
              <icon-github />
              <a href="http://www.github.com/WsyWang">WsyWang</a>
              ©Copyright Wsy 2024
            </div>
          </a-layout-footer>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
import GlobalMenu from '@/components/GlobalMenu.vue'
import { useRoute } from 'vue-router'
import IconFont from '@/iconFont'

const route = useRoute()
</script>

<style scoped>
#commonLayout .layout-container {
  min-height: 100vh;
}

#commonLayout .layout-header {
  border-bottom: var(--color-neutral-3) 1px solid;
}

#commonLayout .layout-content {
  padding: 24px 24px 0 24px;
  background: #FFFFFF;
}

#commonLayout .layout-footer {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  position: sticky;
  background: #FFF;
}

#commonLayout .layout-footer .layout-footer-title {
  margin-right: 10px;
  font-size: 16px;
  opacity: 0.5;
}

#commonLayout .layout-footer .layout-footer-github {
  opacity: 0.5;
  margin-right: 10px;
}

#commonLayout .layout-footer .layout-footer-github a {
  text-decoration: none;
  color: black;
}

</style>
