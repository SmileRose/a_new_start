<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">

      <el-table stripe :data="tableData" style="width: 100%">
        <el-table-column label="排序" prop="id" width="60"></el-table-column>
        <el-table-column label="catid" prop="catid"></el-table-column>
        <el-table-column label="栏目名称" prop="menuname"></el-table-column>
        <el-table-column label="数据量" prop="num"></el-table-column>
        <el-table-column label="显示" prop="shows"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
          	<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">添加子栏目</el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">添加栏目</el-button>
      <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">添加单页</el-button>
    </div>
  </div>
</template>
<script>
import headTop from '../common/headTop'
export default {
  data() {
      return {
        tableData: [{
          id: '11',
          catid: '11',
          menuname: '首页',
          num:121,
          shows: 'false'
        }, {
          id: '11',
          catid: '11',
          menuname: '首页',
          num:121,
          shows: 'false'
        }, {
          id: '11',
          catid: '11',
          menuname: '首页',
          num:121,
          shows: 'false'
        }, {
          id: '11',
          catid: '11',
          menuname: '首页',
          num:121,
          shows: 'false'
        }]
      }
    },
    created() {},
    computed: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    components: {
      headTop,
    },
    methods: {},
}
</script>
<style lang="less">
@import '../../style/mixin';
.table_container {
  margin: 20px;
  border: 1px solid #e1e1e1
}
</style>
