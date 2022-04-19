<template>
  <div>
    <div class="s-title">
      <span class="s-s">帐号与安全</span>
    </div>
    <div>
      <div class="s-acc-up">
        <div>
          <span class="s-acc-title">帐号信息</span>
        </div>
        <div style="margin-top: 8px">
          <span class="s-acc-content">您可以修改您的账号信息</span>
        </div>
        <div style="margin-top: 20px">
          <ul style="list-style: none">
            <li>
              <div>
                <div class="s-li">
                  <div class="s-li-icon">
                    <svg-icon icon-class="person" style="width: 36px; height: 36px"></svg-icon>
                  </div>
                  <div class="s-li-content">
                    <div class="s-li-middle">
                      <div style="margin-bottom: 4px">
                        <span class="s-li-title">账号名</span>
                        <svg-icon icon-class="helpTip" style="width: 18px; height: 18px; display: none"></svg-icon>
                      </div>
                      <div>
                        <span class="s-li-title s-l-t-main">{{ user?.nickname }}</span>
                      </div>
                    </div>
                    <div class="s-li-right">
                      <div class="s-li-btn" @click="updateAccountInfo(1)">
                        <span class="s-li-btn-span">更改</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="s-li-line"></div>
              </div>
            </li>
            <li>
              <div>
                <div class="s-li">
                  <div class="s-li-icon">
                    <svg-icon icon-class="phone" style="width: 36px; height: 36px"></svg-icon>
                  </div>
                  <div class="s-li-content">
                    <div class="s-li-middle">
                      <div style="margin-bottom: 4px">
                        <span class="s-li-title">手机号</span>
                      </div>
                      <div>
                        <span v-if="user?.phone !== null && user?.phone !== ''" class="s-li-title s-l-t-main">{{ user?.phone }}</span>
                        <span v-else class="s-li-title s-l-t-main">未绑定</span>
                      </div>
                    </div>
                    <div class="s-li-right">
                      <div class="s-li-btn">
                        <span v-if="user?.phone !== null && user?.phone !== ''" class="s-li-btn-span" @click="updateAccountInfo(2)">更改</span>
                        <span v-else class="s-li-btn-span" @click="updateAccountInfo(2)">绑定</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="s-li-line"></div>
              </div>
            </li>
            <li>
              <div>
                <div class="s-li">
                  <div class="s-li-icon">
                    <svg-icon icon-class="email" style="width: 36px; height: 36px"></svg-icon>
                  </div>
                  <div class="s-li-content">
                    <div class="s-li-middle">
                      <div style="margin-bottom: 4px">
                        <span class="s-li-title">邮箱地址</span>
                      </div>
                      <div>
                        <span v-if="user?.email !== null && user?.email !== ''" class="s-li-title s-l-t-main" style="color: red">{{ user?.email }}</span>
                        <span v-else class="s-li-title s-l-t-main" style="color: red">未绑定</span>
                      </div>
                    </div>
                    <div class="s-li-right">
                      <div class="s-li-btn">
                        <span v-if="user?.email !== null && user?.email !== ''" class="s-li-btn-span" @click="updateAccountInfo(3)">更改</span>
                        <span v-else class="s-li-btn-span" @click="updateAccountInfo(3)">绑定</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="s-li-line"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="s-acc-up">
        <div>
          <span class="s-acc-title">安全中心</span>
        </div>
        <div style="margin-top: 20px">
          <ul style="list-style: none">
            <li>
              <div>
                <div class="s-li">
                  <div class="s-li-icon">
                    <svg-icon icon-class="changepassword" style="width: 36px; height: 36px"></svg-icon>
                  </div>
                  <div class="s-li-content">
                    <div class="s-li-middle">
                      <div style="margin-bottom: 4px">
                        <span class="s-li-title">重置帐号密码</span>
                      </div>
                    </div>
                    <div class="s-li-right">
                      <div class="s-li-btn">
                        <span class="s-li-btn-span" @click="updateAccountInfo(4)">重置</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="s-li-line"></div>
              </div>
            </li>
            <li>
              <div>
                <div class="s-li">
                  <div class="s-li-icon">
                    <svg-icon icon-class="deleteaccount" style="width: 36px; height: 36px"></svg-icon>
                  </div>
                  <div class="s-li-content">
                    <div class="s-li-middle">
                      <div style="margin-bottom: 4px">
                        <span class="s-li-title">销户</span>
                      </div>
                      <div>
                        <span class="s-li-title s-l-t-main">永久删除您的帐号及相关数据，管理您的注销请求</span>
                      </div>
                    </div>
                    <div class="s-li-right" style="cursor: pointer" @click="open">
                      <img src="@/assets/arrow_right.png" style="width: 12px; height: 28px">
                    </div>
                  </div>
                </div>
                <div class="s-li-line"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
        <el-form ref="form" :model="form" :rules="rules">
          <el-form-item v-if="type === 1" label="账户名：" prop="nickname" label-width="19.23%">
            <el-input v-model="form.nickname" maxlength="10" show-word-limit clearable />
          </el-form-item>
          <el-form-item v-if="type === 2" label="手机号" prop="phone" label-width="19.23%">
            <el-input v-model="form.phone" />
          </el-form-item>
          <el-form-item v-if="type === 3" label="邮箱" prop="email" label-width="19.23%">
            <el-input v-model="form.email" />
          </el-form-item>
          <el-form-item v-if="type === 4" label="旧密码" prop="password" label-width="19.23%">
            <el-input v-model="form.password" type="password" show-password />
          </el-form-item>
          <el-form-item v-if="type === 4" label="新密码" prop="repassword" label-width="19.23%">
            <el-input v-model="form.repassword" type="password" show-password />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false, setNull()">取消</el-button>
            <el-button type="primary" @click="confirm('form', type)" >确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { isLogin } from '@/utils/tool'
import { fetchAccountInfo, updateAccountInfo, cancellationUser } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: "Security",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      user: {
        uid: '',
        nickname: '',
        phone: '',
        email: ''
      },
      type: 0,
      dialogTitle: '',
      dialogFormVisible: false,
      form: {
        uid: '',
        nickname: null,
        phone: null,
        email: null,
        password: null,
        repassword: null
      },
      rules: {
        nickname: [{ required: true, message: '账户名是必填项', trigger: 'blur' }],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { pattern: /^\S{6,32}$/, message: '密码长度位 6-20 位', trigger: ['blur', 'change'] },
          { pattern: /^\w+$/, message: '密码只能由数字、字母、下划线组成', trigger: ['blur', 'change'] }
        ],
        repassword: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { pattern: /^\S{6,32}$/, message: '密码长度位 6-20 位', trigger: ['blur', 'change'] },
          { pattern: /^\w+$/, message: '密码只能由数字、字母、下划线组成', trigger: ['blur', 'change'] },
          { validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号是必填项', trigger: 'blur' },
          { pattern: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/, message: '手机号不合法', trigger: ['blur', 'change'] }
        ],
        email: [
          { required: true, message: '邮箱是必填项', trigger: 'blur' },
          { type: 'email', message: '请填写正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
      },
      one: false,
      two: true
    }
  },
  created() {
    this.getAccountInfo()
  },
  methods: {
    getAccountInfo() {
      if(isLogin()) {
        this.user.nickname = Cookie.get("nickname")
        fetchAccountInfo(this.user).then(response => {
          this.user = response.data.frontAccountInfo

          this.form.uid = this.user.uid
        })
      }
    },
    updateAccountInfo(type) {
      this.dialogFormVisible = true
      this.type = type
      if(type === 1) {
        this.dialogTitle = "修改账户名"
      } else if(type === 2) {
        this.dialogTitle = "修改手机号"
      } else if(type === 3) {
        this.dialogTitle = "修改邮箱"
      } else if(type === 4) {
        this.dialogTitle = "修改密码"
      }
    },
    setNull() {
      this.form.nickname = null
      this.form.phone = null
      this.form.email = null
      this.form.password = null
      this.form.repassword = null
    },
    confirm(formName, type) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateAccountInfo(this.form).then(() => {
            ElMessage({
              message: '修改成功',
                type: 'success',
            })
            if(this.user.nickname !== this.form.nickname) {
              Cookie.remove("nickname")
              Cookie.remove("token")
              this.$router.push('/')
            }
            if(type === 1) {
              this.user.nickname = this.form.nickname
            } else if(type === 2) {
              this.user.phone = this.form.phone
            } else if(type === 3) {
              this.user.email = this.form.email
            }
            this.setNull()
          })
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    open() {
      if(isLogin()) {
        ElMessageBox.confirm(
          '确定要注销账户嘛?',
          'Warning',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        ).then(() => {
          cancellationUser(this.form).then(() => {
            ElMessage({
              type: 'success',
              message: '注销成功',
            })
            Cookie.remove("nickname")
            Cookie.remove("token")
            this.$router.push('/')
          })
        })
      }
    }
  }
}
</script>

<style scoped>
@import "~@/styles/security.scss";

.el-input {
  width: 70%;
}
</style>
