<template>
  <Header />
  <div class="main">
    <el-row>
      <el-col :xs="{span: 8, offset: 2}" :sm="{span: 6, offset: 2}" :md="{span: 5, offset: 2}" :lg="{span: 4, offset: 2}" :xl="{span: 1, offset: 2}">
        <div class="left">
          <el-scrollbar height="570px">
            <ul class="def">
              <template v-for="items in def" :key="items.key">
                <li
                  class="common"
                  :class="{ hover : items.activeIndex }"
                  v-if="items.key === 4 && isLogined"
                  @click ="select(items.key)"
                  v-on:mouseover="changeActive($event, items.key)"
                  v-on:mouseout="removeActive($event, items.key)"
                >
                  {{ items.value }}
                </li>
                <li
                  class="common"
                  :class="{ hover : items.activeIndex }"
                  v-if="items.key < 4"
                  @click ="select(items.key)"
                  v-on:mouseover="changeActive($event, items.key)"
                  v-on:mouseout="removeActive($event, items.key)"
                >
                  {{ items.value }}
                </li>
              </template>
            </ul>
            <div class="tree">
              <el-tree 
                :data="data" 
                :props="defaultProps" 
                :expand-on-click-node="false" 
                :highlight-current="true" 
                default-expand-all 
                @node-click="handleNodeClick"
              >
                <template v-slot="{ node, data }">
                  <span style="display: flex; align-items: center">
                    <el-image v-if="data.icon != '' && data.icon != null" class="icon" :src="data.icon" />{{ node.label }}
                  </span>
                </template>
              </el-tree>
            </div>
          </el-scrollbar>
        </div>
      </el-col>
      <el-col :xs="12" :sm="14" :md="15" :lg="12" :xl="11">
        <div :class="{ middle : is }">
          <div class="block" :class="{ hidden : hidden }">
            <el-carousel trigger="click" height="288px">
              <el-carousel-item v-for="item in rotation" :key="item.key" style="background-color: #fff">
                <el-image :src="item.source" style="height: 288px" @click="goToOther(item.jump)" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="index-plate-children" v-if="listQuery.defOrTree === 2">
            <div class="ipc-top">
              <div class="ipc-top-title">
                <div class="ipc-tt-left">
                  <span style="margin-right: 8px; line-height: 32px">
                    <svg-icon icon-class="index-text" style="width: 24px; height: 24px"></svg-icon>
                  </span>
                  <span class="ipc-tt-main">{{ plate.plate }}</span>
                </div>
                <div style="white-space: nowrap">
                  <el-button v-if="!plate.follow" type="primary" plain round style="margin-left: 16px" @click="followPlate(plate.id)">关注</el-button>
                  <el-button v-if="plate.follow" type="primary" round style="margin-left: 16px" @click="followPlate(plate.id)">已关注</el-button>
                </div>
              </div>
              <p class="ipc-top-desc">
                <el-tooltip :content="plate.describe" placement="bottom" effect="light">
                  <span class="itd-span">{{ plate.describe }}</span>
                </el-tooltip>
              </p>
              <div style="width: 65%; margin-top: 16px">
                <div class="ipc-top-bot">
                  <div class="info-item">
                    <p class="itb-ii-title">今日</p>
                    <p class="itb-ii-num">{{ plate.todayArticle }}</p>
                  </div>
                  <div class="info-item">
                    <p class="itb-ii-title">文章</p>
                    <p class="itb-ii-num">{{ plate.articleCount }}</p>
                  </div>
                  <div class="info-item">
                    <p class="itb-ii-title">回复</p>
                    <p class="itb-ii-num">{{ plate.replyCount }}</p>
                  </div>
                  <div class="info-item">
                    <p class="itb-ii-title">关注</p>
                    <p class="itb-ii-num">{{ plate.followCount }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="plateChildren && plateChildren.length > 0" class="ipc-bottom" :class="{ 'ipc-bottom-all' : showAll }">
              <div v-for="item in plateChildren" :key="item.id" class="ipc-bt-list" @click="selectPlate(item.id)">
                <div style="position: relative">
                  <p class="ibl-title">
                    <span class="ibl-title-main">{{ item.plate }}</span>
                  </p>
                  <div style="display: flex">
                    <div class="ibl-t-info">
                      <span class="iti-one">{{ item.articleCount }} </span>
                      <span class="iti-two">文章</span>
                    </div>
                    <div class="ibl-t-info" style="margin-right: 0">
                      <span class="iti-one">{{ item.replyCount }} </span>
                      <span class="iti-two">回复</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="plateChildren && plateChildren.length > 0" class="expand-area">
              <svg-icon v-if="!showAll" icon-class="index-normal" style="width: 16px; height: 16px; cursor: pointer" @click="showAll = !showAll"></svg-icon>
              <svg-icon v-else icon-class="index-active" style="width: 16px; height: 16px; cursor: pointer" @click="showAll = !showAll"></svg-icon>
            </div>
          </div>
          <div class="content">
            <div>
              <div v-if="listQuery.defOrTree === 2" class="td-operation-bar">
                <div class="tag-search-input">
                  <el-input
                    v-model="listQuery.title"
                    class="w-50 m-2"
                    size="small"
                    maxlength="120"
                    placeholder="输入文章名称搜索"
                    prefix-icon="Search"
                    @change="search"
                  />
                  <el-icon class="tag-icon"><Search /></el-icon>
                </div>
                <div class="set-flex">
                  <div style="margin-right: 24px">
                    <el-dropdown>
                      <span class="el-dropdown-link" style="cursor: pointer">
                        {{ tag }}
                        <el-icon class="el-icon--right">
                          <arrow-down />
                        </el-icon>
                      </span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item v-for="item in menuList" :key="item.key" @click="getM1(item.value)">{{ item.value }}</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                  <div>
                    <el-dropdown>
                      <span class="el-dropdown-link" style="cursor: pointer">
                        {{ type }}
                        <el-icon class="el-icon--right">
                          <arrow-down />
                        </el-icon>
                      </span>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item v-for="item in menuList2" :key="item.key" @click="getM2(item.key, item.value)">{{ item.value }}</el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </div>
                </div>
              </div>
              <el-tabs v-model="contentTag" @tab-click="handleClick">
                <el-tab-pane v-for="item in contentTags" :key="item.key" :label="item.value" :name="item.key"></el-tab-pane>
              </el-tabs>
            </div>
            <div v-loading="loading">
              <div v-for="item in article" :key="item.id" class="article">
                <div>
                  <span v-if="item.hot == 'Top'">
                    <span class="icon-top i-top"></span>
                  </span>
                  <span v-else-if="item.hot == 'Hot'">
                    <span class="icon-top i-hot"></span>
                  </span>
                  <span class="title" @click="detail(item.id)">{{ item.title }}</span>
                  <div class="title-tag">
                    <span v-if="item.tag === '推荐'" class="t r-color">推荐</span>
                    <span v-if="item.tag === '精华'" class="t b-color">精华</span>
                  </div>
                </div>
                <div v-if="item.summary == null || item.summary == ''" class="article-content">{{ item.content }}</div>
                <div v-else class="article-content">{{ item.summary }}</div>
                <div class="message">
                  <div style="display: flex">
                    <el-avatar :src="item.portrait" :size="24" style="margin-right: 8px; position: relative; cursor: pointer" @click="personal(item.nickname)"></el-avatar>
                    <div class="pub-user">
                      <span class="user-msg">
                        <span class="user-det" @click="personal(item.nickname)">{{ item.nickname }}</span>
                      </span>
                      <span>
                        <img src="../assets/certification.svg" class="user-v">
                      </span>
                      <span class="user-lv">Lv {{ item.grow }}</span>
                      <span class="art-time">
                        <span class="art-creat">{{ item.createtime }}</span>
                      </span>
                    </div>
                  </div>
                  <div class="user-right">
                    <p class="icon-flex">
                      <svg-icon icon-class="view" style="font-size: 20px"></svg-icon>
                      <span style="margin-left: 4px; color: #777">{{ item.watch }}</span>
                    </p>
                    <p class="icon-flex" style="margin-left: 20px">
                      <svg-icon icon-class="review" style="font-size: 20px"></svg-icon>
                      <span style="margin-left: 4px; color: #777">{{ item.comment }}</span>
                    </p>
                    <p class="icon-flex" style="margin-left: 20px">
                      <svg-icon v-if="!item.like" icon-class="up" style="font-size: 22px; cursor: pointer" @click="up(item.id)"></svg-icon>
                      <svg-icon v-if="item.like" icon-class="isup" style="font-size: 20px; cursor: pointer" @click="up(item.id)"></svg-icon>
                      <span style="margin-left: 4px; color: #777">{{ item.up }}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="index-more" :class="{ 'hidden-more' : hideMore }">
                <el-button class="index-more-btn" plain round @click="showMore">查看更多</el-button>
              </div>
            </div>
            <div v-if="total === 0" class="index-null">
              <div class="index-null2">
                <svg-icon icon-class="null2" style="width: 240px; height: 216px"></svg-icon>
              </div>
              <p style="color: #777; text-align: center;">暂无文章可看，不如看看远方吧</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="1" class="hidden-md-and-down">
        <div>
          <div style="margin-bottom: 24px;">
            <div class="show">
              <p class="my" @click="create">我要发帖子</p>
              <img src="../assets/right-arrow.png" style="padding: 8px 26px;" />
            </div>
          </div>
          <div class="sign">
            <div class="dac">
              <div class="sign-in">
                <div class="user-avator">
                  <img src="../assets/Signin.svg" />
                </div>
                <p class="sign-in-main">快来签到领取积分吧！</p>
                <button v-if="!sign" class="check-in" @click="signIn">签到</button>
                <button v-if="sign" class="check-in">已签到</button>
              </div>
            </div>
          </div>
          <div style="margin-top: 40px;">
            <div class="hot">热门文章</div>
            <div>
              <div v-for="item in hotArticle" :key="item.id" style="margin-bottom: 20px">
                <span class="hot-title" @click="detail(item.id)">{{ item.title }}</span>
                <div class="hot-view">
                  <svg-icon icon-class="view" style="font-size: 16px"></svg-icon>
                  <span style="margin-left: 8px">{{ item.watch }}</span>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top: 40px;">
            <div class="tag">
              <div class="tag-hot">热门标签</div>
              <div class="tag-more" @click="tags">更多</div>
            </div>
            <div style="margin: 0 -8px 0 0; padding-bottom: 0">
              <div style="max-height: 84px; overflow: hidden">
                <h3 v-for="item in hotLabel" :key="item.id" class="hot-tag" @click="tagDetail(item.id)">{{ item.label }}</h3>
              </div>
            </div>
          </div>
          <div style="margin-top: 40px;">
            <div class="hot">推荐文章</div>
            <div>
              <div v-for="item in recommendArticle" :key="item.id" style="margin-bottom: 20px">
                <span class="hot-title" @click="detail(item.id)">{{ item.title }}</span>
                <div class="hot-view">
                  <svg-icon icon-class="view" style="font-size: 16px"></svg-icon>
                  <span style="margin-left: 8px">{{ item.watch }}</span>
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
import Header from "@/components/header";
import Footer from "@/components/footer";
import { fetchIndex, fetchContentTags, fetchArticle, fetchPlate, followPlateById, fetchIndexRight, userSignIn, fetchSignIn } from '@/api/index'
import Cookie from 'js-cookie'
import { isLogin, deleteHTML } from '@/utils/tool'
import { upArticle } from '@/api/detail'
import { ElMessage } from 'element-plus'
import { ArrowDown, Search } from '@element-plus/icons'

export default {
  name: "Index",
  components: { Header, Footer, ArrowDown, Search },
  data() {
    return {
      is: true,
      hidden: false,
      windowWidth: document.documentElement.clientWidth,
      def:[
        { key: 1, value: '所有帖子', activeIndex: true },
        { key: 2, value: '热门内容', activeIndex: false },
        { key: 3, value: '推荐精华', activeIndex: false },
        { key: 4, value: '我的关注', activeIndex: false }
      ],
      contentTags: null,
      data: null,
      listQuery: {
        defOrTree: 1, // 1为def  2为tree
        leftId: 1,
        contentTag: 1,
        username: '',
        title: '',
        type: '全部',
        hot: '全部',
        page: 0,
        limit: 20,
      },
      contentTag: 1,
      menuList:[
        { key: 1, value: '全部' },
        { key: 2, value: '精华' },
        { key: 3, value: '热门' },
        { key: 4, value: '推荐' },
      ],
      menuList2:[
        { key: 1, value: '最新发布' },
        { key: 2, value: '最新回复' },
        { key: 3, value: '最多回复' },
      ],
      tag: '全部',
      type: '最新发布',
      comment: {
        username: '',
        articleid: '',
        comment: '',
        comid: 0,
        is: '',
        userid: ''
      },
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      article: null,
      hotArticle: null,
      hotLabel: null,
      recommendArticle: null,
      plate: {
        id: '',
        plate: '',
        describe: '',
        icon: '',
        todayArticle: '',
        articleCount: '',
        replyCount: '',
        followCount: '',
        follow: ''
      },
      plateChildren: null,
      follow: {
        id: '',
        username: ''
      },
      loading: false,
      hideMore: true,
      showAll: false,
      rotation: null,
      sign: false,
      isLogined: false,
      total: 0
    }
  },
  created() {
    this.getIndex()
    this.getContentTags()
    this.getArticle()
    this.getIndexRight()
    this.getSignInStatus()

    if(Cookie.get("nickname") !== undefined) {
      this.isLogined = true
    }
  },
  methods: {
    getIndex() {
      fetchIndex().then(response => {
        this.data = response.data.labelTree
      })
    },
    getContentTags() {
      fetchContentTags(this.listQuery).then(response => {
        this.contentTags = response.data.contentTags
      })
    },
    getArticle() {
      Cookie.get("nickname") === undefined ? this.listQuery.username = '' : this.listQuery.username = Cookie.get("nickname")
      fetchArticle(this.listQuery).then(response => {
        if(response.data.article.length < 20) {
          this.hideMore = true
        } else {
          this.hideMore = false
        }
        if(this.article !== null) {
          this.article = this.article.concat(response.data.article)
        } else {
          this.article = response.data.article
        }
        if(this.article) {
          this.article.forEach(item => {
            item.content = deleteHTML(item.content)
          })
        }
        this.total = this.article.length
        this.loading = false
      })
    },
    getIndexRight() {
      fetchIndexRight().then(response => {
        this.rotation = response.data.rotation
        this.hotArticle = response.data.hotArticle
        this.hotLabel = response.data.hotLabel
        this.recommendArticle = response.data.recommendArticle
      })
    },
    getLoginStatus() {
      if (Cookie.get("nickname") === undefined) {
        return false
      }
      return true
    },
    getSignInStatus() {
      if(this.getLoginStatus()) {
        this.follow.username = Cookie.get("nickname")
        fetchSignIn(this.follow).then(response => {
          this.sign = response.data
        })
      }
    },
    setComment(id) {
      this.comment.username = Cookie.get("nickname")
      this.comment.articleid = id
    },
    search() {
      this.listQuery.page = 0
      this.getArticle()
    },
    up(id) {
      if(isLogin()) {
        this.article.forEach(element => {
          if(element.id === id) {
            if(element.unlike) {
              ElMessage({
                message: '您已经将文章标为不喜欢，请先取消再点赞.',
                type: 'warning',
              })
              return
            }
            this.setComment(id)
            this.comment.is = 1
            upArticle(this.comment).then(() => {
              if (element.like) {
                element.like = false
                element.up = element.up - 1
              } else {
                element.like = true
                element.up = element.up + 1
              }
            })
          }
        })
      }
    },
    followPlate(id) {
      if(isLogin()) {
        this.follow.id = id
        this.follow.username = Cookie.get("nickname")
        followPlateById(this.follow).then(() => {
          if(this.plate.follow) {
            this.plate.follow = false
          } else {
            this.plate.follow = true
          }
        })
      }
    },
    signIn() {
      if(isLogin()) {
        this.follow.username = Cookie.get("nickname")
        userSignIn(this.follow).then(() => {
          this.sign = true
        })
      }
    },
    plateCommon(id) {
      this.follow.username = Cookie.get("nickname") !== undefined ? Cookie.get("nickname") : null
      this.follow.id = id
      fetchPlate(this.follow).then(response => {
        this.plate = response.data.indexPlate
        this.plateChildren = response.data.plateChildren
      })

      this.hidden = true
      this.def.forEach(element => {
          element.activeIndex = false
      })
      this.listQuery.defOrTree = 2
      this.listQuery.leftId = id
      this.listQuery.contentTag = 1
      this.listQuery.page = 0
      this.article = null
      this.contentTag = 1
      this.type = '最新发布'
      this.listQuery.type = '全部'
      this.hideMore = false
      this.loading = true
      this.getContentTags()
      this.getArticle()
    },
    handleNodeClick(data) {
      this.plateCommon(data.value)
    },
    selectPlate(id) {
      this.plateCommon(id)
    },
    personal(name) {
      if(isLogin()) {
        window.open(this.$router.resolve({name:'Personal', params:{name: name}}).href, '_blank')
      }
    },
    tags() {
      this.$router.push({name:'Tags'})
    },
    tagDetail(id) {
      this.$router.push({name:'TagDetail', params:{id: id}})
    },
    select(index) {
      this.def.forEach(element => {
        if(element.key === index) {
          element.activeIndex = true
        } else {
          element.activeIndex = false
        }
      })
      if (index == 1) {
        this.hidden = false
      } else {
        this.hidden = true
      }
      this.listQuery.defOrTree = 1
      this.listQuery.leftId = index
      this.listQuery.contentTag = 1
      this.listQuery.type = '全部'
      this.listQuery.page = 0
      this.article = null
      this.contentTag = 1
      this.hideMore = false
      this.loading = true
      this.getContentTags()
      this.getArticle()
    },
    changeActive($event, index){
      if (!this.def[index - 1].activeIndex) {
        $event.currentTarget.className="common active"
      }
    },
    removeActive($event, index){
      if (!this.def[index - 1].activeIndex) {
        $event.currentTarget.className="common"
      }
    },
    handleClick(val) {
      console.log(val.props.label)
      if(this.listQuery.defOrTree === 2) {
        this.listQuery.type = val.props.label
      } else {
        this.listQuery.contentTag = this.contentTag
      }
      this.listQuery.page = 0
      this.hideMore = false
      this.article = null
      this.loading = true
      this.getArticle()
    },
    getM1(val) {
      this.listQuery.page = 0
      this.article = null
      this.tag = val
      this.listQuery.hot = val
      this.hideMore = false
      this.getArticle()
    },
    getM2(key, val) {
      this.listQuery.page = 0
      this.article = null
      this.type = val
      this.listQuery.contentTag = key
      this.hideMore = false
      this.getArticle()
    },
    detail(id) {
      window.open(this.$router.resolve({name:'Detail', params:{id: id}}).href, '_blank')
    },
    create() {
      if (Cookie.get("nickname") === undefined) {
        this.$router.push({name:'Login'})
        return
      }
      window.open(this.$router.resolve({name:'Create'}).href, '_blank')
    },
    showMore() {
      this.listQuery.page = this.listQuery.page + 1
      this.getArticle()
    },
    goToOther(jump) {
      window.open(jump, "_blank")
    }
  },
  mounted() {
    window.onresize= () => {
      return (() => {
          if(document.body.clientWidth <= 992) {
            this.is = false
          } else {
            this.is = true
          }
      })();
    }
  },
}
</script>

<style scoped>
@import "~@/styles/index.scss";
@import '~@/styles/display.scss';

.td-operation-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 17px;
}

.set-flex {
  display: flex;
  align-items: center;
}

.tag-icon {
  position: relative;
  top: -25px;
  left: 9px;
}

.tag-search-input {
  height: 32px;
}

.tree >>> .el-tree {
  font-size: 14px;
}

.tree >>> .el-tree > .el-tree-node > .el-tree-node__content,
.tree >>> .el-tree > .el-tree-node > .el-tree-node__children > .el-tree-node > .el-tree-node__content {
    height: 40px;
}

.tree >>> .el-tree > .el-tree-node > .el-tree-node__content > .el-tree-node__expand-icon {
    position: absolute;
    right: 0;
}

.tree >>> .el-tree > .el-tree-node > .el-tree-node__children > .el-tree-node > .el-tree-node__content > .el-tree-node__expand-icon {
    display: none;
}

.content >>> .el-tabs > .el-tabs__header {
  margin-bottom: 0;
}

.content >>> .el-tabs > .el-tabs__header > .el-tabs__nav-wrap::after {
  height: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
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

.index-null {
  flex: none;
  width: 100%;
  outline: none;
}

.index-null2 {
  margin: 112px 0 17px;
  display: flex;
  justify-content: center;
}
</style>