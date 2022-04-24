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
        <li class="c-tag-li">
          <a class="c-tag-a" @click="select(2)">
            <span class="c-tag-msg" :class="{ 'c-tag-msg-select' : three }">关注的标签</span>
          </a>
        </li>
      </ul>
    </div>
    <div style="margin-top: 16px">
      <div v-if="one">
        <div class="fans-main">
          <div v-for="item in followUser" :key="item.id" class="fans-list">
            <div class="fans-attention-details">
              <div style="display: flex">
                <div class="fans-aaa" @click="personal(item.nickname)">
                  <el-avatar :src="item.portrait" :size="48"></el-avatar>
                  <img src="@/assets/vip.png" class="fans-vip">
                </div>
                <div class="fans-hand-name">
                  <div class="fans-name-top">
                    <div class="fans-nickname" @click="personal(item.nickname)">{{ item.nickname }}</div>
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
        <div class="index-more" :class="{ 'hidden-more' : hideMore }">
          <el-button class="index-more-btn" plain round @click="showMore">查看更多</el-button>
        </div>

        <div v-if="followUser && followUser.length === 0" class="a-nothing">
          <div style="height: 100px; margin-bottom: 8px">
            <svg-icon icon-class="nothing" style="font-size: 100px"></svg-icon>
            <p>暂无数据</p>
          </div>
        </div>
        <div style="height: 100px"></div>
      </div>
      <div v-if="two">
        <div class="fans-main">
          <div v-for="item in followPlate" :key="item.id" class="fans-list">
            <div class="fans-attention-details">
              <div style="display: flex">
                <div style="width: 100%">
                  <div class="fw-top">
                    <img v-if="item.icon !== '' && item.icon !== null" :src="item.icon" class="fw-img">
                    <div style="box-sizing: border-box">
                      <div :class="{ 'is_follow_plate' : !item.follow }" class="fw-top-right">
                        <span v-if="item.follow" class="fw-top-btn" @click="followP(item.id)">已关注</span>
                        <span v-if="!item.follow" class="is_follow_plate_span fw-top-btn" @click="followP(item.id)">关注</span>
                      </div>
                    </div>
                  </div>
                  <div class="fw-plate">{{ item.plate }}</div>
                </div>
              </div>
              <div class="fw-plate-text">
                <p class="fw-plate-content">{{ item.describe }}</p>
              </div>
              <div class="fw-info">
                <div class="fw-info-one">
                  <div class="fw-info-num">{{ item.todayArticle }}</div>
                  <div class="fw-info-title">今日</div>
                </div>
                <div class="fw-info-one">
                  <div class="fw-info-num">{{ item.articleCount }}</div>
                  <div class="fw-info-title">文章</div>
                </div>
                <div class="fw-info-one">
                  <div class="fw-info-num">{{ item.replyCount }}</div>
                  <div class="fw-info-title">回复</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="index-more" :class="{ 'hidden-more' : hideMore }">
          <el-button class="index-more-btn" plain round @click="showMore">查看更多</el-button>
        </div>

        <div v-if="followPlate && followPlate.length === 0" class="a-nothing">
          <div style="height: 100px; margin-bottom: 8px">
            <svg-icon icon-class="nothing" style="font-size: 100px"></svg-icon>
            <p>暂无数据</p>
          </div>
        </div>
        <div style="height: 100px"></div>
      </div>
      <div v-if="three">
        <div class="fans-main">
          <div v-for="item in followLabel" :key="item.id" class="fans-list">
            <div class="fans-attention-details">
              <div style="display: flex">
                <div style="width: 100%">
                  <div class="fw-top" style="margin-bottom: 0">
                    <div class="fw-label">{{ item.label }}</div>
                    <div style="box-sizing: border-box">
                      <div :class="{ 'is_follow_plate' : !item.follow }" class="fw-top-right">
                        <span v-if="item.follow" class="fw-top-btn" @click="followL(item.id)">已关注</span>
                        <span v-if="!item.follow" class="is_follow_plate_span fw-top-btn" @click="followL(item.id)">关注</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="fw-plate-text" style="margin-top: 16px">
                <p class="fw-plate-content">{{ item.describe }}</p>
              </div>
              <div class="fw-plate-text" style="margin-top: 16px">
                <div class="fw-info-one">
                  <div class="fw-info-num">{{ item.articleCount }}</div>
                  <div class="fw-info-title">文章</div>
                </div>
                <div class="fw-info-one">
                  <div class="fw-info-num">{{ item.monthArticleCount }}</div>
                  <div class="fw-info-title">本月</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="index-more" :class="{ 'hidden-more' : hideMore }">
          <el-button class="index-more-btn" plain round @click="showMore">查看更多</el-button>
        </div>

        <div v-if="followLabel && followLabel.length === 0" class="a-nothing">
          <div style="height: 100px; margin-bottom: 8px">
            <svg-icon icon-class="nothing" style="font-size: 100px"></svg-icon>
            <p>暂无数据</p>
          </div>
        </div>
        <div style="height: 100px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchFollow, fetchFollowPlate, followUser, fetchFollowLabel } from '@/api/personal'
import Cookie from 'js-cookie'
import { ElMessage } from 'element-plus'
import { isLogin } from '@/utils/tool'
import { followPlateById } from '@/api/index'
import { followLabelById } from '@/api/tags'

export default {
  name: "Collection",
  data() {
    return {
      listQuery: {
        username: '',
        loginName: '',
        page: 0,
        limit: 9,
      },
      comment: {
        username: '',
        userid: ''
      },
      followUser: null,
      followPlate: null,
      followLabel: null,
      follow: {
        id: '',
        username: ''
      },
      isLog: true,
      one: true,
      two: false,
      three: false,
      hideMore: true
    }
  },
  created() {
    if(this.$route.params.name === Cookie.get("nickname")) {
      this.isLog = true
    } else {
      this.isLog = false
    }

    this.listQuery.username = this.$route.params.name
    this.getMyFollow()
  },
  methods: {
    getMyFollow() {
      this.listQuery.loginName = Cookie.get("nickname")
      fetchFollow(this.listQuery).then(response => {
        if(response.data.follow.length < 9) {
          this.hideMore = true
        } else {
          this.hideMore = false
        }
        if(this.followUser !== null) {
          this.followUser = this.followUser.concat(response.data.follow)
        } else {
          this.followUser = response.data.follow
        }
      })
    },
    getMyFollowPlate() {
      this.listQuery.loginName = Cookie.get("nickname")
      fetchFollowPlate(this.listQuery).then(response => {
        if(response.data.followPlate.length < 9) {
          this.hideMore = true
        } else {
          this.hideMore = false
        }
        if(this.followPlate !== null) {
          this.followPlate = this.followPlate.concat(response.data.followPlate)
        } else {
          this.followPlate = response.data.followPlate
        }
      })
    },
    getMyFollowLabel() {
      this.listQuery.loginName = Cookie.get("nickname")
      fetchFollowLabel(this.listQuery).then(response => {
        if(response.data.followLabel.length < 9) {
          this.hideMore = true
        } else {
          this.hideMore = false
        }
        if(this.followLabel !== null) {
          this.followLabel = this.followLabel.concat(response.data.followLabel)
          console.log(this.followLabel)
        } else {
          this.followLabel = response.data.followLabel
          console.log(this.followLabel)
        }
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
        followUser(this.comment).then(() => {
          this.followUser.forEach(item => {
            if (item.uid === id) {
              if(item.follow) {
                item.follow = false
                return
              } else {
                item.follow = true
                return
              }
            }
          })
        })
      }
    },
    followP(id) {
      if(isLogin) {
        this.follow.id = id
        this.follow.username = Cookie.get("nickname")
        followPlateById(this.follow).then(() => {
          this.followPlate.forEach(item => {
            if (item.id === id) {
              if(item.follow) {
                item.follow = false
                return
              } else {
                item.follow = true
                return
              }
            }
          })
        })
      }
    },
    followL(id) {
      if(isLogin()) {
        this.follow.id = id
        this.follow.username = Cookie.get("nickname")
        followLabelById(this.follow).then(() => {
          this.followLabel.forEach(item => {
            if (item.id === id) {
              if(item.follow) {
                item.follow = false
                return
              } else {
                item.follow = true
                return
              }
            }
          })
        })
      }
    },
    personal(name) {
      window.open(this.$router.resolve({name:'Personal', params:{name: name}}).href, '_blank')
    },
    select(val) {
      this.hideMore = true
      this.listQuery.page = 0
      if (val === 0) {
        this.followUser = null
        this.getMyFollow()
        this.one = true
        this.two = false
        this.three = false
      } else if (val === 1) {
        this.followPlate = null
        this.getMyFollowPlate()
        this.one = false
        this.two = true
        this.three = false
      } else {
        this.followLabel = null
        this.getMyFollowLabel()
        this.one = false
        this.two = false
        this.three = true
      }
    },
    showMore() {
      this.listQuery.page = this.listQuery.page + 1
      if(this.one) {
        this.getMyFollow()
      } else if(this.two) {
        this.getMyFollowPlate()
      } else if(this.three) {
        this.getMyFollowLabel()
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

.is_follow_plate {
  background: #fff;
}

.is_follow_plate_span {
  color: #328dff;
}

.index-more >>> .el-button.is-round {
  border-radius: 24px;
}

.index-more >>> .el-button.is-round:hover, .index-more >>> .el-button.is-round:active, .index-more >>> .el-button.is-round:focus {
  color: #333;
  border-color: #333;
}

.hidden-more {
  display: none;
}

.fw-label {
  background: rgba(111,121,169,.09);
  border: 0 solid rgba(111,121,169,.1);
  border-radius: 16px;
  font-size: 14px;
  color: #6f79a9;
  letter-spacing: 0;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  padding: 0 16px;
  margin-right: 20px;
  max-width: 192px;
  height: 32px;
  line-height: 32px;
}
</style>
