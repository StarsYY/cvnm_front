<template>
  <div class="m-main">
    <div>
      <h3 v-if="isLog" class="c-col">我的粉丝</h3>
      <h3 v-if="!isLog" class="c-col">TA的粉丝</h3>
    </div>
    <div style="margin-top: 24px">
      <div class="fans-main">
        <div v-for="item in fans" :key="item.id" class="fans-list">
          <div class="fans-attention-details">
            <div style="display: flex">
              <div class="fans-aaa">
                <el-avatar :src="item.portrait" :size="48"></el-avatar>
                <img src="@/assets/vip.png" class="fans-vip">
              </div>
              <div class="fans-hand-name">
                <div class="fans-name-top">
                  <div class="fans-nickname">{{ item.nickname }}</div>
                  <div>
                    <div :class="{ 'is_follow' : item.follow }" class="fans-btn">
                      <span v-if="item.follow" class="is_follow_span fans-name" @click="follow(item.uid, item.nickname)">已关注</span>
                      <span v-if="!item.follow" class="fans-name" @click="follow(item.uid, item.nickname)">关注</span>
                    </div>
                  </div>
                </div>
                <div>Lv {{ item.grow }}</div>
              </div>
            </div>
            <div class="fans-info">
              <div class="fans-tag">
                <div class="fans-num">{{ item.article }}</div>
                <div class="fans-content">博文</div>
              </div>
              <div class="fans-tag">
                <div class="fans-num">{{ item.attention }}</div>
                <div class="fans-content">关注</div>
              </div>
              <div class="fans-tag">
                <div class="fans-num">{{ item.fans }}</div>
                <div class="fans-content">粉丝</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="fans && fans.length === 0" class="a-nothing">
      <div style="height: 100px; margin-bottom: 8px">
        <svg-icon icon-class="nothing" style="font-size: 100px"></svg-icon>
        <p>暂无数据</p>
      </div>
    </div>
    <div style="height: 100px"></div>
  </div>
</template>

<script>
import { fetchFans, followUser } from '@/api/personal'
import Cookie from 'js-cookie'
import { ElMessage } from 'element-plus'
import { isLogin } from '@/utils/tool'

export default {
  name: "Fans",
  data() {
    return {
      name: {
        name: '',
        loginName: ''
      },
      comment: {
        username: '',
        userid: ''
      },
      fans: null,
      isLog: true
    }
  },
  created() {
    if(this.$route.params.name === Cookie.get("nickname")) {
      this.isLog = true
    } else {
      this.isLog = false
    }

    this.getMyFans(this.$route.params.name)
  },
  methods: {
    getMyFans(name) {
      this.name.name = name
      this.name.loginName = Cookie.get("nickname")
      fetchFans(this.name).then(response => {
        this.fans = response.data.fans
      })
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
        followUser(this.comment).then(response => {
          this.fans.forEach(item => {
            if (item.follow) {
              item.follow = false
            } else {
              item.follow = true
            }
          });
        })
      }
    },
  }
}
</script>

<style scoped>
@import "~@/styles/fans.scss";

.is_follow {
  background: #328dff;
}

.is_follow_span {
  color: #fff;
}
</style>
