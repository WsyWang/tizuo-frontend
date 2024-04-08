import { req } from '@/axios'
import { Message } from '@arco-design/web-vue'

export const getTeacherList = async (currentPage: number) => {
  const res: any = await req.get('/user/getTeacherList', {
    params: {
      currentPage: currentPage
    }
  })
  if (res.code === 0) {
    return res.data.records
  } else {
    Message.error('请求错误:' + res.message)
  }
}