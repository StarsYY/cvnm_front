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
              <span class="pa-rr">￥13.30</span>
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
            <div class="pa-order-row">订单编号：HT-202203171252240150</div>
            <div class="pa-order-row">商品明细：AR/MR技术实现原理教程</div>
            <div class="pa-order-row" style="margin-bottom: 0">下单时间：2022-03-17 20:52:24</div>
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
                    <img src="@/assets/qr.gif" style="vertical-align: middle; border-style: none">
                  </div>
                </div>
              </div>
            </div>
            <div style="margin-left: 24px">
              <div class="pa-how">支付宝扫码支付 </div>
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

export default {
  name: "Pay",
  components: { Header, Footer },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style scoped>
@import "~@/styles/pay.scss";

</style>
