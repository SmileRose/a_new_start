<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-row :gutter="20">
        <el-col :span="12" :offset="4">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="栏目" prop="region">
              <el-select v-model="ruleForm.catid" placeholder="请选择活动区域">
                <el-option label="生活" value="4"></el-option>
                <el-option label="外语" value="3"></el-option>
                <el-option label="读书" value="2"></el-option>
                <el-option label="健身" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>

            <el-form-item label="内容" prop="remark">
              <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="imgs">
              <el-upload class="upload-poster" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :show-file-list="false" :on-change="imgPreview" :on-remove="handleRemove" :auto-upload="false">
                <img v-if="ruleForm.imgs" :src="ruleForm.imgs" class="avatar">
                <i v-else class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
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
        catid: '4',
        title: '',
        content: '',
        id: '',
        username: ''
      },
      rules: {
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],

        remark: [{
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
    var id = this.$route.query.id
    this.ruleForm.id = id
    this.getdata()
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
    },
    getdata () {
      var id = this.$route.query.id
      if (id) {
        this.update = true
        let param = this.$route.query
        this.$axios.post('/api/art_select', param).then(res => {
          if (res.data.flag) {
            var datas = res.data.data[0]
            var _rules = {
              catid: datas.catid,
              description: datas.description,
              keywords: datas.keywords,
              thumb: datas.thumb,
              title: datas.title,
              updatetime: datas.updatetime,
              id: id,
              content: datas.content
            }
            this.ruleForm = _rules
          }
        })
      }
    },
    addKeywords () {},
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    imgPreview (file, fileList) {
      let fileName = file.name
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/
      if (regex.test(fileName.toLowerCase())) {
        this.formMovie.posterURL = file.url
      } else {
        this.$message.error('请选择图片文件')
      }
    }
  }
}
</script>
<style lang="less">
@import '../../../style/mixin';
.table_container {
  margin: 20px;
  .ql-snow .ql-picker-label {
    vertical-align: top;
    line-height: 1
  }
  .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
    margin-top: 0;
    top: 2px;
  }
  .upload-poster .avatar {
    width: 148px;
  }
  .editor {
    line-height: normal !important;
    height: 800px;
  }
}
</style>
