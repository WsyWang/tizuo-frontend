import { req } from '@/axios'
import { Message } from '@arco-design/web-vue'

export class ClassService {

  /**
   * 获取班级列表
   */
  public static getClassList = async (queryRequest: object) => {
    const res: any = await req.post('/cls/getClassList', queryRequest)
    if (res.code === 0) {
      return res.data
    }
    Message.error('获取失败：' + res.message)
    return null
  }
  /**
   * 创建班级
   */
  public static createClass = async (createParams: object) => {
    const res: any = await req.post('/cls/createCls', {
      ...createParams
    })
    if (res.code === 0) {
      Message.success('创建成功')
      return res.data
    }
    Message.error('创建失败：' + res.message)
    return null
  }

  /**
   * 更新班级信息
   */
  public static async updateClass(updateObj: any) {
    const res: any = await req.post('/cls/updateClass', updateObj)
    if (res.code === 0) {
      Message.success('更新成功')
    } else {
      Message.error('更新失败:' + res.message)
    }
  }

  public static async deleteClass(deleteObj: any) {
    const res: any = await req.post('/cls/deleteClass', deleteObj)
    if (res.code === 0) {
      Message.success('删除成功')
    } else {
      Message.error('删除失败:' + res.message)
    }
  }

}