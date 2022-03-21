import Cookie from 'js-cookie'
import { ElMessage } from 'element-plus'

export function isLogin() {
  if (Cookie.get("nickname") === undefined) {
    ElMessage({
      message: '您还没有登录，请先登陆.',
      type: 'warning',
    })
    return false
  }
  return true
}

export function deleteHTML(richText) {
  let content = richText.replace(/<.+?>/g, '')
  content = content.replace(/&nbsp;/ig, '')
  content = content.replace(/&ldquo;/ig, '')
  content = content.replace(/&rdquo;/ig, '')
  content = content.replace(/&mdash;/ig, '')
  content = content.replace(/\s/ig, '')
  return content
}
