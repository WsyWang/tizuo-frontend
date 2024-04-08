<template>
  <div id="judgePaperView">
    <a-row style="height: 100%">
      <a-col flex=3 style="height:100%; padding-right: 20px; border-right: #eeeeee 1px solid">
        <a-tabs style="height: 100%" size="large" position="left" animation>
          <a-tab-pane style="font-size: 16px" :title="'题目1'">
            <a-space :size="30" :style="{width: '100%'}" direction="vertical">
              <div class="content" style="width: 90%; display: flex; justify-content: space-between">
                请你谈谈自己在大学期间的成长故事
                <div>
                  <a-tag color="red">题目分数：12分</a-tag>
                </div>
              </div>
              <div>
                <a-card title="学生答案">
                  在大学的第一年，我是一个相当害羞的学生，
                  对于新环境和新人际关系感到非常不适应。
                  我总是呆在自己的舒适区，很少与人交流，也不愿意参加校园活动。
                  然而，随着时间的推移，我开始意识到自己的局限性，
                  以及这种生活方式对我的成长和发展所构成的限制。
                </a-card>
              </div>
            </a-space>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col flex=1 style="padding-left: 30px">
        <a-form>
          <a-form-item label="打分" no-style>
            <a-input-number placeholder="请输入分数"></a-input-number>
          </a-form-item>
          <a-button long style="margin-top: 40px" type="primary">提交</a-button>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
#judgePaperView {
}
</style>
