<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table v-loading="loading" fullscreen="true" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)" :data="items" stripe style="width: 100%">
        <el-table-column type="selection">
        </el-table-column>
        <el-table-column fixed prop="id" label="id">
        </el-table-column>
        <el-table-column prop="catid" label="catid">
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="readnum" label="评论数">
        </el-table-column>
        <el-table-column prop="cnum" label="阅读量">
        </el-table-column>
        <el-table-column prop="keywords" label="关键字">
        </el-table-column>
        <el-table-column prop="cnum" label="点击量">
        </el-table-column>
        <el-table-column prop="username" label="发布人">
        </el-table-column>
        <el-table-column prop="inputtime" label="发布时间">
        </el-table-column>
        <el-table-column prop="updatetime" label="更新时间">
        </el-table-column>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
    </div>
    <!-- <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div> -->
  </div>
</template>
<script>
import headTop from '../common/headTop'
export default {
  data() {
      return {
        loading: true,
        items: [],

      }
    },
    created() {
      this.getArt();
    },
    computed: {},
    components: {
      headTop,
    },
    methods: {
      getArt() {
        this.$axios.post('/api/users').then(res => {
          if (res.data.flag) {
            this.items = res.data.data;
            this.loading = false;
          }
        })
      },
      handleDelete(index, row) {
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
          });
        });
      },
      handleEdit(index, row) {
        this.$router.push({
          path: '/articleadd',
          query:{
            id: row.id
          }
        })

      }
    },
}
</script>
<style lang="less" scoped>
@import '../../style/mixin';
.table_container {
  margin: 20px;
  border: 1px solid #e1e1e1
}
</style>
