import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import login from '@/components/login'
import menu from '@/components/common/menu'
import home from '@/components/pages/home'

import articlelist from '@/components/pages/article/articlelist'
import articleadd from '@/components/pages/article/articleadd'

import menuimage from '@/components/pages/setting/menuimage'
import memuset from '@/components/pages/setting/memuset'

import more from '@/components/pages/minipro/more'
import comment from '@/components/pages/minipro/comment'
import addMore from '@/components/pages/minipro/add_more'

import cookieClear from '@/components/pages/website/cookieclear'
import webpwd from '@/components/pages/website/webpwd'
import seoset from '@/components/pages/website/seoset'

import about from '@/components/pages/user/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    }, {
      path: '/menu',
      component: menu,
      name: '',
      children: [{
        path: '/home',
        component: home,
        name: 'home',
        meta: []
      },
      {
        path: '/articlelist',
        component: articlelist,
        name: 'articlelist',
        meta: ['内容管理', '文章列表']
      },
      {
        path: '/articleadd',
        component: articleadd,
        name: 'articleadd',
        meta: ['内容管理', '添加文章']
      },

      {
        path: '/memuset',
        component: memuset,
        name: 'memuset',
        meta: ['模块栏目', '栏目设置']
      },

      {
        path: '/menuimage',
        component: menuimage,
        name: 'menuimage',
        meta: ['模块栏目', '附件管理']
      },

      {
        path: '/more',
        component: more,
        name: 'more',
        meta: ['小程序管理', '打卡']
      },

      {
        path: '/comment',
        component: comment,
        name: 'comment',
        meta: ['小程序管理', '评论']
      },
      {
        path: '/add_more',
        component: addMore,
        name: 'addMore',
        meta: ['小程序管理', '添加打卡']
      },

      {
        path: '/cookie_clear',
        component: cookieClear,
        meta: ['设置', '缓存清理']
      },
      {
        path: '/seoset',
        component: seoset,
        meta: ['设置', '站点管理']
      },
      {
        path: '/webpwd',
        component: webpwd,
        meta: ['设置', '修改密码']
      },
        // {
        //     path: '/webpwd',
        //     component: webpwd,
        //     meta: ['设置', '修改密码'],
        // },
      {
        path: '/about',
        component: about,
        meta: ['关于', '关于']
      }
      ]
    }]
})
