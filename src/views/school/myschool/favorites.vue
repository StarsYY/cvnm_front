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
          <div class="sc-md-main" style="margin: 0 -3px -3px; margin-top: 15px">
            <div class="sc-mm">
              <div class="sc-mmm">
                <div class="sc-mmmm">
                  <template v-for="item in course" :key="item.id">
                    <div class="fv-mm-list" v-if="!item.collect">
                      <div class="sc-ml-a fv-ml-a">
                        <div class="sc-ml-top" @click="video(item.id, item.price)">
                          <img :src="item.cover" class="sc-ct-img" style="cursor: pointer">
                        </div>
                        <div class="sc-ml-foot">
                          <span class="sc-ml-name" style="cursor: pointer" @click="video(item.id, item.price)">{{ item.name }}</span>
                          <div class="fv-sc">
                            <el-rate
                              v-model="item.score"
                              disabled
                              show-score
                              text-color="#ff9900"
                              score-template="{item.score}"
                            />
                            <div style="color: rgb(121 138 151)">
                              <svg-icon icon-class="person"></svg-icon>
                              {{ item.watch }}
                            </div>
                          </div>
                          <div class="fv-au">
                            <div class="fv-author">{{ item.author }}</div>
                            <div class="fv-unfa" @click="collect(item.id)">取消收藏</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script scoped>
import { fetchFavorites } from '@/api/myschool'
import { isLogin } from '@/utils/tool'
import { createFollow } from '@/api/video'
import Cookie from 'js-cookie'

export default {
  name: "Favorites",
  props: {
    userId: Number,
  },
  data() {
    return {
      uid: this.userId,
      course: [],
      discuss: {
        courseid: '',
        author: ''
      },
      value: 4.7
    }
  },
  created() {
    this.getFavorites(this.uid)
  },
  methods: {
    getFavorites(uid) {
      fetchFavorites(uid).then(response => {
        this.course = response.data
      })
    },
    collect(id) {
      if(isLogin()) {
        this.discuss.author = Cookie.get("nickname")
        this.discuss.courseid = id
        createFollow(this.discuss).then(() => {
          this.course.forEach(item => {
            if(item.id === id)
            item.collect = true
          });
        })
      }
    },
    video(id, price) {
      if(price === 0) {
        window.open(this.$router.resolve({name:'Video', params:{id: id}}).href, '_blank')
      } else {
        window.open(this.$router.resolve({name:'Purchase', params:{id: id}}).href, '_blank')
      }
    }
  }
}
</script>

<style>
@import "~@/styles/order.scss";
@import "~@/styles/school.scss";
@import "~@/styles/favorites.scss";

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
</style>