<template>
  <div class="m-main">
    <div>
      <h3 v-if="isLog" class="c-col">我的关注</h3>
      <h3 v-if="!isLog" class="c-col">TA的关注</h3>
    </div>
    <div class="c-col-tag">
      <ul class="c-tag-ul">
        <li class="c-tag-li">
          <a class="c-tag-a" @click="select(0)">
            <span class="c-tag-msg" :class="{ 'c-tag-msg-select' : one }">关注的人</span>
          </a>
        </li>
        <li class="c-tag-li">
          <a class="c-tag-a" @click="select(1)">
            <span class="c-tag-msg" :class="{ 'c-tag-msg-select' : two }">关注的板块</span>
          </a>
        </li>
      </ul>
    </div>
    <div style="margin-top: 16px">
      <div v-if="one">
        <div class="fans-main">
          <div v-for="item in follow" :key="item.id" class="fans-list">
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
                        <span v-if="item.follow" class="is_follow_span fans-name" @click="followU(item.uid, item.nickname)">已关注</span>
                        <span v-if="!item.follow" class="fans-name" @click="followU(item.uid, item.nickname)">关注</span>
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
      <div v-if="two">
        <div class="fans-main">
          <div class="fans-list">
            <div class="fans-attention-details">
              <div style="display: flex">
                <div style="width: 100%">
                  <div class="fw-top">
                    <img src="@/assets/OS.png" class="fw-img">
                    <div style="box-sizing: border-box">
                      <div class="fw-top-right">
                        <span class="fw-top-btn">已关注</span>
                      </div>
                    </div>
                  </div>
                  <div class="fw-plate">HarmonyOS Connect</div>
                </div>
              </div>
              <div class="fw-plate-text">
                <p class="fw-plate-content">HarmonyOS Connect官方信息发布，生态伙伴交流平台。</p>
              </div>
              <div class="fw-info">
                <div class="fw-info-one">
                  <div class="fw-info-num">3</div>
                  <div class="fw-info-title">今日</div>
                </div>
                <div class="fw-info-one">
                  <div class="fw-info-num">3</div>
                  <div class="fw-info-title">今日</div>
                </div>
                <div class="fw-info-one">
                  <div class="fw-info-num">3</div>
                  <div class="fw-info-title">今日</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="follow && follow.length === 0" class="a-nothing">
      <div style="height: 100px; margin-bottom: 8px">
        <svg-icon icon-class="nothing" style="font-size: 100px"></svg-icon>
        <p>暂无数据</p>
      </div>
    </div>
    <div style="height: 100px"></div>
  </div>
</template>

<script>
import { fetchFollow, followUser } from '@/api/personal'
import Cookie from 'js-cookie'
import { ElMessage } from 'element-plus'
import { isLogin } from '@/utils/tool'

export default {
  name: "Collection",
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
      follow: null,
      isLog: true,
      one: true,
      two: false
    }
  },
  created() {
    if(this.$route.params.name === Cookie.get("nickname")) {
      this.isLog = true
    } else {
      this.isLog = false
    }

    this.getMyFollow(this.$route.params.name)
  },
  methods: {
    getMyFollow(name) {
      this.name.name = name
      this.name.loginName = Cookie.get("nickname")
      fetchFollow(this.name).then(response => {
        this.follow = response.data.follow
      })
    },
    followU(id, nickname) {
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
          this.follow.forEach(item => {
            if (item.follow) {
              item.follow = false
            } else {
              item.follow = true
            }
          });
        })
      }
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
@import "~@/styles/message.scss";
@import "~@/styles/fans.scss";
@import "~@/styles/follow.scss";

.a-nothing {
  margin: 0 8px;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  margin-top: 16px;
}

.is_follow {
  background: #328dff;
}

.is_follow_span {
  color: #fff;
}
</style>
