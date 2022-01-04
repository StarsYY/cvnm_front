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
      <div v-if="two">
        <div style="display: flex">
          <div class="c-col-main">
            <div class="c-col-content">
              <p class="c-c-c-msg">您好！您已经注册成为华为开发者论坛的会员，请您在发表言论时，遵守当地法律法规。如果您有什么疑问可以联系管理员。</p>
              <div style="margin-left: 64px">
                <span class="c-read"></span>
              </div>
            </div>
            <div style="overflow: hidden">
              <div>
                <div style="display: inline-block">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="30"></el-avatar>
                  <span class="c-col-name">Developers Community 管理员</span>
                </div>
                <span class="c-col-time">2021/10/22 18:56:39</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="one">
        <div style="display: flex">
          <div class="c-col-main">
            <div class="c-col-content">
              <p class="c-c-c-msg">这是一条系统消息。</p>
              <div style="margin-left: 64px">
                <span class="c-read"></span>
              </div>
            </div>
            <div style="overflow: hidden">
              <div>
                <div style="display: inline-block">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="30"></el-avatar>
                  <span class="c-col-name">Developers Community 管理员</span>
                </div>
                <span class="c-col-time">2021/10/22 18:56:39</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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

</style>
