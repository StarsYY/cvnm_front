<template>
  <div>
    <div class="u-i-title">
      <span class="u-i-i">个人信息</span>
    </div>
    <div>
      <div style="width: 45%; margin: 60px auto 0">
        <div class="u-i-userhead">
          <div style="display: flex; align-items: center">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="50" style="margin-right: 14px;"></el-avatar>
            <span class="u-i-head">
              <span class="u-i-h">头像</span>
            </span>
          </div>
          <img src="@/assets/arrow_right.png" style="width: 12px; height: 28px">
        </div>
        <div style="margin-bottom: 40px"></div>
        <div>
          <el-form :model="ruleForm" class="demo-ruleForm">
            <el-form-item label="昵称">
              <el-input v-model="ruleForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="ruleForm.gender" placeholder="性别" style="width: 100%">
                <el-option label="女" value="0" selected></el-option>
                <el-option label="男" value="1"></el-option>
                <el-option label="保密" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align: center">
            <button class="ui-but">保存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      one: false,
      two: true,
      ruleForm: {
        nickname: '',
        gender: '',
        username: ''
      },
    }
  },
  methods: {
  }
}
</script>

<style scoped>
@import "~@/styles/userinfo.scss";

</style>
