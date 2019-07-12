/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-11 17:55:26 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-07-10 17:43:23
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

/**
 * @description
 * @export
 * @returns
 */
export function getCurrentAuthority() {

    let pageAuth = [];
    let userInfo = sessionStorage.getItem('user_info');
    // userInfo && (pageAuth = pluck(JSON.parse(userInfo).auths), 'authCode');
    if (userInfo) {
        JSON.parse(userInfo).auths.forEach(e => {
            pageAuth.push(e.authCode)
        });
    }
    pageAuth.push('login');
    return pageAuth;
}

/**
 * @description
 * @export
 * @param {*} auth
 * @returns
 */
export function checkAuth(auth) {
    let current = getCurrentAuthority();
    return current.some(item => auth.includes(item));
}

/**
 * @description 页面具体功能权限
 * @export
 * @param {*} auth [pagecode,authcode]
 * @returns
 */
export function checkPagesAuth(auth = []) {
    if (auth.length != 2) return false;
    let userInfo = sessionStorage.getItem('user_info');
    if (!userInfo) return false;
    let pagesAuth = [];
    JSON.parse(userInfo).auths.forEach(e => {
        if (e.authCode == auth[0]) {
            pagesAuth = e.operateCodes.split(',');
        }
    });
    if (pagesAuth.length == 0) return false;
    return pagesAuth.some(item => auth[1].includes(item));
}

export function loginCheck() {
    let current = getCurrentAuthority();
    return current && current[0] !== 'gust';
}




