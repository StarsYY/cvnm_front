<template>
  <div class="container" :class="{ 'sign-up-mode' : is }">
    <div class="forms-container">
      <div class="signin-signup">
        <el-form ref="postForm" :model="postForm" class="sign-in-form">
          <h2 class="title">Sign in</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input v-model="postForm.nickname" type="text" placeholder="Username" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input v-model="postForm.password" type="password" placeholder="Password" />
          </div>
          <input type="button" value="Login" class="btn solid" @click="login" />
        </el-form>
        <el-form ref="postForm" :model="postForm" class="sign-up-form">
          <h2 class="title">Sign up</h2>
          <div class="input-field">
            <i class="fas fa-user"></i>
            <input v-model="postForm.nickname" type="text" placeholder="Username" />
          </div>
          <div class="input-field">
            <i class="fas fa-lock"></i>
            <input v-model="postForm.password" type="password" placeholder="Password" />
          </div>
          <input type="button" class="btn" value="Sign up" @click="register" />
        </el-form>
      </div>
    </div>

    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <h3>New here ?</h3>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
            ex ratione. Aliquid!
          </p>
          <button class="btn transparent" @click="add">
            Sign up
          </button>
        </div>
        <img src="../assets/log.svg" class="image" alt="" />
      </div>
      <div class="panel right-panel">
        <div class="content">
          <h3>One of us ?</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            laboriosam ad deleniti.
          </p>
          <button class="btn transparent" @click="remove">
            Sign in
          </button>
        </div>
        <img src="../assets/register.svg" class="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/login'
import Cookie from 'js-cookie'

export default {
  name: "Login",
  data() {
    return {
      is: false,
      postForm: {
        nickname: '仰望星空',
        password: '123123'
      }
    }
  },
  created() {
    if(Cookie.get("is")) {
      this.is = true
      Cookie.remove("is")
    }
  },
  methods: {
    add() {
      this.is = true
    },
    remove() {
      this.is = false
    },
    login() {
      if(this.postForm.nickname === '' || this.postForm.password === '') {
        this.$message({
          message: '用户名和密码不能为空',
          type: 'warning'
        })
        return
      }
      if(this.postForm.password.length < 6) {
        this.$message({
          message: '密码不能少于 6 位',
          type: 'error'
        })
        return
      }
      login(this.postForm).then(response => {
        Cookie.set("token", response.data.token) // 默认 1 天
        Cookie.set("nickname", response.data.nickname)
        this.$router.push({name:'Index'})
      })
    },
    register() {
      if(this.postForm.nickname === '' || this.postForm.password === '') {
        this.$message({
          message: '用户名和密码不能为空',
          type: 'warning'
        })
        return
      }
      if(this.postForm.password.length < 6) {
        this.$message({
          message: '密码不能少于 6 位',
          type: 'error'
        })
        return
      }
      register(this.postForm).then(
        this.is = false
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/login.scss";

</style>