/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-17 08:57:16 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-07-10 16:00:21
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

import _ from "lodash";
import request from "@/utils/request";
import reqApi from "@/api/index";
import { ORG_LIST, ORG_TREE } from "@/store/mutationType";

const state = {
    //机构列表
    list: {
        rows: [],
        total: 0
    },
    orgKeyValue: {},
    //机构树
    orgTree: [],
    //addOrg 临时数据
    addOrgObj: {},
    //editOrg 临时数据
    editOrgObj: {},
    //delIds临时数据
    delIds: ''


}

const mutations = {
    [ORG_LIST]: (state, orgs) => {
        state.list = orgs;
    },
    ORG_KEY_VALUE: (state, orgs) => {
        state.orgKeyValue = orgs;
    },
    [ORG_TREE]: (state, orgs) => {
        state.orgTree = orgs;
    },
    ADD_ORG: (state, orgInfo) => {
        state.addOrgObj = orgInfo;
    },
    EDIT_ORG: (state, orgInfo) => {
        state.editOrgObj = orgInfo;
    },
    DEL_ORG: (state, ids) => {
        state.delIds = ids;
    }
}

const actions = {
    getOrgList({ commit }, query) {
        return new Promise((resolve, reject) => {
            request
                .get(reqApi.orgList, query)
                .then(res => {
                    if (res) {
                        let result = res.result;
                        //列表数据处理
                        commit(ORG_LIST, result);
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(error)
                });
        });
    },
    getOrgTree({ commit }, listInfo) {
        return new Promise((resolve, reject) => {
            request
                .get(reqApi.orgTree, listInfo)
                .then(res => {
                    if (res) {
                        let result = res.result;
                        let Arr = [];
                        Arr.push(result);
                        let tempArr = _.cloneDeep(Arr);
                        getNodeAttr(tempArr);
                        commit(ORG_TREE, tempArr);
                        //org-key-value-dic
                        // commit('ORG_KEY_VALUE', obj.temp);
                        resolve(tempArr);
                    }
                })
                .catch(error => {
                    reject(error)
                });
        });
    },
    addOrg({ commit }, orgInfo) {
        return new Promise((resolve, reject) => {
            request
                .post(reqApi.addOrg, orgInfo)
                .then(res => {
                    if (res) {
                        commit('ADD_ORG', orgInfo);
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(error)
                });
        });
    },
    editOrg({ commit }, orgInfo) {
        return new Promise((resolve, reject) => {
            request
                .post(reqApi.editOrg, orgInfo)
                .then(res => {
                    if (res) {
                        commit('EDIT_ORG', orgInfo);
                    }
                    resolve(res);
                })
                .catch(error => {
                    reject(error)
                });
        });
    },
    delOrg({ commit }, ids) {
        return new Promise((resolve, reject) => {
            request
                .post(reqApi.delOrg, ids)
                .then(res => {
                    if (res) {
                        commit('DEL_ORG', ids);
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

function getNodeAttr(arr) {
    //遍历树节点添加key，title属性
    if (_.isArray(arr)) {
        arr.map(item => {
            item.key = (item && item.orgId) || "--";
            item.title = (item && item.orgName) || "--";
            item.value = (item && item.orgId) || "--";
            if (item.children && _.isArray(item.children)) {
                getNodeAttr(item.children);
            }
        });
    }
    return arr;
}

// function setOrgKeyValue(arr) {
//     if (!_.isArray(arr)) return {};
//     let o = {};
//     arr.map(item => {
//         o[item.orgId] = item.orgName || '--';
//     })
//     return o;
// }