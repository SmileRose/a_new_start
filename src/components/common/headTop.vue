<template>
  <div class="head-top">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/menu' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index" :to="{ path: $route.path }">
      {{ item }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar icon="el-icon-user-solid"></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-menu>个人中心</el-dropdown-menu>
        <el-dropdown-item>退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods:{
  }
}
</script>
<style lang="less" scope>

.el-dropdown{
  float:right
}
.head-top{
  padding: 24px;
  background:#eff2f7;
  margin-bottom:10px
}
</style>
