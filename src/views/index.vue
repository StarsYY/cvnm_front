<template>
  <Header />
  <div class="main">
    <el-row>
      <el-col :xs="{span: 8, offset: 2}" :sm="{span: 6, offset: 2}" :md="{span: 5, offset: 2}" :lg="{span: 4, offset: 2}" :xl="{span: 1, offset: 2}">
        <div class="left">
          <el-scrollbar height="570px">
            <ul class="def">
              <li
                v-for="items in def"
                class="common"
                :class="{ hover : items.activeIndex }"
                :key="items.key"
                @click ="select(items.key)"
                v-on:mouseover="changeActive($event)"
                v-on:mouseout="removeActive($event, items.key)">
                {{ items.value }}
              </li>
            </ul>
            <div class="tree">
              <el-tree :data="data" :props="defaultProps" default-expand-all @node-click="handleNodeClick">
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
              <el-carousel-item v-for="item in img" :key="item.key" style="background-color: #fff">
                <el-image :src="item.value" style="height: 288px" />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="content">
            <div style="border-bottom: 1px solid #E8E8E8">
              <div
                v-for="items in contentTags"
                class="content-tags"
                :class="{ 'hover-tag select-tag' : items.tagIndex }"
                :key="items.key"
                @click ="selectTag(items.key)"
                v-on:mouseover="changeTag($event, items.key)"
                v-on:mouseout="removeTag($event, items.key)">
              {{ items.value }}
              </div>
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
                    <span class="t t-color">推荐</span>
                  </div>
                </div>
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
                      <span style="margin-left: 4px; color: #777">88 评论数</span>
                    </p>
                    <p class="icon-flex" style="margin-left: 20px">
                      <svg-icon icon-class="up" style="font-size: 20px"></svg-icon>
                      <span style="margin-left: 4px; color: #777">{{ item.up }}</span>
                    </p>
                  </div>
                </div>
              </div>
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
                <button class="check-in">签到</button>
              </div>
            </div>
          </div>
          <div style="margin-top: 40px;">
            <div class="hot">热门文章</div>
            <div>
              <div style="margin-bottom: 20px">
                <span class="hot-title">落霞与孤鹜齐飞，秋水共长天一色。</span>
                <div class="hot-view">
                  <svg-icon icon-class="view" style="font-size: 16px"></svg-icon>
                  <span style="margin-left: 8px">163</span>
                </div>
              </div>
            </div>
          </div>
          <div style="margin-top: 40px;">
            <div class="tag">
              <div class="tag-hot">热门标签</div>
              <div class="tag-more">更多</div>
            </div>
            <div style="margin: 0 -8px 0 0; padding-bottom: 0">
              <div style="height: 84px; overflow: hidden">
                <h3 class="hot-tag">HarmonyOS</h3>
                <h3 class="hot-tag">开发</h3>
                <h3 class="hot-tag">HMS Core</h3>
                <h3 class="hot-tag">HarmonyOS app</h3>
                <h3 class="hot-tag">华为快应用</h3>
                <h3 class="hot-tag">服务接入</h3>
              </div>
            </div>
          </div>
          <div style="margin-top: 40px;">
            <div class="hot">推荐文章</div>
            <div>
              <div style="margin-bottom: 20px">
                <span class="hot-title">落霞与孤鹜齐飞，秋水共长天一色。</span>
                <div class="hot-view">
                  <svg-icon icon-class="view" style="font-size: 16px"></svg-icon>
                  <span style="margin-left: 8px">163</span>
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
import { fetchIndex, fetchContentTags, fetchArticle, getArticle } from '@/api/index'
import Cookie from 'js-cookie'

export default {
  name: "Index",
  components: { Header, Footer },
  data() {
    return {
      img: [
        { key: 1, value: require("../assets/1.jpg") },
        { key: 1, value: require("../assets/2.jpg") },
        { key: 1, value: require("../assets/3.jpg") }
      ],
      is: true,
      hidden: false,
      windowWidth: document.documentElement.clientWidth,
      def:[
        { key: 1, value: '所有帖子', activeIndex: true },
        { key: 2, value: '热门内容', activeIndex: false },
        { key: 3, value: '推荐精华', activeIndex: false },
      ],
      contentTags: null,
      data: null,
      listQuery: {
        defOrTree: 1, // 1为def  2为tree
        leftId: 1,
        contentTag: 1,
        page: 0,
        limit: 10,
      },
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      activeName: 'first',
      article: null,
      loading: false
    }
  },
  created() {
    this.getIndex()
    this.getContentTags()
    this.getArticle()
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
      fetchArticle(this.listQuery).then(response => {
        this.article = response.data.article
      })
    },
    handleNodeClick(data) {
      console.log(data)
    },
    personal(name) {
      window.open(this.$router.resolve({name:'Personal', params:{name: name}}).href, '_blank')
    },
    select(index) {
      if (this.def[index - 1].key == index) {
        this.def[index - 1].activeIndex = true
        this.def[index % 3].activeIndex = false
        this.def[(index + 1) % 3].activeIndex = false
      }
      if (index == 1) {
        this.hidden = false
      } else {
        this.hidden = true
      }
      this.listQuery.defOrTree = 1
      this.listQuery.leftId = index
      this.listQuery.contentTag = 1
      getArticle(this.listQuery).then(response => {
        this.article = response.data.article
      })
    },
    changeActive($event){
      $event.currentTarget.className="common hover"
    },
    removeActive($event, index){
      if (!this.def[index - 1].activeIndex) {
        $event.currentTarget.className="common"
      }
    },
    selectTag(index) {
      if (this.contentTags[index - 1].key == index) {
        this.contentTags[index - 1].tagIndex = 1
        this.contentTags[index % 3].tagIndex = 0
        this.contentTags[(index + 1) % 3].tagIndex = 0
      }
      console.log(index)
      this.listQuery.contentTag = index
      this.article = null
      this.loading = true
      getArticle(this.listQuery).then(response => {
        this.article = response.data.article
        this.loading = false
      })
    },
    changeTag($event, index){
      if (this.contentTags[index - 1].tagIndex === 0) {
        $event.currentTarget.className="content-tags hover-tag"
      }
    },
    removeTag($event, index){
      if (this.contentTags[index - 1].tagIndex === 0) {
        $event.currentTarget.className="content-tags"
      }
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
</style>