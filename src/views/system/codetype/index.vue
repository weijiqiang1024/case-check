<template>
  <div class="_layout">
    <div class="_main_page">
      <div class="mainArea">
        <div class="searchArea">
          <a-form :form="form" @submit="handleSearch" layout="inline" class="seacherForm">
            <a-row :gutter="24">
              <a-col :span="6">
                <a-form-item label="类型编号:">
                  <a-input v-decorator="['codeTypeNo',{initialValue:''}]" size="small"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="类型名称:">
                  <a-input v-decorator="['codeTypeName',{initialValue:''}]" size="small"></a-input>
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
      <add-modal ref="addForm" :handleAddOk="handleAddOk"/>
      <edit-modal ref="editForm" :handleEditOk="handleEditOk"/>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { Divider, Radio } from "ant-design-vue";
import _ from "lodash";
import request from "@/utils/request";
import reqApi from "@/api/index";
import addModal from "./addModal";
import editModal from "./editModal";

Vue.use(Divider);
Vue.use(Radio);

export default {
  components: {
    "add-modal": addModal,
    "edit-modal": editModal
  },
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this),
      tableHight: 0, //table 高度
      visibleTip: false, //删除确认旗气泡框
      dataSource: [], //table数据
      //表头
      columns: [
        {
          title: "字典类型编号",
          dataIndex: "codeTypeNo",
          width: "15%"
          // scopedSlots: { customRender: "name" }
        },
        {
          title: "字典类型名称",
          dataIndex: "codeTypeName",
          width: "30%",
          customRender: text => text || "--"
        },
        {
          title: "是否启用",
          dataIndex: "enableFlag",
          width: "15%",
          customRender: text => (text == "1" ? "是" : "否")
        },
        {
          title: "是否编辑",
          dataIndex: "editFlag",
          width: "15%",
          customRender: text => (text == "1" ? "是" : "否")
        },
        {
          title: "操作",
          dataIndex: "action",
          width: "25%",
          scopedSlots: { customRender: "action" }
        }
      ],
      pagination: {
        //分页信息
        pageNumber: 1,
        pageSize: 10,
        current: 1,
        total: 0,
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
      //   orgTreeSelect: state => state.org.orgTreeSelect //机构信息tree数据
    }),
    rowSelection() {
      //table选中参数
      return {
        onChange: this.onSelectChange
      };
    }
  },
  methods: {
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
          const { pageNumber, pageSize } = this.pagination;
          let params = {
            ...query,
            ...values, //[orgCode,orgName]
            pageNumber,
            pageSize
          };
          request
            .get(reqApi.codeTypeList, params)
            .then(res => {
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
      request
        .post(reqApi.addCodeType, values)
        .then((res) => {
          this.$message.success(res.msg);
          this.$refs.addForm.handleCancel();
          this.refresh();
        })
        .finally(() => (this.$refs.addForm.confirmLoading = false));
    },
    handleEdit(record) {
      //修改点击
      if (!record) return;
      this.$refs.editForm.edit(record);
    },
    handleEditOk(values) {
      //修改完成请求方法
      request.post(reqApi.editCodeType,values)
        .then((res) => {
          this.$message.success(res.msg);
          this.$refs.editForm.handleCancel();
          this.refresh();
        })
        .finally(() => (this.$refs.editForm.confirmLoading = false));
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
        request.post(reqApi.delCodeType,obj).then((res) => {
          this.$message.success(res.msg);
          this.refresh();
        });
      }
    },
    delCancel(e) {
      e ? e.preventDefault() : null;
      this.visibleTip = false;
    },
    viewData(record) {
      //信息查看
      if (!record) return;
      this.$refs.editForm.edit(record, true);
    },
    changeSearch() {
      //点击机构树节点请求数据方法
      this.pagination.current = 1;
      this.pagination.pageNumber = 1;
      this.pagination.pageSize = 10;
      this.handleSearch(false);
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
  @include layout(0, 100%);
}
</style>
