<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-row :gutter="20">
        <el-col :span="12" :offset="4">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="栏目" prop="region">
              <el-select v-model="ruleForm.catid" placeholder="请选择活动区域">
                <el-option label="前端" value="11"></el-option>
                <el-option label="生活" value="13"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="关键字" prop="keywords">
              <el-input v-model="ruleForm.keywords"></el-input>
              <el-button @click="addKeywords('ruleForm')">增加关键字</el-button>
            </el-form-item>
            <el-form-item label="摘要" prop="description">
              <el-input type="textarea" v-model="ruleForm.description"></el-input>
            </el-form-item>
            <el-form-item label="图片" prop="thumb">
              <el-upload class="upload-poster" action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :show-file-list="false" :on-change="imgPreview" :on-remove="handleRemove" :auto-upload="false">
                <img v-if="ruleForm.thumb" :src="ruleForm.thumb" class="avatar">
                <i v-else class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <div style="height: 610px;">
                <quill-editor v-model="ruleForm.content" ref="myQuillEditor" style="height: 500px;">
                </quill-editor>
              </div>
            </el-form-item>
            <el-form-item label="置顶" prop="delivery">
              <el-switch v-model="ruleForm.delivery"></el-switch>
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
import {
  quillEditor
} from 'vue-quill-editor'
import quillConfig from '../../../tools/quill-config.js'
import 'quill/dist/quill.snow.css'
export default {
  data () {
    return {
      quillOption: quillConfig,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      ruleForm: {
        catid: '11',
        title: '',
        keywords: '',
        description: '',
        thumb: '',
        content: '',
        id: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        }, {
          min: 3,
          max: 30,
          message: '长度在 3 到 30 个字符',
          trigger: 'blur'
        }],
        title: [{
          required: true,
          message: '请输入标题',
          trigger: 'blur'
        }],
        keywords: [{
          required: true,
          message: '请输入关键字',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '请输入介绍',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }]
      }
    }
  },
  components: {
    headTop,
    quillEditor
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
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
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
