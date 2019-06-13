/* 
 * @Title: webpack手动配置信息
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-05 20:19:14 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-12 15:52:20
 * @Version:V1.0 
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
        // proxy: 'http://localhost:4000',
        open:true,//配置自动打开浏览器
        hotOnly:true,//热加载
    }
}