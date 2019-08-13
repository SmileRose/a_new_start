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
              <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" v-model="ruleForm.thumb">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="内容" prop="content">
              <div style="height: 410px;">
                <quill-editor v-model="ruleForm.content" ref="myQuillEditor" style="height: 300px;">
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
import headTop from '../common/headTop'
import {
  quillEditor
} from 'vue-quill-editor'
import quillConfig from '../../tools/quill-config.js'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  data() {
      return {
        quillOption: quillConfig,
        dialogImageUrl: '',
        dialogVisible: false,
        ruleForm: {
          catid: '11',
          title: '',
          keywords: '',
          description: '',
          thumb: false,
          content: '',
          id: this.$route.query.id
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
          // thumb: [
          //   { required: true, message: '请选择活动资源', trigger: 'change' }
          // ],
          content: [{
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }]
        }
      };
    },
    components: {
      headTop,
      quillEditor
    },
    created: function() {
      this.getdata();
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let formData = this.ruleForm;
            this.$axios.post('/api/add_article', formData).then(res => {
              if (res.data.flag) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getdata() {
        var id = this.$route.query.id;
        if (id) {
          this.update =  true;
          let param = this.$route.query;

          this.$axios.post('/api/users', param).then(res => {
            if (res.data.flag) {
              var datas = res.data.data[0];

              var _rules = {
                catid: datas.catid,
                description: datas.description,
                keywords: datas.keywords,
                thumb: datas.thumb,
                title: datas.title,
                updatetime: datas.updatetime,
                id: id
              }

              this.ruleForm = _rules
            }
          })
        }
      },
      addKeywords() {},
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
}
</script>
<style lang="less" scoped>
@import '../../style/mixin';
.table_container {
  margin: 20px;
}
</style>
