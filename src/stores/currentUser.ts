import { defineStore } from 'pinia'
import { ref } from 'vue'
import ACCESS_ENUM from '@/constants/ACCESSENUM'
import { req } from '@/axios'

export const userCurrentUserStore = defineStore('currentUserId', () => {
  const currentUser = ref({
    userName: '未登录',
    userRole: ACCESS_ENUM.NOT_LOGIN,
    id: 0,
  })

  const getLoginUser = async () => {
    await req.get('/user/getLoginUser').then((res: any) => {
      if (res.code === 0) {
        currentUser.value = res.data
      } else {
        return
      }
    })
  }
  return { currentUser, getLoginUser }
})