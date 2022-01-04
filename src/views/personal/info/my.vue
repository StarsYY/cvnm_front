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
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="96"></el-avatar>
          </div>
        </div>
        <div>
          <div class="m-name">小羊</div>
        </div>
      </div>
    </div>
    <div style="margin-bottom: 80px">
      <div>
        <h3 class="m-info">认证信息</h3>
        <span class="m-edit">编辑</span>
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
      <div style="margin-top: 24px">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="grow" label="成长值" width="70" />
          <el-table-column prop="integral" label="积分" width="70" />
          <el-table-column prop="describe" label="描述" />
          <el-table-column prop="createtime" label="日期" />
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "My",
  data() {
    return {
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
  methods: {

  }
}
</script>

<style scoped>
@import "~@/styles/my.scss";

</style>
