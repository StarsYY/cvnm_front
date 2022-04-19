<template>
  <Header />
  <div class="vi-main">
    <div style="background: #000; display: flex">
      <div class="vi-video" @click="clickVideo">
        <video :src="videoSource" controls="controls" autoplay="autoplay" muted="muted" style="width: 100%"></video>
      </div>
      <div class="vi-right">
        <div>
          <div class="vi-menu">
            <div class="vi-menu-title">目录</div>
          </div>
          <div style="overflow: auto">
            <div>
              <div v-for="item in video" :key="item.id" class="vi-list-item" @click="videoSource = item.source">
                <div class="vi-li-main">{{ item.filename }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-row>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 20, offset: 2}" :xl="{span: 20, offset: 2}">
        <div style="padding: 31px 0">
          <div class="vi-course-title">
            <div class="vi-ct-left">{{ course.name }}</div>
            <div style="display: flex">
              <div class="vi-ct-right" @click="collect(course.id)">
                <svg-icon v-if="!course.collect" icon-class="collect" style="width: 22px; height: 22px; margin-right: 7px"></svg-icon>
                <svg-icon v-if="course.collect" icon-class="collectBlack" style="width: 22px; height: 22px; margin-right: 7px"></svg-icon>
                <span>收藏</span>
              </div>
            </div>
          </div>
          <div class="vi-course-info">
            <div>
              <span>时长 1 分钟</span>
              <span>　·　评分 {{ course.score }}</span>
              <span>　·　{{ course.watch }} 次播放</span>
            </div>
            <span class="vi-ci-tag">
              <span>关键字</span>
              <span class="vi-ct-list" v-for="(item, key) in course.labelMap" :key="key">{{ item }}</span>
            </span>
          </div>
        </div>
        <div style="border-top: 1px solid #e8e8e8">
          <div class="vi-content">
            <div style="width: 70%; flex: 1">
              <el-tabs v-model="activeName" class="demo-tabs">
                <el-tab-pane label="课程介绍" name="first">
                  <div class="vi-course-introduce">
                    <div class="vi-ci-main">
                      <div class="vi-ci-cart">
                        <div style="margin-bottom: 32px">
                          <div class="ci-cc-top">课程简介</div>
                          <div class="ci-cc-footer" v-html="course.introduction"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane :label="'用户评价（'+disLen+')'" name="second">
                  <div class="vi-say" v-if="is > 0">
                    <div class="vi-score">
                      <el-rate
                        v-model="discuss.score"
                        :texts="['1', '2', '3', '4', '5']"
                        show-text
                      >
                      </el-rate>
                    </div>
                    <div class="vi-score">
                      <el-input
                        v-model="discuss.discuss"
                        :rows="6"
                        type="textarea"
                        placeholder="快来写下对课程的感受和疑问吧"
                      />
                    </div>
                    <div class="vi-sub">
                      <el-button type="info" round @click="commit(course.id)">提交</el-button>
                    </div>
                  </div>
                  <div class="vi-course-introduce">
                    <div class="vi-ci-main">
                      <div style="position: relative">
                        <div v-if="disLen > 0">
                          <div class="vi-review-list" v-for="item in allDiscuss" :key="item.id">
                            <div style="display: flex; align-items: flex-start">
                              <div style="width: 32px; height: 32px">
                                <el-avatar :src="item.portrait" :size="32"></el-avatar>
                              </div>
                              <div style="margin-left: 8px; width: calc(100% - 40px)">
                                <div class="vi-rl-top">
                                  <div style="display: flex; align-items: center">
                                    <div style="display: flex; align-items: center">
                                      <span class="vi-rt-left">{{ item.author }}</span>
                                    </div>
                                    <div style="display: flex; align-items: center; margin-left: 16px">
                                      <span class="vi-rt-right">{{ item.createtime }}</span>
                                    </div>
                                  </div>
                                  <div style="display: flex">
                                    <div v-if="isadmin === 1 && item.admRep === 0" @click="item.status = 1 - item.status">
                                      <svg-icon icon-class="review" style="cursor: pointer; width: 20px; height: 20px"></svg-icon>
                                    </div>
                                    <div v-if="item.rep === 1" @click="deleteMyDis(item.id)">
                                      <svg-icon icon-class="del" style="cursor: pointer; width: 20px; height: 20px; margin-left: 20px"></svg-icon>
                                    </div>
                                  </div>
                                </div>
                                <div style="display: flex; align-items: center; margin-top: 4px">
                                  <el-rate
                                    v-model="item.score"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{{item.score}}"
                                  >
                                  </el-rate>
                                </div>
                                <div class="vi-rl-content">{{ item.discuss }}</div>
                              </div>
                            </div>
                            <div style="margin-top: 16px; margin-left: 40px">
                              <div v-if="item.status === 0">
                                <el-input v-model="discuss.discuss" :autosize="{ minRows: 4 }" type="textarea"></el-input>
                                <div style="text-align: right; margin-top: 10px">
                                  <el-button type="info" plain round @click="item.status = 1 - item.status">取消</el-button>
                                  <el-button type="primary" round  @click="subReview(item.id)">提交</el-button>
                                </div>
                              </div>
                              <div v-if="item.admRep === 1" style="padding: 16px; background-color: #f5f5f5">
                                <div class="vi-re-top">
                                  <div style="display: flex; align-items: center">
                                    <span class="vi-rtt">
                                      <svg-icon icon-class="service" style="width: 24px; height: 24px"></svg-icon>
                                      <span style="margin-left: 7px">客服回复</span>
                                    </span>
                                    <span class="vi-rt-right">{{ item.reDis.createtime }}</span>
                                  </div>
                                  <div style="display: flex">
                                    <div v-if="isadmin === 1" @click="deleteMyDis(item.reDis.id)">
                                      <svg-icon icon-class="del" style="cursor: pointer; width: 20px; height: 20px; margin-left: 20px"></svg-icon>
                                    </div>
                                  </div>
                                </div>
                                <div class="vi-rt-content">{{ item.reDis.discuss }}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div style="width: 30%; padding-left: 45px">
              <div>
                <div style="background: #fff">
                  <div class="vi-left-top">平台信息</div>
                  <div class="vi-author-cart">
                    <div style="display: flex">
                      <div style="width: 64px">
                        <el-avatar :src="user.portrait" :size="64"></el-avatar>
                      </div>
                      <div style="margin-left: 12px; width: calc(100% - 80px)">
                        <div class="vi-ac-top">{{ user.nickname }}</div>
                        <div>讲师</div>
                        <div class="vi-ac-fo">{{ user.summary }}</div>
                      </div>
                    </div>
                    <div class="vi-au-info">
                      <div>
                        <div class="vi-ai-title">课程数</div>
                        <div class="vi-ai-num">{{ user.count }}</div>
                      </div>
                      <div class="vi-ai-line"></div>
                      <div>
                        <div class="vi-ai-title">学习人次</div>
                        <div class="vi-ai-num">{{ user.watch }}</div>
                      </div>
                      <div class="vi-ai-line"></div>
                      <div>
                        <div class="vi-ai-title">课程综合评分</div>
                        <div class="vi-ai-num">{{ user.score }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="recommendCourse" style="margin-top: 64px">
                <div class="vi-recommend">相关课程推荐</div>
                <div v-for="item in recommendCourse" :key="item.id" class="ci-rc-main" @click="courseRe(item.id, item.price)">
                  <div class="ci-rc-cart">
                    <h2 class="ci-rc-name">{{ item.name }}</h2>
                    <div class="ci-rc-info">
                      <span>{{ item.watch }}人在学</span>
                      <span style="margin: -6px 6px 0">.</span>
                      <span>评分 {{ item.score }}</span>
                    </div>
                    <div style="margin-top: 16px">
                      <div class="ci-rc-price">
                        <span v-if="item.price === 0" class="ci-rpp">免费</span>
                        <span v-else class="ci-rpp">￥ {{ item.price / 100 }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/header"
import Footer from "@/components/footer"
import { fetchCourse, boolDiscuss, createDiscuss, fetchDiscuss, createFollow, fetchUser, deleteMyDiscuss, createLearning, fetchRecommend } from '@/api/video'
import { isLogin } from '@/utils/tool'
import Cookie from 'js-cookie'
import { ElNotification, ElMessageBox } from 'element-plus'

export default {
  name: "Video",
  components: { Header, Footer },
  data() {
    return {
      course: {
        id: '',
        name: '',
        introduction: '',
        labelMap: '',
        price: '',
        score: '',
        watch: '',
        collect: false,
        userid: ''
      },
      video: [],
      videoSource: '',
      discuss: {
        id: '',
        courseid: '',
        disid: '',
        score: 5,
        discuss: '',
        author: ''
      },
      user: {
        uid: '',
        nickname: '',
        portrait: '',
        summary: '',
        count: '',
        watch: '',
        score: ''
      },
      isadmin: 0,
      disLen: 0,
      value: 5,
      activeName: 'first',
      is: 0,
      allDiscuss: [],
      clickNum: 0,
      learning: {
        username: '',
        courseid: ''
      },
      recommendCourse: null
    }
  },
  created() {
    this.getCourse(this.$route.params.id)
  },
  methods: {
    Login() {
      if (Cookie.get("nickname") === undefined) {
        return false
      }
      return true
    },
    getCourse(id) {
      this.discuss.courseid = id
      if(this.Login()) {
        this.discuss.author = Cookie.get("nickname")
      }
      fetchCourse(this.discuss).then(response => {
        this.course = response.data.course
        this.isadmin = response.data.isAdmin
        if(this.isadmin === 0 && response.data.video === null) {
          this.$router.push({name:'Purchase', params:{id: id}})
        }
        this.video = response.data.video
        this.videoSource = this.video[0].source
        var uid = this.course.userid
        fetchUser(uid).then(response => {
          this.user = response.data
        })
      })
      if(this.Login()) {
        this.discuss.author = Cookie.get("nickname")
        boolDiscuss(this.discuss).then(response => {
          this.is = response.data
        })
      } else {
        this.is = 0
      }
      fetchDiscuss(this.discuss).then(response => {
        this.allDiscuss = response.data
        if(this.allDiscuss.length === undefined || this.allDiscuss.length === 0) {
          this.disLen = 0
        } else {
          this.disLen = this.allDiscuss.length
        }
      })
      fetchRecommend(id).then(response => {
        this.recommendCourse = response.data
      })
    },
    commit(id) {
      if(isLogin()) {
        this.discuss.author = Cookie.get("nickname")
        this.discuss.courseid = id
        this.discuss.disid = 0
        createDiscuss(this.discuss).then(() => {
          ElNotification({
            title: 'Success',
            message: '评论成功',
            type: 'success',
          })
        })
      }
    },
    subReview(id) {
      if(isLogin()) {
        this.discuss.author = Cookie.get("nickname")
        this.discuss.courseid = this.course.id
        this.discuss.disid = id
        createDiscuss(this.discuss).then(() => {
          ElNotification({
            title: 'Success',
            message: '评论成功',
            type: 'success',
          })
        })
      }
    },
    collect(id) {
      if(isLogin()) {
        this.discuss.author = Cookie.get("nickname")
        this.discuss.courseid = id
        createFollow(this.discuss).then(() => {
          if(this.course.collect === false) {
            this.course.collect = true
          } else {
            this.course.collect = false
          }
        })
      }
    },
    videoLogin() {
      if (Cookie.get("nickname") === undefined) {
        return false
      }
      return true
    },
    clickVideo() {
      if(this.videoLogin()) {
        if(this.clickNum === 0) {
          this.learning.username = Cookie.get("nickname")
          this.learning.courseid = this.course.id
          createLearning(this.learning)
        }
        this.clickNum += 1
      }
    },
    deleteMyDis(id) {
      if(isLogin()) {
        ElMessageBox.confirm(
          '你确定要删除评论嘛?',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          }
        ).then(() => {
          this.discuss.id = id
          deleteMyDiscuss(this.discuss).then(() => {
            this.allDiscuss.some((item, i) => {
              if(item.id === id) {
                this.allDiscuss.splice(i, 1)
                this.disLen -= 1
                return true
              } else if(item.reDis.id === id) {
                item.admRep = 0
                item.reDis = null
                return true
              }
            })
          })
        })
      }
    },
    courseRe(id, price) {
      if(price === 0) {
        window.open(this.$router.resolve({name:'Video', params:{id: id}}).href, '_blank')
      } else {
        window.open(this.$router.resolve({name:'Purchase', params:{id: id}}).href, '_blank')
      }
    }
  }
}
</script>

<style scoped>
@import "~@/styles/video.scss";

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap::after {
  height: 0;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__active-bar {
  width: 100%;
  background-color: black;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item {
  font-size: 20px;
  color: #777777;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item.is-active {
  color: black;
}
</style>
