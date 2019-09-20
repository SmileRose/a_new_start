<template>
  <div class="Rose-Page">
    <head-top></head-top>
    <div class="table_container">
      <el-row :gutter="20">
        <el-col :span="12" :offset="4">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="站点名称" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>

            <el-form-item label="站点域名" prop="remark">
               <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>

             <el-form-item label="站点标题" prop="remark">
               <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>

             <el-form-item label="关键字" prop="remark">
               <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
              <el-form-item label="站点描述" prop="remark">
               <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>

            </el-form-item>
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
