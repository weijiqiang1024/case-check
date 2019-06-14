/*
 * @Title: $undefined
 * @Description: Todo
 * @Author: weijq@cychina.cn (韦继强)
 * @Date: 2019-06-09 20:57:52
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-14 11:15:54
 * @Version:V1.0
 * Copyright: Copyright (c) 2017'
 */

import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import _ from "lodash";
import { RouteView, BasicLayout } from "@/layouts";
import { notification } from "ant-design-vue";
import { checkAuth, loginCheck } from "@/utils/auth";
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
      meta: { title: "登录页", auth: ['admin', 'user'] },
      component: () =>
        import(/* webpackChunkName: "user" */ "@/views/user/Login")
    },
    {
      path: "/",
      meta: { auth: ['admin', 'user'] },
      component: BasicLayout,
      children: [
        //dashboard
        {
          path: "/",
          redirect: "/login"
        },
        {
          path: "/dashboard",
          name: "dashboard",
          meta: { title: "仪表盘", icon: "dashboard", auth: ['admin', 'user'] },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/annlysis",
              name: "annlysis",
              meta: { title: "仪表盘页" },
              component: () => import(/* webpackChunkName: "dashboard" */ "@/views/Home")
            },
            {
              path: "/dashboard/form",
              name: "form",
              meta: { title: "表单页" },
              component: () => import(/* webpackChunkName: "dashboard" */ "@/views/About")
            }
          ]
        },
        {
          path: "/user",
          name: "user",
          meta: { title: "系统用户", icon: "setting", auth: ['admin'] },
          component: RouteView,
          children: [
            {
              path: "/user/users",
              name: "users",
              meta: { title: "用户管理" },
              component: () => import(/* webpackChunkName: "user" */ "@/views/user/Users")
            },
            {
              path: "/user/syscode",
              name: "syscode",
              meta: { title: "系统代码" },
              component: () => import(/* webpackChunkName: "user" */ "@/views/user/SysCode")
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
    },
    {
      path: "/403",
      hideInMenu: true,
      component: () => import(/* webpackChunkName: "fail" */ "@/views/403")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    NProgress.start();
  }
  //权限判断
  const record = _.findLast(to.matched, record => record.meta.auth);
  debugger;
  if (record && !checkAuth(record.meta.auth)) {
    if (!loginCheck() && to.path != "/login") {
      next({
        path: "/login"
      })
    } else if (to.path != "/403") {
      notification.error({
        message:'403',
        description:'无权限访问，请联系管理员'
      })
      next({
        path: "/403"
      })
    }
  }
  NProgress.done();

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
