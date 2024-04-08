<template>
  <div id="loginView">
    <div class="form">
      <a-spin :loading="loading" dot>
        <div style="display: block; width: 100%">
          <div style="text-align: center">
            <h2>Tiz考试系统</h2>
          </div>
          <a-form ref="formRef" :model="form" layout="vertical">
            <a-form-item field="userAccount">
              <a-input v-model="form.userAccount" placeholder="请输入你的账号...">
                <template #prefix>
                  <icon-user />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item field="userPassword">
              <a-input-password v-model="form.userPassword" placeholder="请输入你的密码...">
                <template #prefix>
                  <icon-edit />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item field="autoLogin">
              <div class="checkbox-button-item">
                <a-checkbox v-model="form.autoLogin" value="1">自动登录</a-checkbox>
                <a-button type="text" @click="doForgetPassword">忘记密码</a-button>
              </div>
            </a-form-item>
            <a-form-item>
              <div class="submit-button-item">
                <div style="margin-bottom: 10px">
                  <a-button style="width: 100%" type="primary" @click="doLogin($refs.formRef)">登录</a-button>
                </div>
                <a-button style="width: 100%; color: black; opacity: 0.5" type="text" @click="doRegister">注册账号
                </a-button>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </a-spin>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'
import { req } from '@/axios'
import { useRouter } from 'vue-router'
import { userCurrentUserStore } from '@/stores/currentUser'

const router = useRouter()

const currentUserStore = userCurrentUserStore()

const loading = ref(false)

const form = ref({
  userAccount: '',
  userPassword: '',
  autoLogin: undefined
})

const doLogin = (formRef: any) => {
  loading.value = true
  req.post('/user/login', {
    ...form.value
  }).then((res: any) => {
    if (res.code === 0) {
      currentUserStore.currentUser = res.data
      router.push('/')
      loading.value = false
      Message.success('登录成功')
    } else {
      Message.error('登录失败：' + res.message)
    }
  })
  formRef.resetFields()
  loading.value = false
}

const doRegister = () => {
  router.push('/lrviews/register')
}

const doForgetPassword = () => {
  //todo 忘记密码
  Message.info('点击忘记密码按钮')
}
</script>

<style scoped>
#loginView {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

#loginView .form {
  display: flex;
  height: 500px;
  width: 50%;
  align-items: center;
  justify-content: center;
}

#loginView .checkbox-button-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

#loginView .submit-button-item {
  width: 100%;
}

#loginView .submit-button-item a-button {
  margin-bottom: 10px;
}

</style>
