<template>
  <Header />
  <div class="sh-main">
    <div class="sh-search-input">
      <el-input 
        v-model="listQuery.search"
        class="w-50 m-2"
        maxlength="120"
        placeholder="您想了解..."
        @keyup.enter="getSearch"
      >
        <template #prefix>
          <div class="sh-icon-search">
            <svg-icon icon-class="search"></svg-icon>
          </div>
        </template>
        <template #suffix>
          <div class="sh-icon-close" @click="listQuery.search = ''">
            <svg-icon icon-class="close"></svg-icon>
          </div>
        </template>
      </el-input>
    </div>
    <div>
      <el-tabs v-model="listQuery.choose" class="demo-tabs" @tab-click="handleClick">
        <!-- <el-tab-pane label="全部" name="0"></el-tab-pane> -->
        <el-tab-pane label="学堂" name="1"></el-tab-pane>
        <el-tab-pane label="论坛" name="2"></el-tab-pane>
      </el-tabs>
    </div>
    <div style="padding: 24px 0 0 0">
      <div v-if="listQuery.choose === '2'" class="sh-tool">
        <div class="sh-tool-select">
          <el-select v-model="listQuery.plate" size="small" filterable placeholder="选择板块" @change="getSearch">
            <el-option v-for="item in plateOptions" :key="item.id" :label="item.plate" :value="item.id" />
          </el-select>
          <el-select v-model="listQuery.time" size="small" placeholder="选择时间" style="margin-left: 10px" @change="getSearch">
            <el-option v-for="item in timeOptions" :key="item.id" :label="item.label" :value="item.id" />
          </el-select>
        </div>
        <div class="sh-tool-total">
          找到全部相关内容：
          <span class="sh-tool-total-span">{{ total }}</span>
        </div>
      </div>
      <div v-if="listQuery.choose === '2'" style="margin-bottom: 24px">
        <el-tabs v-model="listQuery.type" class="type-tabs" @tab-click="getSearch">
          <el-tab-pane label="综合排序" name="0"></el-tab-pane>
          <el-tab-pane label="最新发布" name="1"></el-tab-pane>
          <el-tab-pane label="最近更新" name="2"></el-tab-pane>
          <el-tab-pane label="最多回复" name="3"></el-tab-pane>
          <el-tab-pane label="最多点赞" name="4"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="sh-content">
        <div v-if="listQuery.choose == '1'" style="width: 100%">
          <div v-for="item in courseList" :key="item.id" class="sh-cart-list">
            <div class="sh-cart-title" @click="course(item.id, item.price)">
              <a class="sh-cart-a sh-ct-main">{{ item.name }}</a>
            </div>
            <div class="sh-cart-url" @click="course(item.id, item.price)">
              <a class="sh-cart-a sh-cu-main">{{ item.url }}</a>
            </div>
            <div class="sh-cart-content">
              <div style="width: 100%">
                <div class="sh-card-msg">
                  <div class="sh-cm-time-line">
                    <div class="sh-ct-time">{{ item.createtime }}</div>
                    <div style="overflow: hidden">
                      <div class="sh-card-breadcrumbs">
                        <div>
                          <span class="sh-cb-left">课程</span>
                          <span class="sh-cb-left" style="margin: 0 8px">></span>
                        </div>
                        <div v-for="ii in item.modularName" :key="ii.id">
                          <span class="sh-cb-left">{{ ii.modular }}</span>
                          <span class="sh-cb-left" style="margin: 0 8px">></span>
                        </div>
                        <div>
                          <span class="sh-cb-left">{{ item.name }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="total === 0" class="td-null">
            <div class="td-null2">
              <svg-icon icon-class="null2" style="width: 240px; height: 216px"></svg-icon>
            </div>
            <p style="color: #777; text-align: center;">暂无课程可看，不如看看远方吧</p>
          </div>
        </div>
        <div v-if="listQuery.choose === '2'" style="width: 100%">
          <div v-for="item in articleList" :key="item.id" class="sh-cart-list">
            <div class="sh-cart-title" @click="detail(item.id)">
              <a class="sh-cart-a sh-ct-main">{{ item.title }}</a>
            </div>
            <div class="sh-cart-url" @click="detail(item.id)">
              <a class="sh-cart-a sh-cu-main">{{ item.url }}</a>
            </div>
            <div class="sh-cart-content">
              <div style="width: 100%">
                <p v-if="item.summary == null || item.summary == ''" class="sh-cc-main">{{ item.content }}</p>
                <p v-else class="sh-cc-main">{{ item.summary }}</p>
                <div class="sh-card-msg">
                  <div class="sh-cm-time-line">
                    <div class="sh-ct-time">{{ item.createtime }}</div>
                    <div style="overflow: hidden">
                      <div class="sh-card-breadcrumbs">
                        <div>
                          <span class="sh-cb-left">社区</span>
                          <span class="sh-cb-left" style="margin: 0 8px">></span>
                        </div>
                        <div>
                          <span class="sh-cb-left">论坛</span>
                          <span class="sh-cb-left" style="margin: 0 8px">></span>
                        </div>
                        <div>
                          <span class="sh-cb-left sh-cb-flex">
                            <el-avatar :src="item.portrait" :size="18" />
                            <span class="sh-cb-left" style="margin-left: 4px">{{ item.nickname }}</span>
                            <span class="sh-cb-left" style="margin-left: 4px; margin-right: 8px">发表于</span>
                            <el-avatar v-if="item.icon !== null && item.icon !== ''" :src="item.icon" :size="18" />
                            <span class="sh-cb-left" style="margin-left: 4px">{{ item.plate }}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="listQuery.choose === '2'" class="sh-cm-info">
                    <div class="sh-ci-icon">
                      <svg-icon icon-class="view" class-name="sh-icon-class"></svg-icon>
                      {{ item.watch }}
                    </div>
                    <div class="sh-ci-icon">
                      <svg-icon icon-class="review" class-name="sh-icon-class"></svg-icon>
                      {{ item.comment }}
                    </div>
                    <div class="sh-ci-icon" style="margin-right: 0">
                      <svg-icon v-if="!item.like" icon-class="up" class-name="sh-icon-class" @click="up(item.id)"></svg-icon>
                      <svg-icon v-if="item.like" icon-class="isup" class-name="sh-icon-class" @click="up(item.id)"></svg-icon>
                      {{ item.up }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="total === 0" class="td-null">
            <div class="td-null2">
              <svg-icon icon-class="null2" style="width: 240px; height: 216px"></svg-icon>
            </div>
            <p style="color: #777; text-align: center;">暂无文章可看，不如看看远方吧</p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="total > 0" class="sh-page">
      <div class="sh-page-total">
        <span>总计：</span>
        <span class="sh-page-num">{{ total }}</span>
      </div>
      <el-pagination
        v-model:currentPage="listQuery.page"
        :page-size="listQuery.limit"
        layout="prev, pager, next, jumper"
        :total="total"
        @current-change="getSearch"
      >
      </el-pagination>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Search } from '@element-plus/icons'
import Cookie from 'js-cookie'
import { fetchPlate, fetchSearch } from '@/api/search'
import { deleteHTML } from '@/utils/tool'
import { isLogin } from '@/utils/tool'
import { upArticle } from '@/api/detail'
import { ElMessage } from 'element-plus'

export default {
  name: "Search",
  components: { Header, Footer, Search },
  data() {
    return {
      listQuery: {
        search: '',
        choose: '2',
        plate: 0,
        type: 0,
        time: 0,
        username: '',
        page: 1,
        limit: 10
      },
      plateOptions: null,
      timeOptions: [
        { id: 0, label: '全部时间' },
        { id: 1, label: '最近12小时' },
        { id: 2, label: '最近24小时' },
        { id: 3, label: '最近1周' },
        { id: 4, label: '最近1个月' },
        { id: 5, label: '最近6个月' },
        { id: 6, label: '最近1年' }
      ],
      total: 0,
      articleList: null,
      courseList: [],
      comment: {
        username: '',
        articleid: '',
        comment: '',
        comid: 0,
        is: '',
        userid: ''
      }
    }
  },
  created() {
    this.listQuery.search = this.$route.params.search

    this.getPlate()
    this.getSearch()
  },
  methods: {
    getPlate() {
      fetchPlate().then(response => {
        this.plateOptions = response.data.plateList
      })
    },
    getLoginStatus() {
      if (Cookie.get("nickname") === undefined) {
        return false
      }
      return true
    },
    getSearch() {
      // this.$router.push({ name: 'Search', params: { search: this.listQuery.search } })
      if(this.getLoginStatus()) {
        this.listQuery.username =  Cookie.get("nickname")
      }
      fetchSearch(this.listQuery).then(response => {
        this.courseList = response.data.course
        this.articleList = response.data.article
        this.total = response.data.total

        if(this.articleList) {
          this.articleList.forEach(item => {
            item.content = deleteHTML(item.content)
            item.createtime = item.createtime.substring(0, 10)

            var reg = new RegExp('-', 'g')
            item.createtime = item.createtime.replace(reg, '/')
          })
        }
        if(this.courseList) {
          this.courseList.forEach(item => {
            item.createtime = item.createtime.substring(0, 10)

            var reg = new RegExp('-', 'g')
            item.createtime = item.createtime.replace(reg, '/')
          })
        }
      })
    },
    setComment(id) {
      this.comment.username = Cookie.get("nickname")
      this.comment.articleid = id
    },
    up(id) {
      if(isLogin()) {
        this.articleList.forEach(element => {
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
    detail(id) {
      window.open(this.$router.resolve({name:'Detail', params:{id: id}}).href, '_blank')
    },
    course(id, price) {
      if(price === 0) {
        window.open(this.$router.resolve({name:'Video', params:{id: id}}).href, '_blank')
      } else {
        window.open(this.$router.resolve({name:'Purchase', params:{id: id}}).href, '_blank')
      }
    },
    handleClick() {
      if(this.listQuery.choose !== '2') {
        this.listQuery.plate = 0
        this.listQuery.time = 0
        this.listQuery.type = 0
      }
      this.listQuery.page = 1
      this.getSearch()
    }
  }
}
</script>

<style scoped>
@import "~@/styles/search.scss";

.sh-icon-search {
  display: flex;
  align-items: center;
  margin-left: 23px;
  margin-right: 4px;
  font-size: 20px;
}

.sh-icon-close {
  display: flex;
  align-items: center;
  margin-right: 13px;
  margin-left: 4px;
  font-size: 16px;
  cursor: pointer;
}

.sh-search-input >>> .el-input > .el-input__inner {
  height: 64px;
  border-radius: 32px;
  font-size: 18px;
  line-height: 24px;
  padding: 0 65px 0 65px;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__active-bar {
  background-color: #333;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item {
  color: #777;
  font-size: 16px;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item:hover {
  color: #333;
  font-weight: 600;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .is-active {
  color: #333;
  font-weight: 600;
}

.type-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__active-bar {
  background-color: #333;
  height: 1px;
}

.type-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item {
  color: #777;
  font-size: 16px;
}

.type-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item:hover {
  color: #333;
}

.type-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .is-active {
  color: #333;
}

.type-tabs >>> .el-tabs__header > .el-tabs__nav-wrap::after {
  height: 0;
}

.td-null {
  flex: none;
  width: 100%;
  outline: none;
}

.td-null2 {
  margin: 112px 0 17px;
  display: flex;
  justify-content: center;
}
</style>
