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
                      <a class="or-star-inserted">课程</a>
                    </div>
                  </div>
                  <div class="or-tag-line"></div>
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
            <div class="sc-md-main" style="margin: 0 -3px -3px; margin-top: 15px">
              <div class="sc-mm">
                <div class="sc-mmm">
                  <div class="sc-mmmm">
                    <div v-for="item in course" :key="item.id" class="fv-mm-list">
                      <div class="sc-ml-a fv-ml-a">
                        <div class="sc-ml-top" @click="video(item.id)">
                          <img :src="item.cover" class="sc-ct-img" style="cursor: pointer">
                        </div>
                        <div class="sc-ml-foot">
                          <span class="sc-ml-name" style="cursor: pointer; margin-bottom: 0" @click="video(item.id)">{{ item.name }}</span>
                          <div class="fv-au" style="justify-content: space-between">
                            <div class="fv-unfa" @click="editCourse(item.id)">编辑</div>
                            <div class="fv-unfa" @click="deleteCourse(item.id)">删除课程</div>
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
    </div>
  </div>
</template>

<script>
import { fetchCourse, delMyCourse } from '@/api/myschool'
import { isLogin } from '@/utils/tool'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: "MyCourse",
  components: { ElMessage, ElMessageBox },
  props: {
    userId: Number,
  },
  data() {
    return {
      listQuery: {
        uid: this.userId,
        status: '',
        page: 0,
        limit: 9
      },
      key: '',
      menu: [
        { key: '', value: '全部', is: true },
        { key: '已发布', value: '已发布', is: false },
        { key: '待审核', value: '待审核', is: false },
        { key: '草稿', value: '草稿', is: false }
      ],
      course: null,
      total: 0,
      delId: {
        id: ''
      }
    }
  },
  created() {
    this.getMyCourse()
  },
  methods: {
    getMyCourse() {
      if(isLogin()) {
        fetchCourse(this.listQuery).then(response => {
          this.total = response.data.length
          if(this.course !== null) {
            this.course = this.course.concat(response.data)
          } else {
            this.course = response.data
          }
        })
      }
    },
    deleteCourse(id) {
      if(isLogin) {
        ElMessageBox.confirm(
          '你确定要删除这个课程嘛?',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          }
        ).then(() => {
          this.delId.id = id
          delMyCourse(this.delId).then(() => {
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            this.course.some((item, i) => {
              if(item.id === id) {
                this.course.splice(i, 1)
                return true
              }
            })
          })
        })
      }
    },
    video(id) {
      window.open(this.$router.resolve({name:'Video', params:{id: id}}).href, '_blank')
    },
    more() {
      this.listQuery.page += 1
      this.getMyCourse()
    },
    select(val) {
      this.listQuery.page = 0
      this.listQuery.status = val
      this.course = null
      this.getMyCourse()
      this.menu.forEach(item => {
        if (item.key === val) {
          item.is = true
        } else {
          item.is = false
        }
      })
      this.key = val
    },
    editCourse(id) {
      this.$router.push({ name: 'SchoolCreateEdit', params: {id: id} })
    }
  }
}
</script>

<style scoped>
@import "~@/styles/order.scss";

</style>