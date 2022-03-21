<template>
  <Header />
  <div class="cf-main">
    <div class="cf-width">
      <div>
        <div class="cf-ok">
          <div style="font-size: 32px; color: #333">确认订单</div>
          <div class="cf-exchange">
            <span>
              如您已有券码，可
              <span style="color: #328dff;">点击这里</span>
              直接兑换
            </span>
          </div>
        </div>
        <div>
          <div class="cf-order-info">
            <div class="cf-oi-left">
              <img :src="course.cover" class="cf-course-image">
            </div>
            <div class="cf-oi-right">
              <div class="cf-or-main">
                <div class="cf-om-left">
                  <div class="cf-or-name">
                    <div class="cf-or-co">{{ course.name }}</div>
                  </div>
                  <div class="cf-or-info">
                    <div class="cf-or-info-main">
                      有效期至：
                      <span>{{ nowTime }}</span>
                    </div>
                    <div> </div>
                  </div>
                  <div class="cf-or-price">
                    <span style="color: #333">￥{{ course.price / 100 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cf-section">
        <div>
          <div class="cf-section-title">温馨提示</div>
          <div class="cf-section-content">此商品为虚拟商品，因此不接受退款/退货</div>
        </div>
      </div>
      <div class="cf-submit">
        <div class="cf-totalPriceContent">
          <div style="margin-left: 12px">
            <div style="text-align: right">
              <span class="cf-price">￥{{ course.price / 100 }}</span>
            </div>
          </div>
          <div class="cf-rightContent">
            <div>实付金额：</div>
          </div>
        </div>
        <div class="cf-payment-row">
          <div style="margin-top: 20px; display: flex">
            <div class="cf-noMoney">
              <svg-icon icon-class="alert" style="width: 18px; height: 18px"></svg-icon>
              该商品不支持退款
            </div>
            <div style="display: inline-block">
              <div class="cf-btn-sub" @click="pay(course.id)">
                <span>立即购买</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/header"
import Footer from "@/components/footer"
import { fetchOrder, payment } from '@/api/pay'
import { isLogin } from '@/utils/tool'
import Cookie from 'js-cookie'

export default {
  name: "Confirm",
  components: { Header, Footer },
  data() {
    return {
      course: {
        id: '',
        name: '',
        cover: '',
        price: ''
      },
      nowTime: '',
      order: {
        username: '',
        courseid: ''
      }
    }
  },
  created() {
    this.getOrder(this.$route.params.id)
    this.getCurrentTime()
  },
  methods: {
    getOrder(id) {
      fetchOrder(id).then(response => {
        this.course = response.data
      })
    },
    pay(id) {
      if(isLogin()) {
        this.order.username = Cookie.get("nickname")
        this.order.courseid = id
        payment(this.order).then(() => {
          window.open(this.$router.resolve({name:'Pay', params:{id: id}}).href, '_blank')
        })
      }
    },
    getCurrentTime() {
      var _this = this;
      let yy = new Date().getFullYear() + 5;
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes() < 10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
      _this.nowTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf;
    }
  }
}
</script>

<style scoped>
@import "~@/styles/confirm.scss";

</style>
