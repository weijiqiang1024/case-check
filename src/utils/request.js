/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-12 16:34:49 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-24 17:55:38
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

import axios from 'axios';
import { message } from 'ant-design-vue'
import { config } from "./config";

axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = sessionStorage.getItem("Access-Token");
        token && (config.headers.token = token);
        // if(config.method == "post"){//序列化
        //     config.data = qs.stringify(config.data);
        // }
        return config;
    },
    error => {
        return Promise.error(error);
    });
//请求返回拦截，把数据返回到页面之前做些什么...
axios.interceptors.response.use((response) => {
    //特殊错误处理，状态为10时为登录超时
    if (!response.data.status) {
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
                // message.success(res.data.msg);
                return res.data;
            })
    },

    get: (url, param = {}) => {
        return axios.get(config.baseURL + url, { params: { ...param } })
            .then(res => {
                // message.success(res.data.msg);
                return res.data;
            })
    }
}

export default request;
