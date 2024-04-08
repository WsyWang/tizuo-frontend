<template>
  <div id="globalHeader">
    <a-row :wrap="false" align="center" style="padding: 10px">
      <a-col flex="auto">
        <div class="title-bar">
          <img class="logo" src="../assets/brand-logo.svg" />
          <div class="title">Tiz在线考试系统</div>
        </div>
      </a-col>
      <a-col flex="20px">
        <a-dropdown trigger="hover">
          <a-button style="color: black" type="text">{{ currentUserStore.currentUser.userName }}</a-button>
          <template #content>
            <a-doption>
              <template #icon>
                <icon-user />
              </template>
              <template #default>
                个人中心
              </template>
            </a-doption>
            <a-doption @click="doLogout">
              <template #icon>
                <icon-export />
              </template>
              <template #default>
                注销
              </template>
            </a-doption>
          </template>
        </a-dropdown>
      </a-col>
      <a-col flex="100px">
        <a-tag bordered color="#168cff" size="Medium">
          <div v-if="currentUserStore.currentUser.userRole === 'teacher'">
            教师
          </div>
          <div v-if="currentUserStore.currentUser.userRole === 'admin'">
            管理员
          </div>
          <div v-if="currentUserStore.currentUser.userRole === 'student'">
            学生
          </div>
        </a-tag>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { userCurrentUserStore } from '@/stores/currentUser'
import { req } from '@/axios'
import { initUser } from '@/stores/init'
import { useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'

const router = useRouter()

const currentUserStore = userCurrentUserStore()

const doLogout = () => {
  req.post('/user/logout').then((res: any) => {
    if (res.code === 0 && res.data === true) {
      currentUserStore.currentUser = initUser
      router.push('/lrviews/login')
      Message.success('注销成功')
    } else {
      Message.error('注销失败')
    }
  })
}
</script>

<style scoped>
#globalHeader {
  height: 48px;
}

.title-bar {
  margin-left: 30px;
  display: flex;
  align-items: center;
}

.logo {
  height: 38px;
}

.title {
  color: #444;
  margin-left: 16px;
  font-weight: 800;
  font-size: 16px;
}
</style>
