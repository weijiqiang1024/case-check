/* 
 * @Title: $包含系统代码 和 代码类型两部分
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-17 08:57:16 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-29 15:59:23
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

import _ from 'lodash';
import request from "@/utils/request";
import reqApi from "@/api/index";
import { SYS_CODE_LIST, SYS_CODE_TYPE_LIST, SYS_CODE, SYS_CODE_KEY_NAME } from "@/store/mutationType";

const state = {
    //系统代码列表
    list: {},//code列表页面用
    sysCodeArray: {},//所有系统字典
    sysCodeKeyName: {},//系统代码code转name
    //系统代码类型列表
    typeList: {},
    //addCode 临时数据
    addCodeObj: {},
    //editCode 临时数据
    editCodeObj: {},
    //delIds临时数据
    delCodeIds: '',
    //addType 临时数据
    addTypeObj: {},
    //editType 临时数据
    editTypeObj: {},
    //delTypeIds临时数据
    delTypeIds: ''

}

const mutations = {
    [SYS_CODE_LIST]: (state, list) => {
        state.list = list;
    },
    [SYS_CODE]: (state, code) => {
        state.sysCode = code;
    },
    [SYS_CODE_KEY_NAME]: (state, code) => {
        state.sysCodeKeyName = code;
    },
    ADD_CODE: (state, info) => {
        state.addCodeObj = info;
    },
    EDIT_CODE: (state, info) => {
        state.editCodeObj = info;
    },
    DEL_CODE: (state, ids) => {
        state.delCodeIds = ids;
    },
    [SYS_CODE_TYPE_LIST]: (state, list) => {
        state.typeList = list;
    },
    ADD_TYPE: (state, info) => {
        state.addTypeObj = info;
    },
    EDIT_TYPE: (state, info) => {
        state.editTypeObj = info;
    },
    DEL_TYPE: (state, ids) => {
        state.delTypeIds = ids;
    }
}

const actions = {
    getList({ commit }, listInfo) {
        return new Promise((resolve, reject) => {
            request
                .get(reqApi.codeList, listInfo)
                .then(response => {
                    if (response) {
                        let res = response.result;
                        commit(SYS_CODE_LIST, res);
                    }
                    resolve(response);
                })
                .catch(error => {
                    reject(error)
                });
        });
    },
    getSysCodeDic({ commit }, listInfo = {}) {
        return new Promise((resolve, reject) => {
            request
                .get(reqApi.codeList, listInfo)
                .then(response => {
                    if (response) {
                        let res = response.result.rows;
                        commit(SYS_CODE, res);
                        let codeArr = _.cloneDeep(res);
                        let codeName = createObjByCode(codeArr);
                        commit(SYS_CODE_KEY_NAME, codeName);
                    }
                    resolve(response);
                })
                .catch(error => {
                    reject(error)
                });
        });
    },
    getTypeList({ commit }, listInfo) {
        return new Promise((resolve, reject) => {
            request
                .get(reqApi.codeTypeList, listInfo)
                .then(res => {
                    if (res) {
                        let result = res.result;
                        commit(SYS_CODE_TYPE_LIST, result);
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(error)
                });
        });
    },
    addData({ commit }, info) {
        return new Promise((resolve, reject) => {
            request
                .post(reqApi.addCode, info)
                .then(res => {
                    if (res) {
                        commit('ADD_CODE', info);
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(error)
                });
        });
    },
    editData({ commit }, info) {
        return new Promise((resolve, reject) => {
            request
                .post(reqApi.editCode, info)
                .then(res => {
                    if (res) {
                        commit('EDIT_CODE', info);
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(error)
                });
        });
    },
    delData({ commit }, ids) {
        return new Promise((resolve, reject) => {
            request
                .post(reqApi.delCode, ids)
                .then(res => {
                    if (res) {
                        commit('DEL_CODE', ids);
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(error)
                });
        });
    },
    addTypeData({ commit }, info) {
        return new Promise((resolve, reject) => {
            request
                .post(reqApi.addCode, info)
                .then(res => {
                    if (res) {
                        commit('ADD_TYPE', info);
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(error)
                });
        });
    },
    editTypeData({ commit }, info) {
        return new Promise((resolve, reject) => {
            request
                .post(reqApi.editCode, info)
                .then(res => {
                    if (res) {
                        commit('EDIT_TYPE', info);
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(error)
                });
        });
    },
    delTypeData({ commit }, ids) {
        return new Promise((resolve, reject) => {
            request
                .post(reqApi.delCode, ids)
                .then(res => {
                    if (res) {
                        commit('DEL_TYPE', ids);
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(error)
                });
        });
    }
}

const getters = {}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}

function createObjByCode(arr) {
    if (!_.isArray(arr)) return;
    let obj = new Object();
    arr.forEach(item => {
        if (item.codeTypeNo && item.codeNo && item.enableFlag == '1') {
            if (!obj.hasOwnProperty(item.codeTypeNo)) obj[item.codeTypeNo] = {};
            obj[item.codeTypeNo][item.codeNo] = item.codeName;
        }

    })

    return obj;
}
