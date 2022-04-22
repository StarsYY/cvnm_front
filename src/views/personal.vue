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
        <div class="p-profile" :class="{ hidden : hidden }">
          <span>{{ user.summary }}</span>
          <div v-if="isLogName" class="p-edit" @click="hidden = !hidden"></div>
        </div>
        <div :class="{ hidden : !hidden }">
          <el-input
            v-model="edit.summary"
            :rows="4"
            maxlength="120"
            show-word-limit
            type="textarea"
            placeholder="修改个人简介"
          />
          <div style="text-align: right">
            <el-button type="text" @click="hidden = false">取消</el-button>
            <el-button type="text" @click="editUser(user.uid)">确定</el-button>
          </div>
        </div>
        <div class="p-medal" :class="{ hidden : hidden }">
          <img v-for="item in userMedal" :key="item.id" :src="item.medal" class="p-medal-img" @click="dialogVisible = true">
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
          <div v-if="user.follow" class="isyes pe-btn-btn" @click="follow(user.uid, user.nickname)">已关注</div>
          <div v-if="!user.follow" class="pe-btn-btn" @click="follow(user.uid, user.nickname)">关注</div>
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
    <div v-if="dialogVisible" class="p-my-di">
      <el-dialog
        v-model="dialogVisible"
        :title="userTitle"
        width="58%"
        center
      >
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane :label="userLabel" name="first">
            <div style="display: flex; width: 100%;">
              <div style="width: 100%; outline: none; flex: none">
                <div style="margin-top: 24px"></div>
                <div>
                  <div class="p-medal-main">
                    <div v-for="item in userMedal" :key="item.id" class="p-medal-list">
                      <img :src="item.medal" width="128" height="128">
                      <h5 class="p-img-com p-img-h5">{{ item.name }}</h5>
                      <h6 class="p-img-com p-img-h6">{{ item.describe }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="全部勋章" name="fourth">
            <div style="display: flex; width: 100%;">
              <div style="width: 100%; outline: none; flex: none">
                <div style="margin-top: 24px"></div>
                <div>
                  <div class="p-medal-main">
                    <div v-for="item in allMedal" :key="item.id" class="p-medal-list">
                      <img :src="item.medal" width="128" height="128">
                      <h5 class="p-img-com p-img-h5">{{ item.name }}</h5>
                      <h6 class="p-img-com p-img-h6">{{ item.describe }}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
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
import { fetchUser, editUserSummary, followUser } from '@/api/personal'
import Cookie from 'js-cookie'
import { isLogin } from '@/utils/tool'

export default {
  name: "Personal",
  components: { Header, Footer, Overview, Info, Community },
  data() {
    return {
      name: {
        name: '',
        loginName: ''
      },
      hidden: false,
      user: {
        uid: '',
        portrait: '',
        nickname: '',
        grow: '',
        summary: '',
        integral: '',
        fans: '',
        follow: false
      },
      userMedal: null,
      allMedal: null,
      userTitle: '',
      edit: {
        uid: '',
        summary: ''
      },
      comment: {
        username: '',
        userid: ''
      },
      one: true,
      two: false,
      three: false,
      isLogName: true,
      dialogVisible: false,
      activeName: 'first',
      userLabel: ''
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
        this.userMedal = response.data.userMedal
        this.allMedal = response.data.allMedal

        this.userTitle = response.data.user.nickname + '的勋章'
        this.userLabel = '已获得(' + response.data.userMedal.length + ')'
      })
    },
    editUser(uid) {
      this.edit.uid = uid
      editUserSummary(this.edit).then(() => {
        this.user.summary = this.edit.summary
      })
      this.hidden = false
    },
    follow(id, nickname) {
      if(isLogin()) {
        if (Cookie.get("nickname") === nickname) {
          ElMessage({
            message: '不能自己关注自己呦🤣',
            type: 'warning',
          })
          return
        }
        this.comment.username = Cookie.get("nickname")
        this.comment.userid = id
        followUser(this.comment).then(() => {
          this.user.follow = !this.user.follow
        })
      }
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

.hidden {
  display: none;
}

.demo-tabs >>> .el-tabs__header {
  margin-left: 64px;
  margin-right: 24px;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap::after {
  background-color: white;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__active-bar {
  height: 1.5px;
  background-color: #000;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item.is-active {
  color: #303133;
  font-weight: 900;
  font-size: 16px;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item:hover {
  color: #303133;
}

.p-my-di >>> .el-overlay > .el-overlay-dialog > .el-dialog > .el-dialog__header {
  padding: 49px 64px 30px;
  color: #333;
  font-weight: 600;
}

.p-my-di >>> .el-overlay > .el-overlay-dialog > .el-dialog > .el-dialog__header > .el-dialog__title {
  font-size: 28px;
}

.p-my-di >>> .el-overlay > .el-overlay-dialog > .el-dialog > .el-dialog__header > .el-dialog__headerbtn {
  top: -25px;
  right: -25px;
}

.p-my-di >>> .el-overlay > .el-overlay-dialog > .el-dialog > .el-dialog__header > .el-dialog__headerbtn > .el-dialog__close {
  color: white;
}

.p-my-di >>> .el-overlay > .el-overlay-dialog > .el-dialog {
  height: 640px;
  border-radius: 8px;
}
</style>
