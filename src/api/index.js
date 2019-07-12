/* 
 * @Title: $api
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-12 18:14:16 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-07-12 17:14:15
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

const api = {
    login: '/CaseManage/login/login',   //系统登录接口
    logout: '/CaseManage/login/logout', //登出系统

    //home
    countProcessCount:'/CaseManage/count/countProcessCount',//延时环节统计
    countCaseType:'/CaseManage/count/countCaseType',//案件类型统计
    countCurrentCaseTimeout:'/CaseManage/count/countCurrentCaseTimeout',//正常到期超期
    countDeductionSum:'/CaseManage/count/countDeductionSum',//扣分统计
    countCaseSumByDay:'/CaseManage/count/countCaseSumByDay',//当日案件增加数和处理数量
    //案件信息
    caseList: '/CaseManage/caseInfo/getByCondition',//案件信息
    addCase: '/CaseManage/caseInfo/addRecord',//add案件
    editCase: '/CaseManage/caseInfo/updateById',//edit案件
    delCase: '/CaseManage/caseInfo/deleteByIds',//del案件
    changeStatus: '/CaseManage/caseInfo/changeStatus',//案件处理操作
    flowLine: '/CaseManage/caseInfo/getFlowLine',//已处理流程信息
    downloadTemp: '/CaseManage/caseInfo/downloadTemp',//模板下载


    //系统角色
    roleList: '/CaseManage/sysRole/getByCondition',  //角色列表
    addRole: '/CaseManage/sysRole/addRecord',//添加角色
    editRole: '/CaseManage/sysRole/updateById',  //修改角色
    delRole: '/CaseManage/sysRole/deleteByIds',//删除角色
    getAuthByRoleId: '/CaseManage/sysRole/getAuthByRoleId',//根据角色id查询操作权限
    getAllPageAuth: '/CaseManage/sysRoute/selectAll',//查询所有页面权限（初始化）
    addAuthForRole: '/CaseManage/sysRole/addAuthForRole1',//查询所有页面权限（初始化）

    //系统用户
    userList: '/CaseManage/sysUser/getByCondition',  //用户列表
    addUser: '/CaseManage/sysUser/addRecord',//添加用户
    editUser: '/CaseManage/sysUser/updateById',  //修改用户
    delUser: '/CaseManage/sysUser/deleteByIds',//删除用户
    resetPassword:'/CaseManage/sysUser/resetPassword',
    changePassword:'/CaseManage/sysUser/changePassword',
    

    //机构信息
    orgList: '/CaseManage/sysOrg/getByCondition',//机构信息
    orgTree: '/CaseManage/sysOrg/getOrgTree',//机构树
    addOrg: '/CaseManage/sysOrg/addRecord',//add机构
    editOrg: '/CaseManage/sysOrg/updateById',//edit机构树
    delOrg: '/CaseManage/sysOrg/deleteByIds',//del机构树
    createOrgPrivilegeCodeByParentOrgId:'/CaseManage/sysOrg/createOrgPrivilegeCodeByParentOrgId',

    //系统代码类型
    codeTypeList: '/CaseManage/sysCodeType/getByCondition',//代码类型信息
    addCodeType: '/CaseManage/sysCodeType/addRecord',//add
    editCodeType: '/CaseManage/sysCodeType/updateById',//edit
    delCodeType: '/CaseManage/sysCodeType/deleteByIds',//del

    //系统代码
    codeList: '/CaseManage/sysCode/getByCondition',//代码类型信息
    addCode: '/CaseManage/sysCode/addRecord',//add
    editCode: '/CaseManage/sysCode/updateById',//edit
    delCode: '/CaseManage/sysCode/deleteByIds',//del

    //操作日志
    sysLogList: '/CaseManage/sysLog/getByCondition',//操作日志查看

    //节假日管理
    sysFestivalList: '/CaseManage/sysFestival/getByCondition',//代码类型信息
    addSysFestival: '/CaseManage/sysFestival/addRecord',//add
    editSysFestival: '/CaseManage/sysFestival/updateById',//edit

    //流程配置管理
    flowConfigList: '/CaseManage/flowConfig/getByCondition',//查询流程配置
    editflowConfig: '/CaseManage/flowConfig/updateById',//edit

     //扣分规则
     checkRuleList: '/CaseManage/checkRule/getByCondition',//查询扣分规则
     editCheckRule: '/CaseManage/checkRule/updateById',//edit
}

 export default api