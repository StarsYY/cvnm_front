<template>
  <div class="u-main">
    <div class="u-top">
      <div class="u-center">
        <div>
          <svg-icon icon-class="HUAWEI" class="u-icon" style="width: 107px; height: 24px"></svg-icon>
        </div>
        <div class="u-account">
          <span class="u-acc-title">|</span>
          <span class="u-acc-center">账号中心</span>
        </div>
        <div class="u-user">
          <span class="u-username">
            <span class="u-u">
              <span>{{ user?.nickname }}</span>
            </span>
          </span>
          <span class="u-l">|</span>
          <span class="u-username">
            <span class="u-u">
              <span style="cursor: pointer" @click="out">退出</span>
            </span>
          </span>
        </div>
      </div>
    </div>
    <div style="background: #fff">
      <div class="u-content">
        <div style="width: 20%; display: inline-block">
          <div style="text-align: center">
            <el-avatar :src="user?.portrait" :size="80"></el-avatar>
            <div class="user-name">{{ user?.nickname }}</div>
            <div class="user-name">{{ user?.phone }}</div>
          </div>
          <div class="u-list">
            <ul style="list-style: none">
              <li>
                <div class="u-li" :class="{ 'u-back' : one }" @click="select(0)">
                  <svg-icon icon-class="info" style="width: 16px"></svg-icon>
                  <span class="u-li-title">
                    <span>个人信息</span>
                  </span>
                </div>
              </li>
              <li>
                <div class="u-li" :class="{ 'u-back' : two }" @click="select(1)">
                  <svg-icon icon-class="accountsecurity" style="width: 16px"></svg-icon>
                  <span class="u-li-title">
                    <span>帐号与安全</span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="u-con-right">
          <div v-if="one">
            <Info />
          </div>
          <div v-if="two">
            <Security />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import Info from "./user/info.vue"
import Security from "./user/security.vue"
import { fetchUser } from '@/api/user'

export default {
  name: "Personal",
  components: { Info, Security },
  data() {
    return {
      name: {
        name: ''
      },
      user: {
        uid: '',
        portrait: '',
        nickname: '',
        phone: ''
      },
      one: false,
      two: true
    }
  },
  created() {
    this.getUser(this.$route.params.name)
  },
  methods: {
    getUser(name) {
      this.name.name = name
      fetchUser(this.name).then(response => {
        this.user = response.data.frontUserUser
      })
    },
    out() {
      Cookie.remove("nickname")
      Cookie.remove("token")
      this.$router.push({name:'Login'})
    },
    select(val) {
      if (val === 0) {
        this.one = true
        this.two = false
      } else {
        this.one = false
        this.two = true
      }
    }
  }
}
</script>

<style scoped>
@import "~@/styles/user.scss";

</style>
