/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-07 22:53:45 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-14 18:24:38
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import createLogger from "@/utils/logger"
import getters from './getters'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default new Vuex.Store({
    modules: {
        user
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
