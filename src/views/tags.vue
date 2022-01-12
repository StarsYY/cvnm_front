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
                v-model="search"
                class="w-50 m-2"
                size="small"
                placeholder="输入标签名称搜索"
                prefix-icon="Search"
              />
              <el-icon class="tag-icon"><Search /></el-icon>
            </div>
            <div style="height: 38px">
              <div class="tag-item tag-item-active">按热度</div>
              <div class="tag-item">按名称</div>
            </div>
          </div>
          <div class="tag-container">
            <div class="tag-card" @click="tagDetail">
              <h1 class="tag-basic-info">
                <div class="tag-list">
                  <h2 class="tag-block">标签</h2>
                </div>
                <h3 class="tag-list-description">标签简介</h3>
              </h1>
              <div class="tag-view-count">
                <div style="margin-right: 24px">
                  <span class="tag-view-one">帖子</span>
                  <span class="tag-view-num">520</span>
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
              <span class="tag-page-num">165</span>
            </div>
            <el-pagination
              v-model:currentPage="currentPage3"
              :page-size="100"
              layout="prev, pager, next, jumper"
              :total="1000"
              @size-change="handleSizeChange"
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

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}

const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
}

export default {
  name: "Create",
  components: { Header, Footer, Search },
  data() {
    return {
      search: '',
      currentPage3: ''
    }
  },
  created() {
  },
  methods: {
    tagDetail() {
      this.$router.push({name:'TagDetail'})
    },
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
