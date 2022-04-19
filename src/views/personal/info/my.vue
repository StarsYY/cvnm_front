<template>
  <div class="m-main">
    <div style="margin-bottom: 80px">
      <div>
        <h3 class="m-info">基本信息</h3>
        <span class="m-edit" @click="editInfo(user.nickname)">编辑</span>
      </div>
      <div>
        <div>
          <div class="m-head">
            <el-avatar :src="user.portrait" :size="96"></el-avatar>
          </div>
        </div>
        <div>
          <div class="m-name">{{ user.nickname }}</div>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 80px">
      <div>
        <h3 class="m-info">认证信息</h3>
        <span class="m-edit" @click="editVerify(user.uid)">编辑</span>
      </div>
      <div v-if="verify === null" style="padding-top: 96px; padding-bottom: 56px">
        <div class="m-fistLine">您当前暂未认证，快去认证吧</div>
        <div style="margin-top: 16px" @click="editVerify(user.uid)">
          <span class="m-realname">认证</span>
        </div>
      </div>
      <div v-if="verify !== null" style="margin-top: 40px">
        <div style="display: flex">
          <div style="width: 50%">
            <div>
              <div class="m-info-title">认证信息</div>
              <div class="m-info-descript">
                <div>
                  <img src="@/assets/verify.png" >
                  已认证
                </div>
              </div>
            </div>
          </div>
          <div style="width: 50%; padding-left: 54px">
            <div>
              <div class="m-info-title">账户类型</div>
              <div class="m-info-descript">
                <div>{{ verify.account }}</div>
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex">
          <div style="width: 50%">
            <div>
              <div class="m-info-title">真实姓名</div>
              <div class="m-info-descript">
                <div>{{ verify.name }}</div>
              </div>
            </div>
          </div>
          <div style="width: 50%; padding-left: 54px">
            <div>
              <div class="m-info-title">联系人邮箱 </div>
              <div class="m-info-descript">
                <div>{{ verify.email }}</div>
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex">
          <div style="width: 50%">
            <div>
              <div class="m-info-title">公司/高校名称</div>
              <div class="m-info-descript">
                <div>{{ verify.school }}</div>
              </div>
            </div>
          </div>
          <div style="width: 50%; padding-left: 54px">
            <div>
              <div class="m-info-title">认证职位 </div>
              <div class="m-info-descript">
                <div>专家</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 80px">
      <div>
        <h3 class="m-info">积分明细</h3>
        <span class="m-edit">积分明细</span>
      </div>
      <div v-if="total === 0" style="padding-top: 26px; padding-bottom: 56px">
        <div class="m-fistLine">您还没有积分流动</div>
      </div>
      <div v-if="total > 0" style="margin-top: 24px">
        <el-table :data="integralList" stripe style="width: 100%">
          <el-table-column prop="grow" label="成长值" width="170" />
          <el-table-column prop="integral" label="积分" width="170" />
          <el-table-column prop="describe" label="描述" />
          <el-table-column prop="createtime" label="日期" />
        </el-table>
      </div>
      <div v-if="total > 0" class="m-page">
        <div class="tag-page-total">
          <span>总计：</span>
          <span class="tag-page-num">{{ total }}</span>
        </div>
        <el-pagination
          v-model:currentPage="currentPage1"
          :page-size="10"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchUser, fetchVerify, fetchIntegral } from '@/api/personal'
import Cookie from 'js-cookie'

export default {
  name: "My",
  data() {
    return {
      name: {
        name: '',
        loginName: '',
        page: 1
      },
      user: {
        uid: '',
        portrait: '',
        nickname: ''
      },
      verify: {
        name: '',
        school: '',
        position: '',
        account: '',
        email: ''
      },
      currentPage1: '',
      integralList: [],
      total: 0
    }
  },
  created() {
    this.getPersonal()
    this.geIntegral()
  },
  methods: {
    getPersonal() {
      this.name.name = Cookie.get("nickname")
      this.name.loginName = Cookie.get("nickname")
      fetchUser(this.name).then(response => {
        this.user = response.data.user
      })
      fetchVerify(this.name).then(response => {
        this.verify = response.data
      })
    },
    geIntegral() {
      this.name.name = Cookie.get("nickname")
      this.name.loginName = Cookie.get("nickname")
      fetchIntegral(this.name).then(response => {
        this.integralList = response.data.integral
        this.total = response.data.total
      })
    },
    editInfo(name) {
      this.$router.push({name: 'User', params:{name: name}})
    },
    editVerify(uid) {
      this.$router.push({ name: 'Verify', params: { uid: uid }})
    },
    handleSizeChange(val) {
      this.name.page = val
      this.geIntegral()
    },
    handleCurrentChange(val) {
      this.name.page = val
      this.geIntegral()
    }
  }
}
</script>

<style scoped>
@import "~@/styles/my.scss";

.m-fistLine {
  text-align: center;
  font-weight: 400;
  font-size: 16px;
  color: #777;
  line-height: 24px;
}

.m-realname {
  margin: 0 auto;
  display: block;
  border-radius: 25.5px;
  width: 120px;
  height: 48px;
  background: #333;
  text-align: center;
  line-height: 48px;
  color: #fff;
  cursor: pointer;
}

.m-page {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  text-align: right;
}

.tag-page-total {
  display: flex;
  align-items: center;
  height: 24px;
  color: #777;
  font-size: 14px;
}

.tag-page-num {
  color: #333;
  font-weight: 700;
}
</style>
