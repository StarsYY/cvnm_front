<template>
  <div style="position: relative">
    <div>
      <div class="or-main">
        <div class="or-top">
          <div class="or-t-nav">
            <div class="or-n-tab">
              <div class="or-nav-scroll">
                <div class="or-ns">
                  <div>
                    <div class="or-tags">
                      <a class="or-star-inserted">全部课程</a>
                    </div>
                  </div>
                  <div class="or-tag-line" style="width: 56px"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="or-bottom">
          <div class="or-bb">
            <div class="or-all">
              <div>
                <p class="or-p">
                  <span v-for="item in menu" :key="item.key" class="or-p-span" :class="{ 'or-p-span-active' : item.is }" @click="select(item.key)">
                    <span style="cursor: pointer">{{ item.value }}</span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="sc-md-main" style="margin: 0 -3px -3px; margin-top: 15px">
          <div class="sc-mm">
            <div class="sc-mmm">
              <div class="sc-mmmm">
                <div class="fv-mm-list">
                  <div class="sc-ml-a fv-ml-a">
                    <div class="sc-ml-top">
                      <img src="@/assets/jsfa.jpg" class="sc-ct-img" style="cursor: pointer">
                    </div>
                    <div class="sc-ml-foot">
                      <span class="sc-ml-name" style="cursor: pointer; margin-bottom: 0">课程名课程名课程名课程名课程名课程名课程名课程名</span>
                      <div class="cl-progress">
                        <el-progress :percentage="percentage" :color="customColorMethod" :stroke-width="7" />
                        已学习：{{ percentage }}%
                      </div>
                      <div class="fv-au" style="justify-content: flex-end">
                        <div class="fv-unfa">取消收藏</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: "Favorites",
  data() {
    return {
      value: 4.7,
      key: 0,
      menu: [
        { key: 0, value: '全部', is: true },
        { key: 1, value: '学习中', is: false },
        { key: 2, value: '已学完', is: false }
      ],
      percentage: 90
    }
  },
  methods: {
    select(val) {
      this.menu.forEach(item => {
        if (item.key === val) {
          item.is = true
        } else {
          item.is = false
        }
      })
      this.key = val
    },
    customColorMethod() {
      if (this.percentage < 30) {
        return '#909399'
      }
      if (this.percentage < 70) {
        return '#e6a23c'
      }
      return '#67c23a'
    }
  }
}
</script>

<style scoped>
@import "~@/styles/order.scss";
@import "~@/styles/school.scss";
@import "~@/styles/favorites.scss";
@import "~@/styles/class.scss";

.fv-mm-list {
  width: calc((100% - 48px)/ 3);
  margin-right: 16px;
  margin-bottom: 16px;
  position: relative;
  display: block;
}

.fv-mm-list:nth-child(3n) {
  margin-right: 0;
}

.fv-ml-a {
  box-shadow: none;
  border-radius: 0;
}

.cl-progress >>> .el-progress {
  margin-bottom: 8px;
}

.cl-progress >>> .el-progress > .el-progress__text {
  display: none;
}

.cl-progress >>> .el-progress > .el-progress-bar > .el-progress-bar__outer {
  border-radius: 0;
}

.cl-progress >>> .el-progress > .el-progress-bar > .el-progress-bar__outer > .el-progress-bar__inner {
  border-radius: 0;
}
</style>