<template>
  <div class="tinymce-box tinymce-body">
    <editor
      :id="tinymceId"
      v-model="myValue"
      :init="init"
      :disabled="disabled"
    >
    </editor>
  </div>
</template>

<script>
// 文档 http://tinymce.ax-z.cn/
// 引入组件
import tinymce from 'tinymce/tinymce' // tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'

// 引入富文本编辑器主题的js和css
import 'tinymce/skins/content/default/content.css'
import 'tinymce/themes/silver/theme.min.js'
import 'tinymce/icons/default/icons' // 解决了icons.js 报错Unexpected token '<'

// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import 'tinymce/plugins/image'// 插入上传图片插件
// import 'tinymce/plugins/media'// 插入视频插件
import 'tinymce/plugins/table'// 插入表格插件
import 'tinymce/plugins/lists'// 列表插件
import 'tinymce/plugins/wordcount'// 字数统计插件
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullscreen'

import { uploadArticleImage } from '@/api/upload'

export default {
  components: {
    Editor
  },
  name: 'Tinymce',
  props: {
    // 默认的富文本内容
    id: {
      type: String,
      default: function() {
        return 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')
      }
    },
    value: {
      type: String,
      default: ''
    },
    // 基本路径，默认为空根目录，如果你的项目发布后的地址为目录形式，
    // 即abc.com/tinymce，baseUrl需要配置成tinymce，不然发布后资源会找不到
    baseUrl: {
      type: String,
      default: window.location.origin ? window.location.origin : ''
    },
    // 禁用
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      // default: 'link lists image code table wordcount media preview fullscreen'
      default: 'link lists image code table wordcount preview fullscreen'
    },
    toolbar: {
      type: [String, Array],
      default: 'bold italic underline strikethrough | fontsizeselect | formatselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | undo redo | link unlink code lists table image | removeformat | fullscreen preview'
      // default: 'bold italic underline strikethrough | fontsizeselect | formatselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent blockquote | undo redo | link unlink code lists table image media | removeformat | fullscreen preview'
    }
  },
  data () {
    return {
      tinymceId: this.id,
      hasChange: false,
      hasInit: false,
      init: {
        selector: `#${this.tinymceId}`,
        language_url: `${this.baseUrl}/tinymce/langs/zh_CN.js`,
        language: 'zh_CN',
        skin_url: `${this.baseUrl}/tinymce/skins/ui/oxide`,
        // skin_url: 'tinymce/skins/ui/oxide-dark', // 暗色系
        convert_urls: false,
        height: 1000,
        // content_css（为编辑区指定css文件）,加上就不显示字数统计了
        // content_css: `${this.baseUrl}tinymce/skins/content/default/content.css`,
        // （指定需加载的插件）
        plugins: this.plugins,
        toolbar: this.toolbar, // （自定义工具栏）

        statusbar: true, // 底部的状态栏
        menubar: 'file edit insert view format table tools', // （1级菜单）最上方的菜单
        branding: false, // （隐藏右下角技术支持）水印“Powered by TinyMCE”
        // init_instance_callback: editor => {
        //   if (this.value) {
        //     editor.setContent(this.value)
        //   }
        //   this.hasInit = true
        //   editor.on('NodeChange Change KeyUp SetContent', () => {
        //     this.hasChange = true
        //     this.$emit('input', editor.getContent())
        //   })

        //   //input和change事件
        //   editor.on('input',(e) => {
        //     this.$emit('input',e.target.innerHTML);
        //   });
        //   editor.on('change',(e) => {
        //     this.$emit('input',e.level.content)
        //   })
        // },
        // //初始化内容
        // setup: (editor) => {
        //   editor.on("init", (e) => {
        //     editor.setContent(this.value);
        //     //this.hasInit = true;
        //   });
        // },
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          if (blobInfo.blob().size/1024/1024 > 8) {
            failure("上传失败，图片大小请控制在 8M 以内")
          } else {
            this.imgDataUrl.base64 = 'data:image/png;base64,' + blobInfo.base64()
            uploadArticleImage(this.imgDataUrl).then(response => {
              success(response.data.imagePath)
            })
          }
        }
      },
      imgDataUrl: {
        base64: ''
      },
      myValue: this.value
    }
  },
  mounted () {
    tinymce.init({})
  },
  // methods: {
  //   setContent(value) {
  //     window.tinymce.get(this.tinymceId).setContent(value)
  //   },
  //   getContent() {
  //     window.tinymce.get(this.tinymceId).getContent()
  //   },
  // },
  watch: {
    value (newValue) {
      // this.myValue = newValue
      // window.tinyMCE.setContent(newValue)
      this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(newValue))
      // if (this.hasInit) {
      //   this.$nextTick(() =>
      //     window.tinymce.get(this.tinymceId).setContent(newValue || ''))
      // }
    },
    myValue (newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

<style scoped>

</style>
