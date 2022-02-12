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
      <span class="c-draft">草稿箱(0)</span>
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
          <div class="c-upload">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              上传一张封面
            </div>
          </div>
        </el-form-item>
        <el-form-item label="摘要" prop="summary">
          <el-input v-model="ruleForm.summary" :autosize="{ minRows: 3 }" type="textarea" clearable maxlength="500" placeholder="摘要（选填）：会在推荐、列表等场景外露，帮助读者快速了解内容" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="发布形式" prop="publish">
          <el-radio-group v-model="ruleForm.publish">
            <el-radio label="Public">公开</el-radio>
            <el-radio label="Private">私密</el-radio>
          </el-radio-group>
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
import { UploadFilled } from '@element-plus/icons'
import { fetchCreate, createArticle } from '@/api/create'
import { ElNotification, ElMessage } from 'element-plus'
import Cookie from 'js-cookie'
import { isLogin } from '@/utils/tool'
import Tinymce from '@/components/tinymce'
import tinymce from 'tinymce'

export default {
  name: "Create",
  components: { Header, Footer, UploadFilled, Tinymce },
  data() {
    return {
      ruleForm: {
        title: '',
        publish: 'Public',
        type: '',
        plateid: '',
        labelid: '',
        content: '',
        summary: '',
        status: '',
        author: '',
        tag: 'Default',
        cover: '',
        watch: 0,
        hot: '',
        source: ''
      },
      rules: {
        title: [
          {
            required: true,
            message: '标题不能为空',
            trigger: 'blur',
          },
        ],
        type: [
          {
            required: true,
            message: '请选择一个分类',
            trigger: 'change',
          },
        ],
        plateid: [
          {
            required: true,
            message: '请选择一个板块',
            trigger: 'change',
          },
        ],
        labelid: [
          {
            required: true,
            message: '至少添加一个标签',
            trigger: 'change',
          }
        ],
        publish: [
          {
            required: true,
            message: '请选择发布形式',
            trigger: 'change',
          },
        ],
        content: [
          {
            required: true,
            message: '文章内容不能为空',
            trigger: 'blur',
          },
        ],
        summary: [
          {
            required: true,
            message: '摘要不能为空',
            trigger: 'blur',
          },
        ],
      },
      typeOptions: [
        { key: 'Original', display_name: '原创' },
        { key: 'Reprint', display_name: '转载' },
        { key: 'Translation', display_name: '翻译' },
        { key: 'Question', display_name: '问题求助' },
        { key: 'Industry', display_name: '行业动态' },
        { key: 'Share', display_name: '分享' },
        { key: 'Solve', display_name: '解决方案' },
        { key: 'Proposal', display_name: '改进意见' }
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
      tinymceContent: ''
    }
  },
  created() {
    this.fetchCreate()
  },
  methods: {
    fetchCreate() {
      fetchCreate().then(response => {
        this.options = response.data.allPlate
        this.labelOptions = response.data.allLabel
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
    submitForm(formName) {
      if (isLogin()) {
        this.ruleForm.content = tinymce.editors[0].getContent()
        this.$refs[formName].validate((valid) => {
          console.log(this.ruleForm)
          if (valid) {
            if (this.ruleForm.labelid.length === 1) {
              ElMessage({
                message: '文章标签不能为空',
                type: 'warning',
              })
              return
            }
            this.ruleForm.status = "Audit"
            this.ruleForm.author = Cookie.get("nickname")
            createArticle(this.ruleForm).then(() => {
              ElNotification({
                title: '发布成功',
                message: '正在等待管理员审核',
                type: 'success',
              })
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
          console.log(this.ruleForm)
          if (valid) {
            if (this.ruleForm.labelid.length === 1) {
              ElMessage({
                message: '文章标签不能为空',
                type: 'warning',
              })
              return
            }
            this.ruleForm.status = "Draft"
            this.ruleForm.author = Cookie.get("nickname")
            createArticle(this.ruleForm).then(response => {
              ElMessage({
                message: '保存成功',
                type: 'success',
              })
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
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
