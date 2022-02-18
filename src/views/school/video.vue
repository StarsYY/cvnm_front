<template>
  <Header />
  <div class="vi-main">
    <div style="background: #000; display: flex">
      <div class="vi-video">
        <video src="@/assets/sn1080.mp4" controls="controls" autoplay="autoplay" muted="muted" style="width: 100%"></video>
      </div>
      <div class="vi-right">
        <div>
          <div class="vi-menu">
            <div class="vi-menu-title">目录</div>
          </div>
          <div style="overflow: auto">
            <div>
              <div class="vi-list-item">
                <div class="vi-li-main">概念</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-row>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 20, offset: 2}" :xl="{span: 20, offset: 2}">
        <div style="padding: 31px 0">
          <div class="vi-course-title">
            <div class="vi-ct-left">什么是HarmonyOS</div>
            <div style="display: flex">
              <div class="vi-ct-right">
                <svg-icon icon-class="collect" style="width: 22px; height: 22px; margin-right: 7px"></svg-icon>
                <span>收藏</span>
              </div>
            </div>
          </div>
          <div class="vi-course-info">
            <div>
              <span>时长 1 分钟</span>
              <span>　.　评分 4.6</span>
              <span>　.　77.6K 次播放</span>
            </div>
            <span class="vi-ci-tag">
              <span>关键字</span>
              <span class="vi-ct-list">Mac</span>
            </span>
          </div>
        </div>
        <div style="border-top: 1px solid #e8e8e8">
          <div class="vi-content">
            <div style="width: 70%; flex: 1">
              <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="课程介绍" name="first">
                  <div class="vi-course-introduce">
                    <div class="vi-ci-main">
                      <div class="vi-ci-cart">
                        <div style="margin-bottom: 32px">
                          <div class="ci-cc-top">课程简介</div>
                          <div class="ci-cc-footer">阿巴阿巴阿巴</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="用户评价 (6)" name="second">
                  <div class="vi-course-introduce">
                    <div class="vi-ci-main">
                      <div style="position: relative">
                        <div>
                          <div class="vi-review-list">
                            <div style="display: flex; align-items: flex-start">
                              <div style="width: 32px; height: 32px">
                                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="32"></el-avatar>
                              </div>
                              <div style="margin-left: 8px; width: calc(100% - 40px)">
                                <div class="vi-rl-top">
                                  <div style="display: flex; align-items: center">
                                    <div style="display: flex; align-items: center">
                                      <span class="vi-rt-left">小羊</span>
                                    </div>
                                    <div style="display: flex; align-items: center; margin-left: 16px">
                                      <span class="vi-rt-right">2022-01-25 08:11:48</span>
                                    </div>
                                  </div>
                                  <div>触碰删除</div>
                                </div>
                                <div style="display: flex; align-items: center; margin-top: 4px">
                                  <el-rate
                                    v-model="value"
                                    disabled
                                    show-score
                                    text-color="#ff9900"
                                    score-template="{value}"
                                  >
                                  </el-rate>
                                </div>
                                <div class="vi-rl-content">开始，应用，开发产品，</div>
                              </div>
                            </div>
                            <div style="margin-top: 16px; margin-left: 40px">
                              <div style="padding: 16px; background-color: #f5f5f5">
                                <div class="vi-re-top">
                                  <span class="vi-rtt">
                                    <svg-icon icon-class="service" style="width: 24px; height: 24px"></svg-icon>
                                    <span style="margin-left: 7px">客服回复</span>
                                  </span>
                                  <span class="vi-rt-right">2022-01-25 08:11:48</span>
                                </div>
                                <div class="vi-rt-content">感谢支持，学堂会持续提供更多精品课程，期待与你继续携手同行。</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <div style="width: 30%; padding-left: 45px">
              <div>
                <div style="background: #fff">
                  <div class="vi-left-top">平台信息</div>
                  <div class="vi-author-cart">
                    <div style="display: flex">
                      <div style="width: 64px">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="64"></el-avatar>
                      </div>
                      <div style="margin-left: 12px; width: calc(100% - 80px)">
                        <div class="vi-ac-top">仰望星空</div>
                        <div>讲师</div>
                        <div class="vi-ac-fo">智能终端能力开发，共建开发者生态</div>
                      </div>
                    </div>
                    <div class="vi-au-info">
                      <div>
                        <div class="vi-ai-title">课程数</div>
                        <div class="vi-ai-num">1.3K</div>
                      </div>
                      <div class="vi-ai-line"></div>
                      <div>
                        <div class="vi-ai-title">学习人次</div>
                        <div class="vi-ai-num">298.3K</div>
                      </div>
                      <div class="vi-ai-line"></div>
                      <div>
                        <div class="vi-ai-title">课程综合评分</div>
                        <div class="vi-ai-num">4.8</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style="margin-top: 64px">
                <div class="vi-recommend">相关课程推荐</div>
                <div class="ci-rc-main">
                  <div class="ci-rc-cart">
                    <h2 class="ci-rc-name">系统架构</h2>
                    <div class="ci-rc-info">
                      <span>7.9K人在学</span>
                      <span style="margin: -6px 6px 0">.</span>
                      <span>评分 4.6</span>
                    </div>
                    <div style="margin-top: 16px">
                      <div class="ci-rc-price">
                        <span class="ci-rpp">免费</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="ci-rc-main">
                  <div class="ci-rc-cart">
                    <h2 class="ci-rc-name">系统架构</h2>
                    <div class="ci-rc-info">
                      <span>7.9K人在学</span>
                      <span style="margin: -6px 6px 0">.</span>
                      <span>评分 4.6</span>
                    </div>
                    <div style="margin-top: 16px">
                      <div class="ci-rc-price">
                        <span class="ci-rpp">免费</span>
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

export default {
  name: "Video",
  components: { Header, Footer },
  data() {
    return {
      value: 5,
      activeName: 'first'
    }
  },
  created() {
  },
  methods: {
    handleClick() {
      console.log(this.activeName)
    },
  }
}
</script>

<style scoped>
@import "~@/styles/video.scss";

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap::after {
  height: 0;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__active-bar {
  width: 100%;
  background-color: black;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item {
  font-size: 20px;
  color: #777777;
}

.demo-tabs >>> .el-tabs__header > .el-tabs__nav-wrap > .el-tabs__nav-scroll > .el-tabs__nav > .el-tabs__item.is-active {
  color: black;
}
</style>
