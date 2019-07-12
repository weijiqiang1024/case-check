/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-29 14:55:37 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-07-10 15:31:22
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

import store from '@/store/index';

/**
 * @description 判断变量是否是数组
 * @export
 * @param {*} o
 * @returns Boolean
 */
export function isArray(o) {
   return Object.prototype.toString.call(o) == '[object Array]';
}

/**
 * @description 根据code类型返回该类型下的所有code
 * @export
 * @param {*} type
 * @returns []
 */
export function getCodeByType(type) {
   const codeObj = store.state.syscode.sysCodeKeyName;
   if (!type) return;
   return codeObj[type] || [];
}

/**
 * @description 根据code返回该类型下的所有code name
 * @export
 * @param {*} type 代码类型
 * @param {*} code 代码code
 * @returns string
 */
export function getCodeName(type, code) {
   const codeObj = store.state.syscode.sysCodeKeyName;
   if (!type || !codeObj[type]) return '--';
   return codeObj[type][code] || '--';
}

/**
 * @description 根据orgId返回该org name
 * @export
 * @param {*} code 代码类型
 * @returns string
 */
export function getOrgName(code) {
   const orgObj = store.state.org.orgKeyValue;
   return orgObj[code] || '--';
}

export function dealDic(nextStatus) {
   const obj = {
      '1': {
         label: '事故确认时间',
         defineLabel: '是否处罚',
         fields: 'isPunish',
      },
      '2': {
         label: '处罚时间'
      },
      '3': {
         label: '是否检定',
         fields: 'isCheck',
         defineLabel: '委托时间',
         denyLabel: '事故确认时间',
         publishLabel: '是否处罚',
         publishFields: 'isPunish',
      },
      '4': {
         label: '鉴定结论时间',
         // fields: 'isPunish',
      },
      '5': {
         label: '鉴定结论时间',
         // fields: 'isPunish',
      },
      '6': {
         label: '送达时间',
      },
      '7': {
         label: '是否重新检定',
         fields: 'isRepeatCheck',
         defineLabel: '(重新)委托时间',
         denyLabel: '鉴定生效时间',
      },
      '8': {
         label: '(重新)鉴定结论时间',
         // fields: 'isPunish',
      },
      '9': {
         label: '(重新)鉴定结论时间',
         // fields: 'isPunish',
      },
      '10': {
         label: '(重新)送达时间',
         // fields: 'isPunish',
      },
      '11': {
         label: '鉴定生效时间',
      },
      '13': {
         label: '是否证据公开',
         fields: 'isEvidenceOpen',
         defineLabel: '证据确定时间'
      }
   }

   return obj[nextStatus];
}
