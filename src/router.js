/*
 * @Title: $undefined
 * @Description: Todo
 * @Author: weijq@cychina.cn (韦继强)
 * @Date: 2019-06-09 20:57:52
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-10 23:41:59
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
      path: "/login",
      name: "login",
      hideInMenu: true,
      meta: { title: "登录页", auth: [] },
      component: () =>
        import(/* webpackChunkName: "user" */ "@/views/user/Login")
    },
    {
      path: "/",
      component: BasicLayout,
      children: [
        //dashboard
        {
          path: "/",
          redirect: "/dashboard/annlysis"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: { title: "仪表盘", icon: "dashboard", auth: [] },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/annlysis",
              name: "annlysis",
              meta: { title: "仪表盘页", auth: [] },
              component: () =>
                import(/* webpackChunkName: "dashboard" */ "@/views/Home")
            }
          ]
        },
        {
          path: "/user",
          name: "user",
          meta: { title: "系统用户", icon: "dashboard", auth: [] },
          component: RouteView,
          children: [
            {
              path: "/user/users",
              name: "users",
              meta: { title: "用户管理", auth: [" "] },
              component: () =>
                import(/* webpackChunkName: "user" */ "@/views/user/Users")
            }
          ]
        }
      ]
    },
    {
      path: "*",
      redirect: "/404",
      hideInMenu: true
    },
    {
      path: "/404",
      hideInMenu: true,
      component: () => import(/* webpackChunkName: "fail" */ "@/views/404")
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

router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
