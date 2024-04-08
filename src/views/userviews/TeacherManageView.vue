<template>
  <div id="teacherManageView">
    <a-table stripe :columns="columns" :data="data">
      <template #optional="{ record }">
        <a-space>
          <a-button size="mini" type="primary" status="normal"
                    @click="$modal.info({ title:'Name', content:record.userName })">编辑
          </a-button>
          <a-button size="mini" type="primary" status="danger"
                    @click="$modal.info({ title:'Name', content:record.name })">删除
          </a-button>
          <a-button size="mini" type="primary" status="warning"
                    @click="$modal.info({ title:'Name', content:record.name })">封号
          </a-button>
        </a-space>
      </template>
      <template #status="{ record }">
        <a-tag v-if="record.userStatus === 'normal'" color="green">正常</a-tag>
        <a-tag v-else color="red">封号</a-tag>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getTeacherList } from '@/api/getTeacherList'

const data = ref([])
const columns = [
  {
    title: 'id',
    dataIndex: 'id',
    align: ['center'],
    ellipsis: true,
    tooltip: true
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
    align: ['center'],
    ellipsis: true,
    tooltip: true
  },
  {
    title: '姓名',
    dataIndex: 'userName',
    align: ['center'],
    ellipsis: true,
    tooltip: true
  },
  {
    title: '性别',
    dataIndex: 'userGender',
    align: ['center'],
    ellipsis: true,
    tooltip: true
  },
  {
    title: '身份证',
    dataIndex: 'userIdentityCard',
    align: ['center'],
    ellipsis: true,
    tooltip: true
  },
  {
    title: '手机号',
    dataIndex: 'userPhone',
    align: ['center'],
    ellipsis: true,
    tooltip: true
  },
  {
    title: '邮箱',
    dataIndex: 'userEmail',
    align: ['center'],
    ellipsis: true,
    tooltip: true
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    align: ['center'],
    slotName: 'status',
    ellipsis: true,
    tooltip: true
  },
  {
    title: '班级',
    dataIndex: 'classIdList',
    align: ['center'],
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

onMounted(async () => {
  data.value = await getTeacherList(1)
})

</script>

<style scoped>
#teacherManageView {
}
</style>
