<template>
  <div class="i-main">
    <div class="i-content">
      <div class="i-left">
        <div class="i-menu">
          <div v-for="item in menu" :key="item.key" class="i-menuList">
            <div style="white-space: nowrap">
              <a class="i-link" :class="{ 'i-link-select' : item.is }" @click="select(item.key)">
                <span class="i-tag">{{ item.value }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="i-right">
        <div v-if="key === '0'">
          <My />
        </div>
        <div v-if="key === '1'">
          我的活动
        </div>
        <div v-if="key === '2'">
          <Collection />
        </div>
        <div v-if="key === '3'">
          <Message />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import My from "./info/my.vue"
import Collection from "./info/collection.vue"
import Message from "./info/message.vue"

export default {
  name: "Info",
  components: { My, Collection, Message },
  data() {
    return {
      key: '0',
      menu: [
        { key: '0', value: '基本信息', is: true },
        { key: '2', value: '我的收藏', is: false },
        { key: '3', value: '我的消息', is: false }
      ],
    }
  },
  methods: {
    select(val) {
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
@import "~@/styles/info.scss";

</style>
