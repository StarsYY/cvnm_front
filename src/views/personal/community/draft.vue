<template>
  <div class="m-main">
    <div>
      <h3 class="c-col">我的草稿</h3>
      <div class="c-star">
        <span class="c-star-s">管理</span>
      </div>
    </div>
    <div v-if="total > 0" style="margin-top: 8px; margin-bottom: 120px">
      <div v-for="item in article" :key="item.id" class="dr-list">
        <div class="dr-top">
          <div style="overflow: hidden">
            <div class="dr-title">{{ item.title }}</div>
          </div>
          <div class="dr-svg">
            <svg-icon icon-class="ic_dele" style="width: 24px; height: 24px; cursor: pointer"></svg-icon>
          </div>
        </div>
        <div style="margin-top: 24px">
          <span class="dr-plate">{{ item.plate }}</span>
          <span class="dr-line"></span>
          <span class="dr-time">{{ item.createtime }}</span>
        </div>
      </div>
    </div>
    <div v-if="total === 0" class="a-nothing">
      <div style="height: 100px; margin-bottom: 8px">
        <svg-icon icon-class="nothing" style="font-size: 100px"></svg-icon>
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchDraft } from '@/api/personal'

export default {
  name: "Draft",
  data() {
    return {
      name: {
        name: ''
      },
      article: null,
      total: ''
    }
  },
  created() {
    this.getDraft(this.$route.params.name)
  },
  methods: {
    getDraft(name) {
      this.name.name = name
      fetchDraft(this.name).then(response => {
        console.log(response)
        this.article = response.data
        this.total = response.data.length
      })
    },
  }
}
</script>

<style scoped>
@import "~@/styles/draft.scss";

</style>
