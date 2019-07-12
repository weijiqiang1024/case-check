/* 
 * @Title: 案件管理 
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-06-25 11:10:01 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-07-12 15:38:43
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

<template>
  <div class="_layout">
    <div class="_main_page">
      <div class="mainArea">
        <div class="searchArea">
          <a-form :form="form" @submit="handleSearch" layout="inline" class="seacherForm">
            <a-row :gutter="16">
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
                <!-- <a-form-item label="处理类型" v-bind="formItemLayout">
                  <a-select v-decorator="['codeTypeNo']" size="small" :allowClear="true">
                    <a-select-option
                      v-for="(name,value) in $getCodeByType('002')"
                      :key="value"
                    >{{name}}</a-select-option>
                  </a-select>
                </a-form-item>-->
                <a-form-item label="处理类型" v-bind="formItemLayout">
                  <a-select v-decorator="['processType']" size="small" :allowClear="true">
                    <a-select-option value="1">简易程序</a-select-option>
                    <a-select-option value="2">一般程序</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="6">
                <a-form-item label="处理状态" v-bind="formItemLayout">
                  <a-select v-decorator="['status']" size="small" :allowClear="true">
                    <a-select-option
                      v-for="(name,value) in $getCodeByType('001')"
                      :key="value"
                    >{{name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="发生时间" v-bind="formItemLayout">
                  <a-range-picker
                    :ranges="{ '今日': [moment(), moment()], '当月': [moment(), moment().endOf('month')] }"
                    showTime
                    format="YYYY-MM-DD"
                    @change="onTimeChange"
                    size="small"
                    style="width:100%"
                    v-decorator="['rangePicker',{rules: [{ type: 'array', required: false}]}]"
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
              </a-col>
            </a-row>
            <a-row :gutter="16">
              <a-col :span="6">
                <a-form-item label="状态类型" v-bind="formItemLayout">
                  <a-select v-decorator="['isTimeout']" size="small" :allowClear="true">
                    <a-select-option value="1">即将超期</a-select-option>
                    <a-select-option value="2">超期</a-select-option>
                    <a-select-option value="3">正常</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-button
                type="primary"
                size="small"
                html-type="submit"
                class="searchBtn"
                :loading="loading"
              >查询</a-button>
            </a-row>
          </a-form>
        </div>
        <div class="tableArea">
          <div class="caseStatus">
            <div class="colorBlock">
              <span class="normal"></span>
              正常
            </div>
            <div class="colorBlock">
              <span class="willTimeOut"></span>
              即将到期
            </div>
            <div class="colorBlock">
              <span class="timeOut"></span>
              超期
            </div>
            <div class="colorBlock">
              <span class="end"></span>
              处理完成
            </div>
          </div>
          <div class="buttonArea">
            <a-button
              v-auth="['casemanage','import']"
              type="primary"
              size="small"
              @click="$refs.addForm.add()"
              class="addBtn"
            >添加</a-button>
            <a-popconfirm
              title="确定删除?"
              :visible="visibleTip"
              @confirm="handleDel(selectedRowKeys)"
              @cancel="delCancel"
              @visibleChange="handleVisibleChange"
              okText="确定"
              cancelText="取消"
              class="addBtn"
            >
              <a-button v-auth="['casemanage','delete']" type="primary" size="small">删除</a-button>
            </a-popconfirm>
            <a-button
              v-auth="['casemanage','add']"
              type="primary"
              size="small"
              @click="$refs.uploadFile.upload()"
            >导入</a-button>
          </div>
          <div class="tableInfo">
            <a-table
              rowKey="caseId"
              :rowSelection="rowSelection"
              :columns="columns"
              :dataSource="dataSource"
              :pagination="pagination"
              @change="handleTableChange"
              :scroll="{y:tableHight}"
              size="middle"
              :bordered="true"
              :rowClassName="rowClassName"
            >
              <span slot="action" slot-scope="text,record">
                <template>
                  <a-dropdown>
                    <a-menu slot="overlay">
                      <a-menu-item v-auth="['casemanage','update']">
                        <a @click="handleEdit(record)">修改</a>
                      </a-menu-item>
                      <a-menu-item v-auth="['casemanage','delete']">
                        <a-popconfirm
                          title="确定删除?"
                          @confirm="handleDel(record.caseId)"
                          @cancel="delCancel"
                          okText="确定"
                          cancelText="取消"
                        >
                          <a>删除</a>
                        </a-popconfirm>
                      </a-menu-item>
                      <a-menu-item v-if="record.status != '14'" v-auth="['casemanage','deal']">
                        <a @click="handleCaseDeal(record)">处理</a>
                      </a-menu-item>
                      <a-menu-item v-auth="['casemanage','view']">
                        <a @click="viewData(record)">查看</a>
                      </a-menu-item>
                    </a-menu>
                    <a-button style="margin-left: 8px" size="small">
                      操作
                      <a-icon type="down" />
                    </a-button>
                  </a-dropdown>
                </template>
              </span>
              <!-- <span slot="action" slot-scope="text,record">
                <template>
                  <a @click="handleEdit(record)">修改</a>
                  <a-divider type="vertical" />

                  <a-popconfirm
                    title="确定删除?"
                    @confirm="handleDel(record.caseId)"
                    @cancel="delCancel"
                    okText="确定"
                    cancelText="取消"
                  >
                    <a>删除</a>
                  </a-popconfirm>
                  <a-divider type="vertical" />
                  <span v-if="record.status != '14'">
                    <a @click="handleCaseDeal(record)">处理</a>
                    <a-divider type="vertical" />
                  </span>
                  <a @click="viewData(record)">查看</a>
                </template>
              </span>-->
              <span slot="name" slot-scope="text,record">
                <template>
                  <div v-for="(item,index) in record.relations" :key="item.relationId">
                    <div
                      :class="(index == 0 && index != record.relations.length-1)?'firstDiv':(index == record.relations.length-1)?(index == 0?'onlyOne':'lastDiv' ):'middDiv'"
                    >{{item.name}}</div>
                  </div>
                </template>
              </span>
              <span slot="phoneNbr" slot-scope="text,record">
                <template>
                  <div v-for="(item,index) in record.relations" :key="item.relationId">
                    <div
                      :class="(index == 0 && index != record.relations.length-1)?'firstDiv':(index == record.relations.length-1)?(index == 0?'onlyOne':'lastDiv' ):'middDiv'"
                    >{{item.phoneNbr}}</div>
                  </div>
                </template>
              </span>
            </a-table>
          </div>
        </div>
      </div>
      <add-modal
        ref="addForm"
        :handleAddOk="handleAddOk"
        :codeType="codeType"
        :processPersonArr="processPersonArr"
      />
      <edit-modal
        ref="editForm"
        :handleEditOk="handleEditOk"
        :codeType="codeType"
        :processPersonArr="processPersonArr"
      />
      <caseDealModal
        ref="caseDealForm"
        :handleCaseDealOk="handleCaseDealOk"
        :codeType="codeType"
        :processPersonArr="processPersonArr"
      />
      <uploadFile ref="uploadFile" :handleUploadFileOk="handleUploadFileOk" />
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
import caseDealModal from "./caseDealModal";
import uploadFile from "./uploadFile";

export default {
  components: {
    "add-modal": addModal,
    "edit-modal": editModal,
    caseDealModal,
    uploadFile
  },
  data() {
    return {
      dateFormat: "YYYY/MM/DD",
      monthFormat: "YYYY/MM",
      loading: false,
      expand: false,
      form: this.$form.createForm(this),
      tableHight: 0, //table 高度
      dataSource: [], //table数据
      visibleTip: false, //删除tip
      codeType: [], //代码类型
      processPersonArr: [],
      selectedRowKeys: [],
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
      },
      //表头
      columns: [
        {
          title: "发生时间",
          dataIndex: "happenTime",
          width: "12%"
          // scopedSlots: { customRender: "name" }
        },
        {
          title: "发生地点",
          dataIndex: "happenAddress",
          width: "15%",
          customRender: text => text || "--"
        },
        {
          title: "涉案人",
          dataIndex: "relations",
          width: "25%",
          children: [
            {
              title: "姓名",
              dataIndex: "name",
              key: "name",
              width: "12%",
              align: "center",
              scopedSlots: { customRender: "name" }
            },
            {
              title: "电话",
              dataIndex: "phoneNbr",
              key: "phoneNbr",
              width: "13%",
              align: "center",
              scopedSlots: { customRender: "phoneNbr" }
            }
          ],
          scopedSlots: { customRender: "relations" }
        },
        {
          title: "死/伤(人)",
          dataIndex: "deathNbr",
          width: "7%",
          customRender: (text, record) => record.deathNbr + "/" + record.hurtNbr
        },
        {
          title: "经办人",
          dataIndex: "processPerson",
          width: "6%",
          customRender: text => text || "--"
        },
        {
          title: "处理程序",
          dataIndex: "processType",
          width: "5%",
          customRender: text => (text == "1" ? "简易" : "一般")
        },
        {
          title: "处理状态",
          dataIndex: "status",
          width: "5%",
          customRender: text => (text ? this.$getCodeName("001", text) : "--")
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          width: "12%",
          customRender: text => text || "--"
        },
        {
          title: "操作",
          dataIndex: "action",
          width: "8%",
          scopedSlots: { customRender: "action" }
        }
      ]
    };
  },
  created() {
    //表格适应样式
    let tableIndex = document.body.clientHeight - 460;
    this.tableHight = tableIndex;
  },
  mounted() {
    if (this.$route.query && this.$route.query.type) {
      this.form.setFieldsValue({
        isTimeout: this.$route.query.type == "daoqi" ? "1" : "2"
      });
    }
    //默认数据查询
    this.handleSearch();
    this.getProcessPerson();
  },
  computed: {
    ...mapState({
      dealMessage: state => state.socket.dealMessage //websocket 推送的案件处理信息
    }),
    rowSelection() {
      //table选中参数
      return {
        onChange: this.onSelectChange
      };
    }
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
    toggle() {
      this.expand = !this.expand;
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
    handleSearch(e, query = {}, pagination={}) {
      //机构列表查询方法
      e ? e.preventDefault() : null;
      this.form.validateFields((err, values) => {
        if (!err) {
          let pageNumber = pagination.pageNumber || 1;
          let pageSize = pagination.pageSize || 10;
          if (values.rangePicker && values.rangePicker.length == 2) {
            values.startTime = values.rangePicker[0].format("YYYY-MM-DD");
            values.endTime = values.rangePicker[1].format("YYYY-MM-DD");
          }

          let params = {
            ...query,
            ...values, //[orgCode,orgName]
            pageNumber: pageNumber,
            pageSize: pageSize
          };
          request.get(reqApi.caseList, params).then(res => {
            this.pagination.total = res.result.total;
            this.dataSource = res.result.rows;
            this.loading = false;
          });
        }
      });
    },
    handleTableChange(pagination) {
      //分页变化处理
      const pager = { ...this.pagination };
      pager.current = pager.pageNumber = pagination.current;
      this.pagination = pager;
      this.handleSearch(false,{},this.pagination);
    },
    handleAddOk(values) {
      if (!values) {
        this.$message.warning("基础信息、涉案人员不能为空！");
        return;
      }
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
      debugger;
      if (record) {
        if (_.isArray(record)) {
          if (record.length == 0) return;
          //tip框消失
          this.visibleTip = false;
          record = record.join(",");
        }
        let obj = { ids: record };
        request.post(reqApi.delCase, obj).then(res => {
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
      request
        .post(reqApi.editCase, values)
        .then(res => {
          this.$message.success(res.msg);
          this.$refs.editForm.handleCancel();
          this.refresh();
        })
        .finally(() => (this.$refs.editForm.confirmLoading = false));
    },
    handleCaseDeal(record) {
      //修改点击
      if (!record) return;
      this.$refs.caseDealForm.edit(record, true);
    },
    handleCaseDealOk(values) {
      //修改完成请求方法
      request
        .post(reqApi.changeStatus, values)
        .then(res => {
          this.$message.success(res.msg);
          this.$refs.caseDealForm.handleCancel();
          this.refresh();
        })
        .finally(() => (this.$refs.caseDealForm.confirmLoading = false));
    },
    handleUploadFileOk() {},
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
    },
    rowClassName(record) {
      if(record.status == '14'){
        return "endCase";
      }
      else if (record.isTimeout == "1") {
        return "willTimeOutCase";
      } else if (record.isTimeout == "2") {
        return "timeOutCase";
      } else if (record.isTimeout == "3") {
        return "normalCase";
      }
    },
    getProcessPerson() {
      request.get(reqApi.userList).then(res => {
        if (!res) return;
        this.processPersonArr = res.result.rows;
      });
    }
  },
  watch: {
    dealMessage: function() {
      this.refresh();
    },
    "$route.query.type": function() {
      if (this.$route.query && this.$route.query.type) {
        this.form.setFieldsValue({
          isTimeout: this.$route.query.type == "daoqi" ? "1" : "2"
        });
        this.refresh();
      }
    }
  }
};
</script>

<style lang="scss">
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

  .firstDiv {
    padding-bottom: 12px;
    border-bottom: 1px solid #e9e9e9 !important;
  }

  .middDiv {
    padding: 12px 0;
    border-bottom: 1px solid #e9e9e9 !important;
  }

  .lastDiv {
    padding-top: 12px;
  }

  .onlyOne {
    padding-top: 0;
  }

  .tableInfo {
    .ant-table-thead > tr > th,
    .ant-table-tbody > tr > td {
      padding: 10px 10px !important;
    }
  }

  .caseStatus {
    position: absolute;
    display: flex;
    div {
      padding-left: 20px;
      span {
        display: inline-block;
        width: 30px;
        height: 14px;
        padding-right: 10px;
        border-radius: 4px;
      }
      .normal {
        background: #1890ff;
      }
      .willTimeOut {
        background: #ff8b5e;
      }
      .timeOut {
        background: #eb545b;
      }
      .end {
        background: #48bf84;
      }
    }
  }
}

// .ant-table-tbody > tr > td {
//   padding: 10px 10px !important;
// }
</style>
<style lang="scss">
.normalCase {
  border-left: 8px solid #1890ff !important;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}
.willTimeOutCase {
  border-left: 8px solid #ff8b5e !important;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}
.timeOutCase {
  border-left: 8px solid #eb545b !important;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}

.endCase {
  border-left: 8px solid #48bf84 !important;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}
</style>

