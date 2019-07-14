<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="模块名称"></el-table-column>
        <el-table-column prop="menukind" label="栏目名称"></el-table-column>
        <el-table-column prop="filename" label="附件名称"></el-table-column>
        <el-table-column prop="big" label="附件大小"></el-table-column>
        <el-table-column prop="date" label="上传时间">
            <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
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
        tableData: [{
          id: 121,
          name: '内容模块',
          menukind: '前端',
          filename: '1.jpg',
          big: '245k',
          date: '2016-05-03',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 121,
          name: '内容模块',
          menukind: '前端',
          filename: '1.jpg',
          big: '245k',
          date: '2016-05-07',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },
    components: {
      headTop
    },
    methods: {
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
