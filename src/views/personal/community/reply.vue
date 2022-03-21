<template>
  <div class="m-main">
    <div>
      <h3 class="c-col">我的回复</h3>
    </div>
    <div style="height: 24px"></div>
    <div v-for="item in comment" :key="item.id" class="r-list">
      <div style="display: flex">
        <div class="r-user">
          <span class="r-name">
            <el-avatar :src="item.avatar" :size="32"></el-avatar>
            <span class="r-name">{{ item.username }}</span>
            <span v-if="item.cm !== null" class="r-time">{{ item.createtime }}</span>
          </span>
        </div>
        <div class="r-del">
          <svg-icon icon-class="ic_dele" style="width: 24px; height: 24px"></svg-icon>
        </div>
      </div>
      <div v-if="item.cm === null" class="r-art">
        <div class="r-title">
          <span style="opacity: .5" class="r-title">在{{ item.createtime }}评论了</span>
          {{ item.reviewName }} 的文章《{{ item.article }}》
        </div>
        <div class="r-art-main r-title">
          <div class="r-a-m">{{ item.comment }}</div>
        </div>
      </div>
      <div v-if="item.cm !== null" class="r-content">
        <div class="r-c-top">
          <span class="r-re-name">@{{ item.cm.username }}</span>
          <span style="margin-right: 5px"></span>
          <span class="r-re-main">{{ item.comment }}</span>
        </div>
        <div class="r-c-main">
          <div class="r-reply-name">@{{ item.cm.username }}</div>
          <div class="r-reply-text">
            <div class="r-reply-main">{{ item.cm.comment }}</div>
          </div>
          <div class="r-reply-time">{{ item.cm.createtime }}</div>
        </div>
      </div>
    </div>
    <div style="height: 100px"></div>
    <div v-if="total === 0" class="a-nothing">
      <div style="height: 100px; margin-bottom: 8px">
        <svg-icon icon-class="nothingMsg" style="font-size: 100px"></svg-icon>
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchReply } from '@/api/personal'
import { deleteHTML } from '@/utils/tool'

export default {
  name: "Reply",
  data() {
    return {
      name: {
        name: ''
      },
      comment: null,
      total: ''
    }
  },
  created() {
    this.getReply(this.$route.params.name)
  },
  methods: {
    getReply(name) {
      this.name.name = name
      fetchReply(this.name).then(response => {
        console.log(response)
        this.comment = response.data
        this.total = response.data.length

        this.comment.forEach(item => {
          item.comment = deleteHTML(item.comment)
          if(item.cm !== null) {
            item.cm.comment = deleteHTML(item.cm.comment)
          }
        });
      })
    },
  }
}
</script>

<style scoped>
@import "~@/styles/reply.scss";

</style>
