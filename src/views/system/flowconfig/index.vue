<template>
  <div class="_layout">
    <div class="_main_page">
        <div class="tableArea">
          <div class="tableInfo" style="top:0">
            <a-table
              rowKey="flowConfigId"
              :columns="columns"
              :dataSource="dataSource"
              :scroll="{y:tableHight}"
              :pagination="false"
              size="default"
            >
              <span slot="action" slot-scope="text,record">
                <template>
                  <a v-auth="['flowconfig','update']" @click="handleEdit(record)">修改</a>
                  <a-divider type="vertical"/>
                  <a v-auth="['flowconfig','query']" @click="viewData(record)">查看</a>
                </template>
              </span>
            </a-table>
          </div>
        </div>
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
import editModal from "./editModal";

Vue.use(Divider);
Vue.use(Radio);

export default {
  components: {
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
          title: "类型",
          dataIndex: "flowType",
          width: "15%",
          customRender: text => this.$getCodeName('002',text)||'--'
        },
        {
          title: "处理天数",
          dataIndex: "days",
          width: "15%"
        },
        {
          title: "提醒内容",
          dataIndex: "warningMsg",
          width: "15%"
        },
        {
          title: "操作",
          dataIndex: "action",
          width: "15%",
          scopedSlots: { customRender: "action" }
        }
      ]
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
    handleSearch(e) {
      e ? e.preventDefault() : null;
        let params = {
        };
        request
          .get(reqApi.flowConfigList, params)
          .then(res => {
            this.dataSource = res.result.rows;
          })
          .finally(() => (this.loading = false));
    },
    handleEdit(record) {
      //修改点击
      if (!record) return;
      this.$refs.editForm.edit(record);
    },
    handleEditOk(values) {
      //修改完成请求方法
      request.post(reqApi.editflowConfig,values)
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
