<template>
  <div id="globalMenu">
    <a-menu :default-selected-keys="[`${defaultPath}`]" :selected-keys="[`${defaultPath}`]">
      <a-menu-item v-for="item in singleList" :key="item.path" @click="doMenuClick(item.path)">
        <template #icon>
          <icon-font :type="item.meta.icon" :size="18"></icon-font>
        </template>
        {{ item.name }}
      </a-menu-item>
      <a-sub-menu v-for="item in parentList" :key="item.path">
        <template #title>
          {{ item.name }}
        </template>
        <template #icon>
          <icon-font :type="item.meta.icon" :size="18"></icon-font>
        </template>
        <a-menu-item v-for="children in item.children" :key="children.path" @click="doMenuClick(children.path)">
          <template #icon>
            <icon-font :type="children.meta.icon" :size="18"></icon-font>
          </template>
          {{ children.name }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script setup lang="ts">
import { createMenu } from '@/utils/createMenu'
import { onMounted, ref, watch } from 'vue'
import router from '@/router'
import { useRoute } from 'vue-router'
import IconFont from '@/iconFont'

const parentList: any = ref([])
const singleList: any = ref([])
const route = useRoute()
const defaultPath = ref('/')
watch(() => route.path, async newPath => {
  defaultPath.value = newPath
})

onMounted(() => {
  createMenu()
    .then((res: any) => {
      parentList.value = res.filter((item: any) => item.children !== undefined)
      singleList.value = res.filter((item: any) => item.children === undefined)
    })
})


const doMenuClick = (path: string) => {
  router.push(path)
}

</script>

<style scoped>
#globalMenu {
  padding: 16px 0 0 0;
}
</style>
