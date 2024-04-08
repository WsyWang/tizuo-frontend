<template>
  <div id="registerView">
    <div class="form">
      <a-spin :loading="loading" dot>
        <div style="display: block; width: 100%">
          <div style="text-align: center">
            <h2>Tiz考试系统</h2>
          </div>
          <a-form ref="formRef" :model="form" :rules="rules" auto-label-width>
            <a-form-item field="userRole">
              <a-radio-group v-model="form.userRole" type="button">
                <a-radio value="student">学生</a-radio>
                <a-radio value="teacher">教师</a-radio>
                <a-radio value="admin">管理员</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-row>
              <a-col :span="9">
                <a-form-item hide-asterisk validate-trigger="blur" field="userName">
                  <a-input v-model="form.userName" placeholder="姓名">
                    <template #prefix>
                      <icon-user />
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :span="15">
                <a-form-item hide-asterisk validate-trigger="blur" field="userPhone">
                  <a-input v-model="form.userPhone" placeholder="手机号">
                    <template #prefix>
                      <icon-phone />
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
            </a-row>
            <a-form-item hide-asterisk validate-trigger="blur" field="userIdentityCard">
              <a-input v-model="form.userIdentityCard" placeholder="身份证号">
                <template #prefix>
                  <icon-idcard />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item hide-asterisk validate-trigger="blur" field="userAccount">
              <a-input v-model="form.userAccount" placeholder="账号">
                <template #prefix>
                  <icon-message />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item hide-asterisk validate-trigger="blur" field="userPassword">
              <a-input-password v-model="form.userPassword" placeholder="密码...">
                <template #prefix>
                  <icon-edit />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item hide-asterisk validate-trigger="blur" field="checkPassword">
              <a-input-password v-model="form.checkPassword" placeholder="再次输入密码">
                <template #prefix>
                  <icon-edit />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <div class="submit-button-item">
                <div style="margin-bottom: 10px">
                  <a-button style="width: 100%" type="primary" @click="doRegister($refs.formRef)">注册</a-button>
                </div>
                <a-button style="width: 100%; color: black; opacity: 0.5" type="text" @click="doBackLogin">返回登录
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

const router = useRouter()

const loading = ref(false);

const form = ref({
  checkPassword: '',
  userAccount: '',
  userIdentityCard: '',
  userName: '',
  userPassword: '',
  userPhone: '',
  userRole: 'student'
})

const rules = {
  userName: [
    { required: true, message: '姓名是必填项' }
  ],
  userPhone: [
    { required: true, message: '电话是必填项' },
    { length: 11, message: '非法电话号码' }
  ],
  userIdentityCard: [
    { required: true, message: '身份证是必填项' },
    { length: 18, message: '非法身份证' }
  ],
  userAccount: [
    { required: true, message: '账号是必填项' },
    { minLength: 4, message: '账号小于4位' }
  ],
  userPassword: [
    { required: true, message: '密码是必填项' },
    { minLength: 8, message: '密码小于8位' }
  ],
  checkPassword: [
    { required: true, message: '请再次输入密码' },
    { minLength: 8, message: '密码小于8位' },
    {
      validator: (value: string, cb: (error?: string) => void) => {
        if (value !== form.value.userPassword) {
          cb('两次密码不一致')
        } else {
          cb()
        }
      }
    }
  ]
}

const doRegister = (formRef: any) => {
  loading.value = true
  req.post('/user/register', {
    ...form.value
  }).then((res: any) => {
    if (res.code === 0) {
      Message.success('注册成功')
      router.push('/lrviews/login')
      loading.value = false
    } else {
      Message.error('注册失败：' + res.message)
    }
  })
  formRef.resetFields()
  loading.value = false
}

const doBackLogin = () => {
  router.push('/lrviews/login')
}

</script>

<style scoped>
#registerView {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

#registerView .form {
  display: flex;
  height: 500px;
  width: 60%;
  align-items: center;
  justify-content: center;
}

#registerView .submit-button-item {
  width: 100%;
}

#registerView .submit-button-item a-button {
  margin-bottom: 10px;
}

</style>
