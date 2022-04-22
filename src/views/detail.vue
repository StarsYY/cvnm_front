<template>
  <Header />
  <div class="main" v-if="article[0] && article[1]">
    <el-row>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 20, offset: 2}">
        <div class="d-bc">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">论坛首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ article[0].plate }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ article[0].title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="{span: 8, offset: 2}" :sm="{span: 6, offset: 2}" :md="{span: 5, offset: 2}" :lg="{span: 4, offset: 2}" :xl="{span: 1, offset: 2}" class="hidden-md-and-down">
        <div class="d-left">
          <div class="d-user">
            <!-- <el-image :src="poster" class="d-poster" /> -->
            <div style="text-align: center" @click="personal(article[1].nickname)">
              <el-avatar :src="article[1].portrait" :size="50" style="margin-top: 20px; cursor: pointer"></el-avatar>
            </div>
            <div class="d-name" @click="personal(article[1].nickname)">
              <span class="d-username">{{ article[1].nickname }}</span>
            </div>
            <div class="d-level">Lv {{ article[1].grow }}</div>
            <div style="margin-top: 8px; text-align: center">
              <el-image v-for="item in userMedal" :key="item.id" :src="item.medal" class="d-badge" />
            </div>
            <div class="d-info d-info-bottom_2">
              <div class="d-msg">
                文章
                <div class="d-num">{{ article[1].article }}</div>
              </div>
              <div class="d-msg">
                粉丝
                <div class="d-num">{{ article[1].fans }}</div>
              </div>
              <div class="d-msg">
                回复
                <div class="d-num">{{ article[1].count }}</div>
              </div>
            </div>
            <div :class="{ 'is_follow' : article[1].follow }" class="d-follow" @click="follow(article[1].uid, article[1].nickname, 'article')">
              <span v-if="article[1].follow" class="is_follow_span">已关注</span>
              <span v-if="!article[1].follow">关注</span>
            </div>
          </div>
          <div v-if="leftUserHotArticle && leftUserHotArticle.length > 0" style="margin-top: 40px;">
            <div class="d-hot">热门文章</div>
            <div>
              <div v-for="item in leftUserHotArticle" :key="item.id" style="margin-bottom: 20px">
                <span class="d-hot-title" @click="detail(item.id)">{{ item.title }}</span>
                <div class="d-hot-view">
                  <svg-icon icon-class="view" style="font-size: 16px"></svg-icon>
                  <span style="margin-left: 8px">{{ item.watch }}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="leftUserNewArticle && leftUserNewArticle.length > 0" style="margin-top: 40px;">
            <div class="d-hot">最新文章</div>
            <div>
              <div v-for="item in leftUserNewArticle" :key="item.id" style="margin-bottom: 20px">
                <span class="d-hot-title" @click="detail(item.id)">{{ item.title }}</span>
                <div class="d-hot-view">
                  <svg-icon icon-class="view" style="font-size: 16px"></svg-icon>
                  <span style="margin-left: 8px">{{ item.watch }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :xs="{span: col.xs, offset: col.offset}" :sm="{span: col.sm, offset: col.offset}" :md="{span: col.md, offset: col.offset}" :lg="{span: col.lg, offset: col.offset}" :xl="{span: col.xl, offset: col.offset}">
        <div class="d-right" style="overflow: hidden">
          <div class="d-title">
            <span v-if="article[0].hot === 'Top'" class="d-title-icon d-icon-top"></span>
            <span v-if="article[0].hot === 'Hot'" class="d-title-icon d-icon-hot"></span>
            <span class="d-title-name">{{ article[0].title }}</span>
            <el-tag v-if="article[0].tag === 'Essence'" size="mini">推荐</el-tag>
            <el-tag v-if="article[0].tag === 'Recommend'" size="mini">精华</el-tag>
          </div>
          <div class="d-tags">
            <span class="d-tag" v-for="(item, key) in tags" :key="key">{{ item }}</span>
          </div>
          <div class="d-article-msg">
            <span>{{ article[0].author }}</span>
            <span class="d-article-time">{{ article[0].createtime }}</span>
            <span class="d-article-vs">
              <svg-icon icon-class="view" style="font-size: 19px"></svg-icon>
              {{ article[0].watch }}
            </span>
            <span class="d-article-vs">
              <el-icon v-if="!article[0].star" :size="17" color="#707070" style="cursor: pointer" @click="star"><Star /></el-icon>
              <el-icon v-if="article[0].star" :size="19" style="cursor: pointer" @click="star"><StarFilled /></el-icon>
              {{ article[0].collect }}
            </span>
          </div>
          <div class="d-article">
            <div v-if="article[0].cover != null && article[0].cover != ''" style="width: 100%; text-align: center; overflow: hidden">
              <img :src="article[0].cover">
            </div>
            <div v-html="article[0].content"></div>
            <div v-if="article[0].source != null && article[0].source != ''" style="text-align: right; color: #909399; font-size: 14px">引自：<el-link type="info">{{ article[0].source }}</el-link></div>
            <p class="d-article-final">本帖最后由 {{ article[0].author }} 于 {{ article[0].updatetime }} 编辑</p>
            <div class="d-article-bottom"><!-- 点击后效果相反 @mouseenter="show = !show" @mouseleave="show = !show" -->
              <div class="d-article-author">
                <div class="d-article-author-msg">
                  <el-avatar :src="article[1].portrait" :size="35" style="margin-right: 20px; cursor: pointer" @click="personal(article[0].author)"></el-avatar>
                  <span class="d-article-name" @click="personal(article[0].author)">{{ article[0].author }}</span>
                  <div :class="{ 'is_follow' : article[1].follow }" class="d-follow" style="margin: auto 20px" @click="follow(article[1].uid, article[1].nickname, 'article')">
                    <span v-if="article[1].follow" class="is_follow_span">已关注</span>
                    <span v-if="!article[1].follow">关注</span>
                  </div>
                </div>
                <div>
                  <span style="margin-left: 24px; font-size: 20px; cursor: pointer"  @click="report.dataid = article[0].id, report.datasource = 'article', dialogFormVisible = true">
                    <svg-icon icon-class="report"></svg-icon>
                  </span>
                  <span style="margin-left: 24px">
                    <svg-icon v-if="!article[0].like" icon-class="up" style="font-size: 22px; cursor: pointer" @click="up"></svg-icon>
                    <svg-icon v-if="article[0].like" icon-class="isup" style="font-size: 20px; cursor: pointer" @click="up"></svg-icon>
                    <span style="font-size: 15px; color: #777; margin-left: 6px">{{ article[0].up }}</span>
                  </span>
                  <span style="margin-left: 24px">
                    <svg-icon v-if="!article[0].unlike" icon-class="down" style="font-size: 18px; cursor: pointer" @click="down"></svg-icon>
                    <svg-icon v-if="article[0].unlike" icon-class="isdown" style="font-size: 18px; cursor: pointer" @click="down"></svg-icon>
                  </span>
                  <span style="margin-left: 24px">
                    <svg-icon icon-class="review" style="font-size: 22px"></svg-icon>
                    <span style="font-size: 15px; color: #777; margin-left: 6px">{{ article[0].comment }}</span>
                  </span>
                  <span style="margin-left: 24px; cursor: pointer">
                    <el-icon v-if="!article[0].star" :size="17" color="#707070" style="cursor: pointer" @click="star"><Star /></el-icon>
                    <el-icon v-if="article[0].star" :size="21" style="cursor: pointer" @click="star"><StarFilled /></el-icon>
                    <span style="font-size: 15px; color: #777; margin-left: 6px">{{ article[0].collect }}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div v-if="article[0].isopen === 1 && article[0].comment > 0" class="d-article-all-comment">
            <span class="d-article-comment-font">全部回帖({{ paginationTotal }})</span>
          </div>
          <div v-if="article[0].isopen === 1 && article[0].comment > 0" class="d-article-comment">
            <div v-for="item in commentList" :key="item.id" class="d-article-comment-list">
              <div class="d-comment-user">
                <div class="d-user_1">
                  <div class="d-user-msg">
                    <div style="text-align: center">
                      <el-avatar :src="item.user.portrait" :size="40" style="margin-top: 20px; cursor: pointer" @click="personal(item.user.nickname)"></el-avatar>
                    </div>
                    <div class="d-name" @click="personal(item.user.nickname)">
                      <span class="d-username">{{ item.user.nickname }}</span>
                    </div>
                    <div class="d-level">Lv {{ item.grow }}</div>
                    <div style="margin-top: 8px; text-align: center">
                      <el-image v-for="itemImg in item.medalList" :key="itemImg.id" :src="itemImg.medal" class="d-badge" />
                    </div>
                    <div class="d-info d-info-bottom_1" style="margin-bottom: 16px">
                      <div class="d-msg">
                        文章
                        <div class="d-num">{{ item.user.article }}</div>
                      </div>
                      <div class="d-msg">
                        回复
                        <div class="d-num">{{ item.user.count }}</div>
                      </div>
                    </div>
                    <div :class="{ 'is_follow' : item.user.follow }" class="d-follow" @click="follow(item.user.uid, item.user.nickname, 'comment')">
                      <span v-if="item.user.follow" class="is_follow_span">已关注</span>
                      <span v-if="!item.user.follow">关注</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style="flex: 1">
                <div>
                  <div v-html="item.comment" style="word-break: break-word"></div>
                  <div class="d-comment-msg">
                    <div class="d-comment-creattime">
                      <!-- <span style="margin-right: 8px">楼</span> -->
                      <span>回复于{{ item.createtime }}</span>
                    </div>
                    <div>
                      <span style="margin-left: 24px" @click="item.reply = !item.reply">
                        <svg-icon icon-class="review" style="font-size: 22px; cursor: pointer"></svg-icon>
                      </span>
                      <span style="margin-left: 24px">
                        <svg-icon v-if="!item.like" icon-class="up" style="font-size: 22px; cursor: pointer" @click="upComment(item.id)"></svg-icon>
                        <svg-icon v-if="item.like" icon-class="isup" style="font-size: 20px; cursor: pointer" @click="upComment(item.id)"></svg-icon>
                        <span style="font-size: 14px; color: #777; margin-left: 6px">{{ item.up }}</span>
                      </span>
                      <el-dropdown>
                        <span style="margin-left: 24px">
                          <svg-icon icon-class="detail-more" style="font-size: 20px; cursor: pointer"></svg-icon>
                        </span>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item @click="report.dataid = item.id, report.datasource = 'comment', dialogFormVisible = true">举报</el-dropdown-item>
                            <el-dropdown-item v-if="loginName === article[1].nickname || loginName === item.user.nickname" @click="deleteMyComment(item.id)">删除</el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </div>
                  </div>
                  <div :class="{ 'd-hidden' : item.reply }">
                    <el-input v-model="comment.comment" :autosize="{ minRows: 4 }" type="textarea"></el-input>
                    <div class="d-r-c">
                      <span class="d-r-cancel d-r-common" @click="item.reply = !item.reply">取消</span>
                      <span class="d-r-submit d-r-common" @click="reply(item)">发表</span>
                    </div>
                  </div>
                </div>
                <div class="d-comment-reply">
                  <div v-for="(itemReply, key) in item.commentList" :key="key">
                    <div>
                      <el-avatar :src="itemReply.avatar" :size="32" style="margin-right: 8px; cursor: pointer" @click="personal(itemReply.username)"></el-avatar>
                      <span class="d-comment-reply-name" style="cursor: pointer" @click="personal(itemReply.username)">{{ itemReply.username }}</span>
                      <span v-if="itemReply.reviewName !== null" class="d-comment-reply-name">回复</span>
                      <span v-if="itemReply.reviewName !== null" class="d-comment-reply-name" style="cursor: pointer" @click="personal(itemReply.reviewName)">{{ itemReply.reviewName }}</span>
                      <span style="margin-right: 8px">:</span>
                      <span class="d-reply-detail">{{ itemReply.comment }}</span>
                    </div>
                    <div class="d-reply-msg">
                      <div class="d-reply-time">{{ itemReply.createtime }}</div>
                      <div>
                        <span style="margin-left: 24px" @click="itemReply.reply = !itemReply.reply">
                          <svg-icon icon-class="review" style="font-size: 22px; cursor: pointer"></svg-icon>
                        </span>
                        <span style="margin-left: 24px">
                          <svg-icon v-if="!itemReply.like" icon-class="up" style="font-size: 22px; cursor: pointer" @click="upComment(itemReply.id)"></svg-icon>
                          <svg-icon v-if="itemReply.like" icon-class="isup" style="font-size: 20px; cursor: pointer" @click="upComment(itemReply.id)"></svg-icon>
                          <span style="font-size: 14px; color: #777; margin-left: 6px">{{ itemReply.up }}</span>
                        </span>
                        <el-dropdown>
                          <span style="margin-left: 24px">
                            <svg-icon icon-class="detail-more" style="font-size: 20px; cursor: pointer"></svg-icon>
                          </span>
                          <template #dropdown>
                            <el-dropdown-menu>
                              <el-dropdown-item @click="report.dataid = itemReply.id, report.datasource = 'comment', dialogFormVisible = true">举报</el-dropdown-item>
                              <el-dropdown-item v-if="loginName === article[1].nickname || loginName === itemReply.username" @click="deleteMyComment(itemReply.id)">删除</el-dropdown-item>
                            </el-dropdown-menu>
                          </template>
                        </el-dropdown>
                      </div>
                    </div>
                    <div :class="{ 'd-hidden' : itemReply.reply }">
                      <el-input v-model="comment.comment" :autosize="{ minRows: 4 }" type="textarea"></el-input>
                      <div class="d-r-c">
                        <span class="d-r-cancel d-r-common" @click="itemReply.reply = !itemReply.reply">取消</span>
                        <span class="d-r-submit d-r-common" @click="reply(itemReply)">发表</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="article[0].isopen === 1 && article[0].comment > 0" class="d-page">
            <el-pagination
              v-model:currentPage="currentPage4"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="paginationTotal"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
          <div v-if="article[0].isopen === 1" style="background-color: #fafafa">
            <div style="padding: 24px 24px 16px;">
              <Tinymce
                id="myedit"
                ref="editor"
                v-model="tinymceComment"
                :disabled="disabled"
              />
            </div>
            <div class="d-comment-publish">
              <el-button type="info" round @click="publish">发表</el-button>
            </div>
          </div>
          <el-dialog v-model="dialogFormVisible" title="举报">
            <el-form :model="report">
              <el-form-item label="举报理由" label-width="20%">
                <el-input
                  v-model="report.describe"
                  :rows="4"
                  type="textarea"
                  maxlength="250"
                  show-word-limit
                  placeholder="请用简短的话语说明举报理由"
                />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="userReport">Confirm</el-button>
              </span>
            </template>
          </el-dialog>
        </div>
      </el-col>
    </el-row>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/header"
import Footer from "@/components/footer"
import { StarFilled, Star } from '@element-plus/icons'
import { fetchArticle, fetchLeftArticle, fetchComment, createComment, upArticle, downArticle, starArticle, upComment, followAuthor, reportArticleOrComment } from '@/api/detail'
import Cookie from 'js-cookie'
import { isLogin } from '@/utils/tool'
import Tinymce from '@/components/tinymcec'
import tinymce from 'tinymce'
import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'
import { deleteMyReply } from '@/api/personal'

export default {
  name: "Detail",
  components: { Header, Footer, StarFilled, Star, Tinymce },
  data() {
    return {
      id: this.$route.params.id,
      win: '0',
      col: [{ offset: 0}, { xs: 12 }, { sm: 14 }, { md: 15 }, { lg: 16 }, { xl: 18 }],
      poster: require("@/assets/poster.svg"),
      tags: null,
      show: true, // 属性为用到，上面注释中用到了
      currentPage4: '',
      article: null,
      userMedal: null,
      leftUserHotArticle: null,
      leftUserNewArticle: null,
      allComment: null,
      commentList: null,
      pageSize: 10,
      paginationTotal: 0,
      disabled: false,
      tinymceComment: '',
      comment: {
        username: '',
        articleid: '',
        comment: '',
        comid: 0,
        is: '',
        userid: ''
      },
      commentId: {
        id: ''
      },
      loginName: '',
      report: {
        username: '',
        datasource: '',
        dataid: '',
        describe: ''
      },
      dialogFormVisible: false
    }
  },
  created() {
    if(document.body.clientWidth <= 1200) {
      this.col.offset = 2
      this.col.xs = 20
      this.col.sm = 20
      this.col.md = 20
      this.col.lg = 20
      this.col.xl = 20
    } else {
      this.col.offset = 0
      this.col.xs = 12
      this.col.sm = 14
      this.col.md = 15
      this.col.lg = 16
      this.col.xl = 18
    }

    this.loginName = Cookie.get("nickname") !== undefined ? Cookie.get("nickname") : ''
    this.id = this.$route.params.id

    this.getArticle(this.$route.params.id)
    this.getComment(this.$route.params.id)
  },
  methods: {
    getArticle(id) {
      if(Cookie.get("nickname") !== undefined) {
        this.comment.username = Cookie.get("nickname")
      }
      this.comment.articleid = id
      fetchArticle(this.comment).then(response => {
        this.tags = response.data.article[0].labelMap
        this.article = response.data.article
        this.userMedal = response.data.userMedal
        
        this.getLeft(this.article[1].uid)
      })
    },
    getLeft(uid) {
      fetchLeftArticle(uid).then(response => {
        this.leftUserHotArticle = response.data.leftUserHotArticle
        this.leftUserNewArticle = response.data.leftUserNewArticle
      })
    },
    getComment(id) {
      if(Cookie.get("nickname") !== undefined) {
        this.comment.username = Cookie.get("nickname")
      }
      this.comment.articleid = id
      fetchComment(this.comment).then(response => {
        this.allComment = response.data
        this.commentList = response.data.slice(0, this.pageSize)
        this.paginationTotal = this.allComment.length
      })
    },
    setComment() {
      this.comment.username = Cookie.get("nickname")
      this.comment.articleid = this.article[0].id
    },
    up() {
      if(isLogin()) {
        if(this.article[0].unlike) {
          ElMessage({
            message: '您已经将文章标为不喜欢，请先取消再点赞.',
            type: 'warning',
          })
          return
        }
        this.setComment()
        this.comment.is = 1
        upArticle(this.comment).then(() => {
          if (this.article[0].like) {
            this.article[0].like = false
            this.article[0].up = this.article[0].up - 1
          } else {
            this.article[0].like = true
            this.article[0].up = this.article[0].up + 1
          }
        })
      }
    },
    down() {
      if(isLogin()) {
        if(this.article[0].like) {
          ElMessage({
            message: '您已经点赞该文章，请先取消吧.',
            type: 'warning',
          })
          return
        }
        this.setComment()
        this.comment.is = 0
        downArticle(this.comment).then(response => {
          if (this.article[0].unlike) {
            this.article[0].unlike = false
            this.article[0].down = this.article[0].down - 1
          } else {
            this.article[0].unlike = true
            this.article[0].down = this.article[0].down + 1
          }
        })
      }
    },
    star() {
      if(isLogin()) {
        this.setComment()
        starArticle(this.comment).then(() => {
          if (this.article[0].star) {
            this.article[0].star = false
            this.article[0].collect = this.article[0].collect - 1
          } else {
            this.article[0].star = true
            this.article[0].collect = this.article[0].collect + 1
          }
        })
      }
    },
    upComment(id) {
      if(isLogin()) {
        this.setComment()
        this.comment.comid = id
        this.comment.is = 1
        console.log(this.comment)
        upComment(this.comment).then(response => {
          this.commentList = response.data.commentList
        })
      }
    },
    follow(id, nickname, str) {
      if(isLogin()) {
        if (Cookie.get("nickname") === nickname) {
          ElMessage({
            message: '不能自己关注自己呦🤣',
            type: 'warning',
          })
          return
        }
        this.setComment()
        this.comment.userid = id
        followAuthor(this.comment).then(response => {
          this.commentList = response.data.commentList
          if (str === "article") {
            if (this.article[1].follow) {
              this.article[1].follow = false
            } else {
              this.article[1].follow = true
            }
          }
        })
      }
    },
    publish() {
      if (isLogin()) {
        this.setComment()
        this.comment.comment = tinymce.editors[0].getContent()
        this.comment.comid = 0
        if (this.comment.comment.length === 0) {
          ElMessage({
            message: '评论内容不能为空.',
            type: 'warning',
          })
          return
        }
        createComment(this.comment).then(() => {
          ElMessage({
            type: 'success',
            message: '评论成功，正在等待管理员审核',
          })
        })
      }
    },
    reply(val) {
      if (isLogin()) {
        this.comment.username = Cookie.get("nickname")
        this.comment.articleid = val.articleid
        this.comment.comid = val.id
        if (this.comment.comment.length === 0) {
          ElMessage({
            message: '评论内容不能为空.',
            type: 'warning',
          })
          return
        }
        createComment(this.comment).then(() => {
          ElMessage({
            type: 'success',
            message: '回复成功，正在等待管理员审核',
          })
        })
      }
    },
    deleteMyComment(id) {
      if (isLogin()) {
        ElMessageBox.confirm(
          '你确定要删除这条回复及以下的评论嘛?',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          }
        ).then(() => {
          this.commentId.id = id
          deleteMyReply(this.commentId).then(() => {
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            this.getComment(this.id)
          })
        })
      }
    },
    userReport() {
      console.log(this.report)
      if (isLogin()) {
        this.report.username = Cookie.get("nickname")
        reportArticleOrComment(this.report).then(() => {
          ElNotification({
            title: '举报成功',
            message: '已交由管理员审查',
            type: 'success',
          })
          this.dialogFormVisible = false
        })
      }
    },
    detail(id) {
      window.open(this.$router.resolve({name:'Detail', params:{id: id}}).href, '_blank')
    },
    personal(name) {
      if(isLogin()) {
        window.open(this.$router.resolve({name:'Personal', params:{name: name}}).href, '_blank')
      }
    },
    handleCurrentChange(val) {
      console.log(val)
      this.commentList = this.allComment.slice((val - 1) * this.pageSize, (val - 1) * this.pageSize + this.pageSize)
    },
    handleSizeChange(val) {
      console.log(val)
      this.commentList = this.allComment.slice((val - 1) * this.pageSize, (val - 1) * this.pageSize + this.pageSize)
    }
  },
  mounted() {
    window.onresize= () => {
      return (() => {
        this.win = document.body.clientWidth
        if(document.body.clientWidth < 1200) {
          this.col.offset = 2
          this.col.xs = 20
          this.col.sm = 20
          this.col.md = 20
          this.col.lg = 20
          this.col.xl = 20
        } else {
          this.col.offset = 0
          this.col.xs = 12
          this.col.sm = 14
          this.col.md = 15
          this.col.lg = 16
          this.col.xl = 18
        }
      })();
    }
  },
}
</script>

<style scoped>
@import "~@/styles/detail.scss";
@import '~@/styles/display.scss';

.d-bc >>> .el-breadcrumb > .el-breadcrumb__item > .el-breadcrumb__inner {
  font-weight: 400;
  color: #6a707a;
}

.d-bc >>> .el-breadcrumb > .el-breadcrumb__item > .el-breadcrumb__inner.is-link:hover {
  color: #409eff;
}

.d-title >>> .el-tag {
  font-weight: 700;
  border-style: none;
}

.d-article-vs >>> .el-icon {
  top: 3px;
}

.d-comment-publish >>> .el-button--info {
  --el-button-background-color: #340403;
}

.is_follow {
  opacity: .7;
  background: #328dff;
}

.is_follow_span {
  color: #fff;
}
</style>
