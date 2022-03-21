<template>
  <div class="top">
    <div class="header">
      <div class="header-left">
        这是一个图标
      </div>
      <div class="header-right">
        <div class="h-user" :class="{ 'h-hidden': hidden }">
          <div class="u">
            <div class="h-login">
              <span class="lr" @click="login">登录</span>
            </div>
            <div class="h-register">
              <span class="lr" @click="register">注册</span>
            </div>
          </div>
        </div>
        <el-dropdown v-if="nickname != undefined || nickname != null" :class="{ 'h-hidden': isHidden }">
          <div class="nick" @click="personal(nickname)">
            <el-icon><user /></el-icon>
            <span class="h-n-name">{{ nickname }}</span>
            <el-icon><arrow-down /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <div class="avatar">
                <el-avatar :src="user.portrait" :size="50" style="margin-right: 16px"></el-avatar>
                <div>
                  <div class="name" @click="personal(nickname)">
                    <span class="i-name">{{ nickname }}</span>
                    <span class="level">Lv {{ user.grow }}</span>
                  </div>
                  <p class="authentication">
                    <span style="color: #777; margin-right: 5px">已认证</span>
                    <el-icon color="#328DFF" :size="12"><success-filled /></el-icon>
                  </p>
                </div>
              </div>
              <ul class="list">
                <li class="h-l" @click="personal(nickname)">个人资料</li>
                <li class="h-l" @click="account">账号设置</li>
                <li class="h-l" @click="myschool(nickname)">我的学堂</li>
              </ul>
              <div class="out" @click="logout">
                <span style="color: #777; cursor: pointer">退出</span>
              </div>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <el-affix :offset="0">
      <div class="nav">
        <div class="nav-left">
          <font class="font">DEVELOPERS</font>
        </div>
        <div class="menu">
          <div class="menu-list" @click="index">社区首页</div>
          <div class="menu-list" @click="school">认证</div>
          <div class="menu-list">认证</div>
          <div class="menu-list">认证</div>
        </div>
        <div class="nav-right">
          <el-icon :size="20"><search /></el-icon>
          <div class="create">
            <el-icon :size="20"><bell /></el-icon>
            <span>创作中心</span>
          </div>
        </div>
      </div>
    </el-affix>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { ArrowDown, User, Check, Search, Bell, SuccessFilled } from '@element-plus/icons'
import { getInfo } from '@/api/login'

export default {
  name: 'Header',
  components: { ArrowDown, User, Check, Search, Bell, SuccessFilled },
  data() {
    return {
      nickname: null,
      hidden: false,
      isHidden: true,
      user: {
        nickname: null,
        portrait: null,
        grow: null
      }
    }
  },
  created() {
    this.nickname = Cookie.get("nickname")
    if(this.nickname != undefined) {
      this.fetchUser()
    }
  },
  methods: {
    fetchUser() {
      getInfo(this.nickname).then(response => {
        this.user = response.data.loginUser
      })
    },
    login() {
      this.$router.push({name:'Login'})
    },
    register() {
      Cookie.set("is", true)
      this.$router.push({name:'Login'})
    },
    logout() {
      Cookie.remove("nickname")
      Cookie.remove("token")
      this.hidden = false
      this.isHidden = true
    },
    personal(name) {
      window.open(this.$router.resolve({name: 'Personal', params:{name: name}}).href, '_blank')
    },
    account() {
      window.open(this.$router.resolve({name: 'User'}).href, '_blank')
    },
    index() {
      window.open(this.$router.resolve('/').href, '_blank')
    },
    school() {
      window.open(this.$router.resolve('/school').href, '_blank')
    },
    myschool(name) {
      window.open(this.$router.resolve({name: 'MySchool', params:{name: name}}).href, '_blank')
    }
  },
  mounted() {
    if(this.nickname === null || this.nickname === undefined) {
      this.hidden = false
      this.isHidden = true
    } else {
      this.hidden = true
      this.isHidden = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/header.scss";

</style>
