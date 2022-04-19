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
                <div v-for="item in course" :key="item.id" class="fv-mm-list">
                  <div class="sc-ml-a fv-ml-a">
                    <div class="sc-ml-top" @click="video(item.id, item.price)">
                      <img :src="item.cover" class="sc-ct-img" style="cursor: pointer">
                    </div>
                    <div class="sc-ml-foot">
                      <span class="sc-ml-name" style="cursor: pointer; margin-bottom: 0" @click="video(item.id, item.price)">{{ item.name }}</span>
                      <div class="cl-progress" style="display: none">
                        <el-progress :percentage="percentage" :color="customColorMethod" :stroke-width="7" />
                        已学习：{{ percentage }}%
                      </div>
                      <div class="fv-au" style="justify-content: flex-end">
                        <div class="fv-unfa" @click="deleteLearn(item.id)">取消学习</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="total === listQuery.limit" style="text-align: center">
          <el-button round @click="more">更多</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import { fetchClass, delLearn } from '@/api/myschool'
import { isLogin } from '@/utils/tool'

export default {
  name: "Class",
  props: {
    userId: Number,
  },
  data() {
    return {
      listQuery: {
        uid: this.userId,
        page: 0,
        limit: 9
      },
      course: null,
      total: 0,
      courseId: {
        id: ''
      },
      menu: [
        { key: 0, value: '全部', is: true },
        // { key: 1, value: '学习中', is: false },
        // { key: 2, value: '已学完', is: false }
      ],
      percentage: 90
    }
  },
  created() {
    this.getClass()
  },
  methods: {
    getClass() {
      fetchClass(this.listQuery).then(response => {
        this.total = response.data.length
        if(this.course !== null) {
          this.course = this.course.concat(response.data)
        } else {
          this.course = response.data
        }
      })
    },
    deleteLearn(id) {
      if(isLogin()) {
        this.courseId.id = id
        delLearn(this.courseId).then(() => {
          this.course.some((item, i) => {
            if(item.id === id) {
              this.course.splice(i, 1)
              return true
            }
          })
        })
      }
    },
    more() {
      this.listQuery.page += 1
      this.getClass()
    },
    video(id, price) {
      if(price === 0) {
        window.open(this.$router.resolve({name:'Video', params:{id: id}}).href, '_blank')
      } else {
        window.open(this.$router.resolve({name:'Purchase', params:{id: id}}).href, '_blank')
      }
    },
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