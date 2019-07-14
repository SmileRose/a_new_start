import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import login from '@/components/login'
import menu from '@/components/common/menu'

import home from '@/components/pages/home'
import articlelist from '@/components/pages/articlelist'
import articleadd from '@/components/pages/articleadd'


import memuset from '@/components/pages/memuset'

// import menuadd from '@/components/pages/menuadd'

import menuimage from '@/components/pages/menuimage'
// import website from '@/components/pages/website'



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
            meta: [],
        },
        {
            path: '/articlelist',
            component: articlelist,
            meta: ['内容管理', '文章列表'],
        },
        {
            path: '/articleadd',
            component: articleadd,
            meta: ['内容管理', '添加文章'],
        },
        {
            path: '/memuset',
            component: memuset,
            meta: ['模块栏目', '栏目设置'],
        },

        {
            path: '/menuimage',
            component: menuimage,
            meta: ['模块栏目', '附件管理'],
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
