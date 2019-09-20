<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100vh;">
      <el-col :lg="3" :md="6" :sm="4" :xs="2" style="min-height: 100%; background-color: #324057;">
        <el-menu

          :default-active="defaultActive"
          collapse-transition
          style="min-height: 100%;"
          theme="dark"
          router
          background-color="#324057"
          text-color="#fff"
          active-text-color="#ffd04b"
          default-openeds="[2,3,4,5,6]"
        >
          <el-menu-item index="home">
            <i class="el-icon-menu"></i>首页
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-document"></i>内容管理
            </template>
            <el-menu-item index="articlelist">文章列表</el-menu-item>
            <el-menu-item index="articleadd">添加文章</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-star-on"></i>模块栏目
            </template>
            <el-menu-item index="memuset">栏目设置</el-menu-item>
            <el-menu-item index="menuimage">附件管理</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-bell"></i>小程序内容
            </template>
            <el-menu-item index="add_more">添加打卡</el-menu-item>
            <el-menu-item index="more">打卡</el-menu-item>
            <el-menu-item index="comment">评论</el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-plus"></i>设置
            </template>
            <el-menu-item index="seoset">站点管理</el-menu-item>
            <el-menu-item index="webpwd">修改密码</el-menu-item>
             <el-menu-item index="cookie_clear">缓存管理</el-menu-item>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-warning"></i>关于
            </template>
            <el-menu-item index="about">关于</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :lg="21" :md="18" :sm="20" :xs="22" :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
        <common-footer></common-footer>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import commonFooter from './footer'
export default {
  data () {
    return {
      activeIndex: 'home'

    }
  },
  computed: {
    defaultActive: function () {
      return this.$route.path.replace('/', '')
    }
  },
  components: {
    commonFooter
  }
}
</script>
<style>
.el-submenu .el-menu-item {
  padding: 0 0 0 70px !important;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  color: #999 !important;
}
.el-menu-item.is-active {
  color: #ffd04b !important;
}
</style>
