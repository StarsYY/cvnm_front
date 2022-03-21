<template>
  <Header />
  <div class="v-main">
    <el-row>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 20, offset: 2}" :xl="{span: 20, offset: 2}">
        <div class="v-center">
          <div class="vc-top">认证</div>
          <div class="vc-main">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              label-width="25%"
              label-position="left"
              class="demo-ruleForm"
              :size="formSize"
            >
              <el-form-item label="真实姓名：" prop="name">
                <el-input v-model="ruleForm.name" maxlength="25" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="公司/高校名称：" prop="school">
                <el-input v-model="ruleForm.school" maxlength="100" placeholder="请输入公司/高校名称"></el-input>
              </el-form-item>
              <el-form-item label="职位：" prop="position">
                <el-select v-model="ruleForm.position" placeholder="请选择职位">
                  <el-option label="教授" value="教授"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="擅长技术：" prop="technology">
                <el-input v-model="ruleForm.technology" maxlength="200" placeholder="请输入擅长技术"></el-input>
                <span style="color: #B39999">多个技术标签用，分开。</span>
              </el-form-item>
              <el-form-item label="自我介绍：" prop="introduce">
                <el-input v-model="ruleForm.introduce" :rows="4" maxlength="500" type="textarea" placeholder="请输入自我介绍"></el-input>
                <span style="color: #B39999">必填，最多500字。</span>
              </el-form-item>
              <el-form-item label="经历：" prop="userid">
                <div style="display: none">
                  <el-input v-model="ruleForm.userid"></el-input>
                </div>
                <el-date-picker
                  v-model="bantime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="setTime"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="" prop="experience">
                <el-input v-model="ruleForm.experience" maxlength="100" placeholder="请输入名称"></el-input>
              </el-form-item>
              <el-form-item label="" prop="detail">
                <el-input v-model="ruleForm.detail" :rows="4" type="textarea" maxlength="500" placeholder="请输入详细经历"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div style="padding: 30px 0; text-align: center">
            <el-button type="primary" @click="submitForm('ruleForm')" style="margin-right: 30px">提交申请</el-button>
            <el-button @click="resetForm">取消</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/header"
import Footer from "@/components/footer"
import { fetchVerify, createVerify } from '@/api/verify'
import { ElNotification } from 'element-plus'

export default {
  name: "Verify",
  components: { Header, Footer, ElNotification },
  data() {
    return {
      ruleForm: {
        userid: '',
        name: '',
        school: '',
        position: '',
        technology: '',
        introduce: '',
        start: '',
        end: '',
        experience: '',
        detail: '',
        photo: '',
        type: '',
      },
      bantime: [],
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'blur' }],
        school: [{ required: true, message: 'school is required', trigger: 'blur' }],
        position: [{ required: true, message: 'position is required', trigger: 'change' }],
        technology: [{ required: true, message: 'technology is required', trigger: 'blur' }],
        introduce: [{ required: true, message: 'introduce is required', trigger: 'blur' }],
        experience: [{ required: true, message: 'experience is required', trigger: 'blur' }],
        detail: [{ required: true, message: 'detail is required', trigger: 'blur' }],
        userid: [{ required: true, message: 'bantime is required', trigger: 'change' }]
      }
    }
  },
  created() {
    this.getVerify(this.$route.params.uid)
  },
  methods: {
    getVerify(uid) {
      fetchVerify(uid).then(response => {
        if(response.data !== null) {
          this.ruleForm = response.data
        }
      })
    },
    setTime(val) {
      var d = val[0]
      this.ruleForm.start = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      d = val[1]
      this.ruleForm.end = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      this.ruleForm.userid = d
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.userid = this.$route.params.uid
          this.ruleForm.type = 1
          createVerify(this.ruleForm).then(() => {
            ElNotification({
              title: '申请成功',
              message: '正在等待管理员审核',
              type: 'success',
            })
          })
          console.log(this.ruleForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
@import "~@/styles/verify.scss";

</style>
