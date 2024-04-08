import { req } from '@/axios'
import { Message } from '@arco-design/web-vue'

export class QuestionService {

  /**
   * 获取试题
   * @param currentPage
   */
  public static async getQuestionList(currentPage: number) {
    const res: any = await req('/question/getQuestionList', {
      params: {
        currentPage: currentPage
      }
    })
    if (res.code === 0) {
      return res.data
    }
    Message.error("获取失败：" + res.message)
    return null
  }

}