/* 
 * @Title: websocket 接收信息 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-07-02 08:57:16 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-07-03 11:19:16
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

// import _ from "lodash";
// import request from "@/utils/request";
// import reqApi from "@/api/index";
import moment from 'moment'


const state = {
    //到期提醒标识
    matureMessage: false,
    //页面处理类型消息通知
    dealMessage: false,
    //单案件超期到期提醒
    singelCaseMassage: false,
    //matureObj
    matureObj: {
        chaoqi: 0,
        daoqi: 0
    },
    //推送时间 matureObj 用
    time: '',


}

const mutations = {
    MATURE_MSG: (state, msg) => {
        state.matureMessage = !state.matureMessage;
        state.matureObj = Object.assign(state.matureObj, msg);
    },
    DEAL_MSG: (state) => {
        state.dealMessage = !state.dealMessage;
    },
    SIN_CASE_MSG: (state, msg) => {
        state.delIds = msg;
    },
    MATURE_MSG_TIME: (state, time) => {
        state.time = time;
    }
}

const actions = {
    setMatureMessage({ commit }, info) {
        commit('MATURE_MSG', info);
        commit('MATURE_MSG_TIME', moment().format('YYYY-MM-DD HH:mm:ss'));
    },
    setDealMessage({ commit }) {
        commit('DEAL_MSG')
    },
    // setSingelCaseMassage({ commit }, orgInfo) {

    // },


}

const getters = {
    list: state => {
        return state.list;
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
