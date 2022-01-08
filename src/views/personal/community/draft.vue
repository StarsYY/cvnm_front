<template>
  <div class="m-main">
    <div>
      <h3 class="c-col">我的草稿</h3>
      <div class="c-star">
        <span class="c-star-s">管理</span>
      </div>
    </div>
    <div style="margin-top: 8px; margin-bottom: 120px">
      <div class="dr-list">
        <div class="dr-top">
          <div style="overflow: hidden">
            <div class="dr-title">草稿标题</div>
          </div>
          <div class="dr-svg">
            <svg-icon icon-class="ic_dele" style="width: 24px; height: 24px; cursor: pointer"></svg-icon>
          </div>
        </div>
        <div style="margin-top: 24px">
          <span class="dr-plate">综合板块</span>
          <span class="dr-line"></span>
          <span class="dr-time">2022/01/06 21:23:02</span>
        </div>
      </div>
      <div class="dr-list">
        <div class="dr-top">
          <div style="overflow: hidden">
            <div class="dr-title">草稿标题</div>
          </div>
          <div class="dr-svg">
            <svg-icon icon-class="ic_dele" style="width: 24px; height: 24px; cursor: pointer"></svg-icon>
          </div>
        </div>
        <div style="margin-top: 24px">
          <span class="dr-plate">综合板块</span>
          <span class="dr-line"></span>
          <span class="dr-time">2022/01/06 21:23:02</span>
        </div>
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
    }
  },
  methods: {
  }
}
</script>

<style scoped>
@import "~@/styles/draft.scss";

</style>
