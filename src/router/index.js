/*
 * @Title: $路由信息
 * @Description: Todo
 * @Author: weijq@cychina.cn (韦继强)
 * @Date: 2019-06-09 20:57:52
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-28 11:10:03
 * @Version:V1.0
 * Copyright: Copyright (c) 2017'
 */

import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
import _ from "lodash";
import { RouteView, BasicLayout } from "@/layouts";
import { message } from "ant-design-vue";
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
        import(/* webpackChunkName: "user" */ "@/views/Login")
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
          meta: { title: "工作台", icon: "dashboard", auth: ['admin', 'user'] },
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
          path: "/case",
          name: "case",
          meta: { title: "案件管理", icon: "file-protect", auth: ['admin'] },
          component: RouteView,
          children: [
            {
              path: "/case/casemanage",
              name: "casemanage",
              meta: { title: "案件信息" },
              component: () => import(/* webpackChunkName: "case" */ "@/views/case/casemanage")
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
              component: () => import(/* webpackChunkName: "system" */ "@/views/system/user")
            },
            {
              path: "/user/orgs",
              name: "orgs",
              meta: { title: "组织机构" },
              component: () => import(/* webpackChunkName: "system" */ "@/views/system/org")
            },
            {
              path: "/user/roles",
              name: "roles",
              meta: { title: "角色权限", keepAlive: true },
              component: () => import(/* webpackChunkName: "system" */ "@/views/system/role")
            },
            {
              path: "/user/syscode",
              name: "syscode",
              meta: { title: "系统代码" },
              component: () => import(/* webpackChunkName: "system" */ "@/views/system/syscode/index")
            },
            {
              path: "/user/codetype",
              name: "codetype",
              meta: { title: "系统代码类型" },
              component: () => import(/* webpackChunkName: "system" */ "@/views/system/codetype/index")
            }
          ]
        }
      ]
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
    },
    {
      path: "*",
      redirect: "/404",
      hideInMenu: true
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.path != from.path) {
    NProgress.start();
  }
  //权限判断
  const record = _.findLast(to.matched, record => record.meta.auth);

  if (record && !checkAuth(record.meta.auth)) {
    if (!loginCheck() && to.path != "/login") {
      next({
        path: "/login"
      })
    } else if (to.path != "/403") {
      message.error('403 无权限访问，请联系管理员')
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
