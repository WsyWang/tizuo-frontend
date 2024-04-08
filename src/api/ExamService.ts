import { req } from '@/axios'
import { Message } from '@arco-design/web-vue'


export class ExamService {

  /**
   * 获取我的考试列表
   */
  public static async getMyExamList() {
    const res: any = await req.get('/exam/getMyExam')
    if (res.code === 0) {
      return res.data
    }
    Message.error('请求失败:' + res.message)
    return null
  }

  public static async getStartExamDetail(examId: any) {
    const res: any = await req.get('/exam/getStartExamDetail', {
      params: {
        examId: examId
      }
    })
    if (res.code === 0) {
      return res.data
    }
    Message.error('请求失败:' + res.message)
    return null
  }

  public static async getExamInfo(examId: any) {
    const res: any = await req.get('/exam/getExamInfo', {
      params: {
        examId: examId
      }
    })
    if (res.code === 0) {
      return res.data
    }
    Message.error('操作失败:' + res.message)
    return false
  }

  public static async getQuestionList(examId: any) {
    const res: any = await req.get('/exam/getQuestionIdList', {
      params: {
        examId: examId
      }
    })
    if (res.code === 0) {
      return res.data
    } else {
      Message.error('请求失败:' + res.message)
    }
  }

  public static async getQuestion(questionId: any) {
    const res: any = await req.get('/question/getQuestion', {
      params: {
        questionId: questionId
      }
    })
    if (res.code === 0) {
      return res.data
    }
    Message.error('请求失败:' + res.message)
  }

  public static async createPaperSubmit(examId: any) {
    const res: any = await req.post('/paperSubmit/createPaperSubmit', `examId=${examId}`)
    if (res.code === 0) {
      return res.data
    }
    Message.error('请求失败:' + res.message)
  }

  public static async getPaperIsSubmit(examId: any) {
    const res: any = await req.get('/paperSubmit/getPaperIsSubmit', {
      params: {
        examId: examId
      }
    })
    if (res.code === 0) {
      return res.data
    }
    Message.error('请求失败:' + res.message)
  }

  /**
   * 提交试卷
   */
  public static async submitPaper(examId: any, answer: any) {
    const res: any = await req.post('/paperSubmit/submitPaper', {
      examId: examId,
      judgeInfo: answer
    })
    if (res.code === 0) {
      return res.data
    }
    Message.error('请求失败:' + res.message)
  }

}