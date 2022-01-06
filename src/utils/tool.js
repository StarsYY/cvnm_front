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
