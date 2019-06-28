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
              <a-col :span="8">
                <a-form-item label="机构代码:">
                  <a-input v-decorator="['orgCode',{initialValue:''}]" size="small"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="机构名称:">
                  <a-input v-decorator="['orgName',{initialValue:''}]" size="small"></a-input>
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
              rowKey="orgId"
              :rowSelection="rowSelection"
              :columns="columns"
              :pagination="pageShow"
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
                    @confirm="handleDel(record.orgId)"
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
import orgTree from "@/components/orgTree";
import addModal from "./addModal";
import editModal from "./editModal";

Vue.use(Divider);
let org_id = JSON.parse(sessionStorage.getItem("user_info"))["orgId"];
export default {
  components: {
    "org-tree": orgTree,
    "add-modal": addModal,
    "edit-modal": editModal
  },
  data() {
    return {
      loading: false,
      form: this.$form.createForm(this),
      tableHight: 0, //table 高度
      treeData: [], //机构树数据
      defaultExpandedKeys: [], //树默认打开的节点
      isSelectKey: "", //被选中的节点
      selectedRowKeys: [], //选中行key
      visibleTip: false, //删除确认旗气泡框
      // dataSoruce: [], //table数据
      //表头
      columns: [
        {
          title: "机构代码",
          dataIndex: "orgCode",
          width: "10%"
          // scopedSlots: { customRender: "name" }
        },
        {
          title: "机构名称",
          dataIndex: "orgName",
          width: "25%",
          customRender: text => text || "--"
        },
        {
          title: "机构类型",
          dataIndex: "orgType",
          width: "10%",
          customRender: text => text || "--"
        },
        {
          title: "机构联系电话",
          dataIndex: "orgPhoneNbr",
          width: "10%",
          customRender: text => text || "--"
        },
        {
          title: "机构负责人",
          dataIndex: "orgHeaderName",
          width: "10%",
          customRender: text => text || "--"
        },
        {
          title: "负责人电话",
          dataIndex: "orgHeaderNbr",
          width: "10%",
          customRender: text => text || "--"
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
    let treeQuery = { orgId: org_id };
    this.getOrgTrees(treeQuery);
  },
  computed: {
    ...mapState({
      // orgTreeSelect: state => state.org.orgTreeSelect //机构信息tree数据
      dataSource: state => state.org.list.rows, //table数据
      total: state => state.org.list.total //table total数据
    }),
    pageShow() {
      let res = {
        showSizeChanger: true,
        current: this.pagination.current,
        pageSize: 10,
        total: this.total,
        showTotal: () => `共 ${this.total} 条`
      };
      return res;
    },
    rowSelection() {
      //table选中参数
      return {
        onChange: this.onSelectChange,
        getCheckboxProps: record => ({
          props: {
            disabled: record.name === "Disabled User", // Column configuration not to be checked
            name: record.name
          }
        })
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
          const { current, pageSize } = this.pageShow;
          let params = {
            ...query,
            ...values, //[orgCode,orgName]
            pageSize,
            pageNumber: current,
            
          };
          this.getOrgList(params)
            .then(() => {
              // this.$message.success("查询成功！");
              // this.pagination.total = res.total;
              // this.data = res.rows;
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
    getOrgTrees(query) {
      //机构树查询
      this.getOrgTree(query).then(res => {
        if (!res) return;
        let tempArr = _.cloneDeep(res);
        if (tempArr.length > 0) {
          this.defaultExpandedKeys.push(tempArr[0].orgId);
          this.isSelectKey = tempArr[0].orgId;
        }
        this.treeData.length = 0;
        this.treeData = tempArr;
      });
    },
    handleAddOk(values) {
      //添加操作请求方法
      this.addOrg(values)
        .then((res) => {
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
        this.delOrg(obj).then((res) => {
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
      this.editOrg(values)
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
      this.pagination.pageNumber = this.pagination.current = 1;
      this.pagination.pageSize = 10;
      let query = { orgId: orgId, recursive: "1" };
      this.handleSearch(false, query);
    },
    refresh() {
      //重新查询请求
      //这里还是按当前的分页状态查询，可更改
      let treeQuery = { orgId: org_id };
      this.handleSearch(false);
      this.getOrgTrees(treeQuery);
      this.$refs.addForm.handleCancel();
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
