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
                      <a class="or-star-inserted">订单</a>
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
            <div>
              <div v-for="item in order" :key="item.id" class="or-order-list">
                <div>
                  <div class="or-order-main">
                    <div class="or-order-icon" @click="item.is = !item.is">
                      <svg-icon icon-class="sdown" style="width: 24px; height: 24px"></svg-icon>
                    </div>
                    <div class="or-order-content">
                      <div style="display: flex">
                        <div style="width: 44.3349%; flex: 1">
                          <div style="display: flex">
                            <div class="or-co-pic" @click="study(item.courseid, item.price)">
                              <img :src="item.cover" class="or-img">
                            </div>
                            <div style="width: 100%; flex: 1">
                              <div class="or-order-title">
                                <div style="visibility: visible; cursor: pointer" @click="study(item.courseid, item.price)">
                                  {{ item.name }}
                                </div>
                              </div>
                              <p style="color: #ce0e2d; margin: 0">该课程不支持退款</p>
                            </div>
                          </div>
                        </div>
                        <div style="width: 22.1674%">
                          <p class="or-change-p">订单创建时间：</p>
                          <p class="or-change-p">{{ item.createtime }}</p>
                        </div>
                        <div style="width: 12.31527%">
                          <p class="or-change-p">实付金额：</p>
                          <p class="or-change-p">￥{{ item.price / 100 }}</p>
                        </div>
                        <div>
                          <p v-if="item.payment === null && item.transaction === 0" class="or-change-p or-label-box">
                            <span class="or-label-finished">交易关闭</span>
                          </p>
                          <div v-if="item.payment === null && item.transaction === 1" class="or-pay" @click="payCourse(item.id)">立即付款</div>
                          <div v-if="item.payment !== null && item.transaction === 0" class="or-pay">已付款</div>
                        </div>
                        <div class="or-del">
                          <span v-if="item.transaction === 1" style="cursor: pointer" @click="delOrder(item.id)">取消订单</span>
                          <span v-if="item.transaction === 0" style="cursor: pointer" @click="delOrder(item.id)">删除订单</span>
                        </div>
                      </div>
                      <div class="or-order-footer">
                        <p class="or-order-id">订单编号：{{ item.number }}</p>
                      </div>
                      <div v-if="item.is" class="or-detail-wrap">
                        <div style="font-size: 14px">
                          <p class="or-order-info">
                            <span class="or-fin-time">失效时间</span>
                            <span>{{ item.invalidtime }}</span>
                          </p>
                          <p class="or-order-info">
                            <span class="or-fin-time">订单支付方式</span>
                            <span v-if="item.payment === null">-</span>
                            <span v-if="item.payment !== null">
                              <span v-if="item.payment === 0">微信支付</span>
                              <span v-if="item.payment === 1  ">支付宝支付</span>
                              <span v-if="item.payment === 2">积分兑换</span>
                            </span>
                          </p>
                          <p class="or-order-info">
                            <span class="or-fin-time">订单支付时间</span>
                            <span v-if="item.payment === null">-</span>
                            <span v-if="item.payment !== null">{{ item.paytime }}</span>
                          </p>
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
import { fetchOrder, delMyOrder, payMyOrder } from '@/api/myschool'
import Cookie from 'js-cookie'
import { isLogin } from '@/utils/tool'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: "Order",
  components: { ElMessage, ElMessageBox },
  props: {
    userId: Number,
  },
  data() {
    return {
      listQuery: {
        uid: this.userId,
        payment: 0, // 0/1/2: 全部/待付款/已付款
        username: '',
        page: 0,
        limit: 10
      },
      key: 0,
      menu: [
        { key: 0, value: '全部', is: true },
        { key: 1, value: '待付款', is: false },
        { key: 2, value: '已付款', is: false },
        // { key: 3, value: '待审核', is: false },
        // { key: 4, value: '审核失败', is: false }
      ],
      order: null,
      total: 0,
      delId: {
        id: ''
      }
    }
  },
  created() {
    this.getMyOrder()
  },
  methods: {
    getMyOrder() {
      if(isLogin()) {
        this.listQuery.username = Cookie.get("nickname")
        fetchOrder(this.listQuery).then(response => {
          this.total = response.data.length
          if(this.order !== null) {
            this.order = this.order.concat(response.data)
          } else {
            this.order = response.data
          }
        })
      }
    },
    delOrder(id) {
      if(isLogin) {
        ElMessageBox.confirm(
          '你确定要删除这个订单嘛?',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          }
        ).then(() => {
          this.delId.id = id
          delMyOrder(this.delId).then(() => {
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            this.order.some((item, i) => {
              if(item.id === id) {
                this.order.splice(i, 1)
                return true
              }
            })
          })
        })
      }
    },
    payCourse(id) {
      if(isLogin) {
        this.delId.id = id
        payMyOrder(this.delId).then(response => {
          ElMessage({
            type: 'success',
            message: '支付成功！',
          })
          this.order.forEach(item => {
            if(item.id === id) {
              item.transaction = response.data.transaction
              item.payment = response.data.payment
              item.paytime = response.data.paytime
              return
            }
          })
        })
      }
    },
    study(id, price) {
      if(price === 0) {
        window.open(this.$router.resolve({name:'Video', params:{id: id}}).href, '_blank')
      } else {
        window.open(this.$router.resolve({name:'Purchase', params:{id: id}}).href, '_blank')
      }
    },
    more() {
      this.listQuery.page += 1
      this.getMyOrder()
    },
    select(val) {
      this.listQuery.payment = val
      this.order = null
      this.getMyOrder()
      this.menu.forEach(item => {
        if (item.key === val) {
          item.is = true
        } else {
          item.is = false
        }
      })
      this.key = val
    }
  }
}
</script>

<style scoped>
@import "~@/styles/order.scss";

</style>