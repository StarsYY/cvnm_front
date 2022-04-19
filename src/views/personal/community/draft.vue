<template>
  <div class="m-main">
    <div>
      <h3 class="c-col">我的草稿</h3>
    </div>
    <div v-if="total > 0" style="margin-top: 8px; margin-bottom: 120px">
      <div v-for="item in article" :key="item.id" class="dr-list">
        <div class="dr-top">
          <div style="overflow: hidden">
            <div class="dr-title" @click="edit(item.id)">{{ item.title }}</div>
          </div>
          <div class="dr-svg" @click="delArticle(item.id)">
            <svg-icon icon-class="ic_dele" style="width: 24px; height: 24px; cursor: pointer"></svg-icon>
          </div>
        </div>
        <div style="margin-top: 24px">
          <span class="dr-plate">{{ item.plate }}</span>
          <span class="dr-line"></span>
          <span class="dr-time">{{ item.createtime }}</span>
        </div>
      </div>
      <div class="index-more" :class="{ 'hidden-more' : hideMore }">
        <el-button class="index-more-btn" plain round @click="showMore">查看更多</el-button>
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
import { fetchDraft, deleteMyDraft } from '@/api/personal'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: "Draft",
  data() {
    return {
      listQuery: {
        username: '',
        page: 0,
        limit: 20,
      },
      articleId: {
        id: ''
      },
      article: null,
      total: 0,
      hideMore: true
    }
  },
  created() {
    this.listQuery.username = this.$route.params.name
    this.getDraft()
  },
  methods: {
    getDraft() {
      fetchDraft(this.listQuery).then(response => {
        if(response.data.length < 20) {
          this.hideMore = true
        } else {
          this.hideMore = false
        }
        if(this.article !== null) {
          this.article = this.article.concat(response.data)
        } else {
          this.article = response.data
        }
        this.total = this.total + response.data.length
      })
    },
    edit(id) {
      this.$router.push({ name: 'CreateEdit', params: {id: id} })
    },
    delArticle(id) {
      ElMessageBox.confirm(
        '你确定要删除这篇草稿嘛?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }
      ).then(() => {
        this.articleId.id = id
        deleteMyDraft(this.articleId).then(() => {
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
          this.article.some((item, i) => {
            if(item.id === id) {
              this.article.splice(i, 1)
              return true
            }
          })
        })
      })
    },
    showMore() {
      this.listQuery.page = this.listQuery.page + 1
      this.getDraft()
    }
  }
}
</script>

<style scoped>
@import "~@/styles/draft.scss";

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
