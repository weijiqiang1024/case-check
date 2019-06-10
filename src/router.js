/*
 * @Title: $undefined
 * @Description: Todo
 * @Author: weijq@cychina.cn (韦继强)
 * @Date: 2019-06-09 20:57:52
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-10 17:24:04
 * @Version:V1.0
 * Copyright: Copyright (c) 2017'
 */

import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import { RouteView, BasicLayout } from "@/layouts";
// import Home from './views/Home.vue'

Vue.use(Router);
Vue.use(NProgress);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      hideInMenu:true,
      meta: { title: "登录页",auth: [] },
      component: () =>
        import(/* webpackChunkName: "user" */ "@/views/user/Login")
    },
    {
      path: "/home",
      name: "home",
      meta: { title: "首页", icon:"home",auth: [] },
      component: BasicLayout,
      children: [
        {
          path: "/home",
          name: "dashboard",
          meta: { title: "仪表盘页", auth: [] },
          component: ()=> import(/* webpackChunkName: "dashboard" */ "@/views/Home"),
        },
        {
          path: "/home/user",
          name: "user",
          meta: { title: "系统用户",icon:"email", auth: [] },
          component: RouteView,
          children: [
            {
              path: "/home/user/users",
              name: "users",
              meta: { title: "用户管理", auth: [" "] },
              component: () => import(/* webpackChunkName: "user" */ "@/views/user/Users")
            }
          ]
        },
      ]
    },
    {
      path: '*', redirect: '/404', hideInMenu: true
    },
    {
      path: '/404',
      hideInMenu:true,
      component: () => import(/* webpackChunkName: "fail" */ '@/views/404')
    }
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
});

router.beforeEach((to,from,next)=>{
  if(to.path != from.path){
    NProgress.start()
  }
  next()
})

router.afterEach(()=>{
  NProgress.done()
})
export default router;
