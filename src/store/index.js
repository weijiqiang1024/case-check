/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-07 22:53:45 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-13 16:17:30
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from "@/utils/logger";
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    modules: {
        user
    },
    state: {
        token:""
    },
    // mutations: {
  
    // },
    // actions: {
  
    // },
    getters,
    strict: debug,
    plugins: debug ? [createLogger()] : []
  })
