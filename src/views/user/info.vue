<template>
  <div>
    <div class="u-i-title">
      <span class="u-i-i">个人信息</span>
    </div>
    <div>
      <div style="width: 45%; margin: 60px auto 0">
        <div class="u-i-userhead" @click="dialogVisible = true">
          <div style="display: flex; align-items: center">
            <el-avatar :src="ruleForm.portrait" :size="50" style="margin-right: 14px;"></el-avatar>
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
              <el-input v-model="ruleForm.nickname" maxlength="20" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="ruleForm.sex" placeholder="性别" style="width: 100%">
                <el-option label="女" value="0"></el-option>
                <el-option label="男" value="1"></el-option>
                <el-option label="火星人" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="ruleForm.name" maxlength="20" show-word-limit></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align: center">
            <button class="ui-but" @click="submit">保存</button>
          </div>
        </div>
      </div>

      <el-dialog
        v-model="dialogVisible"
        title="修改头像"
        width="30%"
        :before-close="handleClose"
      >
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
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="editPortrait">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { isLogin } from '@/utils/tool'
import { fetchUserInfo, updateUserInfo } from '@/api/user'
import { ElMessage } from 'element-plus'
import MyUpload from 'vue-image-crop-upload'
import { uploadUserPortrait } from '@/api/upload'

export default {
  name: "UserInfo",
  components: { MyUpload },
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        uid: '',
        nickname: '',
        portrait: '',
        sex: '',
        name: ''
      },
      username: '',
      one: false,
      two: true,
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
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      if(isLogin()) {
        this.ruleForm.nickname = Cookie.get("nickname")
        fetchUserInfo(this.ruleForm).then(response => {
          this.ruleForm = response.data.frontUserInfo

          this.username = this.ruleForm.nickname

          this.image = this.ruleForm.portrait
          if(this.image !== '' && this.image !== null) {
            this.showImage = true
          }
        })
      }
    },
    toggleShow() {
      this.show = !this.show
    },
    cropSuccess(base64, field) {
      this.imgDataUrl.base64 = base64
      uploadUserPortrait(this.imgDataUrl).then(response => {
        this.image = response.data.imagePath
        this.showImage = true
      })
    },
    editPortrait() {
      console.log(this.ruleForm)
      this.ruleForm.portrait = this.image
      this.dialogVisible = false
    },
    submit() {
      if(isLogin()) {
        updateUserInfo(this.ruleForm).then(() => {
          ElMessage({
            message: '修改成功',
              type: 'success',
          })
          if(this.username !== this.ruleForm.nickname) {
            Cookie.remove("nickname")
            Cookie.remove("token")
            this.$router.push('/')
          }
        })
      }
    }
  }
}
</script>

<style scoped>
@import "~@/styles/userinfo.scss";

.my-upload {
  box-sizing: border-box;
  margin: 0 auto;
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
