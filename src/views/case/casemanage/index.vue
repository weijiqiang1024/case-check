/* 
 * @Title: 案件管理 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-25 11:10:01 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-06-28 13:48:48
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

<template>
  <div class="_layout">
    <div class="_main_page">
      <div class="mainArea">
        <div class="searchArea">
          <a-form :form="form" @submit="handleSearch" layout="inline" class="seacherForm">
            <a-row :gutter="24">
              <a-col :span="6">
                <a-form-item label="车牌号码" v-bind="formItemLayout">
                  <a-input v-decorator="['plateNbr',{initialValue:''}]" size="small"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="驾驶证号" v-bind="formItemLayout">
                  <a-input v-decorator="['driverCard',{initialValue:''}]" size="small"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="身份证号" v-bind="formItemLayout">
                  <a-input v-decorator="['idCard']" size="small"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="事故类型" v-bind="formItemLayout">
                  <a-select v-decorator="['codeTypeNo']" size="small" :allowClear="true">
                    <a-select-option v-for="(name,value) in codeType" :key="value">{{name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="24">
              <a-col :span="6">
                <a-form-item label="处理状态" v-bind="formItemLayout">
                  <a-input v-decorator="['codeNo',{initialValue:''}]" size="small"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="发生时间" v-bind="formItemLayout">
                  <a-range-picker
                    :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
                    showTime
                    format="YYYY/MM/DD HH:mm:ss"
                    @change="onTimeChange"
                    size="small"
                    style="width:100%"
                    v-decorator="['happenTime']"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="事故地点" v-bind="formItemLayout">
                  <a-input v-decorator="['happenAddress']" size="small"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="经办人" v-bind="formItemLayout">
                  <a-input
                    size="small"
                    v-decorator="['processPerson', {rules: [{required: false,message:'不能为空'}]}]"
                  />
                </a-form-item>
                <a-button
                  type="primary"
                  size="small"
                  html-type="submit"
                  class="searchBtn"
                  :loading="loading"
                >查询</a-button>
              </a-col>
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
              rowKey="id"
              :rowSelection="rowSelection"
              :columns="columns"
              :dataSource="dataSource"
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
                    @confirm="handleDel(record.id)"
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
      <add-modal ref="addForm" :handleAddOk="handleAddOk" :codeType="codeType"/>
      <edit-modal ref="editForm" :handleEditOk="handleEditOk" :codeType="codeType"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import _ from "lodash";
import moment from "moment";
import reqApi from "@/api";
import request from "@/utils/request";
import addModal from "./addModal";
import editModal from "./editModal";

//表头
const columns = [
  {
    title: "发生时间",
    dataIndex: "happenTime",
    width: "15%"
    // scopedSlots: { customRender: "name" }
  },
  {
    title: "发生地点",
    dataIndex: "happenAddress",
    width: "20%",
    customRender: text => text || "--"
  },
  {
    title: "涉案人",
    dataIndex: "name",
    width: "25%"
    // customRender: text => this.codeType[text] || "--"
  },
  {
    title: "死/伤(人)",
    dataIndex: "deathNbr",
    width: "6%",
    customRender: text => (text == "1" ? "是" : "否")
  },
  {
    title: "经办人",
    dataIndex: "processPerson",
    width: "5%",
    customRender: text => (text == "1" ? "是" : "否")
  },
  {
    title: "处理程序",
    dataIndex: "processType",
    width: "6%",
    customRender: text => (text == "1" ? "是" : "否")
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    width: "10%",
    customRender: text => (text == "1" ? "是" : "否")
  },
  {
    title: "操作",
    dataIndex: "action",
    width: "15%",
    scopedSlots: { customRender: "action" }
  }
];

export default {
  components: {
    "add-modal": addModal,
    "edit-modal": editModal
  },
  data() {
    return {
      columns,
      dateFormat: "YYYY/MM/DD",
      monthFormat: "YYYY/MM",
      loading: false,
      form: this.$form.createForm(this),
      tableHight: 0, //table 高度
      dataSource: [], //table数据
      visibleTip: false, //删除tip
      codeType: {}, //代码类型
      pagination: {
        //分页信息
        pageNumber: 1,
        pageSize: 10,
        current: 1,
        total: 0,
        showTotal: total => `共 ${total} 条`
      },
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 }
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
    this.getCodeType();
    this.handleSearch();
    // this.getOrgTrees({ orgId: "5aa1e5a4083bc3225dd8dddd" });
  },
  computed: {
    ...mapState({
      //   orgTreeSelect: state => state.org.orgTreeSelect //机构信息tree数据
    }),
    rowSelection() {
      //table选中参数
      return {
        onChange: this.onSelectChange
      };
    },
    
  },
  methods: {
    ...mapActions({}),
    moment,
    onSelectChange(selectedRowKeys) {
      //table选中keys
      this.selectedRowKeys = selectedRowKeys;
    },
    onTimeChange() {},
    onOk() {},
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
          const { pageNumber, pageSize } = this.pagination;
          let params = {
            ...query,
            ...values, //[orgCode,orgName]
            pageNumber: pageNumber,
            pageSize: pageSize
          };
          request.get(reqApi.caseList, params).then(res => {
            this.pagination.total = res.result.total;
            this.loading = false;
            this.dataSource = res.result.rows;
          });
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
      debugger;
      if (!values) {
        this.$$message.warning("基础信息、涉案人员不能为空！");
        return;
      }
      values.processType = '1';
      //添加操作请求方法
      request
        .post(reqApi.addCase, values)
        .then(res => {
          this.$message.success(res.msg);
          this.$refs.addForm.handleCancel();
          this.refresh();
        })
        .finally(() => (this.$refs.addForm.confirmLoading = false));
    },
    handleDel(record) {
      //删除、批量删除操作请求方法
      if (record) {
        if (_.isArray(record)) {
          if (record.length == 0) return;
          //tip框消失
          this.visibleTip = false;
          record = record.join(",");
        }
        let obj = { ids: record };
        this.delData(obj).then(res => {
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
      this.editData(values)
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
      this.pagination.current = 1;
      this.pagination.pageNumber = 1;
      this.pagination.pageSize = 10;
      let query = { orgId: orgId, recursive: "1" };
      this.handleSearch(false, query);
    },
    refresh() {
      //重新查询请求
      //这里还是按当前的分页状态查询，可更改
      this.handleSearch(false);
      //   this.getOrgTrees({ orgId: "5aa1e5a4083bc3225dd8dddd" });
      this.$refs.addForm.handleCancel();
    },
    getCodeType() {
      request.get(reqApi.codeTypeList).then(res => {
        for (let i in res.result.rows) {
          this.codeType[res.result.rows[i].codeTypeNo] =
            res.result.rows[i].codeTypeName;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
._layout {
  @include layout(0, 100%);
}

.mainArea {
  .searchArea > .ant-form-inline .ant-form-item {
    // display: -webkit-box;
    display: block;
  }

  .selectTop {
    transform: translateY(8px);
  }

  .searchBtn {
    position: absolute;
    top: 8px;
    right: 20px;
  }
}
</style>
