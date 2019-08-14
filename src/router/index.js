import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import login from '@/components/login'
import menu from '@/components/common/menu'
import home from '@/components/pages/home'

import articlelist from '@/components/pages/article/articlelist'

import articleadd from '@/components/pages/article/articleadd'

import menuimage from '@/components/pages/article/menuimage'



import memuset from '@/components/pages/setting/memuset'

// import menuadd from '@/components/pages/menuadd'


// import website from '@/components/pages/website'


import more from '@/components/pages/minipro/more'
import comment from '@/components/pages/minipro/comment'


// import webcookieclear from '@/components/pages/webcookieclear'
// import webpwd from '@/components/pages/webpwd'


// import about from '@/components/pages/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
        path: '/menu',
        component: menu,
        name: '',
        children: [{
            path: '/home',
            component: home,
            name: 'home',
            meta: [],
        },
        {
            path: '/articlelist',
            component: articlelist,
            name:'articlelist',
            meta: ['内容管理', '文章列表'],
        },
        {
            path: '/articleadd',
            component: articleadd,
            name:'articleadd',
            meta: ['内容管理', '添加文章'],
        },

        {
            path: '/memuset',
            component: memuset,
            name:'memuset',
            meta: ['模块栏目', '栏目设置'],
        },

        {
            path: '/menuimage',
            component: menuimage,
            name:'menuimage',
            meta: ['模块栏目', '附件管理'],
        },

        {
            path: '/more',
            component: more,
            name:'more',
            meta: ['小程序管理', '打卡'],
        },

        {
            path: '/comment',
            component: comment,
            name:'comment',
            meta: ['小程序管理', '微信评论'],
        },



        // {
        //     path: '/menuadd',
        //     component: menuadd,
        //     meta: ['模块栏目', '添加栏目'],
        // },
        // {
        //     path: '/website',
        //     component: website,
        //     meta: ['设置', '站点管理'],
        // },{
        //     path: '/webcookieclear',
        //     component: webcookieclear,
        //     meta: ['设置', '缓存管理'],
        // },
        // {
        //     path: '/webpwd',
        //     component: webpwd,
        //     meta: ['设置', '修改密码'],
        // },
        // {
        //     path: '/about',
        //     component: about,
        //     meta: ['关于', '关于'],
        // }
        ]
    }]
})
