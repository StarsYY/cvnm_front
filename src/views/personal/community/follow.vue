<template>
  <div class="m-main">
    <div>
      <h3 class="c-col">我的关注</h3>
    </div>
    <div class="c-col-tag">
      <ul class="c-tag-ul">
        <li class="c-tag-li">
          <a class="c-tag-a" @click="select(0)">
            <span class="c-tag-msg" :class="{ 'c-tag-msg-select' : one }">关注的人</span>
          </a>
        </li>
        <li class="c-tag-li">
          <a class="c-tag-a" @click="select(1)">
            <span class="c-tag-msg" :class="{ 'c-tag-msg-select' : two }">关注的板块</span>
          </a>
        </li>
      </ul>
    </div>
    <div style="margin-top: 16px">
      <div v-if="one">
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
      <div v-if="two">
        <div class="fans-main">
          <div class="fans-list">
            <div class="fans-attention-details">
              <div style="display: flex">
                <div style="width: 100%">
                  <div class="fw-top">
                    <img src="@/assets/OS.png" class="fw-img">
                    <div style="box-sizing: border-box">
                      <div class="fw-top-right">
                        <span class="fw-top-btn">已关注</span>
                      </div>
                    </div>
                  </div>
                  <div class="fw-plate">HarmonyOS Connect</div>
                </div>
              </div>
              <div class="fw-plate-text">
                <p class="fw-plate-content">HarmonyOS Connect官方信息发布，生态伙伴交流平台。</p>
              </div>
              <div class="fw-info">
                <div class="fw-info-one">
                  <div class="fw-info-num">3</div>
                  <div class="fw-info-title">今日</div>
                </div>
                <div class="fw-info-one">
                  <div class="fw-info-num">3</div>
                  <div class="fw-info-title">今日</div>
                </div>
                <div class="fw-info-one">
                  <div class="fw-info-num">3</div>
                  <div class="fw-info-title">今日</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 100px"></div>
  </div>
</template>

<script>
export default {
  name: "Collection",
  data() {
    return {
      one: true,
      two: false
    }
  },
  methods: {
    select(val) {
      if (val === 0) {
        this.one = true
        this.two = false
      } else {
        this.one = false
        this.two = true
      }
    }
  }
}
</script>

<style scoped>
@import "~@/styles/message.scss";
@import "~@/styles/fans.scss";
@import "~@/styles/follow.scss";

</style>
