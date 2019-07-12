/* 
 * @Title: $权限组件
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-07-10 16:58:07 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-07-10 17:52:40
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

import { checkPagesAuth } from '@/utils/auth';

/**
 * Auth指令  在需要权限控制的组件上加 v-auth="[page,method]"  page 参考router中对应页面的meta.auth参数值
 * 
 * <a-button v-auth="['users','add']">添加</a-button>
 * 
 */
function install(Vue, options = {}) {
    Vue.directive(options.name || 'auth', {
        inserted(el, binding) {
            if (!checkPagesAuth(binding.value)) {
                el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none');
            }
        }
    })
}

export default { install }