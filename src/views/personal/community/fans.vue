<template>
  <div class="m-main">
    <div>
      <h3 class="c-col">我的粉丝</h3>
    </div>
    <div style="margin-top: 24px">
      <div class="fans-main">
        <div class="fans-list">
          <div class="fans-attention-details">
            <div style="display: flex">
              <div class="fans-aaa">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="48"></el-avatar>
                <img src="@/assets/vip.png" class="fans-vip">
              </div>
              <div class="fans-hand-name">
                <div class="fans-name-top">
                  <div class="fans-nickname">粉丝名</div>
                  <div>
                    <div class="fans-btn">
                      <span class="fans-name">关注</span>
                    </div>
                  </div>
                </div>
                <div>Lv 2</div>
              </div>
            </div>
            <div class="fans-info">
              <div class="fans-tag">
                <div class="fans-num">1</div>
                <div class="fans-content">博文</div>
              </div>
              <div class="fans-tag">
                <div class="fans-num">1</div>
                <div class="fans-content">博文</div>
              </div>
              <div class="fans-tag">
                <div class="fans-num">1</div>
                <div class="fans-content">博文</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 100px"></div>
    <div class="a-nothing">
      <div style="height: 100px; margin-bottom: 8px">
        <svg-icon icon-class="nothing" style="font-size: 100px"></svg-icon>
        <p>暂无数据</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
@import "~@/styles/fans.scss";

</style>
