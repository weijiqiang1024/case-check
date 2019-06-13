// import Vue from "vue";
import request from "@/utils/request";
import api from "@/api";
// import { ACCESS_TOKEN } from "@/store/m_type";


  const state = {
    token: "",
    info: "",
    role: ""
  },

  const mutations = {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_INFO: (state, info) => {
      state.info = info;
    }
  },

  const actions = {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        request
          .post(api.login, userInfo)
          .then(response => {
            const result = response.result;
            // Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000);
            commit("SET_TOKEN", result.token);
            resolve();
          })
          .catch(error=>{
              reject(error)
          });
      });
    }
  }

export default {
    namespace:true,
    state,
    mutations,
    actions
}
