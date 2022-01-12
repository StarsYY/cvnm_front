<template>
  <Header />
  <div class="p-main">
    <div class="p-info">
      <div class="p-head">
        <el-avatar :src="user.portrait" :size="80"></el-avatar>
      </div>
      <div class="p-name">
        <div class="p-nick">
          <div class="p-nickname">{{ user.nickname }}</div>
          <div class="p-level">Lv {{ user.grow }}</div>
        </div>
        <div class="p-profile">
          {{ user.summary }}
          <div v-if="isLogName" class="p-edit"></div>
        </div>
        <div class="p-medal">
          <img src="@/assets/1.png" class="p-medal-img">
          <img src="@/assets/2.png" class="p-medal-img">
          <img src="@/assets/3.png" class="p-medal-img">
        </div>
      </div>
      <div class="p-star">
        <div class="p-danner" :class="{ 'topp' : !isLogName }">
          <div class="p-danner-m">
            <div class="p-num">{{ user.attention }}</div>
            <div class="p-follow">关注</div>
          </div>
          <div class="p-danner-m">
            <div class="p-num">{{ user.fans }}</div>
            <div class="p-follow">粉丝</div>
          </div>
          <div v-if="isLogName" class="p-danner-m">
            <div class="p-num">{{ user.integral }}</div>
            <div class="p-follow">积分</div>
          </div>
        </div>
        <div v-if="!isLogName" class="pe-btn">
          <div v-if="user.follow" class="isyes pe-btn-btn">已关注</div>
          <div v-if="!user.follow" class="pe-btn-btn">关注</div>
        </div>
      </div>
    </div>
    <div class="p-tag">
      <div class="p-tag-main">
        <div class="p-cart" :class="{ 'p-cart-select' : one }" @click="select1">概览</div>
        <div v-if="isLogName" class="p-cart" :class="{ 'p-cart-select' : two }" @click="select2">个人信息</div>
        <div v-if="isLogName" class="p-cart" :class="{ 'p-cart-select' : three }" @click="select3">我的社区</div>
        <div v-if="!isLogName" class="p-cart" :class="{ 'p-cart-select' : three }" @click="select3">TA的社区</div>
      </div>
    </div>
  </div>
  <div v-if="one">
    <Overview />
  </div>
  <div v-if="two">
    <Info />
  </div>
  <div v-if="three">
    <Community />
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/header"
import Footer from "@/components/footer"
import Overview from "./personal/overview.vue"
import Info from "./personal/info.vue"
import Community from "./personal/community.vue"
import { fetchUser } from '@/api/personal'
import Cookie from 'js-cookie'

export default {
  name: "Personal",
  components: { Header, Footer, Overview, Info, Community },
  data() {
    return {
      name: {
        name: '',
        loginName: ''
      },
      user: {
        portrait: '',
        nickname: '',
        grow: '',
        summary: '',
        integral: '',
        fans: '',
        follow: false
      },
      one: true,
      two: false,
      three: false,
      isLogName: true
    }
  },
  created() {
    this.getPersonal(this.$route.params.name)
  },
  methods: {
    getPersonal(name) {
      if (name === Cookie.get("nickname")) {
        this.isLogName = true
      } else {
        this.isLogName = false
      }
      this.name.name = name
      this.name.loginName = Cookie.get("nickname")
      fetchUser(this.name).then(response => {
        this.user = response.data.user
      })
    },
    select1() {
      if (!this.one) {
        this.one = true
        this.two = false
        this.three = false
      }
    },
    select2() {
      if (!this.two) {
        this.one = false
        this.two = true
        this.three = false
      }
    },
    select3() {
      if (!this.three) {
        this.one = false
        this.two = false
        this.three = true
      }
    }
  }
}
</script>

<style scoped>
@import "~@/styles/personal.scss";

.topp {
  margin-top: 8px;
}

.isyes {
  background: none;
  border: 1px solid #777;
}
</style>
