import { userCurrentUserStore } from '@/stores/currentUser'
import { routes } from '@/router/routes'

export const createMenu = async () => {
  const store = userCurrentUserStore()
  await store.getLoginUser()
  //1.去除需要隐藏的页面
  let menuList = [...routes]
  menuList = menuList.filter(item => !item.meta.hide)
    .filter((item: any) => item.meta.access.some((item: any) => item === store.currentUser.userRole))
  menuList = menuList.map((item: any) => {
    const originItem = { ...item }
    if (originItem.children != undefined) {
      originItem.children = originItem.children.filter((item: any) => item.meta.access.some((item: any) => item === store.currentUser.userRole))
    }
    return originItem
  })
  return menuList
}