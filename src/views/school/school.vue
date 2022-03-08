<template>
  <Header />
  <div class="sc-main">
    <el-row>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 20, offset: 2}" :xl="{span: 20, offset: 2}">
        <div style="padding-top: 64px;">
          <div style="margin-bottom: 80px">
            <div class="sc-top">
              <el-row>
                <el-col :xs="5" :sm="5" :md="5" :lg="5" :xl="5">
                  <div class="sc-top-left">
                    <ul class="listnone">
                      <li v-for="item in leftNav" :key="item.value">
                        <div class="sc-level" @click="more">
                          <div class="sc-first-level">{{ item.label }}</div>
                          <div class="sc-second-level">
                            <div class="sc-tag" v-for="itemModular in item.children" :key="itemModular.value">{{ itemModular.label }}</div>
                          </div>
                        </div>
                        <div class="sc-tag-hide">
                          <div class="sc-submenu">
                            <div class="sc-sub-item">
                              <div class="sc-sub-item-title">{{ item.label }}</div>
                              <div class="sc-subtitle">
                                <div class="sc-subtitle-name">知识点</div>
                                <div class="sc-name-content">
                                  <span class="sc-name-main" v-for="itemModular in item.children" :key="itemModular.value" @click="more">{{ itemModular.label }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="sc-course">
                            <div class="sc-course-list" v-for="itemCourse in item.courseList" :key="itemCourse.id">
                              <div style="display: flex" @click="course(itemCourse.id)">
                                <div class="sc-sourse-image">
                                  <img :src="itemCourse.cover" class="sc-sourse-image-cover">
                                </div>
                                <div class="sc-sourse-content">
                                  <div class="sc-sc-name">
                                    <div class="sc-sc-title">{{ itemCourse.name }}</div>
                                  </div>
                                  <div class="sc-sc-info">
                                    <div class="sc-sc-price">
                                      <span v-if="itemCourse.price === 0">免费</span>
                                      <span v-else>￥ {{ itemCourse.price / 100 }}</span>
                                    </div>
                                    <div class="sc-sc-number">
                                      <svg-icon icon-class="person" style="width: 1em; height: 1em"></svg-icon>
                                      <span style="margin-left: 5px">{{ itemCourse.watch }}</span>
                                    </div>
                                    <div class="sc-sc-number">
                                      <svg-icon icon-class="person" style="width: 1em; height: 1em"></svg-icon>
                                      <span style="margin-left: 5px">{{ itemCourse.score }}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </el-col>
                <el-col :xs="19" :sm="19" :md="19" :lg="19" :xl="19">
                  <div class="sc-top-right">
                    <el-carousel height="520px">
                      <el-carousel-item v-for="item in img" :key="item.key">
                        <el-image :src="item.value" class="sc-rotation-img" />
                      </el-carousel-item>
                    </el-carousel>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="sc-middle">
          <div class="sc-md-title">
            <span style="font-weight: 500">热门课程</span>
          </div>
          <div class="sc-md-tag">
            <el-tabs v-model="hotId" class="demo-tabs" @tab-click="getHotCourse(hotId)">
              <el-tab-pane v-for="item in hotModularList" :key="item.id" :label="item.modular" :name="item.id"></el-tab-pane>
            </el-tabs>
            <div class="sc-md-more" @click="more">更多</div>
          </div>
          <div class="sc-md-main">
            <div class="sc-mm">
              <div class="sc-mmm">
                <div class="sc-mmmm">
                  <div class="sc-mm-list" v-for="item in hotCourseList" :key="item.id">
                    <div class="sc-ml-a" @click="course(item.id)">
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
        <div class="sc-middle">
          <div class="sc-md-title">
            <span style="font-weight: 500">最新课程</span>
          </div>
          <div class="sc-md-tag">
            <el-tabs v-model="newId" class="demo-tabs" @tab-click="getNewCourse(newId)">
              <el-tab-pane v-for="item in hotModularList" :key="item.id" :label="item.modular" :name="item.id"></el-tab-pane>
            </el-tabs>
            <div class="sc-md-more" @click="more">更多</div>
          </div>
          <div class="sc-md-main">
            <div class="sc-mm">
              <div class="sc-mmm">
                <div class="sc-mmmm">
                  <div class="sc-mm-list" v-for="item in newCourseList" :key="item.id">
                    <div class="sc-ml-a" @click="course(item.id)">
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
        <div class="sc-dev">
          <div class="sc-dev-top">
            <div class="sc-dt-name">
              <span style="font-weight: 500">开发者故事</span>
            </div>
            <div style="margin-bottom: 32px;">
              <a class="sc-dt-more" @click="more">更多</a>
            </div>
          </div>
          <div class="sc-dev-foot">
            <div class="sc-df-list" v-for="item in developerStory" :key="item.id">
              <div class="sc-df-main" @click="course(item.id)">
                <div style="width: 100%">
                  <div class="sc-dm-top">
                    <div class="sc-dt-img">
                      <img :src="item.cover" class="sc-dti">
                    </div>
                  </div>
                  <div class="sc-dm-foot">{{ item.name }}</div>
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
import { fetchModular, fetchHotCourse, fetchNewCourse, fetchDeveloperStory } from '@/api/school'

export default {
  name: "Schcool",
  components: { Header, Footer },
  data() {
    return {
      img: [
        { key: 1, value: require("@/assets/s0.png") },
        { key: 1, value: require("@/assets/s1.jpg") },
        { key: 1, value: require("@/assets/s2.png") }
      ],
      leftNav: null,
      hotModularList: null,
      hotId: 0,
      newId: 0,
      hotCourseList: null,
      newCourseList: null,
      developerStory: null
    }
  },
  created() {
    this.getCourseModular()
    this.getHotCourse(this.hotId)
    this.getNewCourse(this.newId)
    this.getDeveloperStory()
  },
  methods: {
    getCourseModular() {
      fetchModular().then(response => {
        this.leftNav = response.data.leftNav
        this.hotModularList = response.data.courseNav
      })
    },
    getHotCourse(id) {
      fetchHotCourse(id).then(response => {
        this.hotCourseList = response.data
      })
    },
    getNewCourse(id) {
      fetchNewCourse(id).then(response => {
        this.newCourseList = response.data
      })
    },
    getDeveloperStory() {
      fetchDeveloperStory().then(response => {
        this.developerStory = response.data
      })
    },
    course(id) {
      window.open(this.$router.resolve({name:'Video', params:{id: id}}).href, '_blank')
    },
    more() {
      window.open(this.$router.resolve({name:'Course'}).href, '_blank')
    }
  }
}
</script>

<style scoped>
@import "~@/styles/school.scss";

.sc-rotation-img {
  height: 100%;
  overflow: hidden;
  border-radius: 10px;
}

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
