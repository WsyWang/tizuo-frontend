<template>
  <div id="createPaperView">
    <a-form v-model="createFrom" :style="{ width: '600px' }">
      <a-form-item field="subName" label="试卷科目:">
        <a-select :style="{width: '320px'}">
          <a-option>高等数学</a-option>
          <a-option>计算机网络</a-option>
        </a-select>
      </a-form-item>
      <a-form-item label="选择题:" :content-flex="false" :merge-props="false">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-form-item no-style>
              <a-input-number mode="button"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="分数:">
              <a-input-number :style="{width: '115px'}" mode="button"></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="判断题:" :content-flex="false" :merge-props="false">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-form-item no-style>
              <a-input-number mode="button"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="分数:">
              <a-input-number :style="{width: '115px'}" mode="button"></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item label="综合题:" :content-flex="false" :merge-props="false">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-form-item no-style>
              <a-input-number mode="button"></a-input-number>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="分数:">
              <a-input-number :style="{width: '115px'}" mode="button"></a-input-number>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-space direction="vertical">
          <a-button type="primary">
            选择题
            <template #icon>
              <icon-plus-circle-fill />
            </template>
          </a-button>
          <a-list>
            <a-list-item>
              <a-list-item-meta
                title="以下选项正确的是:"
                description="A.水是液体 B.空气是液体 C.钢铁是液体 D.杯子是液体"
              >
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-space>
      </a-form-item>
      <a-form-item>
        <a-button type="primary">
          判断题
          <template #icon>
            <icon-plus-circle-fill />
          </template>
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary">
          综合题
          <template #icon>
            <icon-plus-circle-fill />
          </template>
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" status="warning">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const createFrom = ref({

})
</script>

<style scoped>
#createPaperView {
}
</style>
