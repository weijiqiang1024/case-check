<template>
  <div class="_layout">
    <div class="_main_page">
      <div class="mainArea">
        <div class="searchArea">
          <a-form :form="form" @submit="handleSearch" layout="inline" class="seacherForm">
            <a-row :gutter="24">
              <a-col :span="6">
                <a-form-item label="服务名称:">
                  <a-input v-decorator="['serviceName',{initialValue:''}]" size="small"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="操作人员:">
                  <a-input v-decorator="['username',{initialValue:''}]" size="small"></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="6">
                <a-form-item label="操作时间" v-bind="formItemLayout">
                  <a-range-picker
                    :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
                    :showTime="{ format: 'HH:mm:ss' }"
                    format="YYYY/MM/DD HH:mm:ss"
                    size="small"
                    style="width:100%"
                    v-decorator="['createTime']"
                  />
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
          <div class="tableInfo" style="top:0">
            <a-table
              rowKey="logId"
              :columns="columns"
              :dataSource="dataSource"
              :pagination="pagination"
              @change="handleTableChange"
              :scroll="{y:tableHight}"
              size="default"
            ></a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { Divider, Radio } from "ant-design-vue";
import moment from "moment";
import request from "@/utils/request";
import reqApi from "@/api/index";

Vue.use(Divider);
Vue.use(Radio);

export default {
  components: {},
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
          title: "操作人员",
          dataIndex: "username",
          width: "15%",
          customRender: text => text || "--"
        },
        {
          title: "操作时间",
          dataIndex: "createTime",
          width: "20%",
          customRender: text => text || "--"
        },
        {
          title: "IP地址",
          dataIndex: "clientIp",
          width: "15%"
        },
        {
          title: "服务名称",
          dataIndex: "serviceName",
          width: "15%",
          customRender: text => text || "--"
        },
        {
          title: "耗时",
          dataIndex: "consumeTime",
          width: "10%",
          customRender: text => (text * 1.0) / 1000 + "秒"
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
    this.handleSearch();
  },
  computed: {
    ...mapState({
      //   orgTreeSelect: state => state.org.orgTreeSelect //机构信息tree数据
    })
  },
  methods: {
    moment,
    handleSearch(e, query = {},pagination={}) {
      //机构列表查询方法
      e ? e.preventDefault() : null;
      this.form.validateFields((err, values) => {
        const createTime = values["createTime"];
        if (createTime && createTime.length > 0) {
          values.startTime = moment(createTime[0]).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          values.endTime = moment(createTime[1]).format("YYYY-MM-DD HH:mm:ss");
        }
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
            .get(reqApi.sysLogList, params)
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
