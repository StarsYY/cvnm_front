<template>
  <Header />
  <div class="c-main">
    <div class="c-bc">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">论坛首页</el-breadcrumb-item>
        <el-breadcrumb-item>发布帖子</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="c-box">
      <div class="c-b-t">我要发帖子</div>
      <el-dropdown>
        <span class="c-draft">草稿箱( {{ draftLen }} )</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in articleDraft" :key="item.id" @click="editDraft(item.id)">{{ item.title }}</el-dropdown-item>
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
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" clearable maxlength="120" placeholder="请输入帖子标题（120个字以内）" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <Tinymce
            id="myedit"
            ref="editor"
            v-model="tinymceContent"
            :disabled="disabled"
          />
        </el-form-item>
        <div class="c-pt">
          <el-form-item label="板块" prop="plateid">
            <el-cascader ref="plateCascader" v-model="ruleForm.plateid" placeholder="请选择板块" :options="options" :props="props" clearable @change="setAncestor" />
          </el-form-item>
          <el-form-item label="分类" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择分类">
              <el-option v-for="item in typeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="标签" prop="labelid">
          <div style="display: none">
            <el-input v-model="ruleForm.labelid"></el-input>
          </div>
          <el-select
            style="width: 100%"
            v-model="lids"
            placeholder="请添加标签（最多添加5个）"
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
        <el-form-item label="封面">
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
        <el-form-item label="摘要">
          <el-input v-model="ruleForm.summary" :autosize="{ minRows: 3 }" type="textarea" clearable maxlength="500" placeholder="摘要（选填）：会在推荐、列表等场景外露，帮助读者快速了解内容" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="发布形式" prop="publish">
          <el-radio-group v-model="ruleForm.publish">
            <el-radio label="公开">公开</el-radio>
            <el-radio label="私密">私密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="isopen" label="是否开启评论区">
          <el-switch
            v-model="isopen"
            inline-prompt
            active-text="是"
            inactive-text="否"
            @change="setIsOpen"
          />
        </el-form-item>
      </el-form>
    </div>
    <div style="margin: auto">
      <div class="c-c">
        <button class="c-save c-save-primary" @click="draftForm('ruleForm')">保存草稿</button>
        <button class="c-save-submit c-save c-save-primary" @click="submitForm('ruleForm')">发布帖子</button>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "@/components/header"
import Footer from "@/components/footer"
import { fetchCreate, createArticle, fetchArticleDraft } from '@/api/create'
import { ElNotification, ElMessage } from 'element-plus'
import Cookie from 'js-cookie'
import { isLogin } from '@/utils/tool'
import Tinymce from '@/components/tinymce'
import tinymce from 'tinymce'
import MyUpload from 'vue-image-crop-upload'
import { uploadArticleImage } from '@/api/upload'

export default {
  name: "Create",
  components: { Header, Footer, Tinymce, MyUpload },
  data() {
    return {
      ruleForm: {
        title: '',
        publish: '公开',
        type: '',
        plateid: '',
        labelid: '',
        content: '',
        summary: '',
        status: '',
        author: '',
        tag: '',
        cover: '',
        watch: 0,
        hot: '',
        source: '',
        isopen: 1
      },
      isopen: true,
      rules: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '请选择一个分类', trigger: 'change' }],
        plateid: [{ required: true, message: '请选择一个板块', trigger: 'change' }],
        labelid: [
          { required: true, message: '至少添加一个标签', trigger: 'change' },
          { min: 2, message: '至少添加一个标签', trigger: 'change' }
        ],
        publish: [{ required: true, message: '请选择发布形式', trigger: 'change' }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        isopen: [{ required: true, message: '请选择是否开启评论区', trigger: 'change' }]
      },
      articleDraft: [],
      draftLen: 0,
      typeOptions: [
        { key: '原创', display_name: '原创' },
        { key: '转载', display_name: '转载' },
        { key: '翻译', display_name: '翻译' },
        { key: '问题求助', display_name: '问题求助' },
        { key: '行业动态', display_name: '行业动态' },
        { key: '分享', display_name: '分享' },
        { key: '解决方案', display_name: '解决方案' },
        { key: '改进意见', display_name: '改进意见' }
      ],
      categoryOptions: null,
      labelOptions: null,
      lids: [],
      props: {
        checkStrictly: true
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
    this.getArticleDraft()
  },
  methods: {
    getCreate() {
      fetchCreate().then(response => {
        this.options = response.data.allPlate
        this.labelOptions = response.data.allLabel
      })
    },
    getArticleDraft() {
      if (isLogin()) {
        this.ruleForm.author = Cookie.get("nickname")
        fetchArticleDraft(this.ruleForm).then(response => {
          this.articleDraft = response.data.draft
          this.draftLen = response.data.draft.length
        })
      }
    },
    toggleShow() {
      this.show = !this.show
    },
    cropSuccess(base64, field) {
      this.imgDataUrl.base64 = base64
      uploadArticleImage(this.imgDataUrl).then(response => {
        this.image = response.data.imagePath
        this.ruleForm.cover = response.data.imagePath
        this.showImage = false
      })
    },
    setAncestor() {
      if (this.ruleForm.plateid !== null) {
        this.ruleForm.plateid = this.ruleForm.plateid[this.ruleForm.plateid.length - 1]
      }
    },
    setLabelid() {
      var idss = ','
      for (let id in this.lids) {
        idss += this.lids[id] + ','
      }
      this.ruleForm.labelid = idss
    },
    setIsOpen() {
      if(this.isopen) {
        this.ruleForm.isopen = 1
      } else {
        this.ruleForm.isopen = 0
      }
    },
    submitForm(formName) {
      if (isLogin()) {
        this.ruleForm.content = tinymce.editors[0].getContent()
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.status = "待审核"
            this.ruleForm.author = Cookie.get("nickname")
            createArticle(this.ruleForm).then(() => {
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
      if (isLogin()) {        
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.status = "草稿"
            this.ruleForm.author = Cookie.get("nickname")
            createArticle(this.ruleForm).then(() => {
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
      this.$router.push({ name: 'CreateEdit', params: {id: id} })
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
</style>
