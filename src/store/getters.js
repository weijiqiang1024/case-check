/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-12 17:06:31 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-17 08:52:11
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

const getters = {
    userInfo: state => state.user.list, //用户信息
    orgInfo: state => state.user.list, //机构信息
}

export default getters;