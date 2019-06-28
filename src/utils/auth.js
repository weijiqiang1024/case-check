/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-11 17:55:26 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-20 16:19:54
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */


 /**
  * @description
  * @export
  * @returns
  */
 export function getCurrentAuthority(){
     return ['admin'];
 }


 /**
  * @description
  * @export
  * @param {*} auth
  * @returns
  */
 export function checkAuth(auth){
    let current = getCurrentAuthority();
    return current.some(item => auth.includes(item));
 }

 export function loginCheck(){
     let current = getCurrentAuthority();
     return current && current[0] !== 'gust';
 }


