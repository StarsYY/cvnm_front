<template>
  <Header />
  <div class="pa-main">
    <div class="pa-width">
      <div class="pa-pay">
        <div class="pa-pay-title">付款</div>
        <div>
          <div class="pa-je">订单金额：</div>
          <div class="pa-ac">
            <div>
              <span class="pa-rr">￥{{ order.price / 100 }}</span>
              <span>
                <span style="font-size: 16px; color: #333">请尽快支付</span>
              </span>
            </div>
            <div class="pa-order">
              <span style="font-size: 16px; color: #333">订单详情</span>
              <svg-icon icon-class="sdown" style="width: 24px; height: 24px"></svg-icon>
            </div>
          </div>
        </div>
        <div class="pa-order-detail">
          <div class="pa-order-de-main">
            <div class="pa-order-row">订单编号：{{ order.number }}</div>
            <div class="pa-order-row">商品明细：{{ order.name }}</div>
            <div class="pa-order-row" style="margin-bottom: 0">下单时间：{{ order.createtime }}</div>
          </div>
        </div>
      </div>
      <div class="pa-pay-way">
        <h2 class="pa-pay-way-title">支付方式</h2>
        <div>
          <div class="pa-pw-main">
            <div class="pa-pw-label">扫码支付</div>
          </div>
        </div>
        <div style="margin-top: 24px">
          <div class="pa-flex">
            <div class="pa-qrcode-container">
              <div style="position: relative">
                <div style="position: relative; transition: opacity .3s">
                  <div style="width: 120px; height: 120px;">
                    <img src="@/assets/weixin.png" width="120" height="120" style="vertical-align: middle; border-style: none">
                  </div>
                </div>
              </div>
            </div>
            <div class="pa-qrcode-container" style="margin-left: 20px">
              <div style="position: relative">
                <div style="position: relative; transition: opacity .3s">
                  <div style="width: 120px; height: 120px;">
                    <img src="@/assets/zhifubao.jpg" width="120" height="120" style="vertical-align: middle; border-style: none">
                  </div>
                </div>
              </div>
            </div>
            <div style="margin-left: 24px">
              <div class="pa-how">微信/支付宝扫码支付 </div>
              <div style="margin-top: 22px">
                <span>请及时支付</span>
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
import { fetchPay } from '@/api/pay'

export default {
  name: "Pay",
  components: { Header, Footer },
  data() {
    return {
      order: {
        id: '',
        number: '',
        price: 0,
        createtime: '',
        name: ''
      }
    }
  },
  created() {
    this.getOrder(this.$route.params.id)
  },
  methods: {
    getOrder(id) {
      this.order.id = id
      fetchPay(this.order).then(response => {
        this.order = response.data
      })
    }
  }
}
</script>

<style scoped>
@import "~@/styles/pay.scss";

</style>
