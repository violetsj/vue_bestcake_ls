import Vue from 'vue'
import Router from 'vue-router'
import api from '@/core/api/index'
// console.log(global.getParam())


Vue.use(Router)

const router = new Router({
  routes: [{
    path: '/',
    name: '/',
    component: resolve => require(['@/components/home'], resolve),
    redirect: "index",
    children: [
      //首页
      {
        path: 'index',
        name: 'index',
        meta:{
          keepAlive:false,
        },
        component: resolve => require(['@/components/main/index'], resolve)
      },
      // 分类
      {
        path: 'class',
        name: 'class',
        meta:{
          keepAlive:false,
        },
        component: resolve => require(['@/components/main/class'], resolve),
      },
      //购物车
      {
        path: 'cart',
        name: 'cart',
        component: resolve => require(['@/components/main/cart'], resolve),
      },
      // 用户
      {
        path: 'user',
        name: 'user',
        component: resolve => require(['@/components/main/user'], resolve),
      },
      //详情页
      {
        path: 'show',
        name: 'show',
        component: resolve => require(['@/components/main/show'], resolve),
      },
      {
        path: 'edit',
        name: 'edit',
        component: resolve => require(['@/components/main/edit'], resolve),
      }
    ]
  }]
})



export default router;
