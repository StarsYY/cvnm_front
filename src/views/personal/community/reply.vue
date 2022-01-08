<template>
  <div class="m-main">
    <div>
      <h3 class="c-col">我的回复</h3>
    </div>
    <div style="height: 24px"></div>
    <div class="r-list">
      <div style="display: flex">
        <div class="r-user">
          <span class="r-name">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="32"></el-avatar>
            <span class="r-name">仰望星空</span>
            <span class="r-time">2022/01/07 23:35:48</span>
          </span>
        </div>
        <div class="r-del">
          <svg-icon icon-class="ic_dele" style="width: 24px; height: 24px"></svg-icon>
        </div>
      </div>
      <div class="r-content">
        <div class="r-c-top">
          <span class="r-re-name">@MOBI6817</span>
          <span class="r-re-main">👩</span>
        </div>
        <div class="r-c-main">
          <div class="r-reply-name">@MOBI6817</div>
          <div class="r-reply-text">
            <div class="r-reply-main">让我瞧一瞧</div>
          </div>
          <div class="r-reply-time">2022/01/07 23:33:25</div>
        </div>
      </div>
    </div>
    <div style="height: 100px"></div>
    <div class="a-nothing">
      <div style="height: 100px; margin-bottom: 8px">
        <svg-icon icon-class="nothingMsg" style="font-size: 100px"></svg-icon>
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
@import "~@/styles/reply.scss";

</style>
