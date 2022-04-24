<template>
  <div class="m-main">
    <div>
      <h3 v-if="isLog" class="c-col">我的文章</h3>
      <h3 v-if="!isLog" class="c-col">TA的文章</h3>
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
        <div v-if="isLog" class="r-del" @click="delReply(item.id)">
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
    <div class="index-more" :class="{ 'hidden-more' : hideMore }">
      <el-button class="index-more-btn" plain round @click="showMore">查看更多</el-button>
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
import { fetchReply, deleteMyReply } from '@/api/personal'
import { deleteHTML } from '@/utils/tool'
import { ElMessage, ElMessageBox } from 'element-plus'
import Cookie from 'js-cookie'

export default {
  name: "Reply",
  data() {
    return {
      listQuery: {
        username: '',
        page: 0,
        limit: 20,
      },
      commentId: {
        id: ''
      },
      comment: null,
      isLog: true,
      total: 0,
      hideMore: true
    }
  },
  created() {
    if(this.$route.params.name === Cookie.get("nickname")) {
      this.isLog = true
    } else {
      this.isLog = false
    }

    this.listQuery.username = this.$route.params.name
    this.getReply()
  },
  methods: {
    getReply() {
      fetchReply(this.listQuery).then(response => {
        if(response.data.length < 20) {
          this.hideMore = true
        } else {
          this.hideMore = false
        }
        if(this.comment !== null) {
          this.comment = this.comment.concat(response.data)
        } else {
          this.comment = response.data
        }
        this.total = this.total + response.data.length

        this.comment.forEach(item => {
          item.comment = deleteHTML(item.comment)
          if(item.cm !== null) {
            item.cm.comment = deleteHTML(item.cm.comment)
          }
        })
      })
    },
    delReply(id) {
      ElMessageBox.confirm(
        '你确定要删除这条回复及以下的评论嘛?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }
      ).then(() => {
        this.commentId.id = id
        deleteMyReply(this.commentId).then(response => {
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
          let ids = response.data
          for (let index = 0; index < ids.length; index++) {
            this.comment.some((item, i) => {
              if(ids[index] === item.id) {
                this.comment.splice(i, 1)
              }
            })
          }
        })
      })
    },
    showMore() {
      this.listQuery.page = this.listQuery.page + 1
      this.getReply()
    }
  }
}
</script>

<style scoped>
@import "~@/styles/reply.scss";

.index-more >>> .el-button.is-round {
  border-radius: 24px;
}

.index-more >>> .el-button.is-round:hover, .index-more >>> .el-button.is-round:active, .index-more >>> .el-button.is-round:focus {
  color: #333;
  border-color: #333;
}

.hidden-more {
  display: none;
}
</style>
