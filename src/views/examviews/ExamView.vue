<template>
  <div id="examView">
    <a-row style="height: 100%">
      <a-col flex=3 style="height:100%; padding-right: 20px; border-right: #eeeeee 1px solid">
        <a-tabs style="height: 100%" size="large" position="left" @change="key => loadQuestion(key)" animation>
          <a-tab-pane style="font-size: 16px" v-for="(item, index) in questionIdList" :key="item"
                      :title="'题目' + (index + 1)">
            <div class="content" style="width: 90%">
              {{ questionContent }}
            </div>
            <div class="option" v-if="questionType != 2">
              <a-radio-group v-model="answer[index]" v-if="questionType === 0" direction="vertical">
                <a-radio value="a">{{ questionOption.a }}</a-radio>
                <a-radio value="b">{{ questionOption.b }}</a-radio>
                <a-radio value="c">{{ questionOption.c }}</a-radio>
                <a-radio value="d">{{ questionOption.d }}</a-radio>
              </a-radio-group>
              <a-radio-group v-model="answer[index]" v-if="questionType === 1" direction="vertical">
                <a-radio value="t">{{ questionOption.t }}</a-radio>
                <a-radio value="f">{{ questionOption.f }}</a-radio>
              </a-radio-group>
            </div>
            <div v-if="questionType === 2" style="margin-top: 40px">
              <a-textarea style="width: 100%; height: 40vh" v-model="answer[index]" placeholder="请输入答案" allow-clear />
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col flex=1 style="padding-left: 30px">
        <div class="video-container">
          <video ref="video" style="height: 100%; width: 100%" autoplay></video>
        </div>
        <a-button @click="doSubmit" long style="margin-top: 40px" type="primary">交卷</a-button>
      </a-col>
    </a-row>
    <a-modal v-model:visible="visible" @cancel="handleCancel" :on-before-ok="handleBeforeOk" unmountOnClose>
      <template #title>
        提示
      </template>
      <div>
        确定交卷吗？
      </div>
    </a-modal>

  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'
import { ExamService } from '@/api/ExamService'
import { newArray } from '@arco-design/web-vue/es/date-picker/utils'

const videoStream = ref()

const router = useRouter()

const video = ref()

const route = useRoute()

const examId = route.query.examId

const startQuestionId = ref()

const questionIdList = ref([])

const questionContent = ref()

const questionOption = ref({
  a: '',
  b: '',
  c: '',
  d: '',
  t: '',
  f: ''
})

const visible = ref(false)

const questionType = ref()

const loadData = async () => {
  const res = await ExamService.getQuestionList(examId)
  if (res) {
    questionIdList.value = res
  }
  startQuestionId.value = res[0]
}

const loadQuestion = async (questionId: any) => {
  const questionRes: any = await ExamService.getQuestion(questionId)
  console.log(answer.value)
  if (questionRes) {
    questionType.value = questionRes.questionType
    questionContent.value = questionRes.questionContent
    questionOption.value = questionRes.questionOption
  }
}

const startVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true })
    videoStream.value = stream
    video.value.srcObject = stream
  } catch (error) {
    stopVideo()
  }
}

const judgeFullScreen = async () => {
  try {
    await document.documentElement.requestFullscreen()
  } catch (error) {
    await router.replace('/exam/joinExam')
    Message.error('中止考试，已自动交卷')
  }
}

const doSubmit = () => {
  visible.value = true
}

const handleFullScreenChange = () => {
  Message.error('中止考试，已自动交卷')
  if (!document.fullscreenElement) {
    router.replace('/exam/joinExam')
  }
}

const stopVideo = () => {
  try {
    for (const track of videoStream.value.getTracks()) {
      track.stop()
    }
  } catch (error) {
    router.replace('/exam/joinExam')
  }
}

onMounted(async () => {
  await loadData()
  await loadQuestion(startQuestionId.value)
  await startVideo()
  // judgeFullScreen()
  document.addEventListener('fullscreenchange', handleFullScreenChange)
})

const answer = ref(newArray(questionIdList.value.length))

const handleBeforeOk = async () => {
  const res = await ExamService.submitPaper(examId, answer.value)
  if (res) {
    Message.success("提交成功！")
  }
  await router.replace("/exam/joinExam")
  return true;
};
const handleCancel = () => {
  visible.value = false;
}

onUnmounted(() => {
  stopVideo()
  document.removeEventListener('fullscreenchange', handleFullScreenChange)
  document.exitFullscreen()
})

</script>

<style scoped>
#examView {
  height: 100%;
  width: 100%;
}

#examView .video-container {
  width: 100%;
}

#examView .option {
  margin-top: 30px;
}

</style>
