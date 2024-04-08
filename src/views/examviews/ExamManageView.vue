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
    <a-form ref="queryRef" layout="inline">
      <a-form-item field="className" label="考试名称:">
        <a-input
          :style="{width: '200px'}"
          placeholder="请输入考试名称"
        />
      </a-form-item>
      <a-form-item field="subName" label="科目:">
        <a-select :style="{width: '200px'}" placeholder="请选择科目">
          <a-option>
            高等数学
          </a-option>
        </a-select>
      </a-form-item>
      <a-button-group type="primary">
        <a-button>
          <template #icon>
            <icon-search />
          </template>
        </a-button>
        <a-button>
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
    >
      <template #optional="{ record }">
        <a-space>
          <a-button size="mini" type="primary" status="normal"
                    >编辑
          </a-button>
          <a-button size="mini" type="primary" status="danger"
                    >删除
          </a-button>
        </a-space>
      </template>
    </a-table>

    <a-drawer :width="600" :visible="visible" @ok="handleOk" @cancel="handleCancel" unmountOnClose>
      <template #title>
        创建考试
      </template>
      <a-form>
        <a-form-item label="考试名称:">
          <a-input placeholder="请输入考试名称"></a-input>
        </a-form-item>
        <a-form-item label="考试科目:">
          <a-select placeholder="请选择考试科目">
            <a-option>高等数学</a-option>
          </a-select>
        </a-form-item>
        <a-form-item label="选择试卷:">
          <a-button :style="{width: '100px'}" type="primary">
            <template #icon>
              <icon-plus />
            </template>
          </a-button>
        </a-form-item>
        <a-form-item label="选择班级:">
          <a-button :style="{width: '100px'}" type="primary">
            <template #icon>
              <icon-plus />
            </template>
          </a-button>
        </a-form-item>
        <a-form-item label="开始时间:">
          <a-date-picker style="width: 200px;" />
        </a-form-item>
        <a-form-item label="结束时间:">
          <a-date-picker style="width: 200px;" />
        </a-form-item>
        <a-form-item label="考试时长:">
          <a-time-picker placeholder="请选择考试时长" style="width: 200px;" />
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'

const visible = ref(false)

const handleOk = () => {
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
}

const columns = [
  {
    title: '考试编号',
    dataIndex: 'examId',
    align: ['center'],
    ellipsis: true,
    tooltip: true,
  },
  {
    title: '考试名称',
    dataIndex: 'examName',
    align: ['center'],
    ellipsis: true,
    tooltip: true,
  },
  {
    title: '科目',
    dataIndex: 'subName',
    align: ['center'],
    ellipsis: true,
    tooltip: true,
  },
  {
    title: '考试时长',
    dataIndex: 'examDurationTime',
    align: ['center'],
    ellipsis: true,
    tooltip: true,
  },
  {
    title: '开始时间',
    dataIndex: 'examStartTime',
    align: ['center'],
    ellipsis: true,
    tooltip: true,
  },
  {
    title: '结束时间',
    dataIndex: 'examEndTime',
    align: ['center'],
    ellipsis: true,
    tooltip: true,
  },
  {
    title: '考试状态',
    dataIndex: 'examStatus',
    align: ['center'],
    ellipsis: true,
    tooltip: true,
  },
  {
    title: '操作',
    fixed: 'right',
    slotName: 'optional',
    align: ['center'],
    width: 200
  }
]

const data = [
  {
    examId:'1771751381927030786',
    examName: '计算机网络期中考试',
    subName: '计算机网络',
    examDurationTime: '2小时',
    examStartTime: '2024-03-22',
    examEndTime: '2024-04-01',
    examStatus:'已结束'
  }
]
</script>

<style scoped>
#examManageView {
}
</style>
