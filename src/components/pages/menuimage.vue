<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="items" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="aid" label="ID"></el-table-column>
        <el-table-column prop="module" label="模块名称"></el-table-column>
        <el-table-column prop="catid" label="栏目名称"></el-table-column>
        <el-table-column prop="filename" label="附件名称"></el-table-column>
        <el-table-column prop="filesize" label="附件大小"></el-table-column>
        <el-table-column prop="uploadtime" label="上传时间">
           <!--  <template slot-scope="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column prop="uploadip" label="上传ip"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">预览</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import headTop from '../common/headTop'
export default {
  data() {
      return {
        items: [],
        multipleSelection: []
      }
    },
    components: {
      headTop
    },
    created: function(){
        this.getArt();
    },
    methods: {
        getArt() {
          this.$axios.post('/api/menu_image').then(res => {
            if (res.data.flag) {
              this.items = res.data.data;

            }
          })
        },
      handleEdit(index,rows) {
        console.log(rows)
        this.$alert('<img src="https://www.zhmzjl.com/uploadfile/'+ rows.filepath +'" />', rows.filename, {
          dangerouslyUseHTMLString: true
        });
      },
      handleSelectionChange(index,val) {
        this
      }
    }
}
</script>
<style lang="less">
@import '../../style/mixin';
.table_container {
  margin: 20px;
  border: 1px solid #e1e1e1
}
.el-message-box{
  width: 600px
}
.el-message-box__message p img{
  width: 100%
}
</style>
