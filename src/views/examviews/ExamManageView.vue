<template>
  <div id="examManageView">
    <a-button :style="{marginBottom: '10px'}" type="primary" @click="visible = true">
      <template #default>
        创建考试
      </template>
      <template #icon>
        <icon-plus />
      </template>
    </a-button>
    <a-form ref="queryRef" :model="queryParams" layout="inline">
      <a-form-item field="examName" label="考试名称:">
        <a-input
          v-model="queryParams.examName"
          :style="{width: '200px'}"
          placeholder="请输入考试名称"
        />
      </a-form-item>
      <a-form-item field="subName" label="科目:">
        <a-select v-model="queryParams.subName" :style="{width: '200px'}" placeholder="请选择科目">
          <a-option v-for="item in subList" :key="item.subId" :value="item.subName">
            {{ item.subName }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-button-group type="primary">
        <a-button @click="loadData">
          <template #icon>
            <icon-search />
          </template>
        </a-button>
        <a-button @click="doReset($refs.queryRef)">
          <template #icon>
            <icon-refresh />
          </template>
        </a-button>
      </a-button-group>
    </a-form>
    <a-table
      stripe
      :columns="columns"
      :data="columnsData"
      :pagination="{
        pageSize: queryParams.pageSize,
        current: queryParams.currentPage,
        total: queryParams.total,
        showTotal: true
      }"
      @pageChange="(page: number) => {pageChange(page)}"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button size="mini" type="text" status="normal"
          >编辑
          </a-button>
          <a-button :disabled="record.examStatus === 1" size="mini" type="text" status="danger"
          >删除
          </a-button>
        </a-space>
      </template>
      <template #examStatus="{ record }">
        <a-tag v-if="record.examStatus === 0" color="red">
          未开始
        </a-tag>
        <a-tag v-if="record.examStatus === 1" color="green">
          进行中
        </a-tag>
        <a-tag v-if="record.examStatus === 2" color="gray">
          已结束
        </a-tag>
      </template>
    </a-table>
    <a-drawer :width="600"
              :visible="visible"
              @ok="handleOk"
              @cancel="handleCancel($refs.createFromRef)"
              unmountOnClose>
      <template #title>
        创建考试
      </template>
      <a-form ref="createFromRef" :model="examForm">
        <a-form-item field="examName" label="考试名称:">
          <a-input v-model="examForm.examName" placeholder="请输入考试名称"></a-input>
        </a-form-item>
        <a-form-item field="subName" label="考试科目:">
          <a-select v-model="examForm.subName" :style="{width: '200px'}" placeholder="请选择科目">
            <a-option v-for="item in subList" :key="item.subId" :value="item.subName">
              {{ item.subName }}
            </a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="paperId" label="选择试卷:">
          <a-button @click="doPickPaper" :style="{width: '100px'}" type="primary">
            <template #icon>
              <icon-plus />
            </template>
          </a-button>
        </a-form-item>
        <a-form-item field="classid" label="选择班级:">
          <a-button @click="doPickClass" :style="{width: '100px'}" type="primary">
            <template #icon>
              <icon-plus />
            </template>
          </a-button>
        </a-form-item>
        <a-form-item field="examStartTime" label="开始时间:">
          <a-date-picker v-model="examForm.examStartTime" style="width: 200px;" />
        </a-form-item>
        <a-form-item field="examEndTime" label="结束时间:">
          <a-date-picker v-model="examForm.examEndTime" style="width: 200px;" />
        </a-form-item>
        <a-form-item field="examDurationTime" label="考试时长:">
          <a-time-picker v-model="examForm.examDurationTime" placeholder="请选择考试时长" style="width: 200px;" />
        </a-form-item>
      </a-form>
    </a-drawer>
    <a-modal width="800px" v-model:visible="pickPaper" @ok="pickPaperOk" @cancel="pickPaperCancel">
      <template #title>
        选择试卷
      </template>
      <a-form layout="inline" ref="paperTable" :model="paperTableQueryParams">
        <a-form-item>
          <a-button-group>
            <a-button @click="getMyPaper">
              我的试卷
              <template #icon>
                <icon-user />
              </template>
            </a-button>
            <a-button @click="resetPaperTable()">
              <template #icon>
                <icon-refresh />
              </template>
            </a-button>
          </a-button-group>
        </a-form-item>
        <a-form-item></a-form-item>
      </a-form>
      <a-table @select="(rowKeys, rowKey) => {console.log(rowKey)}" row-key="paperId" :row-selection="selectRow" :scroll="{y: 200}" :columns="paperColumns" :data="paperTableData">
        <template #optional="{record}">
          <a-button @click="ev => {console.log(record)}" type="text">预览</a-button>
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script setup lang="ts">

import { computed, onMounted, ref } from 'vue'
import { req } from '@/axios'
import { Message } from '@arco-design/web-vue'
import { userCurrentUserStore } from '@/stores/currentUser'

//var
const userStore = userCurrentUserStore()

/**
 * 创建考试表单
 */
const examForm = ref({
  classid: 0,
  examDurationTime: '',
  examEndTime: '',
  examName: '',
  examStartTime: '',
  paperId: 0,
  subName: ''
})

/**
 * 选择试卷表格获取参数
 */
const paperTableQueryParams = ref({
  teacherId: 0,
  subName: computed(() => examForm.value.subName)
})

/**
 * 选择试卷表格数据
 */
const paperTableData = ref([])

/**
 * 选择试卷表格列
 */
const paperColumns = [
  {
    title: '试卷编号',
    dataIndex: 'paperId',
    align: ['center'],
    tooltip: true,
    ellipsis: true,
    width: 200
  },
  {
    title: '科目',
    dataIndex: 'subName',
    align: ['center'],
    width: 100
  },
  {
    title: '总分',
    dataIndex: 'totalScore',
    align: ['center'],
    width: 100
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: ['center'],
    width: 150
  },
  {
    title: '操作',
    slotName: 'optional',
    align: ['center'],
    width: 100
  }
]

/**
 * 选择班级列表
 */
const classList = ref([])

const pickClass = ref(false)

const pickPaper = ref(false)

const visible = ref(false)

const subList: any = ref([])

const selectRow = ref({
  type: 'radio'
})

//methods

/**
 * 获取试卷表格数据方法
 */
const getPaperList = async () => {
  const res: any = await req.post('/paper/get_paper_list_no_page', paperTableQueryParams.value)
  if (res.code === 0) {
    paperTableData.value = res.data
    return
  }
  Message.error('试卷获取失败:' + res.message)
}

const handleOk = () => {
  visible.value = false
}

const handleCancel = (ref: any) => {
  ref.resetFields()
  visible.value = false
}

const doPickPaper = () => {
  getPaperList()
  pickPaper.value = true
}

const doPickClass = () => {
  pickClass.value = true
}

const queryParams = ref({
  currentPage: 1,
  pageSize: 6,
  examName: '',
  subName: '',
  total: 0
})

const columnsData = ref([])

const columns = [
  {
    title: '考试编号',
    dataIndex: 'examId',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '考试名称',
    dataIndex: 'examName',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '考试科目',
    dataIndex: 'subName',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '考试班级',
    dataIndex: 'className',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '考试时长',
    dataIndex: 'examDurationTime',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '开始时间',
    dataIndex: 'examStartTime',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '结束时间',
    dataIndex: 'examEndTime',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '考试状态',
    dataIndex: 'examStatus',
    slotName: 'examStatus',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '操作',
    fixed: 'right',
    slotName: 'optional',
    align: ['center'],
    width: 200
  }
]

const loadData = async () => {
  //获取科目列表
  const subNameRes: any = await req.get('/sub/getSubName')
  if (subNameRes.code === 0) {
    subList.value = subNameRes.data
  } else {
    Message.error('获取科目列表失败:' + subNameRes.message)
    return
  }
  //获取考试列表
  const examListRes: any = await req.post('/exam/get-examList-teacher', {
    ...queryParams.value
  })
  if (examListRes.code === 0) {
    columnsData.value = examListRes.data.records
    queryParams.value.pageSize = parseInt(examListRes.data.size)
    queryParams.value.currentPage = parseInt(examListRes.data.current)
    queryParams.value.total = parseInt(examListRes.data.total)
  } else {
    Message.error('获取考试列表失败:' + examListRes.message)
    return
  }

}

const pageChange = (page: number) => {
  queryParams.value.currentPage = page
  loadData()
}

onMounted(async () => {
  await loadData()
})

const doReset = (ref: any) => {
  ref.resetFields()
  loadData()
}

const pickPaperCancel = () => {
  pickPaper.value = false
}

const pickPaperOk = () => {
  pickPaper.value = false
}

const getMyPaper = () => {
  paperTableQueryParams.value.teacherId = userStore.currentUser.id
  getPaperList()
}

const resetPaperTable = () => {
  paperTableQueryParams.value.teacherId = 0
  getPaperList()
}

</script>

<style scoped>
#examManageView {
}
</style>
