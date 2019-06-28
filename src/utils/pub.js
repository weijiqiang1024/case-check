/* 
 * @Title: $常用函数
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-18 09:05:32 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-24 17:57:17
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

/**
 * @description 判断变量是否是数组
 * @export
 * @param {*} o
 * @returns Boolean
 */
export function isArray(o) {
   return Object.prototype.toString.call(o) == '[object Array]';
}
