import { req } from '@/axios'
import { Message } from '@arco-design/web-vue'

export class PaperService {
  public static async getPaperList(queryRequest: any) {
    const res: any = await req.post('/paper/getPaperList', queryRequest)
    if (res.code === 0) {
      return res.data
    }
    Message.error("请求失败:" + res.message)
  }
}