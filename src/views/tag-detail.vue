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
              <el-breadcrumb-item>{{ label.label }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="tag-middle">
      <el-row>
        <el-col :xs="{span: 20, offset: 2}" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 16, offset: 2}" :xl="{span: 18, offset: 2}">
          <div>
            <p class="td-header">{{ label.label }}</p>
            <span class="td-description">{{ label.describe }}</span>
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
                      <el-dropdown-item v-for="item in menuList" :key="item.key" @click="getM1(item.value, item.type)">{{ item.value }}</el-dropdown-item>
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
              <el-tabs v-model="listQuery.plateid" @tab-click="handleClick">
                <el-tab-pane v-for="item in plateList" :key="item.id" :label="item.plate" :name="item.id"></el-tab-pane>
              </el-tabs>
              <div style="flex: auto">
                <div class="td-content">
                  <div style="flex: none; width: 100%; outline: none">
                    <div v-for="item in articleList" :key="item.id" class="td-article">
                      <div>
                        <span>
                          <span v-if="item.hot === 'Hot'" class="td-art-icon">
                            <svg-icon icon-class="hot" style="width: 20px; height: 20px"></svg-icon>
                          </span>
                          <span v-if="item.hot === 'Top'" class="td-art-icon">
                            <svg-icon icon-class="top" style="width: 20px; height: 20px"></svg-icon>
                          </span>
                          <span class="td-art-type">[{{ item.type }}]</span>
                          <span class="td-art-title" @click="detail(item.id)">{{ item.title }}</span>
                          <div class="td-art-tag">{{ item.tag }}</div>
                        </span>
                      </div>
                      <div class="td-art-info">
                        <div style="display: flex; flex-basis: 70%">
                          <el-avatar :src="item.portrait" :size="24" style="margin-right: 8px"></el-avatar>
                          <div class="td-art-name">
                            <span class="td-nickname">
                              <span class="td-nn">{{ item.nickname }}</span>
                            </span>
                            <span class="td-user-lv">Lv {{ item.grow }}</span>
                            <span style="display: flex; white-space: nowrap">
                              <span class="td-art-time">{{ item.createtime }}</span>
                            </span>
                          </div>
                        </div>
                        <div class="td-info-list">
                          <span style="display: flex; align-items: center; margin-right: 20px">
                            <svg-icon icon-class="view" style="width: 20px; height: 20px"></svg-icon>
                            <span class="td-info-num">{{ item.watch }}</span>
                          </span>
                          <span style="display: flex; align-items: center; margin-right: 20px">
                            <svg-icon icon-class="review" style="width: 20px; height: 20px"></svg-icon>
                            <span class="td-info-num">{{ item.comment }}</span>
                          </span>
                          <span style="display: flex; align-items: center">
                            <svg-icon v-if="!item.like" icon-class="up" style="width: 20px; height: 20px; cursor: pointer" @click="up(item.id, item.unlike)"></svg-icon>
                            <svg-icon v-if="item.like" icon-class="isup" style="width: 18px; height: 18px; cursor: pointer" @click="up(item.id, item.unlike)"></svg-icon>
                            <span class="td-info-num">{{ item.up }}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="total > 10" class="td-page">
            <div class="td-page-total">
              <span>总计：</span>
              <span class="td-page-num">{{ total }}</span>
            </div>
            <el-pagination
              v-model:currentPage="currentPage3"
              :page-size="10"
              layout="prev, pager, next, jumper"
              :total="total"
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
import { fetchLabel, fetchPlate, fetchTagDetail } from '@/api/tags'
import { upArticle } from '@/api/detail'
import Cookie from 'js-cookie'

export default {
  name: "Create",
  components: { Header, Footer, ArrowDown },
  data() {
    return {
      currentPage3: '',
      menuList:[
        { key: 1, value: '全部', type: 'All' },
        { key: 2, value: '精华', type: 'Essence' },
        { key: 3, value: '热门', type: 'Hot' },
        { key: 4, value: '推荐', type: 'Recommend' },
      ],
      menuList2:[
        { key: 1, value: '最新发布' },
        { key: 2, value: '最新回复' },
        { key: 3, value: '最多回复' },
      ],
      label: {
        id: 0,
        label: '',
        describe: ''
      },
      plateList: null,
      articleList: null,
      listQuery: {
        page: 1,
        limit: 10,
        ids: '',
        plateid: '0',
        type: '',
        nickname: ''
      },
      total: 0,
      comment: {
        username: '',
        articleid: '',
        is: ''
      },
      tag: '全部',
      type: '最新发布'
    }
  },
  created() {
    this.getLabel(this.$route.params.id)
    this.getAllPlate()
    this.getTagDetail(this.$route.params.id)
  },
  methods: {
    getLabel(id) {
      fetchLabel(id).then(response => {
        this.label = response.data.label
      })
    },
    getAllPlate() {
      fetchPlate().then(response => {
        this.plateList = response.data.plateList
      })
    },
    getTagDetail(id) {
      this.listQuery.ids = ',' + id + ','
      this.listQuery.nickname = Cookie.get("nickname") === null ? Cookie.get("nickname") : ''
      fetchTagDetail(this.listQuery).then(response => {
        this.total = response.data.total
        this.articleList = response.data.articleList
      })
    },
    getM1(val, type) {
      this.tag = val
      this.listQuery.type = type
      this.getTagDetail(this.label.id)
    },
    handleClick() {
      this.getTagDetail(this.label.id)
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getTagDetail(this.label.id)
    },
    detail(id) {
      window.open(this.$router.resolve({name:'Detail', params:{id: id}}).href, '_blank')
    },
    up(id, unlike) {
      if(unlike) {
        ElMessage({
          message: '您已经将文章标为不喜欢，请先取消再点赞.',
          type: 'warning',
        })
        return
      }
      this.comment.username = Cookie.get("nickname")
      this.comment.articleid = id
      this.comment.is = 1
      upArticle(this.comment).then(response => {
        this.articleList.forEach(item => {
          if(item.id === id) {
            if (item.like) {
              item.like = false
              item.up = item.up - 1
            } else {
              item.like = true
              item.up = item.up + 1
            }
          }
        })
      })
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
