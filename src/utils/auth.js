/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-11 17:55:26 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-11 18:32:02
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

 export function getCurrentAuthority(){
     return ['admin'];
 }

 export function checkAuth(auth){
    let current = getCurrentAuthority();
    return current.some(item => auth.includes(item));
 }

 export function loginCheck(){
     
 }
