<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table stripe :data="items" style="width: 100%">
        <el-table-column label="排序" prop="catid" width="60"></el-table-column>
        <el-table-column label="catid" prop="catid"></el-table-column>
        <el-table-column label="catname" prop="catname"></el-table-column>
        <el-table-column label="module" prop="module"></el-table-column>
        <el-table-column label="parentid" prop="parentid"></el-table-column>
        <el-table-column label="parentdir" prop="parentdir"></el-table-column>
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
        items: []
      }
    },
    created() {
      this.getData();
    },
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
    methods: {
      getData(){
        this.$axios.post('/api/category').then(res=>{
           if (res.data.flag) {
            let _data = res.data.data;
            this.items = _data;
            var treeData = [];

            // for(let i = 0; i< _data.length; i++){
            //   let ii = _data[i];

            //   var _json = {

            //   }


            //   if(ii.parentid!=0){

            //     treeData[ii.parentid]['children'].push(ii)

            //   }else{
            //     ii.children= [];

            //     treeData.push = ii;

            //   }
            // }

            // console.log(treeData)
           }
        })
      }
    },
}
</script>
<style lang="less">
@import '../../style/mixin';
.table_container {
  margin: 20px;
  border: 1px solid #e1e1e1
}
</style>
