/* 
 * @Title: webpack手动配置信息
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-05 20:19:14 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-05 20:19:38
 * @Version:V1.0 
 * Company: 合肥安慧软件有限公司 
 * Copyright: Copyright (c) 2019' 
 */

module.exports = {
    // css:{
    //     loaderOptions:{
    //         less:{
    //         javascriptEnabled:true
    //         }
    //     }
    // },
    devServer:{
        open:true,//配置自动打开浏览器
        hotOnly:true,//热加载
    }
}