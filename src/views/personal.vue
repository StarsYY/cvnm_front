<template>
  <Header />
  <div class="p-main">
    <div class="p-info">
      <div class="p-head">
        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="80"></el-avatar>
      </div>
      <div class="p-name">
        <div class="p-nick">
          <div class="p-nickname">仰望星空</div>
          <div class="p-level">Lv 10</div>
        </div>
        <div class="p-profile">
          暂未维护个人简介内容。
          <div class="p-edit"></div>
        </div>
      </div>
      <div class="p-star">
        <div class="p-danner">
          <div class="p-danner-m">
            <div class="p-num">1</div>
            <div class="p-follow">关注</div>
          </div>
          <div class="p-danner-m">
            <div class="p-num">2</div>
            <div class="p-follow">粉丝</div>
          </div>
          <div class="p-danner-m">
            <div class="p-num">3</div>
            <div class="p-follow">积分</div>
          </div>
        </div>
      </div>
    </div>
    <div class="p-tag">
      <div class="p-tag-main">
        <div class="p-cart" :class="{ 'p-cart-select' : one }" @click="select1">概览</div>
        <div class="p-cart" :class="{ 'p-cart-select' : two }" @click="select2">个人信息</div>
        <div class="p-cart" :class="{ 'p-cart-select' : three }" @click="select3">我的社区</div>
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

export default {
  name: "Personal",
  components: { Header, Footer, Overview, Info, Community },
  data() {
    return {
      one: true,
      two: false,
      three: false
    }
  },
  methods: {
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

</style>
