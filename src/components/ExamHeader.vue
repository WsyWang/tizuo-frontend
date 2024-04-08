<template>
  <div id="examHeader">
    <a-row :wrap="false" align="center">
      <a-col flex="auto">
        <div class="title-bar">
          <div class="titleName">{{data.examName}}</div>
          <div class="subName">科目：{{ data.subName }}</div>
        </div>
      </a-col>
      <a-col flex=1>
        <a-space>
          <icon-clock-circle style="font-size: 26px; stroke-linejoin: bevel;" />
          <a-countdown
            :value="now + data.examDurationTime"
            :now="now"
            :value-style=style
            @finish="handleFinish"
          />
        </a-space>
      </a-col>
      <a-col flex=1>
        您好，{{store.currentUser.userName}}
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">

import { Message } from '@arco-design/web-vue'
import { onMounted, ref } from 'vue'
import { userCurrentUserStore } from '@/stores/currentUser'
import { useRoute } from 'vue-router'
import { ExamService } from '@/api/ExamService'

const store = userCurrentUserStore()

const route = useRoute();

const data = ref({
  examDurationTime: 1000 * 60 * 60 * 1.5,
  examName: '考试名称',
  subName: '考试科目'
})

const now = Date.now()

const style = {
  color: '#ffffff',
  fontSize: '20px'
}

const loadData = async () => {
  data.value = await ExamService.getExamInfo(route.query.examId)
}

onMounted(async () => {
  await loadData()
  Message.success("开始考试")
})

const handleFinish = () => {
  Message.success('计时结束！')
}

</script>

<style scoped>
#examHeader {
  border-bottom: #eeeeee 1px solid;
  box-shadow: #eeeeee 1px 5px 5px;
  background: rgb(var(--arcoblue-5));
  color: #FFFFFF;
}

#examHeader .title-bar {
  display: flex;
  align-items: center;
  height: 48px;
  padding-left: 20px
}

#examHeader .title-bar .titleName {
  font-size: 20px;
  margin-right: 20px;
  font-weight: 800
}

#examHeader .title-bar .subName {
  opacity: 0.7
}

</style>
