<template>
  <Header />
  <div class="c-main">
    <div class="c-bc">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">论坛首页</el-breadcrumb-item>
        <el-breadcrumb-item>上传课程</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="c-box">
      <div class="c-b-t">上传课程</div>
      <el-dropdown>
        <span class="c-draft">草稿箱( {{ draftLen }} )</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in courseDraft" :key="item.id" @click="editDraft(item.id)">{{ item.name }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="c-m-main">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-position="top"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="ruleForm.name" clearable maxlength="20" placeholder="请输入课程名称（20个字以内）" show-word-limit></el-input>
        </el-form-item>
        <div class="c-pt">
          <el-form-item label="模块" prop="modularid">
            <el-cascader ref="plateCascader" v-model="ruleForm.modularid" placeholder="请选择板块" :options="options" :props="props" clearable @change="setAncestor" />
          </el-form-item>
        </div>
        <el-form-item label="关键字" prop="labelid">
          <div style="display: none">
            <el-input v-model="ruleForm.labelid"></el-input>
          </div>
          <el-select
            style="width: 100%"
            v-model="lids"
            placeholder="请添加关键字（最多添加5个）"
            reserve-keyword="true"
            multiple-limit="5"
            filterable
            multiple
            clearable
            @change="setLabelid"
          >
            <el-tabs v-model="activeName" style="padding: 0 32px 0 20px">
              <el-tab-pane v-for="item in labelOptions" :key="item.id" :label="item.label" :name="item.id">
                <table>
                  <tr v-for="children in item.children" :key="children.id">
                    <td valign="top">
                      <div class="c-category">{{ children.label }}</div>
                    </td>
                    <td>
                      <div class="c-label">
                        <el-option v-for="label in children.children" :key="label.id" :label="label.label" :value="label.id" class="c-tag" :class="{ 'c-select-tag' : label.value }" />
                      </div>
                    </td>
                  </tr>
                </table>
              </el-tab-pane>
            </el-tabs>
          </el-select>
        </el-form-item>
        <el-form-item label="价格">
          <div class="slider-demo-block">
            <el-slider v-model="ruleForm.price" :max="100000" :format-tooltip="formatTooltip" style="width: 80%"></el-slider>
            <el-input-number v-model="price" :precision="2" :step="0.01" :min="0" :max="1000" style="width: 150px" @change="setPrice" />
          </div>
        </el-form-item>
        <el-form-item>
          <Uploader ref="upload"></Uploader>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="ruleForm.summary" :autosize="{ minRows: 3 }" type="textarea" clearable maxlength="500" placeholder="简介（选填）" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="介绍" prop="introduction">
          <Tinymce
            id="myedit"
            ref="editor"
            v-model="tinymceContent"
            :disabled="disabled"
          />
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <div style="display: none">
            <el-input v-model="ruleForm.cover"></el-input>
          </div>
          <div class="my-upload">
            <div v-if="showImage" class="my-cover" @click="toggleShow">
              <div style="margin-bottom: 16px">
                <svg-icon icon-class="coveimage" style="width: 50px; height: 44px" />
              </div>
              <div>请选择照片</div>
            </div>
            <div v-if="!showImage" class="my-img-div" v-on:mouseover="showIcon = !showIcon" v-on:mouseout="showIcon = !showIcon">
              <img :src="image" class="my-image" :class="{'my-image-hover' : showIcon}" >
              <div :class="{'my-hidden' : !showIcon}" style="cursor: pointer" @click="toggleShow">
                <svg-icon icon-class="edit16" class-name='my-edit16' />
              </div>
              <div :class="{'my-hidden' : !showIcon}" style="cursor: pointer" @click="showImage = ! showImage, showIcon = !showIcon, ruleForm.photo = ''">
                <svg-icon icon-class="delete16" class-name='my-edit16' style="left: 184px" />
              </div>
            </div>
          </div>
          <my-upload
            field="img"
            v-model="show"
            img-format="png"
            :width="256"
            :height="144"
            :noCircle="true"
            :noSquare="true"
            @crop-success="cropSuccess"
          />
        </el-form-item>
      </el-form>
    </div>
    <div style="margin: auto">
      <div class="c-c">
        <button class="c-save c-save-primary" @click="draftForm('ruleForm')">保存草稿</button>
        <button class="c-save-submit c-save c-save-primary" @click="submitForm('ruleForm')">发布课程</button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/header"
import Footer from "@/components/footer"
import { fetchCreate, createCourse, fetchCourseDraft } from '@/api/course'
import { ElNotification, ElMessage } from 'element-plus'
import Cookie from 'js-cookie'
import { isLogin } from '@/utils/tool'
import Tinymce from '@/components/tinymce'
import tinymce from 'tinymce'
import MyUpload from 'vue-image-crop-upload'
import { uploadCourseImage } from '@/api/upload'
import Uploader from '@/components/uploader'

export default {
  name: "Create",
  components: { Header, Footer, Tinymce, MyUpload, Uploader },
  data() {
    const formatTooltip = (val) => {
      this.price = val / 100
      return val / 100
    }
    return {
      video: [],
      formatTooltip,
      price: 0,
      ruleForm: {
        name: '',
        labelid: '',
        summary: '',
        introduction: '',
        price: 0,
        modularid: '',
        status: '',
        author: '',
        cover: '',
        video: '',
        watch: 0,
        stauts: '待审核',
        video: '',
        num: 0
      },
      rules: {
        name: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        modularid: [{ required: true, message: '请选择一个模块', trigger: 'change' }],
        labelid: [
          { required: true, message: '至少添加一个标签', trigger: 'change' },
          { min: 2, message: '至少添加一个标签', trigger: 'change' }
        ],
        introduction: [{ required: true, message: '课程介绍不能为空', trigger: 'blur' }],
        cover: [{ required: true, message: '请添加封面', trigger: 'cahnge' }]
      },
      courseDraft: [],
      draftLen: 0,
      labelOptions: null,
      lids: [],
      props: {
        expandTrigger: 'hover',
      },
      options: null,
      activeName: 1,
      disabled: false,
      tinymceContent: '',
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
    this.getCreate()
    this.getCourseDraft()
  },
  methods: {
    getCreate() {
      fetchCreate().then(response => {
        this.options = response.data.optionModular
        this.labelOptions = response.data.allLabel
      })
    },
    getCourseDraft() {
      if (isLogin()) {
        this.ruleForm.author = Cookie.get("nickname")
        fetchCourseDraft(this.ruleForm).then(response => {
          this.courseDraft = response.data.draft
          this.draftLen = response.data.draft.length
        })
      }
    },
    toggleShow() {
      this.show = !this.show
    },
    cropSuccess(base64, field) {
      this.imgDataUrl.base64 = base64
      uploadCourseImage(this.imgDataUrl).then(response => {
        this.image = response.data.imagePath
        this.ruleForm.cover = response.data.imagePath
        this.showImage = false
      })
    },
    setAncestor() {
      if (this.ruleForm.modularid !== null) {
        this.ruleForm.modularid = this.ruleForm.modularid[this.ruleForm.modularid.length - 1]
      }
    },
    setLabelid() {
      var idss = ','
      for (let id in this.lids) {
        idss += this.lids[id] + ','
      }
      this.ruleForm.labelid = idss
    },
    setPrice() {
      this.ruleForm.price = this.price * 100
    },
    setVideo() {
      this.video = this.$refs['upload'].sendUploaderToCourseAdd()
      if(this.ruleForm.num === 0 && this.video.length === 0) {
        this.$message({
          message: '请上传视频文件',
          type: 'error'
        })
        return false
      }
      this.ruleForm.video = JSON.stringify(this.video)
      return true
    },
    submitForm(formName) {
      console.log(this.ruleForm)
      if(!this.setVideo()) {
        return false
      }
      if (isLogin()) {
        this.ruleForm.introduction = tinymce.editors[0].getContent()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.status = "待审核"
            this.ruleForm.author = Cookie.get("nickname")
            createCourse(this.ruleForm).then(() => {
              ElNotification({
                title: '发布成功',
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
      }
    },
    draftForm(formName) {
      if(!this.setVideo()) {
        return false
      }
      if (isLogin()) {        
        this.ruleForm.introduction = tinymce.editors[0].getContent()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.status = "草稿"
            this.ruleForm.author = Cookie.get("nickname")
            createCourse(this.ruleForm).then(() => {
              ElMessage({
                message: '保存成功',
                type: 'success',
              })
            })
            this.$router.push('/')
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    editDraft(id) {
      this.$router.push({ name: 'SchoolCreateEdit', params: {id: id} })
    }
  }
}
</script>

<style scoped>
@import "~@/styles/create.scss";

.body {
  margin: 0;
  padding: 0;
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
  width: 328px;
  height: 184px;
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
  width: 328px;
  height: 184px;
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
  left: 112px;
  top: 78px;
  filter: invert(100%) sepia(5%) saturate(530%) hue-rotate(193deg) brightness(114%) contrast(100%);
}

.my-hidden {
  display: none;
}

.c-bc >>> .el-breadcrumb > .el-breadcrumb__item > .el-breadcrumb__inner {
  font-weight: 400;
  color: #6a707a;
}

.c-bc >>> .el-breadcrumb > .el-breadcrumb__item > .el-breadcrumb__inner.is-link:hover {
  color: #409eff;
}

.c-pt >>> .el-form-item {
  width: 48%;
}

.c-pt >>> .el-form-item > .el-form-item__content > .el-cascader,
.c-pt >>> .el-form-item > .el-form-item__content > .el-select {
  width: 100%;
}

.slider-demo-block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80%;
  margin-left: 70px;
}
</style>
