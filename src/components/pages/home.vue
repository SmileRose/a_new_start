<template>
  <div class="Rose-Page">
    <head-top></head-top>
    <div class="Rose-content">
      <el-row :gutter="20">
        <el-col :lg="6" :md="6" :sm="8" :xs="12">
          <el-alert title="近7日新增评论" type="success" description="1256" show-icon>
          </el-alert>
        </el-col>
        <el-col :lg="6" :md="6" :sm="8" :xs="12">
          <el-alert title="文章数量" type="info" description="168" show-icon>
          </el-alert>
        </el-col>
        <el-col :lg="6" :md="6" :sm="8" :xs="12">
          <el-alert title="上次登录" type="warning" description="192.168.1.1， 四川.成都" show-icon>
          </el-alert>
        </el-col>
        <el-col :lg="6" :md="6" :sm="8" :xs="12">
          <el-alert title="小程序访问人数" type="error" description="15862" show-icon>
          </el-alert>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import headTop from '../common/headTop'
export default {
  name: 'home',
  data () {
    return {
      // msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    headTop
  }
}
</script>
<style scoped>
.Rose-Page{
  min-height: calc(100% - 50px);
}
.Rose-content{
  margin:0 10px
}

</style>
