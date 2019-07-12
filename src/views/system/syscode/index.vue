<template>
  <div class="_layout">
    <div class="_main_page">
      <div class="mainArea">
        <div class="searchArea">
          <a-form :form="form" @submit="handleSearch" layout="inline" class="seacherForm">
            <a-row :gutter="24">
              <a-col :span="6">
                <a-form-item label="字典编号:">
                  <a-input v-decorator="['codeNo',{initialValue:''}]" size="small"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="字典名称:">
                  <a-input v-decorator="['codeName',{initialValue:''}]" size="small"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="字典类型:">
                  <a-select
                    v-decorator="['codeTypeNo']"
                    style="width:140px"
                    size="small"
                    :allowClear="true"
                  >
                    <a-select-option v-for="(name,value) in codeType" :key="value">{{name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="是否启用:">
                  <a-radio-group v-decorator="['enableFlag',{initialValue:'1'}]" size="small">
                    <a-radio value="1">启用</a-radio>
                    <a-radio value="2">不启用</a-radio>
                  </a-radio-group>
                </a-form-item>
                <a-form-item>
                  <a-button
                    type="primary"
                    size="small"
                    html-type="submit"
                    class="loginFormButton"
                    :loading="loading"
                  >查询</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <div class="tableArea">
          <div class="buttonArea">
            <a-button v-auth="['syscode','add']" type="primary" size="small" @click="$refs.addForm.add()" class="addBtn">添加</a-button>
            <a-popconfirm
              title="确定删除?"
              :visible="visibleTip"
              @confirm="handleDel(selectedRowKeys)"
              @cancel="delCancel"
              @visibleChange="handleVisibleChange"
              okText="确定"
              cancelText="取消"
            >
              <a-button v-auth="['syscode','delete']" type="primary" size="small">删除</a-button>
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
                  <a v-auth="['syscode','update']" @click="handleEdit(record)">修改</a>
                  <a-divider type="vertical"/>
                  <a-popconfirm
                    title="确定删除?"
                    @confirm="handleDel(record.id)"
                    @cancel="delCancel"
                    okText="确定"
                    cancelText="取消"
                  >
                    <a v-auth="['syscode','delete']">删除</a>
                  </a-popconfirm>
                  <a-divider type="vertical"/>
                  <a v-auth="['syscode','query']" @click="viewData(record)">查看</a>
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
import reqApi from "@/api";
import request from "@/utils/request";
import addModal from "./addModal";
import editModal from "./editModal";
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
      dataSource: [], //table数据
      //表头
      columns: [
        {
          title: "字典编号",
          dataIndex: "codeNo",
          width: "15%"
          // scopedSlots: { customRender: "name" }
        },
        {
          title: "字典名称",
          dataIndex: "codeName",
          width: "25%",
          customRender: text => text || "--"
        },
        {
          title: "字典类型",
          dataIndex: "codeTypeNo",
          width: "15%",
          customRender: text => this.codeType[text] || "--"
        },
        {
          title: "是否启用",
          dataIndex: "enableFlag",
          width: "10%",
          customRender: text => (text == "1" ? "是" : "否")
        },
        {
          title: "是否编辑",
          dataIndex: "editFlag",
          width: "10%",
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
      },
      visibleTip: false, //删除tip
      codeType: {} //代码类型
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
    }
  },
  methods: {
    ...mapActions({
      //action方法
      getList: "syscode/getList",
      addData: "syscode/addData",
      editData: "syscode/editData",
      delData: "syscode/delData"
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
    handleSearch(e, query = {},pagination = {}) {
      //机构列表查询方法
      e ? e.preventDefault() : null;
      this.form.validateFields((err, values) => {
        if (!err) {
          let pageNumber = pagination.pageNumber || 1;
          let pageSize = pagination.pageSize || 10;
          let params = {
            ...query,
            ...values, //[orgCode,orgName]
            pageNumber: pageNumber,
            pageSize: pageSize
          };
          this.getList(params).then(res => {
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
      this.handleSearch(false,{},this.pagination);
    },
    handleAddOk(values) {
      //添加操作请求方法
      this.addData(values)
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
        .then((res) => {
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
          this.codeType[res.result.rows[i].codeTypeNo] = res.result.rows[i].codeTypeName;
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
</style>
