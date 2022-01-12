<template>
  <div class="m-main">
    <div>
      <h3 v-if="isLog" class="c-col">我的文章</h3>
      <h3 v-if="!isLog" class="c-col">TA的文章</h3>
      <div class="c-star">
        <span v-if="is" class="c-star-s" style="cursor: pointer" @click="is = !is, edit = !edit">完成管理</span>
        <span v-if="!is" class="c-star-s" style="cursor: pointer" @click="is = !is, edit = !edit">管理</span>
      </div>
    </div>
    <div v-for="item in article" :key="item.id" class="a-article-list">
      <div style="width: 100%">
        <div :class="{ 'a-article-title-left' : is }" class="a-article-title">
          <a class="a-a-t">
            <span class="a-a-t-main" @click="detail(item.id)">{{ item.title }}>{{ item.title }}</span>
          </a>
        </div>
        <div :class="{ 'hidden' : edit }" class="a-article-title-right">
          <svg-icon icon-class="ic_edit" style="width: 24px; height: 24px"></svg-icon>
          <svg-icon icon-class="ic_dele" style="width: 24px; height: 24px; margin-left: 24px"></svg-icon>
        </div>
      </div>
      <div style="width: 100%">
        <div class="a-content">
          <span class="a-c-main">{{ item.summary }}</span>
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
import { fetchArticle } from '@/api/personal'
import { upArticle } from '@/api/detail'
import Cookie from 'js-cookie'

export default {
  name: "Article",
  data() {
    return {
      name: {
        name: '',
        loginName: ''
      },
      article: null,
      comment: {
        username: '',
        articleid: '',
        is: ''
      },
      is: false,
      edit: true,
      isLog: true
    }
  },
  created() {
    if(this.$route.params.name === Cookie.get("nickname")) {
      this.isLog = true
    } else {
      this.isLog = false
    }

    this.getArticle(this.$route.params.name)
  },
  methods: {
    getArticle(name) {
      this.name.name = name
      this.name.loginName = Cookie.get("nickname")
      fetchArticle(this.name).then(response => {
        this.article = response.data.article
      })
    },
    detail(id) {
      window.open(this.$router.resolve({name:'Detail', params:{id: id}}).href, '_blank')
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
      upArticle(this.comment).then(response => {
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
  }
}
</script>

<style scoped>
@import "~@/styles/message.scss";
@import "~@/styles/article.scss";

</style>
