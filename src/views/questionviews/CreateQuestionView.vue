<template>
  <div id="createQuestion">
    <a-form ref="formRef" :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item field="questionType" label="试题类型:">
        <a-select v-model="form.questionType" :style="{width:'320px'}" placeholder="请选择题目类型">
          <a-option :value=0>选择题</a-option>
          <a-option :value=1>判断题</a-option>
          <a-option :value=2>综合题</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="subName" label="试题科目:">
        <a-select v-model="form.subName" :style="{width:'320px'}" placeholder="请选择试题科目">
          <a-option value="高等数学">高等数学</a-option>
          <a-option value="计算机网络">计算机网络</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="questionContent" label="试题内容:">
        <a-textarea v-model="form.questionContent" :style="{width:'600px', height: '150px'}"></a-textarea>
      </a-form-item>
      <a-form-item v-if="form.questionType != 2" field="questionOption" label="试题选项:">
        <div v-if="form.questionType == 0">
          <a-space direction="vertical">
            <a-input v-model="form.questionOption.a" :style="{width:'320px'}" placeholder="选项A" allow-clear>
              <template #prepend>
                A
              </template>
            </a-input>
            <a-input v-model="form.questionOption.b" :style="{width:'320px'}" placeholder="选项B" allow-clear>
              <template #prepend>
                B
              </template>
            </a-input>
            <a-input v-model="form.questionOption.c" :style="{width:'320px'}" placeholder="选项C" allow-clear>
              <template #prepend>
                C
              </template>
            </a-input>
            <a-input v-model="form.questionOption.d" :style="{width:'320px'}" placeholder="选项D" allow-clear>
              <template #prepend>
                D
              </template>
            </a-input>
          </a-space>
        </div>
        <div v-if="form.questionType == 1">
          <a-space direction="vertical">
            <a-input v-model="form.questionOption.t" :style="{width:'320px'}" placeholder="正确选项" allow-clear>
              <template #prepend>
                对
              </template>
            </a-input>
            <a-input v-model="form.questionOption.f" :style="{width:'320px'}" placeholder="错误选项" allow-clear>
              <template #prepend>
                错
              </template>
            </a-input>
          </a-space>
        </div>
      </a-form-item>
      <a-form-item field="questionAnswer" label="试题答案:">
        <div v-if="form.questionType == 0">
          <a-select v-model="form.questionAnswer" :style="{width:'320px'}" placeholder="请选择试题答案">
            <a-option value=a>A</a-option>
            <a-option value=b>B</a-option>
            <a-option value=c>C</a-option>
            <a-option value=d>D</a-option>
          </a-select>
        </div>
        <div v-if="form.questionType == 1">
          <a-select v-model="form.questionAnswer" :style="{width:'320px'}" placeholder="请选择试题答案">
            <a-option value=t>对</a-option>
            <a-option value=f>错</a-option>
          </a-select>
        </div>
        <div v-if="form.questionType == 2">
          <a-textarea v-model="form.questionAnswer" :style="{width:'475px', height: '150px'}"></a-textarea>
        </div>
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button v-if="isEdit" type="primary" @click="doExit">修改</a-button>
          <a-button v-else type="primary" html-type="submit">创建</a-button>
          <a-button type="primary" @click="doReset($refs.formRef)">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { req } from '@/axios'
import { useRoute, useRouter } from 'vue-router'
import { Message } from '@arco-design/web-vue'

const router = useRouter()

const route = useRoute()

const form = ref({
  questionAnswer: '',
  questionContent: '',
  questionOption: {
    a: '',
    b: '',
    c: '',
    d: '',
    t: '',
    f: ''
  },
  questionType: 0,
  subName: ''
})

const isEdit = ref(false)

const loadData = async () => {
  if (route.query.questionId) {
    const res: any = await req.get('/question/getQuestion', {
      params: {
        questionId: route.query.questionId
      }
    })
    if (res.code === 0) {
      form.value = res.data
      isEdit.value = true
    } else {
      await router.replace('/question')
      Message.error("编辑失败:" + res.message)
    }
  }
  return
}

onMounted(() => {
  loadData()
})

const handleSubmit = async () => {
  let submitForm = {
    ...form.value,
    questionOption: JSON.stringify(form.value.questionOption)
  }
  const res: any = await req.post('/question/createQuestion', submitForm)
  if (res.code === 0) {
    await router.push('/question')
    Message.success("创建成功")
    return
  }
  Message.error("创建失败:" + res.message)
}

const doReset = (res: any) => {
  res.resetFields()
}

const doExit = async () => {
  const res: any = await req.post('/question/updateQuestion', {
    ...form.value,
    questionOption: JSON.stringify(form.value.questionOption)
  })
  if (res.code === 0) {
    await router.replace("/question")
    Message.success("修改成功")
  } else {
    Message.error("修改失败:" + res.message)
  }
}

</script>

<style scoped>
#createQuestion {
}
</style>
