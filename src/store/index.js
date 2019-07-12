/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-07 22:53:45 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-07-02 19:51:03
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import createLogger from "@/utils/logger"
import getters from './getters'
import user from './modules/system/user'
import org from './modules/system/org'
import syscode from './modules/system/syscode'
import socket from './modules/socket'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
//数据持久化
const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage
})

export default new Vuex.Store({
    modules: {
        user,
        org,
        syscode,
        socket
    },
    state: {
        token: ""
    },
    mutations: {

    },
    actions: {

    },
    getters,
    strict: debug,
    plugins: debug ? [createLogger(), vuexLocal.plugin] : [vuexLocal.plugin],

})
