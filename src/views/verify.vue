<template>
  <Header />
  <div class="v-main">
    <el-row>
      <el-col :xs="{span: 20, offset: 2}" :sm="{span: 20, offset: 2}" :md="{span: 20, offset: 2}" :lg="{span: 20, offset: 2}" :xl="{span: 20, offset: 2}">
        <div class="v-center">
          <div class="vc-top">认证</div>
          <div class="vc-main">
            <el-form
              ref="ruleForm"
              :model="ruleForm"
              :rules="rules"
              label-width="120px"
              class="demo-ruleForm"
              :size="formSize"
            >
              <el-form-item label="Activity name" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="Activity zone" prop="region">
                <el-select v-model="ruleForm.region" placeholder="Activity zone">
                  <el-option label="Zone one" value="shanghai"></el-option>
                  <el-option label="Zone two" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="Activity time" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker
                      v-model="ruleForm.date1"
                      type="date"
                      placeholder="Pick a date"
                      style="width: 100%"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="text-center" :span="2">
                  <span class="text-gray-500">-</span>
                </el-col>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-time-picker
                      v-model="ruleForm.date2"
                      placeholder="Pick a time"
                      style="width: 100%"
                    ></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="Instant delivery" prop="delivery">
                <el-switch v-model="ruleForm.delivery"></el-switch>
              </el-form-item>
              <el-form-item label="Activity type" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                  <el-checkbox label="Online activities" name="type"></el-checkbox>
                  <el-checkbox label="Promotion activities" name="type"></el-checkbox>
                  <el-checkbox label="Offline activities" name="type"></el-checkbox>
                  <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="Resources" prop="resource">
                <el-radio-group v-model="ruleForm.resource">
                  <el-radio label="Sponsorship"></el-radio>
                  <el-radio label="Venue"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="Activity form" prop="desc">
                <el-input v-model="ruleForm.desc" type="textarea"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div style="padding: 30px 0; text-align: center">
            <el-button type="primary" @click="submitForm('ruleForm')" style="margin-right: 30px"
              >Create</el-button
            >
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
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

export default {
  name: "Verify",
  components: { Header, Footer },
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur',
          },
          {
            min: 3,
            max: 5,
            message: 'Length should be 3 to 5',
            trigger: 'blur',
          },
        ],
        region: [
          {
            required: true,
            message: 'Please select Activity zone',
            trigger: 'change',
          },
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: 'Please pick a date',
            trigger: 'change',
          },
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: 'Please pick a time',
            trigger: 'change',
          },
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: 'Please select at least one activity type',
            trigger: 'change',
          },
        ],
        resource: [
          {
            required: true,
            message: 'Please select activity resource',
            trigger: 'change',
          },
        ],
        desc: [
          {
            required: true,
            message: 'Please input activity form',
            trigger: 'blur',
          },
        ],
      }
    }
  },
  created() {
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.ruleForm)
        if (valid) {
          console.log('success!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.ruleForm)
        if (valid) {
          console.log('success!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
@import "~@/styles/verify.scss";

</style>
