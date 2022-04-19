<template>
  <div class="m-main">
    <div>
      <h3 class="c-col">我的消息</h3>
      <div class="c-star">
        <span v-if="!showSelect" class="c-star-s" @click="showSelect = !showSelect">管理</span>
        <span v-if="showSelect" class="c-star-s" @click="showSelect = !showSelect">取消管理</span>
        <span class="c-star-s" @click="clearRead">一键消除未读</span>
      </div>
    </div>
    <div class="c-col-tag">
      <ul class="c-tag-ul">
        <li class="c-tag-li">
          <a class="c-tag-a" @click="select(0)">
            <span class="c-tag-msg" :class="{ 'c-tag-msg-select' : one }">系统消息</span>
          </a>
        </li>
        <li class="c-tag-li">
          <a class="c-tag-a" @click="select(1)">
            <span class="c-tag-msg" :class="{ 'c-tag-msg-select' : two }">管理员消息</span>
          </a>
        </li>
      </ul>
      <div v-if="showSelect">
        <div class="c-star">
          <span v-if="!select_all" class="c-star-s" @click="selectAll">全选</span>
          <span v-if="select_all" class="c-star-s" @click="selectAll">取消全选</span>
          <span class="c-star-s" @click="deleteAll">删除</span>
        </div>
      </div>
    </div>
    <div style="margin-top: 16px">
      <div v-if="one">
        <div v-for="item in systemMessage" :key="item.id" style="display: flex">
          <el-checkbox v-if="showSelect" v-model="item.select" size="large" style="margin-top: -9px; margin-right: 24px" />
          <div class="msg-list">
            <div style="display: flex; justify-content: space-between">
              <div style="flex: 1; overflow: hidden">
                <div>
                  <div class="msg-content">
                    <svg-icon icon-class="review" style="width: 20px; height: 20px; margin-right: 8px"></svg-icon>
                    <span v-if="item.datasource !== 'discuss'" class="msg-reply-name">{{ item.sendername }}</span>
                    <span v-if="item.datasource == 'article'">
                      <span class="msg-msg">评论了我的文章：</span>
                      <span class="msg-msg" style="color: #328dff">{{ item.articleTitle }}</span>
                    </span>
                    <span v-if="item.datasource == 'comment'">
                      <span class="msg-msg">回复了我：</span>
                      <span class="msg-msg" style="color: #328dff">{{ item.receiveContent }}</span>
                    </span>
                    <span v-if="item.datasource == 'course'">
                      <span class="msg-msg">评论了我的课程：</span>
                      <span class="msg-msg" style="color: #328dff">{{ item.courseName }}</span>
                    </span>
                    <span v-if="item.datasource == 'discuss'" class="msg-reply-name">您发布关于【{{ item.courseName }}】课程的评论有新的回复：</span>
                    <span v-if="item.datasource == 'discuss'">
                      <span class="msg-msg" style="color: #328dff">{{ item.receiveContent }}</span>
                    </span>
                  </div>
                  <div class="msg-time">{{ item.createtime }}</div> 
                </div>
              </div>
              <div>
                <div v-if="item.read === 0" style="margin-left: 64px; cursor: pointer" @click="setRead(item.id)">
                  <span class="msg-redPoint"></span>
                  <span class="msg-read">未读</span>
                </div>
                <div v-else style="margin-left: 64px">
                  <span class="msg-read">已读</span>
                </div>
              </div>
            </div>
            <div v-if="item.datasource == 'article'">
              <p class="msg-main">{{ item.receiveContent }}</p>
            </div>
            <div v-if="item.datasource == 'comment'" class="msg-reply">
              <p class="msg-rp">{{ item.receivedContent }}</p>
              <div class="msg-rdiv">{{ item.receiveTime }}</div>
            </div>
            <div v-if="item.datasource == 'course'">
              <p class="msg-main">{{ item.receiveContent }}</p>
            </div>
            <div v-if="item.datasource == 'discuss'" class="msg-reply">
              <p class="msg-rp">{{ item.receivedContent }}</p>
              <div class="msg-rdiv">{{ item.receiveTime }}</div>
            </div>
          </div>
        </div>
        <div class="index-more" :class="{ 'hidden-more' : hideMore }">
          <el-button class="index-more-btn" plain round @click="showMore">查看更多</el-button>
        </div>
        <div v-if="systemMessage && systemMessage.length === 0" class="a-nothing">
          <div style="height: 100px; margin-bottom: 8px">
            <svg-icon icon-class="nothing" style="font-size: 100px"></svg-icon>
            <p>暂无消息</p>
          </div>
        </div>
      </div>
      <div v-if="two">
        <div v-for="item in administratorMessage" :key="item.id" style="display: flex">
          <el-checkbox v-if="showSelect" v-model="item.select" size="large" style="margin-top: -9px; margin-right: 24px" />
          <div class="c-col-main">
            <div class="c-col-content">
              <p class="c-c-c-msg">{{ item.content }}</p>
              <div v-if="item.read === 0" style="margin-left: 64px; cursor: pointer" @click="setRead(item.id)">
                <span class="msg-redPoint"></span>
                <span class="c-read">未读</span>
              </div>
              <div v-else style="margin-left: 64px">
                <span class="c-read">已读</span>
              </div>
            </div>
            <div style="overflow: hidden">
              <div>
                <div style="display: inline-block">
                  <span class="c-col-name">Developers Community 管理员</span>
                </div>
                <span class="c-col-time">{{ item.createtime }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="index-more" :class="{ 'hidden-more' : hideMore }">
          <el-button class="index-more-btn" plain round @click="showMore">查看更多</el-button>
        </div>
        <div v-if="administratorMessage && administratorMessage.length === 0" class="a-nothing">
          <div style="height: 100px; margin-bottom: 8px">
            <svg-icon icon-class="nothing" style="font-size: 100px"></svg-icon>
            <p>暂无消息</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteHTML, isLogin } from '@/utils/tool'
import Cookie from 'js-cookie'
import { fetchSystemMessage, fetchAdministratorMessage, setMessageRead, setClearRead, deleteSelectMessage } from '@/api/personal'
import { ElMessageBox } from 'element-plus'

export default {
  name: "Message",
  data() {
    return {
      listQuery: {
        username: '',
        page: 0,
        limit: 20,
      },
      systemMessage: null,
      administratorMessage: null,
      one: true,
      two: false,
      hideMore: true,
      msgId: {
        id: '',
        type: '',
        username: ''
      },
      showSelect: false,
      select_all: false,
      jsonIds: {
        idsJSON: ''
      }
    }
  },
  created() {
    this.getSystemMessage()
  },
  methods: {
    getSystemMessage() {
      if(isLogin()) {
        this.listQuery.username = Cookie.get("nickname")
        fetchSystemMessage(this.listQuery).then(response => {
          if(response.data.systemMessage.length < 20) {
            this.hideMore = true
          } else {
            this.hideMore = false
          }
          if(this.systemMessage !== null) {
            this.systemMessage = this.systemMessage.concat(response.data.systemMessage)
          } else {
            this.systemMessage = response.data.systemMessage
          }

          this.systemMessage.forEach(item => {
            item.receiveContent = deleteHTML(item.receiveContent)
            item.receivedContent = deleteHTML(item.receivedContent)
          })
        })
      }
    },
    getAdministratorMessage() {
      if(isLogin()) {
        this.listQuery.username = Cookie.get("nickname")
        fetchAdministratorMessage(this.listQuery).then(response => {
          if(response.data.administratorMessage.length < 9) {
            this.hideMore = true
          } else {
            this.hideMore = false
          }
          if(this.administratorMessage !== null) {
            this.administratorMessage = this.administratorMessage.concat(response.data.administratorMessage)
          } else {
            this.administratorMessage = response.data.administratorMessage
          }
        })
      }
    },
    setRead(id) {
      if(isLogin()) {
        this.msgId.id = id
        setMessageRead(this.msgId).then(() => {
          if(this.one) {
            this.systemMessage.forEach(element => {
              if(element.id === id) {
                element.read = 1
                return
              }
            })
          } else if(this.two) {
            this.administratorMessage.forEach(element => {
              if(element.id === id) {
                element.read = 1
                return
              }
            })
          }
        })
      }
    },
    clearRead() {
      if(isLogin()) {
        this.msgId.username = Cookie.get("nickname")
        if(this.one) {
          this.msgId.type = 0

          var is = false
          this.systemMessage.forEach(element => {
            if(element.read === 0) {
              is = true
              return
            }
          })

          if(is) {
            setClearRead(this.msgId).then(() => {
              this.systemMessage.forEach(element => {
                if(element.read === 0) {
                  element.read = 1
                }
              })
            })
          }
        } else if(this.two) {
          this.msgId.type = 1

          var is = false
          this.administratorMessage.forEach(element => {
            if(element.read === 0) {
              is = true
              return
            }
          })

          if(is) {
            setClearRead(this.msgId).then(() => {
              this.administratorMessage.forEach(element => {
                if(element.read === 0) {
                  element.read = 1
                }
              })
            })
          }
        }
      }
    },
    select(val) {
      this.hideMore = true
      this.listQuery.page = 0
      if (val === 0) {
        this.systemMessage = null
        this.getSystemMessage()
        this.one = true
        this.two = false
      } else if (val === 1) {
        this.administratorMessage = null
        this.getAdministratorMessage()
        this.one = false
        this.two = true
      }
      this.showSelect = false
      this.select_all = false
    },
    selectAll() {
      if(this.one) {
        this.select_all = !this.select_all
        this.systemMessage.forEach(element => {
          if(this.select_all) {
            element.select = true
          } else {
            element.select = false
          }
        })
      } else if(this.two) {
        this.select_all = !this.select_all
        this.administratorMessage.forEach(element => {
          if(this.select_all) {
            element.select = true
          } else {
            element.select = false
          }
        })
      }
    },
    deleteAll() {
      if(isLogin()) {
        ElMessageBox.confirm(
          '你确定要删除这些消息嘛?',
          '警告',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true,
          }
        ).then(() => {
          let ids = []
          if(this.one) {
            this.systemMessage.forEach(element => {
              if(element.select) {
                ids.push(element.id)
              }
            })
            this.jsonIds.idsJSON = JSON.stringify(ids)

            deleteSelectMessage(this.jsonIds).then(() => {
              this.systemMessage.forEach((item, i) => {
                if(item.select) {
                  this.systemMessage.splice(i, 1)
                }
              })
            })
          } else if(this.two) {
            this.administratorMessage.forEach(element => {
              if(element.select) {
                ids.push(element.id)
              }
            })
            this.jsonIds.idsJSON = JSON.stringify(ids)

            deleteSelectMessage(this.jsonIds).then(() => {
              this.administratorMessage.forEach((item, i) => {
                if(item.select) {
                  this.administratorMessage.splice(i, 1)
                }
              })
            })
          }
        })
      }
    },
    showMore() {
      this.listQuery.page = this.listQuery.page + 1
      if(this.one) {
        this.getSystemMessage()
      } else if(this.two) {
        this.getAdministratorMessage()
      }
    }
  }
}
</script>

<style scoped>
@import "~@/styles/message.scss";

.a-nothing {
  margin: 0 8px;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  margin-top: 16px;
}

.index-more >>> .el-button.is-round {
  border-radius: 24px;
}

.index-more >>> .el-button.is-round:hover, .index-more >>> .el-button.is-round:active, .index-more >>> .el-button.is-round:focus {
  color: #333;
  border-color: #333;
}

.hidden-more {
  display: none;
}

.msg-redPoint {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #f15859;
  display: inline-block;
  vertical-align: middle;
}
</style>
