<template>
  <Header />
  <div class="v-main">
    <el-row>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 20, offset: 2}" :xl="{span: 20, offset: 2}">
        <div class="v-center">
          <div class="v-change">
            <div class="vc-top">认证</div>
            <div>
              您有 {{ verifyLen }} 条认证
              <span style="color: #409eff; cursor: pointer" v-if="verifyLen > 1" @click="index = 1 - index, ruleForm = verifyList[index]">，点击切换</span>
            </div>
          </div>
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
              <el-form-item label="认证职位：" prop="position">
                <el-select v-model="ruleForm.position" placeholder="请选择职位">
                  <el-option label="专家" value="专家"></el-option>
                  <el-option label="讲师" value="讲师"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="账户类型：" prop="account">
                <el-select v-model="ruleForm.account" placeholder="请选择职位">
                  <el-option label="个人账户" value="个人账户"></el-option>
                  <el-option label="非个人账户" value="非个人账户"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系人邮箱：" prop="email">
                <el-input v-model="ruleForm.email" />
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
              <el-form-item label="照片：" prop="photo">
                <div style="display: none">
                  <el-input v-model="ruleForm.photo"></el-input>
                </div>
                <div class="my-upload">
                  <div v-if="!showImage" class="my-cover" @click="toggleShow">
                    <div style="margin-bottom: 16px">
                      <svg-icon icon-class="coveimage" style="width: 50px; height: 44px" />
                    </div>
                    <div>请选择照片</div>
                  </div>
                  <div v-if="showImage" class="my-img-div" v-on:mouseover="showIcon = !showIcon" v-on:mouseout="showIcon = !showIcon">
                    <img :src="image" class="my-image" :class="{'my-image-hover' : showIcon}" >
                    <div :class="{'my-hidden' : !showIcon}" style="cursor: pointer" @click="toggleShow">
                      <svg-icon icon-class="edit16" class-name='my-edit16' />
                    </div>
                    <div :class="{'my-hidden' : !showIcon}" style="cursor: pointer" @click="showImage = ! showImage, showIcon = !showIcon, ruleForm.photo = ''">
                      <svg-icon icon-class="delete16" class-name='my-edit16' style="left: 120px" />
                    </div>
                  </div>
                </div>
                <my-upload
                  field="img"
                  v-model="show"
                  img-format="png"
                  :width="150"
                  :height="150"
                  :noCircle="true"
                  :noSquare="true"
                  @crop-success="cropSuccess"
                />
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
import MyUpload from 'vue-image-crop-upload'
import { uploadVerifyPhoto } from '@/api/upload'

export default {
  name: "Verify",
  components: { Header, Footer, ElNotification, MyUpload },
  data() {
    return {
      ruleForm: {
        userid: '',
        name: '',
        school: '',
        position: '',
        account: '',
        email: '',
        technology: '',
        introduce: '',
        start: '',
        end: '',
        experience: '',
        detail: '',
        photo: ''
      },
      verifyList: [],
      verifyLen: 0,
      index: 0,
      bantime: [],
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'blur' }],
        school: [{ required: true, message: 'school is required', trigger: 'blur' }],
        position: [{ required: true, message: 'position is required', trigger: 'change' }],
        account: [{ required: true, message: 'account is required', trigger: 'change' }],
        email: [
          { required: true, message: 'email is required', trigger: 'change' },
          { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
        ],
        technology: [{ required: true, message: 'technology is required', trigger: 'blur' }],
        introduce: [{ required: true, message: 'introduce is required', trigger: 'blur' }],
        experience: [{ required: true, message: 'experience is required', trigger: 'blur' }],
        detail: [{ required: true, message: 'detail is required', trigger: 'blur' }],
        userid: [{ required: true, message: 'bantime is required', trigger: 'change' }],
        photo: [{ required: true, message: 'photo is required', trigger: 'blur' }]
      },
      image: '',
      imgDataUrl: {
        base64: '' // the datebase64 url of created image
      },
      show: false,
      showImage: true,
      showIcon: false
    }
  },
  created() {
    this.getVerify(this.$route.params.uid)
  },
  methods: {
    getVerify(uid) {
      this.ruleForm.userid = uid
      fetchVerify(uid).then(response => {
        if(response.data !== null) {
          this.verifyList = response.data
          this.verifyLen = this.verifyList.length
          this.ruleForm = this.verifyList[0]
          this.index = 0
          this.bantime[0] = this.ruleForm.start
          this.bantime[1] = this.ruleForm.end

          this.image = this.ruleForm.photo
          if(this.image !== '' && this.image !== null) {
            this.showImage = true
          }
        }
      })
    },
    toggleShow() {
      this.show = !this.show
    },
    cropSuccess(base64, field) {
      this.imgDataUrl.base64 = base64
      uploadVerifyPhoto(this.imgDataUrl).then(response => {
        this.image = response.data.imagePath
        this.ruleForm.photo = response.data.imagePath
        this.showImage = true
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
          createVerify(this.ruleForm).then(() => {
            ElNotification({
              title: '申请成功',
              message: '正在等待管理员审核',
              type: 'success',
            })
            this.$router.push('/')
          })
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

.v-change {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.my-upload {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #333;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  outline: 0;
}

.my-img-div {
  width: 200px;
  height: 200px;
  position: relative;
}

.my-cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  border: 1px dashed #d6d6d6;
  border-radius: 4px;
  width: 200px;
  height: 200px;
}

.my-image {
  width: 100%;
  height: 100%;
}

.my-image-hover {
  filter: brightness(.5);
}

.my-edit16 {
  width: 32px;
  height: 32px;
  position: absolute;
  left: 55px;
  top: 80px;
  filter: invert(100%) sepia(5%) saturate(530%) hue-rotate(193deg) brightness(114%) contrast(100%);
}

.my-hidden {
  display: none;
}
</style>
