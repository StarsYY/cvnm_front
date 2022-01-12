<template>
  <div class="c-main">
    <div>
      <h3 class="c-col">我的收藏</h3>
    </div>
    <div style="margin-top: 26px">
      <ul style="list-style: none">
        <li v-for="item in collect" :key="item.id" class="c-ct-list">
          <div style="overflow: hidden; padding-bottom: 4px">
            <span class="c-ct-title" style="cursor: pointer" @click="detail(item.id)">{{ item.title }}</span>
          </div>
          <div style="margin-top: 16px">
            <p class="c-ct-summary">{{ item.summary }}</p>
          </div>
          <div style="overflow: hidden">
            <div class="c-ct-left" style="float: left">
              <span class="c-ct-plate">{{ item.plate }}</span>
              <span style="margin-right: 8px">|</span>
              <div style="display: inline-block">
                <el-avatar :src="item.portrait" :size="24" style="cursor: pointer" @click="personal(item.nickname)"></el-avatar>
              </div>
              <div style="display: inline-block; margin-left: 8px">
                <div style="display: inline-block">
                  <div style="display: flex; align-items: center">
                    <span class="c-ct-nickname" @click="personal(item.nickname)">{{ item.nickname }}</span>
                    <img src="@/assets/vip.png" class="c-ct-vip">
                  </div>
                </div>
                <span class="c-ct-time">{{ item.createtime }}</span>
              </div>
            </div>
            <div style="float: right; height: 24px">
              <div style="display: inline-block">
                <div style="display: flex; align-items: center">
                  <svg-icon icon-class="view" style="width: 20px; height: 20px"></svg-icon>
                  <span class="c-ct-watch-num">{{ item.watch }}</span>
                </div>
              </div>
              <div style="display: inline-block">
                <div style="display: flex; align-items: center">
                  <svg-icon icon-class="review" style="width: 20px; height: 20px"></svg-icon>
                  <span class="c-ct-watch-num">{{ item.comment }}</span>
                </div>
              </div>
              <div style="display: inline-block">
                <div style="display: flex; align-items: center">
                  <svg-icon v-if="!item.like" icon-class="up" style="width: 20px; height: 20px; cursor: pointer" @click="up(item.id, item.unlike)"></svg-icon>
                  <svg-icon v-if="item.like" icon-class="isup" style="width: 18px; height: 18px; cursor: pointer" @click="up(item.id, item.unlike)"></svg-icon>
                  <span class="c-ct-watch-num">{{ item.up }}</span>
                </div>
              </div>
              <div style="display: inline-block">
                <div style="display: flex; align-items: center">
                  <svg-icon v-if="!item.star" icon-class="collection" style="width: 20px; height: 20px; cursor: pointer" @click="star(item.id)"></svg-icon>
                  <svg-icon v-if="item.star" icon-class="iscollection" style="width: 20px; height: 20px; cursor: pointer" @click="star(item.id)"></svg-icon>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="collect && collect.length === 0" class="a-nothing">
      <div style="height: 100px; margin-bottom: 8px">
        <svg-icon icon-class="nothing" style="font-size: 100px"></svg-icon>
        <p>暂无数据</p>
      </div>
    </div>
    <div style="height: 100px"></div>
  </div>
</template>

<script>
import { fetchCollect } from '@/api/personal'
import Cookie from 'js-cookie'
import { ElMessage } from 'element-plus'
import { upArticle, starArticle } from '@/api/detail'

export default {
  name: "Collection",
  data() {
    return {
      name: {
        name: ''
      },
      collect: null,
      comment: {
        username: '',
        articleid: '',
        is: ''
      }
    }
  },
  created() {
    this.getCollect()
  },
  methods: {
    getCollect() {
      this.name.name = Cookie.get("nickname")
      fetchCollect(this.name).then(response => {
        this.collect = response.data.collect
      })
    },
    detail(id) {
      window.open(this.$router.resolve({name:'Detail', params:{id: id}}).href, '_blank')
    },
    personal(name) {
      window.open(this.$router.resolve({name:'Personal', params:{name: name}}).href, '_blank')
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
        this.collect.forEach(item => {
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
    star(id) {
      this.comment.username = Cookie.get("nickname")
      this.comment.articleid = id
      starArticle(this.comment).then(response => {
        this.collect.forEach(item => {
          if(item.id === id) {
            if (item.star) {
              item.star = false
              item.collect = item.collect - 1
            } else {
              item.star = true
              item.collect = item.collect + 1
            }
          }
        })
      })
    },
  }
}
</script>

<style scoped>
@import "~@/styles/collection.scss";

.a-nothing {
  margin: 0 8px;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  margin-top: 16px;
}
</style>
