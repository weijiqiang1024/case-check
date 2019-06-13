/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-12 16:34:49 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-13 18:10:45
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

import axios from 'axios';
import { notification } from 'ant-design-vue'
import { config } from "./config";
import store from "@/store/index"

axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token;
        token && (config.headers.Authorization = token);

        // if(config.method == "post"){//序列化
        //     config.data = qs.stringify(config.data);
        // }
        return config;
    },
    error => {
        return Promise.error(error);
    })

const username = localStorage.getItem(username);

const request = {
    post: (url, params) => {
        // for (let key in params.reqParam) {
        //     params.reqParam[key] = params.reqParam[key] ? params.reqParam[key] : "";
        // }
        // let reqUrl = url + "?username=" + username;
        return axios.post(url, params, config)
            .then(res => {
                return res;
            })
            .catch(err => {
                const { response: { status, statusText } } = err;
                notification.error({
                    message: status,
                    description: statusText
                });
                return Promise.reject(err);
            })
    },

    get: (url, params) => {
        // for (let key in params.reqParam) {
        //     params.reqParam[key] = params.reqParam[key] ? params.reqParam[key] : "";
        // }
        let reqUrl = url + "?username=" + username;
        return axios.get(reqUrl, params.reqParam, config)
            .then(res => {
                return res;
            })
            .catch(err => {
                const { response: { status, statusText } } = err;
                notification.error({
                    message: status,
                    description: statusText
                });
                return Promise.reject(err);
            })
    }
}

export default request;
