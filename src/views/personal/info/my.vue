<template>
  <div class="m-main">
    <div style="margin-bottom: 80px">
      <div>
        <h3 class="m-info">基本信息</h3>
        <span class="m-edit">编辑</span>
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
        <span class="m-edit">编辑</span>
      </div>
      <div style="padding-top: 96px; padding-bottom: 56px">
        <div class="m-fistLine">您当前暂未实名，快去实名认证吧</div>
        <div style="margin-top: 16px">
          <span class="m-realname">实名认证</span>
        </div>
      </div>
      <div style="margin-top: 40px">
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
                <div>个人用户</div>
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex">
          <div style="width: 50%">
            <div>
              <div class="m-info-title">开发者ID</div>
              <div class="m-info-descript">
                <div>2850086000449979396</div>
              </div>
            </div>
          </div>
          <div style="width: 50%; padding-left: 54px">
            <div>
              <div class="m-info-title">联系人邮箱 </div>
              <div class="m-info-descript">
                <div>12720035*****.com</div>
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
      <div style="padding-top: 26px; padding-bottom: 56px">
        <div class="m-fistLine">您还没有积分</div>
      </div>
      <div style="margin-top: 24px">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="grow" label="成长值" width="170" />
          <el-table-column prop="integral" label="积分" width="170" />
          <el-table-column prop="describe" label="描述" />
          <el-table-column prop="createtime" label="日期" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchUser } from '@/api/personal'
import Cookie from 'js-cookie'

export default {
  name: "My",
  data() {
    return {
      name: {
        name: '',
        loginName: ''
      },
      user: {
        portrait: '',
        nickname: ''
      },
      tableData: [
        {
          grow: '-6',
          integral: '-6',
          describe: 'No. 189, Grove St, Los Angeles',
          createtime: '2021/11/01 19:26:48',
        },
        {
          grow: '-6',
          integral: '-6',
          describe: 'No. 189, Grove St, Los Angeles',
          createtime: '2021/11/01 19:26:48',
        },
        {
          grow: '-6',
          integral: '-6',
          describe: 'No. 189, Grove St, Los Angeles',
          createtime: '2021/11/01 19:26:48',
        },
        {
          grow: '-6',
          integral: '-6',
          describe: 'No. 189, Grove St, Los Angeles',
          createtime: '2021/11/01 19:26:48',
        },
      ]
    }
  },
  created() {
    this.getPersonal()
  },
  methods: {
    getPersonal() {
      this.name.name = Cookie.get("nickname")
      this.name.loginName = Cookie.get("nickname")
      fetchUser(this.name).then(response => {
        this.user = response.data.user
      })
    },
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
}
</style>
