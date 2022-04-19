<template>
  <div class="o-cart">
    <div class="o-s-c" style="border-right: 1px solid #E5E5E5">
      <div style="margin-top: 32px">
        <img src="@/assets/study.png" class="o-cart-img">
        <span class="o-cart-title">学习</span>
      </div>
      <div class="o-card-introduce">了解最新资讯，揭秘最新开放能力，学习精品课程。</div>
      <div class="o-card-link">
        <div class="o-link-content" @click="school">开发者学堂</div>
      </div>
    </div>
    <div class="o-s-c" style="padding-left: 55px">
      <div style="margin-top: 32px">
        <img src="@/assets/communication.png" class="o-cart-img">
        <span class="o-cart-title">交流</span>
      </div>
      <div v-if="numberOfCom === 0" class="o-card-introduce">针对各种开放服务能力提出疑问，并与其他开发者分享技术资讯。</div>
      <div v-if="numberOfCom > 0" style="margin-top: 21px; white-space: nowrap">
        <div v-for="(item, key) in communication" :key="key" style="cursor: pointer; display: inline-block; margin-right: 64px;">
          <div style="font-size: 28px; color: #333; line-height: 32px">{{ item }}</div>
          <div style="font-size: 14px; color: #777; line-height: 24px">{{ key }}</div>
        </div>
      </div>
      <div class="o-card-link">
        <div class="o-link-content" @click="index">论坛</div>
        <div class="o-link-content">问答（待删除）</div>
      </div>
    </div>
  </div>
  <div style="height: 16px; background: #F7F7F7"></div>
  <div style="background: #F7F7F7">
    <div class="o-view">
      <el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="17" :xl="18">
          <div>
            <div style="background: white; padding: 16px; margin-bottom: 80px">
              <div class="o-post-title-block">
                <div class="o-post-left">
                  <span class="o-title-text">最新发布</span>
                  <img src="@/assets/arrow.png" style="width: 8px" class="o-title-img">
                </div>
                <div class="o-post-right">
                  <span class="o-right-title">勋章奖励等你来拿哦</span>
                  <img src="@/assets/post1.png" style="width: 24px" class="o-title-img">
                  <img src="@/assets/post2.png" style="width: 24px" class="o-title-img">
                </div>
              </div>
              <div style="margin: 8px 0; padding: 0 8px;">
                <div>
                  <div v-if="newArticle && newArticle.length === 0">
                    <div class="o-nothing">还没有交流过什么，下面有没有你感兴趣的内容…</div>
                  </div>
                  <div v-if="newArticle && newArticle.length > 0" style="margin: 8px 0">
                    <div v-for="item in newArticle" :key="item.id" style="display: flex; margin-bottom: 16px">
                      <div class="o-article-left">文章<span style="margin-left: 12px; margin-right: 4px">|</span></div>
                      <div style="width: 93%">
                        <div class="o-article-title" @click="detail(item.id)">{{ item.title }}</div>
                        <div v-if="item.summary.length === 0" class="o-detail">{{ item.content }}</div>
                        <div v-else class="o-detail">{{ item.summary }}</div>
                        <div style="margin-left: 8px; margin-top: 16px">
                          <div class="o-article-tag">浏览：{{ item.watch }}</div>
                          <div class="o-article-tag">回复：{{ item.comment }}</div>
                          <div class="o-article-tag" style="margin-right: 24px">点赞：{{ item.up }}</div>
                          <div class="o-article-time">{{ item.createtime }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="newArticle && newArticle.length === 0" class="o-write">
                    <div class="o-write-title" @click="create">发帖</div>
                  </div>
                  <div v-if="newArticle && newArticle.length > 0" class="o-write" style="text-align: left">
                    <div class="o-write-title" @click="create">发帖</div>
                  </div>
                </div>
                <div v-if="isLogName && newArticle && newArticle.length === 0" style="margin-top: 24px;">
                  <div class="o-export">
                    <div class="o-e-title">热门推荐</div>
                    <div class="o-e-more">更多</div>
                  </div>
                  <div style="display: inline-block; width: 100%">
                    <div class="o-content">
                      <div style="display: inline-block;">博文｜</div>
                      <div class="o-content-right">
                        <div class="o-c-r-title">【聊聊心目中的鸿蒙智联产品】参与话题互动阿巴阿巴阿巴</div>
                        <div class="o-content-sec">
                          <span style="margin-right: 16px">点赞：6</span>
                          <span style="margin-right: 16px">回复：17</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="isLogName" style="background: white; padding: 16px; margin-top: 16px; display: none">
              <div class="o-post-title-block">
                <div class="o-post-left">
                  <span class="o-title-text">我的活动</span>
                  <img src="@/assets/arrow.png" style="width: 8px" class="o-title-img">
                </div>
              </div>
              <div style="margin: 8px 0; padding: 0 8px;">
                <div>
                  <div>
                    <div class="o-nothing">还没有报名活动，看看最新活动吧…</div>
                  </div>
                  <div class="o-write">
                    <div class="o-write-title">开发者活动</div>
                  </div>
                </div>
                <div style="margin-top: 24px;">
                  <div class="o-export">
                    <div class="o-e-title">最新活动</div>
                    <div class="o-e-more">更多</div>
                  </div>
                  <div class="o-event-main">
                    <div class="o-event">
                      <div style="cursor: pointer">
                        <img src="@/assets/e1.png" class="o-event-img">
                      </div>
                      <div style="margin-left: 16px">
                        <div class="o-event-title">HarmonyOS开发者创新大赛</div>
                        <div class="o-event-time">
                          2022/1/2-2022/9/13
                          <span class="o-event-local">｜中国</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="10" :sm="9" :md="8" :lg="7" :xl="6" class="hidden-md-and-down">
          <div style="margin-left: 16px">
            <div style="background: white; padding: 16px">
              <div class="o-follow">
                <span class="o-follow-title">访问统计</span>
              </div>
              <div style="padding: 0 8px">
                <div style="display: inline-block">
                  <span class="o-watch">今日访问</span>
                  <span class="o-watch-num">7</span>
                </div>
                <div class="o-watch-y">
                  <span class="o-watch">昨日访问</span>
                  <span class="o-watch-num">9</span>
                </div>
              </div>
              <div class="o-chart">图表</div>
              <div class="o-watch-now">
                <div>
                  <div class="o-watch-week">16</div>
                  <div class="o-watch-week-title">本周访问</div>
                </div>
                <div>
                  <div class="o-watch-week">16</div>
                  <div class="o-watch-week-title">本月访问</div>
                </div>
                <div>
                  <div class="o-watch-week">16</div>
                  <div class="o-watch-week-title">累计访问</div>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-left: 16px; margin-top: 16px">
            <div style="background: white; padding: 16px">
              <div class="o-follow">
                <span v-if="isLogName" class="o-follow-title">我的关注</span>
                <span v-if="!isLogName" class="o-follow-title">TA的关注</span>
                <img src="@/assets/arrow.png" style="width: 8px" class="o-title-img">
              </div>
              <div v-if="follow && follow.length === 0">
                <div style="margin-top: 10px">
                  <div class="o-nothing">还没有关注过人、标签、板块，大家关注这些…</div>
                </div>
                <div class="o-write o-follow-add">
                  <div class="o-write-title">论坛</div>
                </div>
              </div>
              <div v-if="follow && follow.length > 0" style="margin-top: 16px; padding: 0px 8px">
                <div v-for="item in follow" :key="item.id" class="o-follow-user">
                  <div class="o-follow-av">
                    <el-avatar :src="item.portrait" :size="32" @click="personal(item.nickname)"></el-avatar>
                  </div>
                  <div class="o-follow-nickname">
                    <div class="o-follow-name" @click="personal(item.nickname)">{{ item.nickname }}</div>
                    <div class="o-follow-lv">Lv {{ item.grow }}</div>
                  </div>
                </div>
              </div>
              <div v-if="isLogName" style="margin-top: 24px">
                <div class="o-exert">
                  <div class="o-exert-push">专家博主推荐</div>
                  <div class="o-exert-new" @click="batch">
                    <svg-icon icon-class="normal" style="font-size: 18px"></svg-icon>
                    <span style="margin-left: 6px">换一批</span>
                  </div>
                </div>
                <div style="margin-top: 16px; padding: 0 8px">
                  <div v-for="item in expert" :key="item.id" class="o-follow-user">
                    <div class="o-follow-av">
                      <el-avatar :src="item.portrait" :size="32"></el-avatar>
                      <svg-icon icon-class="certification" class="o-head-svg" style="display: none"></svg-icon>
                    </div>
                    <div class="o-follow-nickname">
                      <div class="o-follow-name">{{ item.nickname }}</div>
                      <div class="o-follow-lv">Lv {{ item.grow }}</div>
                    </div>
                    <div :class="{ 'is_follow' : item.follow }" class="o-follow-exert">
                      <span v-if="item.follow" class="is_follow_span o-f-f" @click="followExpertUser(item.uid, item.nickname)">已关注</span>
                      <span v-if="!item.follow" class="o-f-f" @click="followExpertUser(item.uid, item.nickname)">关注</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="fans && fans.length > 0" style="margin-left: 16px; margin-top: 16px">
            <div style="background: white; padding: 16px">
              <div class="o-follow">
                <span v-if="isLogName" class="o-follow-title">我的粉丝</span>
                <span v-if="!isLogName" class="o-follow-title">TA的粉丝</span>
                <img src="@/assets/arrow.png" style="width: 8px" class="o-title-img">
              </div>
              <div style="margin-top: 16px; padding: 0px 8px">
                <div v-for="item in fans" :key="item.id" class="o-follow-user">
                  <div class="o-follow-av">
                    <el-avatar :src="item.portrait" :size="32" @click="personal(item.nickname)"></el-avatar>
                  </div>
                  <div class="o-follow-nickname">
                    <div class="o-follow-name" @click="personal(item.nickname)">{{ item.nickname }}</div>
                    <div class="o-follow-lv">Lv {{ item.grow }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { fetchOverview, followUser, fetchExpert } from '@/api/personal'
import Cookie from 'js-cookie'
import { deleteHTML } from '@/utils/tool'
import { isLogin } from '@/utils/tool'
import { ElMessage } from 'element-plus'

export default {
  name: "Overview",
  data() {
    return {
      name: {
        name: ''
      },
      comment: {
        username: '',
        userid: ''
      },
      communication: null,
      newArticle: null,
      follow: null,
      fans: null,
      expert: null,
      one: true,
      two: false,
      three: false,
      isLogName: true,
      numberOfCom: 0
    }
  },
  created() {
    this.getOverview(this.$route.params.name)
    this.getRecommendExpert()
  },
  methods: {
    getOverview(name) {
      if (name === Cookie.get("nickname")) {
        this.isLogName = true
      } else {
        this.isLogName = false
      }
      this.name.name = name
      fetchOverview(this.name).then(response => {
        this.numberOfCom = response.data.numberOfCom
        this.communication = response.data.communication
        this.newArticle = response.data.newArticle
        this.follow = response.data.follow
        this.fans = response.data.fans

        this.newArticle.forEach(item => {
          item.content = deleteHTML(item.content)
        })
      })
    },
    getRecommendExpert() {
      this.name.name = Cookie.get("nickname") !== undefined ? Cookie.get("nickname") : ''
      fetchExpert(this.name).then(response => {
        this.expert = response.data.expert
      })
    },
    followExpertUser(id, nickname) {
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
          this.expert.forEach(item => {
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
    school() {
      window.open(this.$router.resolve('/school').href, '_blank')
    },
    index() {
      window.open(this.$router.resolve('/').href, '_blank')
    },
    create() {
      if (Cookie.get("nickname") === undefined) {
        this.$router.push({name:'Login'})
        return
      }
      window.open(this.$router.resolve({name:'Create'}).href, '_blank')
    },
    detail(id) {
      window.open(this.$router.resolve({name:'Detail', params:{id: id}}).href, '_blank')
    },
    personal(name) {
      window.open(this.$router.resolve({name:'Personal', params:{name: name}}).href, '_blank')
    },
    batch() {
      this.getRecommendExpert()
    }
  }
}
</script>

<style scoped>
@import "~@/styles/overview.scss";
@import '~@/styles/display.scss';

.is_follow {
  background: #328dff;
}

.is_follow_span {
  color: #fff;
}
</style>
