<template>
  <div class="Rose-Page">
    <head-top></head-top>
    <div class="table_container">
      <el-row :gutter="20">
        <el-col :span="12" :offset="4">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import headTop from '../../common/headTop'

export default {
  data () {
    return {
      ruleForm: {
        username: '',
        oldpwd: '',
        newpwd: ''
      },
      rules: {
        username: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],

        oldpwd: [{
          required: true,
          message: '请输入介绍',
          trigger: 'blur'
        }]

      }
    }
  },
  components: {
    headTop
  },
  created: function (option) {

  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = this.ruleForm
          this.$axios.post('/api/add_article', formData).then(res => {
            if (res.data.flag) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }

  }
}
</script>
<style lang="less">
.table_container{
  padding:100px
}

.Rose-Page{
  min-height: calc(100% - 70px);

}
</style>
