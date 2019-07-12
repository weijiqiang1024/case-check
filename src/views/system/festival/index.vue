<template>
  <div class="_layout">
    <div class="_main_page">
      <div class="mainArea">
        <div class="searchArea">
          <a-form :form="form" @submit="handleSearch" layout="inline" class="seacherForm">
            <a-row :gutter="24">
              <a-col :span="6">
                <a-form-item label="节假日类型:">
                  <a-select
                          v-decorator="['festivalType']"
                          style="width:140px"
                          size="small"
                          :allowClear="true"
                  >
                    <a-select-option v-for="(name,value) in $getCodeByType('004')" :key="value">{{name}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="年份:">
                  <a-input v-decorator="['year',{initialValue:''}]" size="small"></a-input>
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
            <a-button v-auth="['festival','add']" type="primary" size="small" @click="$refs.addForm.add()" class="addBtn">添加</a-button>
          </div>
          <div class="tableInfo">
            <a-table
              rowKey="festivalId"
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
                  <a v-auth="['festival','update']" @click="handleEdit(record)">修改</a>
                  <a-divider type="vertical"/>
                  <a v-auth="['festival','query']" @click="viewData(record)">查看</a>
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
          title: "节假日类型",
          dataIndex: "festivalType",
          width: "15%",
          customRender: text => this.$getCodeName('004',text)||'--'
        },
        {
          title: "开始时间",
          dataIndex: "startDate",
          width: "15%"
        },
        {
          title: "结束时间",
          dataIndex: "endDate",
          width: "15%"
        },
        {
          title: "年份",
          dataIndex: "year",
          width: "15%"
        },
        {
          title: "操作",
          dataIndex: "action",
          width: "15%",
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
    handleSearch(e, query = {},pagination={}) {
      //机构列表查询方法
      e ? e.preventDefault() : null;
      this.form.validateFields((err, values) => {
        if (!err) {
          let pageNumber = pagination.pageNumber || 1;
          let pageSize = pagination.pageSize || 10;
          let params = {
            ...query,
            ...values, //[orgCode,orgName]
            pageNumber,
            pageSize
          };
          request
            .get(reqApi.sysFestivalList, params)
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
      this.handleSearch(false,{},this.pagination);
    },
    handleAddOk(values) {
      //添加操作请求方法
      request
        .post(reqApi.addSysFestival, values)
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
      request.post(reqApi.editSysFestival,values)
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
