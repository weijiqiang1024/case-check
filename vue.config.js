/* 
 * @Title: webpack手动配置信息
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-05 20:19:14 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-20 10:31:03
 * @Version:V1.0 
 * Copyright: Copyright (c) 2019' 
 */

module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            },
            sass: {
                data: `
                    @import "@/assets/mixin.scss";
                    `
            }
        }
    },
    devServer: {
        // publicPath: "/",
        // contentBase: "/",
        // proxy: {
        //     '/CaseManage':{
        //         target:'http://192.168.10.116:8080/CaseManage',//代理无效
        //         changeOrigin:true
        //     },

        // },
        port: 8000,
        // open:true,//配置自动打开浏览器
        hot: true,//热加载
        inline: true,
    }
}