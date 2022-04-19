<template>
  <div class="i-main">
    <div class="i-content">
      <div class="i-left">
        <div class="i-menu">
          <div v-for="item in menu" :key="item.key" class="i-menuList">
            <div style="white-space: nowrap">
              <a class="i-link" :class="{ 'i-link-select' : item.is }" @click="select(item.key)">
                <span v-if="isLog" class="i-tag">我的{{ item.value }}</span>
                <span v-if="!isLog" class="i-tag">
                  <span v-if="item.key < 4">TA的{{ item.value }}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="i-right">
        <div v-if="key === 0">
          <Article />
        </div>
        <div v-if="key === 1">
          <Reply />
        </div>
        <div v-if="key === 2">
          <Fans />
        </div>
        <div v-if="key === 3">
          <Follow />
        </div>
        <div v-if="key === 4">
          <Draft />
        </div>
        <div v-if="key === 5">
          <Audit />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Article from "./community/article.vue"
import Reply from "./community/reply.vue"
import Fans from "./community/fans.vue"
import Follow from "./community/follow.vue"
import Draft from "./community/draft.vue"
import Audit from "./community/audit.vue"
import Cookie from 'js-cookie'

export default {
  name: "Community",
  components: { Article, Reply, Fans, Follow, Draft, Audit },
  data() {
    return {
      key: 0,
      menu: [
        { key: 0, value: '文章', is: true },
        { key: 1, value: '回复', is: false },
        { key: 2, value: '粉丝', is: false },
        { key: 3, value: '关注', is: false },
        { key: 4, value: '草稿', is: false },
        { key: 5, value: '待审核', is: false }
      ],
      isLog: true
    }
  },
  created() {
    if(this.$route.params.name === Cookie.get("nickname")) {
      this.isLog = true
    } else {
      this.isLog = false
    }
  },
  methods: {
    select(val) {
      this.menu.forEach(item => {
        if (item.key === val) {
          item.is = true
        } else {
          item.is = false
        }
      })
      this.key = val
    }
  }
}
</script>

<style scoped>
@import "~@/styles/info.scss";

</style>
