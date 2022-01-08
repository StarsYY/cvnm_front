<template>
  <div class="m-main">
    <div>
      <h3 class="c-col">我的文章</h3>
      <div class="c-star">
        <span v-if="is" class="c-star-s" style="cursor: pointer" @click="is = !is, edit = !edit">完成管理</span>
        <span v-if="!is" class="c-star-s" style="cursor: pointer" @click="is = !is, edit = !edit">管理</span>
      </div>
    </div>
    <div class="a-article-list">
      <div style="width: 100%">
        <div :class="{ 'a-article-title-left' : is }" class="a-article-title">
          <div class="a-a-t">
            <span class="a-a-t-main">标题</span>
          </div>
        </div>
        <div :class="{ 'hidden' : edit }" class="a-article-title-right">
          <svg-icon icon-class="ic_edit" style="width: 24px; height: 24px"></svg-icon>
          <svg-icon icon-class="ic_dele" style="width: 24px; height: 24px; margin-left: 24px"></svg-icon>
        </div>
      </div>
      <div style="width: 100%">
        <div class="a-content">
          <span class="a-c-main">这是一段很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的简介</span>
        </div>
      </div>
      <div class="a-footer">
        <div class="a-f-left">
          <span class="a-footer-svg">
            <svg-icon icon-class="view" style="width: 20px; height: 20px"></svg-icon>
            9
          </span>
          <span class="a-footer-svg">
            <svg-icon icon-class="review" style="width: 20px; height: 20px"></svg-icon>
            9
          </span>
          <span class="a-footer-svg">
            <svg-icon icon-class="up" style="width: 20px; height: 20px"></svg-icon>
            9
          </span>
          <span class="a-footer-svg">
            <svg-icon icon-class="down" style="width: 15px; height: 15px"></svg-icon>
            9
          </span>
          <span class="a-footer-svg">
            <svg-icon icon-class="collection" style="width: 18px; height: 18px"></svg-icon>
            9
          </span>
        </div>
        <div class="a-f-right">
          <span class="a-f-plate">综合板块 | </span>
          <span class="a-f-time">2022/01/06 21:18:32</span>
        </div>
      </div>
    </div>
    <div style="height: 100px"></div>
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
      is: false,
      edit: true
    }
  },
  methods: {
  }
}
</script>

<style scoped>
@import "~@/styles/message.scss";
@import "~@/styles/article.scss";

</style>
