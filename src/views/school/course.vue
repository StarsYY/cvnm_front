<template>
  <Header />
  <div class="cs-main">
    <el-row>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 20, offset: 2}" :xl="{span: 20, offset: 2}">
        <div style="padding: 48px 0">
          <div class="cs-tag">
            <div class="cs-tag-title">业务领域</div>
            <div class="cs-tag-main">
              <div class="cs-tag-list cs-tag-all" :class="{ 'cs-tag-select' : M1 }" @click="selBA(0)">全部</div>
              <div class="cs-tt">
                <div class="cs-tag-list" :class="{ 'cs-tag-select' : item.select }" v-for="item in businessAreaList" :key="item.id" @click="selBA(item.id)">
                  <span class="cs-tl-name">{{ item.modular }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="cs-tag" v-if="modular.ancestor !== 0">
            <div class="cs-tag-title">业务模块</div>
            <div class="cs-tag-main">
              <div class="cs-tag-list cs-tag-all" :class="{ 'cs-tag-select' : M2 }" @click="selBM(0)">全部</div>
              <div class="cs-tt">
                <div class="cs-tag-list" :class="{ 'cs-tag-select' : item.select }" v-for="item in businessModuleList" :key="item.id" @click="selBM(item.id)">
                  <span class="cs-tl-name">{{ item.modular }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="cs-tag">
            <div class="cs-tag-title">是否收费</div>
            <div class="cs-tag-main">
              <div class="cs-tag-list cs-tag-all" :class="{ 'cs-tag-select' : P1 }" @click="selP(-1)">全部</div>
              <div class="cs-tt">
                <div class="cs-tag-list" :class="{ 'cs-tag-select' : item.is }" v-for="item in priceList" :key="item.key" @click="selP(item.key)">
                  <span class="cs-tl-name">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="padding: 20px 0">
          <div class="sc-md-tag">
            <el-tabs v-model="modular.modular" class="demo-tabs" @tab-click="getAll">
              <el-tab-pane label="综合排序" name="all"></el-tab-pane>
              <el-tab-pane label="最新" name="new"></el-tab-pane>
              <el-tab-pane label="最热" name="hot"></el-tab-pane>
            </el-tabs>
            <div class="cs-md-r">
              <div class="cs-mr-clear" @click="clearSelect">
                <svg-icon icon-class="clear"></svg-icon>
                <span>清除条件</span>
              </div>
              <div>共 {{ total }} 门课</div>
            </div>
          </div>
          <div class="sc-md-main">
            <div class="sc-mm">
              <div class="sc-mmm">
                <div class="sc-mmmm">
                  <div class="sc-mm-list" @click="video(item.id)" v-for="item in courseList" :key="item.id">
                    <div class="sc-ml-a">
                      <div class="sc-ml-top">
                        <img :src="item.cover" class="sc-ct-img">
                      </div>
                      <div class="sc-ml-foot">
                        <span class="sc-ml-name">{{ item.name }}</span>
                        <div class="sc-ml-star">
                          <div class="sc-ml-per">
                            <svg-icon icon-class="person"></svg-icon>
                            <span style="margin-left: 5px">{{ item.watch }}</span>
                          </div>
                          <div class="sc-ml-per sc-ml-score">
                            <svg-icon icon-class="person"></svg-icon>
                            <span style="margin-left: 5px">{{ item.score }}</span>
                          </div>
                        </div>
                        <div class="sc-ml-price">
                          <div class="sc-mp-r">
                            <span v-if="item.price === 0" class="sc-mpp">免费</span>
                            <span v-else class="sc-mpp">￥ {{ item.price / 100 }}</span>
                          </div>
                          <div class="sc-mp-au">{{ item.author }}</div>
                        </div>
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
import { fetchBusinessArea, getModularAndCourse } from '@/api/course'

export default {
  name: "Course",
  components: { Header, Footer },
  data() {
    return {
      businessAreaList: null,
      businessModuleList: null,
      courseList: null,
      total: 0,
      modular: {
        id: 0,
        ancestor: 0,
        count: -1,
        modular: 'all'
      },
      priceList: [
        { key: 0, value: '免费', is: false },
        { key: 99, value: '0-99元', is: false },
        { key: 199, value: '99-199元', is: false },
        { key: 499, value: '199-499元', is: false },
        { key: 999, value: '499-999元', is: false },
        { key: 1000, value: '999元以上', is: false },
      ],
      M1: true,
      M2: true,
      P1: true
    }
  },
  created() {
    this.getBusinessArea()
  },
  methods: {
    getBusinessArea() {
      fetchBusinessArea().then(response => {
        this.businessAreaList = response.data
      })
      this.getAll()
    },
    selBA(ancestor) {
      if(ancestor === 0) {
        this.M1 = true
        this.businessAreaList.forEach(item => item.select = false)
      } else {
        this.M1 = false
        this.businessAreaList.forEach(item => {
          if(item.id === ancestor) {
            item.select = true
          } else {
            item.select = false
          }
        })
      }
      this.modular.id = 0
      this.modular.ancestor = ancestor
      this.getAll()
      this.M2 = true
      this.businessModuleList.forEach(item => item.select = false)
    },
    selBM(id) {
      if(id === 0) {
        this.M2 = true
        this.businessModuleList.forEach(item => item.select = false)
      } else {
        this.M2 = false
        this.businessModuleList.forEach(item => {
          if(item.id === id) {
            item.select = true
          } else {
            item.select = false
          }
        })
      }
      this.modular.id = id
      this.getAll()
    },
    selP(price) {
      if(price === -1) {
        this.P1 = true
        this.priceList.forEach(item => item.is = false)
      } else {
        this.P1 = false
        this.priceList.forEach(item => {
          if(item.key === price) {
            item.is = true
          } else {
            item.is = false
          }
        })
      }
      this.modular.count = price
      this.getAll()
    },
    clearSelect() {
      this.modular.id = 0
      this.modular.ancestor = 0,
      this.modular.count = -1,
      this.modular.modular = 'all'
      this.M1 = true
      this.businessAreaList.forEach(item => item.select = false)
      this.M2 = true
      this.businessModuleList.forEach(item => item.select = false)
      this.P1 = true
      this.priceList.forEach(item => item.is = false)
      this.getAll()
    },
    getAll() {
      getModularAndCourse(this.modular).then(response => {
        this.businessModuleList = response.data.module
        this.courseList = response.data.course
        this.total = response.data.total
      })
    },
    video(id) {
      window.open(this.$router.resolve({name:'Video', params:{id: id}}).href, '_blank')
    }
  }
}
</script>

<style scoped>
@import "~@/styles/school.scss";
@import "~@/styles/course.scss";

.listnone {
  list-style: none;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap::after {
  height: 0;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__active-bar {
  background-color: black;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item {
  color: #777777;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item.is-active {
  color: black;
}
</style>
