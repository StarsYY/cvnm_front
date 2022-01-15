<template>
  <Header />
  <div class="tag-main">
    <div class="tag-top">
      <el-row>
        <el-col :xs="{span: 20, offset: 2}" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 20, offset: 2}" :xl="{span: 20, offset: 2}">
          <div class="tag-bc">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">论坛首页</el-breadcrumb-item>
              <el-breadcrumb-item>标签</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
        <el-col :xs="{span: 20, offset: 2}" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 20, offset: 2}" :xl="{span: 20, offset: 2}">
          <div>
            <p class="tag-header">标签</p>
            <p class="tag-description">标签是用来标识一个问题的关键字，使用标签可以快速定位同类问题。</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="tag-middle">
      <el-row>
        <el-col :xs="{span: 20, offset: 2}" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 20, offset: 2}" :xl="{span: 20, offset: 2}">
          <div class="tag-search">
            <div class="tag-search-input">
              <el-input
                v-model="listQuery.label"
                class="w-50 m-2"
                size="small"
                placeholder="输入标签名称搜索"
                prefix-icon="Search"
                @change="search"
              />
              <el-icon class="tag-icon"><Search /></el-icon>
            </div>
            <div style="height: 38px">
              <div class="tag-item" :class="{ 'tag-item-active' : is }" @click="type(1)">按热度</div>
              <div class="tag-item" :class="{ 'tag-item-active' : !is }" @click="type">按名称</div>
            </div>
          </div>
          <div class="tag-container">
            <div v-for="item in labelList" :key="item.id" class="tag-card" @click="tagDetail(item.id)">
              <h1 class="tag-basic-info">
                <div class="tag-list">
                  <h2 class="tag-block">{{ item.label }}</h2>
                </div>
                <h3 class="tag-list-description">{{ item.describe }}</h3>
              </h1>
              <div class="tag-view-count">
                <div style="margin-right: 24px">
                  <span class="tag-view-one">帖子</span>
                  <span class="tag-view-num">{{ item.articleCount }}</span>
                </div>
                <div>
                  <span class="tag-view-one">本月</span>
                  <span class="tag-view-num">25</span>
                </div>
              </div>
            </div>
          </div>
          <div class="tag-page">
            <div class="tag-page-total">
              <span>总计：</span>
              <span class="tag-page-num">{{ total }}</span>
            </div>
            <el-pagination
              v-model:currentPage="currentPage3"
              :page-size="16"
              layout="prev, pager, next, jumper"
              :total="total"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Search } from '@element-plus/icons'
import { fetchTags } from '@/api/tags'

export default {
  name: "Create",
  components: { Header, Footer, Search },
  data() {
    return {
      currentPage3: '',
      listQuery: {
        label: '',
        page: 1,
        limit: 20,
        title: 'hot'
      },
      labelList: null,
      total: 0,
      is: true
    }
  },
  created() {
    this.getTags()
  },
  methods: {
    getTags() {
      fetchTags(this.listQuery).then(response => {
        this.labelList = response.data.labelList
        this.total = response.data.count
      })
    },
    search() {
      this.getTags()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getTags()
    },
    tagDetail(id) {
      this.$router.push({name:'TagDetail', params:{id: id}})
    },
    type(num) {
      if(num === 1) {
        this.listQuery.title = 'hot'
        this.is = true
      } else {
        this.listQuery.title = 'name'
        this.is = false
      }
      this.getTags()
    }
  }
}
</script>

<style scoped>
@import "~@/styles/tags.scss";

.tag-bc >>> .el-breadcrumb > .el-breadcrumb__item > .el-breadcrumb__inner {
  font-weight: 400;
  color: #a4a8bd;
}

.tag-bc >>> .el-breadcrumb > .el-breadcrumb__item > .el-breadcrumb__inner.is-link:hover {
  color: #242728;
}
</style>
