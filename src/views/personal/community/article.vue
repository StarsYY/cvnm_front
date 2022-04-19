<template>
  <div class="m-main">
    <div>
      <h3 v-if="isLog" class="c-col">我的文章</h3>
      <h3 v-if="!isLog" class="c-col">TA的文章</h3>
      <div v-if="isLog" class="c-star">
        <span v-if="is" class="c-star-s" style="cursor: pointer" @click="is = !is, edit = !edit">完成管理</span>
        <span v-if="!is" class="c-star-s" style="cursor: pointer" @click="is = !is, edit = !edit">管理</span>
      </div>
    </div>
    <div v-for="item in article" :key="item.id" class="a-article-list">
      <div style="width: 100%">
        <div :class="{ 'a-article-title-left' : is }" class="a-article-title">
          <a class="a-a-t">
            <span>
              <span v-if="item.hot == 'Top'" class="icon-top i-top"></span>
              <span v-else-if="item.hot == 'Hot'" class="icon-top i-hot"></span>
              <span class="a-a-t-main" @click="detail(item.id)">{{ item.title }}</span>
            </span>
            <div class="title-tag">
              <span v-if="item.tag === '推荐'" class="t r-color">推荐</span>
              <span v-if="item.tag === '精华'" class="t b-color">精华</span>
            </div>
          </a>
        </div>
        <div :class="{ 'hidden' : edit }" class="a-article-title-right">
          <svg-icon icon-class="ic_edit" style="width: 24px; height: 24px; cursor: pointer" @click="editArticle(item.id)"></svg-icon>
          <svg-icon icon-class="ic_dele" style="width: 24px; height: 24px; margin-left: 24px; cursor: pointer" @click="delArticle(item.id)"></svg-icon>
        </div>
      </div>
      <div style="width: 100%">
        <div class="a-content">
          <span v-if="item.summary.length === 0" class="a-c-main">{{ item.content }}</span>
          <span v-else class="a-c-main">{{ item.summary }}</span>
        </div>
      </div>
      <div class="a-footer">
        <div class="a-f-left">
          <span class="a-footer-svg">
            <svg-icon icon-class="view" style="width: 20px; height: 20px"></svg-icon>
            {{ item.watch }}
          </span>
          <span class="a-footer-svg">
            <svg-icon icon-class="review" style="width: 20px; height: 20px"></svg-icon>
            {{ item.comment }}
          </span>
          <span class="a-footer-svg">
            <svg-icon v-if="!item.like" icon-class="up" style="width: 20px; height: 20px; cursor: pointer" @click="up(item.id, item.unlike)"></svg-icon>
            <svg-icon v-if="item.like" icon-class="isup" style="width: 18px; height: 18px; cursor: pointer" @click="up(item.id, item.unlike)"></svg-icon>
            {{ item.up }}
          </span>
        </div>
        <div class="a-f-right">
          <span class="a-f-plate">{{ item.plate }} | </span>
          <span class="a-f-time">{{ item.createtime }}</span>
        </div>
      </div>
    </div>
    <div class="index-more" :class="{ 'hidden-more' : hideMore }">
      <el-button class="index-more-btn" plain round @click="showMore">查看更多</el-button>
    </div>
    <div v-if="article && article.length === 0" class="a-nothing">
      <div style="height: 100px; margin-bottom: 8px">
        <svg-icon icon-class="nothing" style="font-size: 100px"></svg-icon>
        <p>暂无数据</p>
      </div>
    </div>
    <div style="height: 100px"></div>
  </div>
</template>

<script>
import { fetchArticle, deleteMyArticle } from '@/api/personal'
import { upArticle } from '@/api/detail'
import Cookie from 'js-cookie'
import { deleteHTML } from '@/utils/tool'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: "Article",
  components: { ElMessage, ElMessageBox },
  data() {
    return {
      listQuery: {
        username: '',
        loginName: '',
        page: 0,
        limit: 20,
      },
      articleId: {
        id: ''
      },
      article: null,
      comment: {
        username: '',
        articleid: '',
        is: ''
      },
      is: false,
      edit: true,
      isLog: true,
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
    this.getArticle()
  },
  methods: {
    getArticle() {
      this.listQuery.loginName = Cookie.get("nickname")
      fetchArticle(this.listQuery).then(response => {
        if(response.data.article.length < 20) {
          this.hideMore = true
        } else {
          this.hideMore = false
        }
        if(this.article !== null) {
          this.article = this.article.concat(response.data.article)
        } else {
          this.article = response.data.article
        }

        this.article.forEach(item => {
          item.content = deleteHTML(item.content)
        })
      })
    },
    delArticle(id) {
      ElMessageBox.confirm(
        '你确定要删除这篇文章嘛?',
        '警告',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
        }
      ).then(() => {
        this.articleId.id = id
        deleteMyArticle(this.articleId).then(() => {
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
    detail(id) {
      window.open(this.$router.resolve({name:'Detail', params:{id: id}}).href, '_blank')
    },
    editArticle(id) {
      this.$router.push({ name: 'CreateEdit', params: {id: id} })
    },
    up(id, unlike) {
      if(unlike) {
        ElMessage({
          message: '您已经将文章标为不喜欢，请先取消再点赞.',
          type: 'warning',
        })
        return
      }
      this.comment.username = Cookie.get("nickname")
      this.comment.articleid = id
      this.comment.is = 1
      upArticle(this.comment).then(() => {
        this.article.forEach(item => {
          if(item.id === id) {
            if (item.like) {
              item.like = false
              item.up = item.up - 1
            } else {
              item.like = true
              item.up = item.up + 1
            }
          }
        })
      })
    },
    showMore() {
      this.listQuery.page = this.listQuery.page + 1
      this.getArticle()
    }
  }
}
</script>

<style scoped>
@import "~@/styles/message.scss";
@import "~@/styles/article.scss";

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
