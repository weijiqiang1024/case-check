/* 
 * @Title: $undefined 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-12 15:52:53 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-12 15:54:25
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

const G = window.g;
//后台地址
let defaultUrl = 'http://192.168.10.150:9800';
//模板下载地址
// let approveBill_downLoad = "http://192.168.10.150:8000/muban/业务申请模板.xlsx";
export let config = {
	baseURL: G ? G.url || defaultUrl : defaultUrl,
	// transformRequest: [function (data) {
	//     // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
	//     data = Qs.stringify({});
	//     return data;
	// }],
	transformRequest: [
		function(data) {
			// Do whatever you want to transform the data
			let ret = '';
			for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
			}
			return ret;
		}
	],

	transformResponse: [
		function(data) {
			// 这里提前处理返回的数据
			return data;
		}
	],

	// 请求头信息
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded'
	},

	token: '',

	username: '',

	//parameter参数
	// params: {
	//     ID: 12345
	// },
	//mode : 'cors' ,
	//设置超时时间
	timeout: 10000,
	//返回数据类型
    responseType: 'json',
    
	imgServer: '192.168.10.192',
	//websoclect
	wsUrl: 'ws://' + global.location.host.split(':')[0] + ':8020',
	// wsUrl: 'ws://' + '192.168.10.139' + ':8020',

	//时间间隔
	timeStep: 300000,

	//业务申请模板 地址
	approveBill_downLoad :G ? G.approveBill_downLoad || approveBill_downLoad : approveBill_downLoad,
};
