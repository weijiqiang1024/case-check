/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-12 16:34:49 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-07-11 09:53:28
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

import axios from 'axios';
import { message } from 'ant-design-vue'
import { config } from "./config";
import router from "@/router";
// 默认false 会导致后台接收到的同一用户的不同请求sessionid都不同,需要改为true
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = sessionStorage.getItem("Access-Token");
        token && (config.headers.token = token);
        // if(config.method == "post"){//序列化
        //     config.data = qs.stringify(config.data);
        // }
        let user_info=sessionStorage.getItem("user_info");
        if(user_info){
            let currentUser=JSON.parse(user_info);
            config.params.currentOrgId=currentUser.orgId;//机构ID
            config.params.currentOrgPrivilegeCode=currentUser.orgPrivilegeCode;//机构权限
            config.params.currentUsername=currentUser.username;//用户名
            config.params.currentUserType=currentUser.userType;//用户类型,1:领导,2:警员
        }
        return config;
    },
    error => {
        return Promise.error(error);
    });
//请求返回拦截，把数据返回到页面之前做些什么...
axios.interceptors.response.use((response) => {
    //特殊错误处理，状态为10时为登录超时
    if (!response.data.status) {
        if (response.data.type == 1) {
            router.push('/login');
        }
        message.error(response.data.msg);
        //请求成功
    } else if (response.data.status) {
        //将我们请求到的信息返回页面中请求的逻辑
        return response;
    }
}, function (error) {
    const { response: { status } } = error;
    message.error('请求失败' + ' ' + status);
    return Promise.reject(error);
});

const username = localStorage.getItem(username);

const request = {
    post: (url, params = {}) => {
        return axios.post(url, params, config)
            .then(res => {
                return res && res.data;
            })
    },

    get: (url, param = {}) => {
        return axios.get(config.baseURL + url, { params: { ...param } })
            .then(res => {
                return res && res.data;
            })
    }
}

export default request;
