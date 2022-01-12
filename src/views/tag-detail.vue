<template>
  <Header />
  <div class="td-main">
    <div style="margin-bottom: 32px; margin-top: 25px">
      <el-row>
        <el-col :xs="{span: 20, offset: 2}" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 20, offset: 2}" :xl="{span: 20, offset: 2}">
          <div class="td-bc">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">论坛首页</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/tags' }">标签</el-breadcrumb-item>
              <el-breadcrumb-item>标签名</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="tag-middle">
      <el-row>
        <el-col :xs="{span: 20, offset: 2}" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 16, offset: 2}" :xl="{span: 18, offset: 2}">
          <div>
            <p class="td-header">标签名</p>
            <span class="td-description">标签简介</span>
          </div>
          <div style="margin-top: 20px">
            <div class="td-operation-bar">
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
                      <el-dropdown-item v-for="item in menuList" :key="item.key" @click="tag = item.value">{{ item.value }}</el-dropdown-item>
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
                      <el-dropdown-item v-for="item in menuList2" :key="item.key" @click="type = item.value">{{ item.value }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </div>
            <div>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane v-for="item in plateList" :key="item.id" :label="item.value" :name="item.id"></el-tab-pane>
              </el-tabs>
              <div style="flex: auto">
                <div class="td-content">
                  <div style="flex: none; width: 100%; outline: none">
                    <div class="td-article">
                      <div>
                        <span>
                          <span class="td-art-icon">
                            <svg-icon icon-class="hot" style="width: 20px; height: 20px"></svg-icon>
                          </span>
                          <span class="td-art-type">[文章类型]</span>
                          <span class="td-art-title">文章标题</span>
                          <div class="td-art-tag">一个小标签</div>
                        </span>
                      </div>
                      <div class="td-art-info">
                        <div style="display: flex; flex-basis: 70%">
                          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="24" style="margin-right: 8px"></el-avatar>
                          <div class="td-art-name">
                            <span class="td-nickname">
                              <span class="td-nn">人名</span>
                            </span>
                            <span class="td-user-lv">Lv 8</span>
                            <span style="display: flex; white-space: nowrap">
                              <span class="td-art-time">时间</span>
                            </span>
                          </div>
                        </div>
                        <div class="td-info-list">
                          <span style="display: flex; align-items: center; margin-right: 20px">
                            <svg-icon icon-class="view" style="width: 20px; height: 20px"></svg-icon>
                            <span class="td-info-num">3</span>
                          </span>
                          <span style="display: flex; align-items: center; margin-right: 20px">
                            <svg-icon icon-class="review" style="width: 20px; height: 20px"></svg-icon>
                            <span class="td-info-num">2</span>
                          </span>
                          <span style="display: flex; align-items: center">
                            <svg-icon icon-class="up" style="width: 20px; height: 20px"></svg-icon>
                            <span class="td-info-num">2</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="td-page">
            <div class="td-page-total">
              <span>总计：</span>
              <span class="td-page-num">165</span>
            </div>
            <el-pagination
              v-model:currentPage="currentPage3"
              :page-size="100"
              layout="prev, pager, next, jumper"
              :total="1000"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </div>
        </el-col>
        <el-col :xs="8" :sm="6" :md="5" :lg="4" :xl="2" class="hidden-md-and-down">
          <div class="td-right">
            <div class="td-right-tag">
              <div class="td-right-tag-hot">热门标签</div>
              <div class="td-right-tag-more" @click="tags">更多</div>
            </div>
            <div style="margin: 0 -8px 0 0; padding-bottom: 0">
              <div style="max-height: 84px; overflow: hidden">
                <h3 class="td-right-hot-tag" @click="tagDetail">HarmonyOS</h3>
                <h3 class="td-right-hot-tag">开发</h3>
                <h3 class="td-right-hot-tag">HMS Core</h3>
                <h3 class="td-right-hot-tag">HarmonyOS app</h3>
                <h3 class="td-right-hot-tag">华为快应用</h3>
                <h3 class="td-right-hot-tag">服务接入</h3>
                <h3 class="td-right-hot-tag">服务接入</h3>
                <h3 class="td-right-hot-tag">服务接入</h3>
              </div>
            </div>
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
import { ArrowDown } from '@element-plus/icons'

export default {
  name: "Create",
  components: { Header, Footer, ArrowDown },
  data() {
    return {
      currentPage3: '',
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
      plateList:[
        { id: 0, value: '全部' },
        { id: 1, value: '板块一' },
        { id: 2, value: '板块二' },
        { id: 3, value: '板块三' },
        { id: 4, value: '板块四' },
        { id: 5, value: '板块五' },
      ],
      tag: '全部',
      type: '最新发布',
      activeName: 0 
    }
  },
  created() {
  },
  methods: {
    handleClick(val) {
      console.log(val.props.name)
    },
    handleCurrentChange(val) {
      console.log(`current page: ${val}`)
    },
    tags() {
      this.$router.push({name:'Tags'})
    },
    tagDetail() {
      this.$router.push({name:'TagDetail'})
    },
  }
}
</script>

<style scoped>
@import "~@/styles/tagdetail.scss";
@import '~@/styles/display.scss';

.td-bc >>> .el-breadcrumb > .el-breadcrumb__item > .el-breadcrumb__inner {
  font-weight: 400;
  color: #a4a8bd;
}

.td-bc >>> .el-breadcrumb > .el-breadcrumb__item > .el-breadcrumb__inner.is-link:hover {
  color: #242728;
}
</style>
