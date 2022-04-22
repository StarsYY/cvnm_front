<template>
  <div class="top">
    <div class="header">
      <div class="header-left">
        <img src="https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png" width="25">
        <span class="IT-Logo">CVNM</span>
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
                  <p v-if="user.position === '讲师'" class="authentication">
                    <span style="color: #777; margin-right: 5px">已认证</span>
                    <el-icon color="#328DFF" :size="12"><success-filled /></el-icon>
                  </p>
                  <p v-else class="authentication">
                    <span style="color: #777; margin-right: 5px">未认证</span>
                  </p>
                </div>
              </div>
              <ul class="list">
                <li class="h-l" @click="personal(nickname)">个人资料</li>
                <li class="h-l" @click="account(nickname)">账号设置</li>
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
          <div v-for="item in navigation" :key="item.id" class="menu-list">
            <el-link :href="item.jump" target="_blank" :underline="false">{{ item.name }}</el-link>
          </div>
        </div>
        <div class="nav-right">
          <el-icon :size="20" @click="dialogVisible = true"><search /></el-icon>
          <div class="create">
            <el-badge v-if="user.unreadMessage > 0" :value="user.unreadMessage" class="item" @click="personal(nickname)">
              <el-icon :size="20"><bell /></el-icon>
            </el-badge>
            <el-icon v-else :size="20"><bell /></el-icon>
            <el-dropdown>
              <span class="create-center">创作中心</span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="create">发文章</el-dropdown-item>
                  <!-- <el-dropdown-item @click="course">上传课程</el-dropdown-item> -->
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </el-affix>
    <el-dialog v-model="dialogVisible" title="搜索内容">
      <el-form :model="form">
        <el-form-item label="关键字" :label-width="formLabelWidth">
          <el-input v-model="form.search" maxlength="120" show-word-limit autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="searchAll">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { ArrowDown, User, Check, Search, Bell, SuccessFilled } from '@element-plus/icons'
import { getInfo, fetchNavigation } from '@/api/login'

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
        grow: null,
        position: null,
        unreadMessage: 0
      },
      navigation: null,
      dialogVisible: false,
      form: {
        search: ''
      }
    }
  },
  created() {
    this.nickname = Cookie.get("nickname")
    if(this.nickname != undefined) {
      this.fetchUser()
    }
    this.getNavigaton()
  },
  methods: {
    fetchUser() {
      getInfo(this.nickname).then(response => {
        this.user = response.data.loginUser
      })
    },
    getNavigaton() {
      fetchNavigation().then(response => {
        this.navigation = response.data.navigation
      })
    },
    searchAll() {
      this.dialogVisible = false
      window.open(this.$router.resolve({name: 'Search', params: {search: this.form.search}}).href, '_blank')
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
      this.$router.push('/')
      this.hidden = false
      this.isHidden = true
    },
    create() {
      if (Cookie.get("nickname") === undefined) {
        this.$router.push({name:'Login'})
        return
      }
      window.open(this.$router.resolve({name:'Create'}).href, '_blank')
    },
    course() {
      if (Cookie.get("nickname") === undefined) {
        this.$router.push({name:'Login'})
        return
      }
      window.open(this.$router.resolve({name:'SchoolCreate'}).href, '_blank')
    },
    personal(name) {
      if (Cookie.get("nickname") === undefined) {
        this.$router.push({name:'Login'})
        return
      }
      window.open(this.$router.resolve({name: 'Personal', params:{name: name}}).href, '_blank')
    },
    account(name) {
      if (Cookie.get("nickname") === undefined) {
        this.$router.push({name:'Login'})
        return
      }
      window.open(this.$router.resolve({name: 'User', params:{name: name}}).href, '_blank')
    },
    myschool(name) {
      if (Cookie.get("nickname") === undefined) {
        this.$router.push({name:'Login'})
        return
      }
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

<style scoped>
@import "~@/styles/header.scss";

.create-center {
  font-size: 16px;
  color: #333;
}

.menu-list >>> .el-link--default:hover {
  color: #000;
}

.IT-Logo {
  font-weight: 700;
  margin-left: 10px;
  font-size: 14px;
  user-select: none;
  letter-spacing: 1px;
}
</style>
