<template>
  <div id="myExamView">
    <a-grid :cols=3 :row-gap=12 :col-gap=24>
      <a-grid-item v-for="item in data" :key="item.examId">
        <a-card :style="{ width: '300px' }">
          <template #actions>
            <a-button @click="doExam(item.examId)" type="primary">开始考试</a-button>
          </template>
          <template #cover>
            <div
              :style="{
          height: '204px',
          overflow: 'hidden',
        }"
            >
              <img
                :style="{ width: '100%', transform: 'translateY(-20px)'}"
                alt="dessert"
                src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
              />
            </div>
          </template>
          <a-card-meta :title="item.examName" :description="`考试科目：${item.subName}`">
            <template #avatar>
              <div
                :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }"
              >
                <a-typography-text>教师：</a-typography-text>
                <a-typography-text>{{ item.teacherName }}</a-typography-text>
              </div>
            </template>
          </a-card-meta>
        </a-card>
      </a-grid-item>
    </a-grid>

  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ExamService } from '@/api/ExamService'
import router from '@/router'

const data: any = ref([])
const loadData = async () => {
  const resData = await ExamService.getMyExamList()
  data.value = resData
}

onMounted(() => {
  loadData()
})

const doExam = (examId: Number) => {
  router.push({
    path: '/startExamView',
    query: {
      examId: examId.toString()
    }
  })
}

</script>

<style scoped>
#myExamView {
}
</style>
