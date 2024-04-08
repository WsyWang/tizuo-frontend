<template>
  <div id="startExamView">
    <div>
      <a-space direction="vertical">
        <a-descriptions style="width: 30vw" bordered :data="data" :size="'large'" title="考试详情" :column="1" />
        <a-button long @click="doStartExam(examDetail.examId)" type="primary" :disabled="buttonStatus.disable" >{{ buttonStatus.status }}</a-button>
      </a-space>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ExamService } from '@/api/ExamService'

const examDetail = ref<any>({})

const buttonStatus = ref({
  disable: true,
  status: '未开始'
})

const data = computed(() => [
  {
    label: '考试名称',
    value: examDetail.value.examName
  },
  {
    label: '考试科目',
    value: examDetail.value.subName
  },
  {
    label: '教师',
    value: examDetail.value.teacherName
  },
  {
    label: '班级',
    value: examDetail.value.className
  },
  {
    label: '考试时长',
    value: examDetail.value.examDurationTime
  },
  {
    label: '开始时间',
    value: examDetail.value.examStartTime
  },
  {
    label: '结束时间',
    value: examDetail.value.examEndTime
  }
])

const router = useRouter()

const route = useRoute()

const toggleFullScreen = async () => {
  const elem = document.documentElement
  try {
    if (elem.requestFullscreen) {
      await elem.requestFullscreen()
    }
  } catch (error) {
    if (!document.fullscreenElement) {
      await router.replace('/exam/joinExam')
    }
  }
}

const handleFullScreenChange = () => {
  if (!document.fullscreenElement) {
    router.replace('/exam/joinExam')
  }
}

const loadData = async () => {
  examDetail.value = await ExamService.getStartExamDetail(route.query.examId)
  examDetail.value.answerStatus = await ExamService.getPaperIsSubmit(route.query.examId)

}

const judgeButtonStatus = () => {
  if (examDetail.value.answerStatus) {
    buttonStatus.value.status = '已答卷'
    buttonStatus.value.disable = true
    return
  }
  if (examDetail.value.examStatus === 1) {
    buttonStatus.value.status = '开始考试'
    buttonStatus.value.disable = false
  }
  if (examDetail.value.examStatus === 2) {
    buttonStatus.value.status = '已结束'
    buttonStatus.value.disable = true
  }
}

onMounted(async () => {
  await loadData()
  judgeButtonStatus()
  await toggleFullScreen()
  document.addEventListener('fullscreenchange', handleFullScreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullScreenChange)
})

const doStartExam = async (examId: any) => {
  const res:any = await ExamService.createPaperSubmit(examId)
  if (!res) {
    await router.replace('/exam/joinExam')
    return
  }
  await router.replace({
    path: '/doExam',
    query: {
      submitId: res,
      examId: examId
    }
  })
}



</script>

<style scoped>
#startExamView {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
