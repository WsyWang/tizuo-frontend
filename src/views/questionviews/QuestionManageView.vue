<template>
  <div id="questionManageView">
    <a-space direction="vertical">
      <a-button @click="createQuestion" type="primary">
        创建试题
      </a-button>
      <a-table
        stripe
        :columns="columns"
        :data="data"
        :pagination="{
        pageSize: pageConfig.pageSize,
        current: pageConfig.currentPage,
        total: pageConfig.total,
        showTotal: true
      }"
      >
        <template #optional="{ record }">
          <a-space>
            <a-button size="mini" type="primary" @click="doView(record)">预览
            </a-button>
            <a-button size="mini" type="primary" status="success"
                      @click="doExit(record.questionId)">编辑
            </a-button>
            <a-button size="mini" type="primary" status="danger"
                      @click="doDelete(record.questionId)">删除
            </a-button>
          </a-space>
        </template>
        <template #type="{record}">
          <a-tag v-if="record.questionType === 0" color="blue">选择题</a-tag>
          <a-tag v-else-if="record.questionType === 1" color="green">判断题</a-tag>
          <a-tag v-else color="orangered">综合题</a-tag>
        </template>
        <template #time="{record}">
          {{ moment(record.createTime).format('YYYY-MM-DD') }}
        </template>
        <template #qOption="{record}">
          {{ JSON.stringify(record.questionOption) }}
        </template>
      </a-table>
    </a-space>
    <a-modal v-if="qType === 0" v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
      <template #title>
        <icon-select-all />
        选择题
      </template>
      <a-space direction="vertical">
        <div>
          <span v-html="qContent"></span>
        </div>
        <div>
          <a-space direction="vertical">
            <span>{{ `A. ${qOption.a}` }}</span>
            <span>{{ `B. ${qOption.b}` }}</span>
            <span>{{ `C. ${qOption.b}` }}</span>
            <span>{{ `D. ${qOption.b}` }}</span>
          </a-space>
        </div>
        <div>
          <a-space>
            <span style="color: red">答案：</span>
            <span>{{ qAnswer }}</span>
          </a-space>
        </div>
      </a-space>
    </a-modal>
    <a-modal v-if="qType === 1" v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
      <template #title>
        <icon-question />
        判断题
      </template>
      <a-space direction="vertical">
        <div>
          <span v-html="qContent"></span>
        </div>
        <div>
          <a-space direction="vertical">
            <span>{{ `对：${qOption.t}` }}</span>
            <span>{{ `错：${qOption.f}` }}</span>
          </a-space>
        </div>
        <div>
          <a-space>
            <span style="color: red">答案：</span>
            <span>{{ qAnswer }}</span>
          </a-space>
        </div>
      </a-space>
    </a-modal>
    <a-modal v-if="qType === 2" v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
      <template #title>
        <icon-select-all />
        综合题
      </template>
      <a-space direction="vertical">
        <div>
          <span v-html="qContent"></span>
        </div>
        <div>
          <a-space>
            <span style="color: red">答案：</span>
            <span>{{ qAnswer }}</span>
          </a-space>
        </div>
      </a-space>
    </a-modal>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { QuestionService } from '@/api/QuestionService'
import moment from 'moment'
import { useRouter } from 'vue-router'
import { req } from '@/axios'
import { Message } from '@arco-design/web-vue'

const router = useRouter()
const qType = ref(0)
const qContent = ref('')
const qAnswer = ref('')
const qOption = ref({
  a: '',
  b: '',
  c: '',
  d: '',
  t: '',
  f: ''
})
const visible = ref(false)
const pageConfig = ref({
  currentPage: 1,
  pageSize: 0,
  total: 0
})
const columns = [
  {
    title: '试题编号',
    dataIndex: 'questionId',
    align: ['center'],
    ellipsis: true,
    tooltip: true
  },
  {
    title: '试题类型',
    dataIndex: 'questionType',
    align: ['center'],
    ellipsis: true,
    tooltip: true,
    slotName: 'type',
    filterable: {
      filters: [
        {
          text: '选择题',
          value: 0
        },
        {
          text: '判断题',
          value: 1
        },
        {
          text: '综合题',
          value: 2
        }
      ],
      filter: (value: any, row: any) => row.questionType == value
    }
  },
  {
    title: '试题科目',
    dataIndex: 'subName',
    align: ['center'],
    ellipsis: true,
    tooltip: true,
    filterable: {
      filters: [
        {
          text: '高等数学',
          value: '高等数学'
        },
        {
          text: '计算机网络',
          value: '计算机网络'
        },
      ],
      filter: (value: any, row: any) => row.subName.includes(value)
    }
  },
  {
    title: '试题内容',
    dataIndex: 'questionContent',
    align: ['center'],
    ellipsis: true,
    tooltip: true
  },
  {
    title: '试题选项',
    dataIndex: 'questionOption',
    align: ['center'],
    ellipsis: true,
    tooltip: true,
    slotName: 'qOption'
  },
  {
    title: '试题答案',
    dataIndex: 'questionAnswer',
    align: ['center'],
    ellipsis: true,
    tooltip: true
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    align: ['center'],
    ellipsis: true,
    tooltip: true,
    slotName: 'time'
  },
  {
    title: 'Optional',
    slotName: 'optional',
    align: ['center'],
    fixed: 'right',
    width: 200
  }
]
const data = ref([])
const loadData = async () => {
  const pageData = await QuestionService.getQuestionList(1)
  data.value = pageData.records
  pageConfig.value.pageSize = parseInt(pageData.size)
  pageConfig.value.currentPage = parseInt(pageData.current)
  pageConfig.value.total = parseInt(pageData.total)
}

onMounted(() => {
  loadData()
})

const doView = (record: any) => {
  qType.value = record.questionType
  qContent.value = record.questionContent
  qOption.value = record.questionOption
  qAnswer.value = record.questionAnswer
  visible.value = true
}

const handleOk = () => {
  visible.value = false
}

const handleCancel = () => {
  visible.value = false
}

const createQuestion = () => {
  router.push('/createQuestion')
}

const doExit = (questionId: any) => {
  router.push({
    path: '/createQuestion',
    query: {
      questionId: questionId
    }
  })
}

const doDelete = async (questionId: any) => {
  const res: any = await req.post('/question/deleteQuestion', `questionId=${questionId}`)
  if (res.code === 0) {
    await loadData()
    Message.success("删除成功")
    return
  }
  Message.error("删除失败:" + res.message)
}

</script>

<style scoped>
#questionManageView {
}
</style>
