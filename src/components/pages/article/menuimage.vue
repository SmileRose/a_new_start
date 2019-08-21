<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table ref="multipleTable" :data="items" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="aid" label="ID"></el-table-column>
        <el-table-column prop="module" label="模块名称"></el-table-column>
        <el-table-column prop="catid" label="栏目名称"></el-table-column>
        <el-table-column prop="filename" label="附件名称"></el-table-column>
        <el-table-column prop="filesize" label="附件大小" :formatter="kbformat"></el-table-column>
        <el-table-column prop="uploadtime" label="上传时间" :formatter="dateFormat">
        </el-table-column>
        <el-table-column prop="uploadip" label="上传ip"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handlePreview(scope.$index, scope.row)">预览</el-button>
            <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="deleteMuch()">批量删除</el-button>
      </div>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[30, 50, 80, 100]" :page-size="30" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import headTop from '../../common/headTop'
var moment = require("moment");
export default {
  data() {
    return {
      items: [],
      page: 1,
      pagesize: 30,
      multipleSelection: []
    }
  },
  components: {
    headTop
  },
  created: function() {
    this.getArt();
  },
  methods: {
    dateFormat(row, column) {
      var date = row['uploadtime'] * 1000;
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
    kbformat(row, column) {
      var filesize = row['filesize'];
      if (filesize == undefined) {
        return "";
      }
      if (filesize > 1048576) {
        return (filesize / 1048576).toFixed(2) + ' M';
      } else {
        return (filesize / 1024).toFixed(2) + ' kb';
      }
    },
    handleSizeChange(val) {
      this.pagesize = val;
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.page = val;
    },
    getArt() {
      let _param = {
        page: this.page,
        pagesize: this.pagesize
      }
      this.$axios.post('/api/menu_image', _param).then(res => {
        if (res.data.flag) {
          this.items = res.data.data;
        }
      })
    },
    handleEdit(index, rows){
      let aim = rows.aim;

    },
    handlePreview(index, rows) {
      console.log(rows)
      this.$alert('<img src="https://www.zhmzjl.com/uploadfile/' + rows.filepath + '" />', rows.filename, {
        dangerouslyUseHTMLString: true
      });
    },
    handleDelete(index, rows) {
      this.$confirm('确定删除，不后悔？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let _param = {
          aid: rows.aid
        }
        this.$axios.post('/api/menu_image_del', _param).then(res => {
          if (res.data.flag) {
            this.getArt();
          }
        })
      })
    },
    deleteMuch(rows) {
      this.$confirm('确定删除，不后悔？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let sel = this.$refs.multipleTable.selection;
        var _postid = [];
        for (let i = 0; i < sel.length; i++) {
          _postid.push(sel[i].aid);
        }
        let param = {
          aid: _postid.join(',')
        }
        this.$axios.post('/api/menu_image_del', param).then(res => {
          console.log(res)
          if (res.data.flag) {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getArt();
          }
        })
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>
<style lang="less">
@import '../../../style/mixin';
.table_container {
  margin: 20px;
  border: 1px solid #e1e1e1
}
.el-message-box {
  width: 600px
}
.el-message-box__message p img {
  width: 100%
}
</style>
