/* 
 * @Title: $Users 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-09 22:43:02 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-27 10:35:25
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

<template>
  <div class="_layout">
    <div class="_main_page">
      <div class="treeInfo">
        <div class="treeNameArea">
          <span>组织机构</span>
        </div>
        <div class="treeArea">
          <div class="orgTreeDiv">
            <org-tree
              :data="treeData"
              :defaultExpandedKeys="defaultExpandedKeys"
              v-on:changeSelectKey="changeSearch"
            ></org-tree>
          </div>
        </div>
      </div>
      <div class="mainArea">
        <div class="searchArea">
          <a-form :form="form" @submit="handleSearch" layout="inline" class="seacherForm">
            <a-row :gutter="24">
              <a-col :span="6">
                <a-form-item label="用户名:">
                  <a-input v-decorator="['username',{initialValue:''}]" size="small"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="姓名:">
                  <a-input v-decorator="['fullName',{initialValue:''}]" size="small"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="是否启用:">
                  <a-radio-group v-decorator="['enableFlag',{initialValue:'1'}]" size="small">
                    <a-radio value="1">启用</a-radio>
                    <a-radio value="2">不启用</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-form-item>
                <a-button
                  type="primary"
                  size="small"
                  html-type="submit"
                  class="loginFormButton"
                  :loading="loading"
                >查询</a-button>
              </a-form-item>
            </a-row>
          </a-form>
        </div>
        <div class="tableArea">
          <div class="buttonArea">
            <a-button type="primary" size="small" @click="$refs.addForm.add()" class="addBtn">添加</a-button>
            <a-popconfirm
              title="确定删除?"
              :visible="visibleTip"
              @confirm="handleDel(selectedRowKeys)"
              @cancel="delCancel"
              @visibleChange="handleVisibleChange"
              okText="确定"
              cancelText="取消"
            >
              <a-button type="primary" size="small">删除</a-button>
            </a-popconfirm>
          </div>
          <div class="tableInfo">
            <a-table
              :dataSource="dataSource"
              rowKey="userId"
              :rowSelection="rowSelection"
              :columns="columns"
              :pagination="pagination"
              @change="handleTableChange"
              :scroll="{y:tableHight}"
              size="default"
            >
              <!-- <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a> -->
              <span slot="action" slot-scope="text,record">
                <template>
                  <a @click="handleEdit(record)">修改</a>
                  <a-divider type="vertical"/>
                  <a-popconfirm
                    title="确定删除?"
                    @confirm="handleDel(record.userId)"
                    @cancel="delCancel"
                    okText="确定"
                    cancelText="取消"
                  >
                    <a>删除</a>
                  </a-popconfirm>
                  <a-divider type="vertical"/>
                  <a @click="viewData(record)">查看</a>
                </template>
              </span>
            </a-table>
          </div>
        </div>
      </div>
      <add-modal ref="addForm" :handleAddOk="handleAddOk" :treeData="treeData"/>
      <edit-modal ref="editForm" :handleEditOk="handleEditOk" :treeData="treeData"/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { Divider } from "ant-design-vue";
import _ from "lodash";
import request from "@/utils/request";
import reqApi from "@/api/index";
import orgTree from "@/components/orgTree";
import addModal from "./addModal";
import editModal from "./editModal";

//表头
const columns = [
  {
    title: "用户名",
    dataIndex: "username",
    width: "10%"
    // scopedSlots: { customRender: "name" }
  },
  {
    title: "所属机构",
    dataIndex: "orgId",
    width: "25%",
    customRender: text => text || "--"
  },
  {
    title: "姓名",
    dataIndex: "fullName",
    width: "10%",
    customRender: text => text || "--"
  },
  {
    title: "电话",
    dataIndex: "phoneNbr",
    width: "10%",
    customRender: text => text || "--"
  },
  {
    title: "是否启用",
    dataIndex: "enableFlag",
    width: "10%",
    customRender: text => (text == 1 ? "是" : "否")
  },
  {
    title: "操作",
    dataIndex: "action",
    width: "25%",
    scopedSlots: { customRender: "action" }
  }
];

Vue.use(Divider);
// const org_id = JSON.parse(sessionStorage.getItem("user_info"))["orgId"];
export default {
  components: {
    "org-tree": orgTree,
    "add-modal": addModal,
    "edit-modal": editModal
  },
  data() {
    console.log(this.total, 666);
    return {
      columns,
      loading: false,
      form: this.$form.createForm(this),
      tableHight: 0, //table 高度
    //   treeData: [], //机构树数据
      defaultExpandedKeys: [], //树默认打开的节点
      isSelectKey: "", //被选中的节点
      selectedRowKeys: [], //选中行key
      visibleTip: false, //删除确认旗气泡框
      dataSource: [], //table数据
      pagination: {
        //分页信息
        pageNumber: 1,
        pageSize: 10,
        current: 1,
        total: 0,
        pageSizeOptions: ["10", "20", "30", "50"],
        showTotal: total => `共 ${total} 条`
      }
    };
  },
  created() {
    //表格适应样式
    let tableIndex = document.body.clientHeight - 380;
    this.tableHight = tableIndex;
  },
  mounted() {
    //默认数据查询
    this.handleSearch();
  },
  computed: {
    ...mapState({
      treeData: state => state.org.orgTree //机构信息tree数据
    }),
    rowSelection() {
      //table选中参数
      return {
        onChange: this.onSelectChange
      };
    }
  },
  methods: {
    ...mapActions({
      //action方法
      getOrgList: "org/getOrgList",
      getOrgTree: "org/getOrgTree",
      addOrg: "org/addOrg",
      editOrg: "org/editOrg",
      delOrg: "org/delOrg"
    }),
    onSelectChange(selectedRowKeys) {
      //table选中keys
      this.selectedRowKeys = selectedRowKeys;
    },
    handleVisibleChange() {
      // Determining condition before show the popconfirm.
      if (this.selectedRowKeys.length != 0) {
        this.visibleTip = true;
      } else {
        this.$message.warning("请先选择信息!");
        this.visibleTip = false;
      }
    },
    handleSearch(e, query = {}) {
      //机构列表查询方法
      e ? e.preventDefault() : null;
      this.form.validateFields((err, values) => {
        if (!err) {
          const { current, pageSize } = this.pagination;
          let params = {
            ...query,
            ...values, //[orgCode,orgName]
            pageSize,
            pageNumber: current
          };
          request
            .get(reqApi.userList, params)
            .then(res => {
              this.$message.success("查询成功！");
              this.pagination.total = res.result.total;
              this.dataSource = res.result.rows;
            })
            .finally(() => (this.loading = false));
        }
      });
    },
    handleTableChange(pagination) {
      //分页变化处理
      const pager = { ...this.pagination };
      pager.current = pager.pageNumber = pagination.current;
      this.pagination = pager;
      this.handleSearch(false);
    },
    handleAddOk(values) {
      //添加操作请求方法
      request.post(reqApi.addUser,values)
        .then(res => {
          this.$message.success(res.msg);
          this.$refs.addForm.handleCancel();
          this.refresh();
        })
        .finally(() => (this.$refs.addForm.confirmLoading = false));
    },
    handleDel(record) {
      debugger;
      //删除、批量删除操作请求方法
      if (record) {
        if (_.isArray(record)) {
          if (record.length == 0) return;
          //tip框消失
          this.visibleTip = false;
          record = record.join(",");
        }
        let obj = { ids: record };
        request.post(reqApi.delUser,obj).then(res => {
          this.$message.success(res.msg);
          this.refresh();
        });
      }
    },
    delCancel(e) {
      e ? e.preventDefault() : null;
      this.visibleTip = false;
    },
    handleEdit(record) {
      //修改点击
      if (!record) return;
      this.$refs.editForm.edit(record);
    },
    handleEditOk(values) {
      //修改完成请求方法
      request.post(reqApi.editUser,values)
        .then(res => {
          this.$message.success(res.msg);
          this.$refs.editForm.handleCancel();
          this.refresh();
        })
        .finally(() => (this.$refs.editForm.confirmLoading = false));
    },
    viewData(record) {
      //信息查看
      if (!record) return;
      this.$refs.editForm.edit(record, true);
    },
    changeSearch(orgId) {
      //点击机构树节点请求数据方法
      this.pagination.pageNumber = this.pagination.current = 1;
      this.pagination.pageSize = 10;
      let query = { orgId: orgId, recursive: "1" };
      this.handleSearch(false, query);
    },
    refresh() {
      //重新查询请求
      //这里还是按当前的分页状态查询，可更改
      this.handleSearch(false);
    }
  }
};
</script>

<style lang="scss" scoped>
._layout {
  @include layout(
    20%,
    80%
  ); //20%--机构树区域 80%--查询条件和列表区域 若无机构区域 可设置 （0，,100%）
}
</style>
