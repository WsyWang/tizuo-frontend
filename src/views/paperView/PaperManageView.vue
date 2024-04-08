<template>
  <div id="paperManageView">
    <a-space>
      <a-button @click="() => router.push('/createPaper')" :style="{marginBottom: '10px'}" type="primary">
        <template #default>
          创建试卷
        </template>
        <template #icon>
          <icon-plus />
        </template>
      </a-button>
      <a-button :style="{marginBottom: '10px'}" type="primary" @click="viewMyPaper($notification)">
        <template #default>
          我的试卷
        </template>
        <template #icon>
          <icon-user />
        </template>
      </a-button>
    </a-space>
    <a-form ref="queryRef" :model="queryParams" layout="inline">
      <a-form-item field="className" label="试卷编号:">
        <a-input-number
          :style="{width: '200px'}"
          v-model="queryParams.paperId"
          placeholder="请输入试卷编号"
        />
      </a-form-item>
      <a-form-item field="subName" label="科目:">
        <a-select :style="{width: '200px'}" v-model="queryParams.subName" placeholder="请选择科目">
          <a-option v-for="sub in subNameList" :key="sub.subId" :value="sub.subName">
            {{ sub.subName }}
          </a-option>
        </a-select>
      </a-form-item>
      <a-button-group type="primary">
        <a-button @click="loadData">
          <template #icon>
            <icon-search />
          </template>
        </a-button>
        <a-button @click="doQueryReset($refs.queryRef, $notification)">
          <template #icon>
            <icon-refresh />
          </template>
        </a-button>
      </a-button-group>
    </a-form>
    <a-table
      stripe
      :columns="columns"
      :data="data"
      :pagination="{
        showTotal: true,
        pageSize: pageConfig.pageSize,
        current: pageConfig.currentPage,
        total: pageConfig.total
      }"
      @page-change="doPageChange"
    >
      <template #optional="{ record }">
        <a-space>
          <a-button size="mini" type="primary" status="normal">
            编辑
          </a-button>
          <a-button size="mini" type="primary" status="danger">
            删除
          </a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import { SubService } from '@/api/SubService'
import { PaperService } from '@/api/PaperService'
import { userCurrentUserStore } from '@/stores/currentUser'
import { useRouter } from 'vue-router'

const store = userCurrentUserStore()

const router = useRouter()

/**
 * 查询条件
 */
const queryParams = ref({
  paperId: undefined,
  subName: '',
  teacherId: undefined,
})

/**
 * 学科名列表
 */
const subNameList = ref<any>([])

/**
 * 表格列
 */
const columns = [
  {
    title: '试卷编号',
    dataIndex: 'paperId',
    align: ['center']
  },
  {
    title: '科目',
    dataIndex: 'subName',
    align: ['center']
  },
  {
    title: '总分',
    dataIndex: 'totalScore',
    align: ['center']
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    align: ['center']
  },
  {
    title: '操作',
    fixed: 'right',
    slotName: 'optional',
    align: ['center'],
    width: 200
  }
]

/**
 * 初始数据
 */
const data = ref([])

/**
 * 分页配置
 */
const pageConfig = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

/**
 * 加载数据
 */
const loadData = async () => {
  const queryRequest = {
    ...queryParams.value,
    currentPage: pageConfig.value.currentPage
  }
  const page: any = await PaperService.getPaperList(queryRequest)
  data.value = page.records
  pageConfig.value.pageSize = parseInt(page.size)
  pageConfig.value.total = parseInt(page.total)
}

/**
 * 浏览我的试卷
 */
const viewMyPaper = (notification: any) => {
  queryParams.value.teacherId = store.currentUser.id
  notification.success('切换到我的试卷')
  loadData();
}

/**
 * 清空查询条件
 * @param ref
 * @param notification
 */
const doQueryReset = (ref: any, notification: any) => {
  ref.resetFields()
  queryParams.value.teacherId = undefined
  notification.success('切换到全部试卷！')
  loadData()
}

/**
 * 加载学科列表
 */
const loadSubNameList = async () => {
  subNameList.value = await SubService.getSubNameList()
}

/**
 * 挂载组件时运行
 */
onMounted(async () => {
  await loadData()
  await loadSubNameList()
})

/**
 *分页改变
 * @param page
 */
const doPageChange = (page: number) => {
  pageConfig.value.currentPage = page
  loadData()
}
</script>

<style scoped>
#paperManageView {
}
</style>
