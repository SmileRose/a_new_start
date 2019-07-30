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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">预览</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([items[1], items[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
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
          this.$axios.get('/api/menu_image').then(res => {
            if (res.data.flag) {
              this.items = res.data.data;
              // this.loading = false;
            }
          })
        },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
</style>
