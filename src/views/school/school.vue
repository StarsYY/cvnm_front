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
                      <li>
                        <div class="sc-level">
                          <div class="sc-first-level">计算机语言</div>
                          <div class="sc-second-level">
                            <div class="sc-tag">Python</div>
                            <div class="sc-tag">Java</div>
                            <div class="sc-tag">C</div>
                          </div>
                        </div>
                        <div class="sc-tag-hide">
                          <div class="sc-submenu">
                            <div class="sc-sub-item">
                              <div class="sc-sub-item-title">HMS</div>
                              <div class="sc-subtitle">
                                <div class="sc-subtitle-name">知识点</div>
                                <div class="sc-name-content">
                                  <span class="sc-name-main">sheer</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="sc-course">
                            <div class="sc-course-list">
                              <div style="display: flex">
                                <div class="sc-sourse-image">
                                  <img src="@/assets/school.jpg" class="sc-sourse-image-cover">
                                </div>
                                <div class="sc-sourse-content">
                                  <div class="sc-sc-name">
                                    <div class="sc-sc-title">快应用精品实战课</div>
                                  </div>
                                  <div class="sc-sc-info">
                                    <div class="sc-sc-price">
                                      <span>免费</span>
                                    </div>
                                    <div class="sc-sc-number">
                                      <svg-icon icon-class="person" style="width: 1em; height: 1em"></svg-icon>
                                      <span style="margin-left: 5px">30.5k</span>
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
                      <el-carousel-item v-for="item in 4" :key="item">
                        <h3>{{ item }}</h3>
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
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
              <el-tab-pane label="User" name="first"></el-tab-pane>
              <el-tab-pane label="Config" name="second"></el-tab-pane>
              <el-tab-pane label="Role" name="third"></el-tab-pane>
              <el-tab-pane label="Task" name="fourth"></el-tab-pane>
            </el-tabs>
            <div class="sc-md-more" @click="more">更多</div>
          </div>
          <div class="sc-md-main">
            <div class="sc-mm">
              <div class="sc-mmm">
                <div class="sc-mmmm">
                  <div class="sc-mm-list">
                    <div class="sc-ml-a">
                      <div class="sc-ml-top">
                        <img src="@/assets/hm.png" class="sc-ct-img">
                      </div>
                      <div class="sc-ml-foot">
                        <span class="sc-ml-name">HarmonyOS系统架构</span>
                        <div class="sc-ml-star">
                          <div class="sc-ml-per">
                            <svg-icon icon-class="person"></svg-icon>
                            14.5k
                          </div>
                          <div class="sc-ml-per sc-ml-score">
                            <svg-icon icon-class="person"></svg-icon>
                            4.6
                          </div>
                        </div>
                        <div class="sc-ml-price">
                          <div class="sc-mp-r">
                            <span class="sc-mpp">免费</span>
                          </div>
                          <div class="sc-mp-au">星空</div>
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
              <a class="sc-dt-more">更多</a>
            </div>
          </div>
          <div class="sc-dev-foot">
            <div class="sc-df-list">
              <div class="sc-df-main">
                <div style="width: 100%">
                  <div class="sc-dm-top">
                    <div class="sc-dt-img">
                      <img src="@/assets/dev.jpg" class="sc-dti">
                    </div>
                  </div>
                  <div class="sc-dm-foot">开发者故事</div>
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

export default {
  name: "Schcool",
  components: { Header, Footer },
  data() {
    return {
      activeName: 'first'
    }
  },
  created() {
  },
  methods: {
    handleClick() {
      console.log(this.activeName)
    },
    more() {
      window.open(this.$router.resolve({name:'Course'}).href, '_blank')
    }
  }
}
</script>

<style scoped>
@import "~@/styles/school.scss";

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
