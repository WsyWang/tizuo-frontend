<template>
  <div id="loginRegisterLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-content class="layout-content">
        <a-row style="min-height: 100vh">
          <a-col flex="700px">
            <img class="layout-content-img" src="@/assets/loginRegister.png"
                 alt="登录注册背景图">
          </a-col>
          <a-col flex="auto">
            <router-view />
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
#loginRegisterLayout {
}

#loginRegisterLayout .layout-content-img {
  border-radius: 0 10px 10px 0;
  height: 99.5vh;
  width: 100%;
}

</style>
