/* 
 * @Title: $api
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-12 18:14:16 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-27 16:55:26
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

 const api = {
    login: '/CaseManage/login/login',   //系统登录接口
    logout: '/CaseManage/login/logout', //登出系统

    //案件信息
    caseList: '/CaseManage/caseInfo/getByCondition',//案件信息
    addCase: '/CaseManage/caseInfo/addRecord',//add案件
    editCase: '/CaseManage/caseInfo/updateById',//edit案件
    delCase: '/CaseManage/caseInfo/deleteByIds',//del案件


    //系统角色
    roleList:'/CaseManage/sysRole/getByCondition',  //角色列表
    addRole:'/CaseManage/sysRole/addRecord',//添加角色
    editRole:'/CaseManage/sysRole/updateById',  //修改角色
    delRole:'/CaseManage/sysRole/deleteByIds',//删除角色

    //系统用户
    userList:'/CaseManage/sysUser/getByCondition',  //用户列表
    addUser:'/CaseManage/sysUser/addRecord',//添加用户
    editUser:'/CaseManage/sysUser/updateById',  //修改用户
    delUser:'/CaseManage/sysUser/deleteByIds',//删除用户
    
    //机构信息
    orgList: '/CaseManage/sysOrg/getByCondition',//机构信息
    orgTree: '/CaseManage/sysOrg/getOrgTree',//机构树
    addOrg: '/CaseManage/sysOrg/addRecord',//add机构
    editOrg: '/CaseManage/sysOrg/updateById',//edit机构树
    delOrg: '/CaseManage/sysOrg/deleteByIds',//del机构树

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


 }

 export default api