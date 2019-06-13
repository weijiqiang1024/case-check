/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-13 16:17:19 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-13 17:12:58
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */


import Vue from "vue";
import request from "@/utils/request";
import reqApi from "@/api/index";
import { ACCESS_TOKEN } from "@/store/mutationType";

// console.log(api,1111);

const state = {
  token: "",
  info: "",
  role: "",
  auth:[],    //系统权限
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_INFO: (state, info) => {
    state.info = info;
  },
  SET_AUTH: (state, auth=[]) => {
    state.auth.length = 0;
    state.auth = auth;
  },

}

const actions = {
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      request
        .post(reqApi.login, userInfo)
        .then(response => {
          const result = response.data && response.data.result;
          Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000);
          commit('SET_TOKEN', result.token);
          commit('SET_AUTH', result.auths);
          commit('SET_INFO', result);
          resolve();
        })
        .catch(error => {
          reject(error)
        });
    });
  }
}

const getters = {
  getUserInfo() {
    return state;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
