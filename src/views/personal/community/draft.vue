<template>
  <div class="m-main">
    <div>
      <h3 class="c-col">我的草稿</h3>
      <div class="c-star">
        <span class="c-star-s">管理</span>
      </div>
    </div>
    <div class="a-nothing">
      <div style="height: 100px; margin-bottom: 8px">
        <svg-icon icon-class="nothing" style="font-size: 100px"></svg-icon>
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      one: true,
      two: false
    }
  },
  methods: {
    select(val) {
      if (val === 0) {
        this.one = true
        this.two = false
      } else {
        this.one = false
        this.two = true
      }
    }
  }
}
</script>

<style scoped>
@import "~@/styles/message.scss";
@import "~@/styles/article.scss";

</style>
