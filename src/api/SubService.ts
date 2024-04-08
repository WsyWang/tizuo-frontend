import { req } from '@/axios'
import { Message } from '@arco-design/web-vue'

/**
 * 学科服务类
 */
export class SubService {

  /**
   * 获取学科列表
   */
  public static async getSubNameList() {
    const res: any = await req.get('/sub/getSubName')
    if (res.code === 0) {
      return res.data
    }
    Message.error("获取学科列表失败:" + res.message)
  }
}