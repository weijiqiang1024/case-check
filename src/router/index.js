/*
 * @Title: $路由信息
 * @Description: Todo
 * @Author: weijq@cychina.cn (韦继强)
 * @Date: 2019-06-09 20:57:52
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-07-11 14:57:22
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
      meta: { title: "登录页", auth: ['login'] },
      component: () =>
        import(/* webpackChunkName: "user" */ "@/views/Login")
    },
    {
      path: "/",
      meta: { auth: ['login'] },
      component: BasicLayout,
      children: [
        //dashboard
        {
          path: "/",
          meta: { title: "登录页", auth: ['login'] },
          redirect: "/login"
        },
        {
          path: "/dashboard",
          name: "home",
          meta: { title: "工作台", icon: "dashboard", auth: ['home'] },
          component: { render: h => h("router-view") },
          children: [
            {
              path: "/dashboard/annlysis",
              name: "annlysis",
              meta: { title: "工作台", auth: ['home'] },
              component: () => import(/* webpackChunkName: "dashboard" */ "@/views/home/index")
            }
          ]
        },
        {
          path: "/case",
          name: "case",
          meta: { title: "案件管理", icon: "file-protect", auth: ['casemanage'] },
          component: RouteView,
          children: [
            {
              path: "/case/casemanage",
              name: "casemanage",
              meta: { title: "案件信息", auth: ['casemanage'] },
              component: () => import(/* webpackChunkName: "case" */ "@/views/case/casemanage")
            }
          ]
        },
        {
          path: "/user",
          name: "user",
          meta: { title: "系统用户", icon: "setting", auth: ['users'] },
          component: RouteView,
          children: [
            {
              path: "/user/users",
              name: "users",
              meta: { title: "用户管理", auth: ['users'] },
              component: () => import(/* webpackChunkName: "system" */ "@/views/system/user")
            },
            {
              path: "/user/orgs",
              name: "orgs",
              meta: { title: "组织机构", auth: ['orgs'] },
              component: () => import(/* webpackChunkName: "system" */ "@/views/system/org")
            },
            {
              path: "/user/roles",
              name: "roles",
              meta: { title: "角色权限", keepAlive: true, auth: ['roles'] },
              component: () => import(/* webpackChunkName: "system" */ "@/views/system/role")
            },
            {
              path: "/user/syscode",
              name: "syscode",
              meta: { title: "系统代码", auth: ['syscode'] },
              component: () => import(/* webpackChunkName: "system" */ "@/views/system/syscode/index")
            },
            {
              path: "/user/codetype",
              name: "codetype",
              meta: { title: "系统代码类型", auth: ['codetype'] },
              component: () => import(/* webpackChunkName: "system" */ "@/views/system/codetype/index")
            },
            {
              path: "/user/syslog",
              name: "syslog",
              meta: { title: "操作日志", auth: ['syslog'] },
              component: () => import(/* webpackChunkName: "system" */ "@/views/system/log/index")
            },
            {
              path: "/user/festival",
              name: "festival",
              meta: { title: "节假日", auth: ['festival'] },
              component: () => import(/* webpackChunkName: "system" */ "@/views/system/festival/index")
            },
            {
              path: "/user/flowconfig",
              name: "flowconfig",
              meta: { title: "流程配置", auth: ['flowconfig'] },
              component: () => import(/* webpackChunkName: "system" */ "@/views/system/flowconfig/index")
            },
            {
              path: "/user/checkrule",
              name: "checkrule",
              meta: { title: "积分规则", auth: ['checkrule'] },
              component: () => import(/* webpackChunkName: "system" */ "@/views/system/checkrule/index")
            }
          ]
        }
      ]
    },
    {
      path: "/404",
      hideInMenu: true,
      meta: { title: "404", auth: ['login'] },
      component: () => import(/* webpackChunkName: "fail" */ "@/views/404")
    },
    {
      path: "/403",
      hideInMenu: true,
      meta: { title: "403", auth: ['login'] },
      component: () => import(/* webpackChunkName: "fail" */ "@/views/403")
    },
    {
      path: "*",
      redirect: "/404",
      meta: { title: "404", auth: ['login'] },
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
