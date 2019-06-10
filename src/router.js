/*
 * @Title: $undefined
 * @Description: Todo
 * @Author: weijq@cychina.cn (韦继强)
 * @Date: 2019-06-09 20:57:52
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-09 22:58:45
 * @Version:V1.0
 * Copyright: Copyright (c) 2017'
 */

import Vue from "vue";
import Router from "vue-router";
import { RouteView } from "@/layouts";
// import Home from './views/Home.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      meta: { title: "登录页", auth: [] },
      component: () =>
        import(/* webpackChunkName: "user" */ "@/views/user/Login")
    },
    {
      path: "/home",
      name: "home",
      meta: { title: "工作台", auth: [] },
      component: () => import(/* webpackChunkName: "home" */ "@/views/Home")
    }
    ,
    {
      path: "/user",
      name: "user",
      meta: { title: "系统用户", auth: [] },
      component: RouteView,
      children: [
        {
          path: "/user/users",
          name: "users",
          meta: { title: "用户管理", auth: [" "] },
          component: () => import("@/views/user/Users")
        }
      ]
    },
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
