<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table v-loading="loading" fullscreen="true" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" :data="items" stripe style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="阅读数">
                <span>{{ props.row.views }}</span>
              </el-form-item>
              <el-form-item label="喜欢数">
                <span>{{ props.row.thumbs_up }}</span>
              </el-form-item>
              <el-form-item label="评论数" >
                <span>{{ props.row.cnum }}</span>
              </el-form-item>
              <el-form-item label="更新时间" >
                <span :formatter="dateShow">{{ props.row.updatetime }}</span>
              </el-form-item>
              <el-form-item label="发布人">
                <span>{{ props.row.username }}</span>
              </el-form-item>
              <el-form-item label="头图">
                <span>{{ props.row.thumb }}</span>
              </el-form-item>
              <el-form-item label="url">
                <span>{{ props.row.url }}</span>
              </el-form-item>
              <el-form-item label="描述">
                <span>{{ props.row.description }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="id" width="80"></el-table-column>
        <el-table-column prop="catid" label="catid" width="100"></el-table-column>
        <el-table-column prop="title" label="标题">
          <!--  <template slot-scope="scope">
            <a :to="{ path: scope.row.url }">{{ scope.row.title }}</a>
          </template>
 -->
        </el-table-column>
        <el-table-column prop="cnum" label="评论数"></el-table-column>
        <el-table-column prop="keywords" label="关键字"></el-table-column>
        <el-table-column prop="inputtime" label="发布时间" :formatter="dateFormat"></el-table-column>
        <el-table-column label="操作">

          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="mini" type="warning" @click="goLink(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1" :page-sizes="[20, 40, 50]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="400"></el-pagination>
    </div>
  </div>
</template>
<script>
import headTop from '../../common/headTop'
var moment = require('moment')
export default {
  data () {
    return {
      loading: false,
      items: [],
      currentPage1: 1,
      pagesize: 20
    }
  },
  created () {
    this.getArt()
  },
  computed: {},
  components: {
    headTop
  },
  methods: {
    dateShow (row, column) {
      console.log(row,column)
      var date = row['inputtime'] * 1000
      if (typeof (date) === 'undefined') {
        return '';
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },

    dateFormat (row, column) {
      var date = row['inputtime'] * 1000
      if (typeof (date) === 'undefined') {
        return '';
      }
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.getArt()
    },
    handleCurrentChange (val) {
      this.currentPage1 = val
      this.getArt()
    },
    getArt () {
      let param = {
        pagesize: this.pagesize,
        page: this.currentPage1
      }
      this.$axios.post('/api/art_select', param).then(res => {
        if (res.data.flag) {
          this.items = res.data.data
          this.loading = false
        }
      })
    },
    handleDelete (index, row) {
      console.log('删除')
      this.$confirm('删除后无法恢复,确认删除文章? ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var param = {
          id: row.id
        }
        this.$axios.post('/api/del_article', param).then(res => {
          if (res.data.flag) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getArt()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleEdit (index, row) {
      this.$router.push({
        path: '/articleadd',
        query: {
          id: row.id
        }
      })
    },
    goLink(index, row){

      window.open(row.url)

    },

  }
}
</script>
<style lang="less">
@import '../../../style/mixin';
.table_container {
  margin: 20px;
  border: 1px solid #e1e1e1
}
.table_container .el-form--inline .el-form-item__label {
  width: 90px;
  color: #99a9bf;
}
.table_container .el-form--inline .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.table_container .el-form-item__content {
  color: #999
}
</style>
