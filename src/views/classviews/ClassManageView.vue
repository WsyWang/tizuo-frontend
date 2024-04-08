<template>
  <div id="classManageView">
    <a-button :style="{marginBottom: '10px'}" type="primary" @click="doCreateClass">
      <template #default>
        创建班级
      </template>
      <template #icon>
        <icon-plus />
      </template>
    </a-button>
    <a-form ref="queryRef" :model="queryParams" layout="inline">
      <a-form-item field="className" label="班级名称:">
        <a-input
          :style="{width: '200px'}"
          v-model="queryParams.className"
          placeholder="请输入班级名"
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
        <a-button @click="doQueryReset($refs.queryRef)">
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
          <a-button size="mini" type="primary" status="normal"
                    @click="openUpdateModal(record)">编辑
          </a-button>
          <a-button size="mini" type="primary" status="danger"
                    @click="doDelete(record.classId)">解散
          </a-button>
        </a-space>
      </template>
    </a-table>

    <a-modal v-model:visible="createVisible" title="创建班级" @cancel="handleCancel($refs.formRef)"
             @before-ok="handleBeforeOk($refs.formRef)">
      <a-form ref="formRef" :model="createFrom">
        <a-form-item field="className" label="班级名称:">
          <a-input :style="{width: '320px'}" v-model="createFrom.className" />
        </a-form-item>
        <a-form-item field="subName" label="学科名称:">
          <a-select v-model="createFrom.subName" :style="{width:'320px'}" placeholder="请选择学科">
            <a-option v-for="sub in subNameList" :key="sub.subId" :value="sub.subName">
              {{ sub.subName }}
            </a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model:visible="updateVisible" title="修改班级" @cancel="handleCancel($refs.formRef)"
             @before-ok="doUpdate($refs.updateFormRef)">
      <a-form ref="updateFormRef" :model="updateForm">
        <a-form-item field="className" label="班级名称:">
          <a-input :style="{width: '320px'}" v-model="updateForm.className" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ClassService } from '@/api/ClassService'
import { SubService } from '@/api/SubService'
import { Modal } from '@arco-design/web-vue'

const createVisible = ref(false)

const updateVisible = ref(false)

const updateForm = ref({
  classId: 0,
  className: ''
})

/**
 * 查询条件
 */
const queryParams = ref({
  className: '',
  subName: ''
})

const createFrom = ref({
  className: '',
  subName: ''
})

/**
 * 学科名列表
 */
const subNameList = ref<any>([])

const columns = [
  {
    title: '班级id',
    dataIndex: 'classId',
    align: ['center']
  },
  {
    title: '班级名称',
    dataIndex: 'className',
    align: ['center']
  },
  {
    title: '科目',
    dataIndex: 'subName',
    align: ['center']
  },
  {
    title: '班级口令',
    dataIndex: 'classKey',
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

const data = ref([])

const pageConfig = ref({
  currentPage: 1,
  pageSize: 10,
  total: 0
})

const loadData = async () => {
  const queryRequest = {
    ...queryParams.value,
    currentPage: pageConfig.value.currentPage
  }
  const page: any = await ClassService.getClassList(queryRequest)
  data.value = page.records
  pageConfig.value.pageSize = parseInt(page.size)
  pageConfig.value.total = parseInt(page.total)
}

const doQueryReset = (ref: any) => {
  ref.resetFields()
  loadData()
}

/**
 * 加载学科列表
 */
const loadSubNameList = async () => {
  subNameList.value = await SubService.getSubNameList()
}

onMounted(async () => {
  await loadData()
  await loadSubNameList()
})

const doPageChange = (page: number) => {
  pageConfig.value.currentPage = page
  loadData()
}

const doCreateClass = () => {
  createVisible.value = true
}
const handleBeforeOk = async (op: any) => {
  const res = await ClassService.createClass(createFrom.value)
  createVisible.value = false
  if (res) {
    await loadData()
    Modal.success({
      title: '创建班级成功',
      content: '班级口令为:' + res
    })
  }
  op.resetFields()
}
const handleCancel = (op: any) => {
  createVisible.value = false
  op.resetFields()
}

/**
 * 打开更新班级信息对话框
 * @param row
 */
const openUpdateModal = (row: any) => {
  updateForm.value.className = row.className
  updateForm.value.classId = row.classId
  updateVisible.value = true
}

/**
 * 更新班级信息
 * @param ref
 */
const doUpdate = async (ref: any) => {
  await ClassService.updateClass(updateForm.value)
  ref.resetFields()
  await loadData()
}

/**
 * 删除班级
 * @param classId
 */
const doDelete = async (classId: any) => {
  const deleteRequest = {
    classId: classId
  }
  await ClassService.deleteClass(deleteRequest)
  await loadData()
}

</script>

<style scoped>
#classManageView {
}


</style>
