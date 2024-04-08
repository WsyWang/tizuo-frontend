import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { userCurrentUserStore } from '@/stores/currentUser'
import ACCESS_ENUM from '@/constants/ACCESSENUM'
import checkAccess from '@/access/checkAccess'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const currentUserStore = userCurrentUserStore()
  if (to.path === '/404') {
    next()
  }
  //1.如果用户未登录先自动登录
  if (currentUserStore.currentUser.userRole === ACCESS_ENUM.NOT_LOGIN) {
    await currentUserStore.getLoginUser()
  }
  //2.再判断有无权限,如果没有且不是去往登录页面，重定向登录页面
  if (currentUserStore.currentUser.userRole === ACCESS_ENUM.NOT_LOGIN && to.path !== '/lrviews/login' && to.path !== '/lrviews/register') {
    return { path: '/lrviews/login' }
  }
  //3.如果已登录且前往登录页
  if (currentUserStore.currentUser.userRole !== ACCESS_ENUM.NOT_LOGIN && to.path === '/lrviews/login') {
    return { path: '/' }
  }
  //4.判断前往的页面所需权限，没权限跳转无权限页面
  if (!checkAccess(currentUserStore.currentUser, to.meta.access)) {
    return { path: '/403' }
  }
  next()
})


export default router
