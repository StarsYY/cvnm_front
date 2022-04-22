<template>
  <Header />
  <div>
    <div class="ms-main">
      <div class="ms-left">
        <div class="ms-l-main">
          <div style="width: 100%">
            <div class="ms-lm">
              <el-avatar :src="user.portrait" :size="120"></el-avatar>
              <div class="ms-lm-name">{{ user.nickname }}</div>
              <div v-if="user.position === '讲师'" class="ms-lm-verify">讲师</div>
              <div v-else class="ms-lm-verify" @click="goVerify(user.uid)">申请成为讲师</div>
              <div class="ms-lm-line"></div>
              <div class="ms-lm-a">
                <a v-for="item in menu" :key="item.key" class="ms-lm-list">
                  <div class="ms-ll-main" :class="{ 'ms-lm-list-on' : item.is }" @click="select(item.key)">
                    <img v-if="item.is && item.key === 0" src="@/assets/menu_order_on.png" class="ms-menu-img">
                    <img v-if="item.is && item.key === 1" src="@/assets/menu_favorites_on.png" class="ms-menu-img">
                    <img v-if="item.is && item.key === 2" src="@/assets/menu_class_on.png" class="ms-menu-img">
                    <img v-if="!item.is && item.key === 0" src="@/assets/menu_order_off.png" class="ms-menu-img">
                    <img v-if="!item.is && item.key === 1" src="@/assets/menu_favorites_off.png" class="ms-menu-img">
                    <img v-if="!item.is && item.key === 2" src="@/assets/menu_class_off.png" class="ms-menu-img">
                    <span>{{ item.value }}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ms-right">
        <div v-if="key === 0">
          <Order :userId="user.uid" />
        </div>
        <div v-if="key === 1">
          <Favorites :userId="user.uid" />
        </div>
        <div v-if="key === 2">
          <Class :userId="user.uid" />
        </div>
        <div v-if="key === 3">
          <Course :userId="user.uid" />
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/header"
import Footer from "@/components/footer"
import Order from "./myschool/order.vue"
import Favorites from "./myschool/favorites.vue"
import Class from "./myschool/class.vue"
import Course from "./myschool/course.vue"
import { fetchMySchool } from '@/api/myschool'

export default {
  name: "MySchool",
  components: { Header, Footer, Order, Favorites, Class, Course },
  data() {
    return {
      key: 0,
      menu: [
        { key: 0, value: '我的订单', is: true },
        { key: 1, value: '我的收藏', is: false },
        { key: 2, value: '学习记录', is: false },
        { key: 3, value: '我的课程', is: false }
      ],
      user: {
        uid: '',
        nickname: '',
        portrait: '',
        position: ''
      }
    }
  },
  created() {
    this.getMy(this.$route.params.name)
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
    },
    getMy(name) {
      this.user.nickname = name
      fetchMySchool(this.user).then(response => {
        this.user = response.data
      })
    },
    goVerify(uid) {
      this.$router.push({ name: 'Verify', params: { uid: uid }})
    }
  }
}
</script>

<style scoped>
@import "~@/styles/myschool.scss";

</style>
