<template>
  <Header />
  <div class="cs-main">
    <el-row>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 20, offset: 2}" :xl="{span: 20, offset: 2}">
        <div style="padding: 48px 0">
          <div class="cs-tag">
            <div class="cs-tag-title">业务领域</div>
            <div class="cs-tag-main">
              <div class="cs-tag-list cs-tag-all cs-tag-select">全部</div>
              <div class="cs-tt">
                <div class="cs-tag-list">
                  <span class="cs-tl-name">后端</span>
                </div>
                <div class="cs-tag-list">
                  <span class="cs-tl-name">后端</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="padding: 20px 0">
          <div class="sc-md-tag">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
              <el-tab-pane label="综合排序" name="first"></el-tab-pane>
              <el-tab-pane label="最新" name="second"></el-tab-pane>
              <el-tab-pane label="最热" name="third"></el-tab-pane>
            </el-tabs>
            <div class="cs-md-r">
              <div class="cs-mr-clear">
                <svg-icon icon-class="clear"></svg-icon>
                <span>清除条件</span>
              </div>
              <div>共 459 门课</div>
            </div>
          </div>
          <div class="sc-md-main">
            <div class="sc-mm">
              <div class="sc-mmm">
                <div class="sc-mmmm">
                  <div class="sc-mm-list" @click="video">
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
      </el-col>
    </el-row>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/header"
import Footer from "@/components/footer"

export default {
  name: "Course",
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
    video() {
      window.open(this.$router.resolve({name:'Video'}).href, '_blank')
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
