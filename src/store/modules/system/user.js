/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-13 16:17:19 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-22 15:53:32
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */


// import Vue from "vue";
import request from "@/utils/request";
import reqApi from "@/api/index";
import { ACCESS_TOKEN } from "@/store/mutationType";

// console.log(api,1111);

const state = {
  token: "",
  info: {},
  role: "",
  auth: [],    //系统权限
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_INFO: (state, info = {}) => {
    state.info = info;
  },
  SET_AUTH: (state, auth = []) => {
    state.auth.length = 0;
    state.auth = auth;
  },

}

const actions = {
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      request
        .post(reqApi.login, userInfo)
        .then(res => {
          if (res) {
            let user_info = JSON.stringify(res.result);
            sessionStorage.setItem(ACCESS_TOKEN, res.result.token);
            sessionStorage.setItem('user_info', user_info);
            commit('SET_TOKEN', res.result.token);
            commit('SET_AUTH', res.result.auths);
            commit('SET_INFO', res.result);
          }
          resolve(res);
        }).catch(error => {
          reject(error)
        });

    });
  },
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      request
        .post(reqApi.logout)
        .then(res => {
          if (res) {
            sessionStorage.setItem(ACCESS_TOKEN, '')
            sessionStorage.setItem('user_info', '');
            commit('SET_TOKEN', "");
            commit('SET_AUTH', []);
            commit('SET_INFO', {});
          }
          resolve(res);
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
