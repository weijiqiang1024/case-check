<template>
  <div class="_layout">
    <div class="_main_page">
      <div class="treeInfo">
        <div class="treeNameArea roleName">
          <span>扣分项</span>
        </div>
        <div class="treeArea" style="background: rgb(240, 242, 245);">
          <div class="orgTreeDiv">
            <!-- <a-list size="small" bordered :dataSource="checkRuleData">
              <a-list-item
                slot="renderItem"
                slot-scope="item"
                @click="()=>changeRuleType(item.key)"
                style="cursor:pointer"
              >{{item.value}}</a-list-item>
            </a-list>-->
            <div class="roleList">
              <template class="roleTemp" v-for="item in checkRuleData">
                <div
                  :key="item.key"
                  @click="changeRuleType(item.key)"
                  :class="(selectRoleId == item.key)?['roleItem roleItemSelected']:'roleItem'"
                >
                  <div class="roleNameDiv">
                    <p class="roleName">{{item.value}}</p>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="mainArea">
        <div class="tableArea">
          <div class="tableInfo" style="top:0">
            <a-table
              :dataSource="dataSource"
              rowKey="checkRuleId"
              :columns="columns"
              :scroll="{y:tableHight}"
              :pagination="false"
              size="default"
            >
              <template
                v-for="col in ['minDay', 'maxDay', 'score', 'sortIndex','remark']"
                :slot="col"
                slot-scope="text, record"
              >
                <div :key="col">
                  <a-input
                    v-if="record.editable"
                    style="margin: -5px 0"
                    :value="text"
                    size="small"
                    @change="e => handleChange(e.target.value, record.checkRuleId, col)"
                  />
                  <template v-else>{{text}}</template>
                </div>
              </template>
              <template slot="operation" slot-scope="text, record">
                <div class="editable-row-operations">
                  <span v-if="record.editable">
                    <a @click="() => save(record.checkRuleId)">保存</a>
                    <a-divider type="vertical" />
                    <a-popconfirm title="确定取消?" @confirm="() => cancel(record.checkRuleId)">
                      <a>取消</a>
                    </a-popconfirm>
                  </span>
                  <span v-else>
                    <a v-auth="['checkrule','update']" @click="() => edit(record.checkRuleId)">修改</a>
                  </span>
                </div>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Divider } from "ant-design-vue";
import request from "@/utils/request";
import reqApi from "@/api/index";
const columns = [
  {
    title: "最小天数(不包含)",
    dataIndex: "minDay",
    width: "10%",
    scopedSlots: { customRender: "minDay" }
  },
  {
    title: "最大天数(包含)",
    dataIndex: "maxDay",
    width: "10%",
    scopedSlots: { customRender: "maxDay" }
  },
  {
    title: "扣分",
    dataIndex: "score",
    width: "10%",
    scopedSlots: { customRender: "score" }
  },
  {
    title: "备注",
    dataIndex: "remark",
    width: "20%",
    scopedSlots: { customRender: "remark" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    width: "10%",
    scopedSlots: { customRender: "operation" }
  }
];
Vue.use(Divider);
export default {
  data() {
    return {
      checkRuleData: [],
      loading: false,
      tableHight: 0, //table 高度
      visibleTip: false, //删除确认旗气泡框
      dataSource: [], //table数据
      columns,
      editStatus: false, //标识在编辑状态
      selectRoleId: ""
    };
  },
  created() {
    //表格适应样式
    let tableIndex = document.body.clientHeight - 380;
    this.tableHight = tableIndex;
  },
  mounted() {
    //默认数据查询
    this.handleSearch({ ruleType: "1" });
    this.getCheckRuleData();
    this.selectRoleId =
      this.checkRuleData.length > 0 ? this.checkRuleData[0]["key"] : "";
  },
  computed: {
    getSelectRole() {
      // debugger;
      return this.checkRuleData.length > 0 ? this.checkRuleData[0]["key"] : "";
    }
  },
  methods: {
    changeRuleType(type) {
      if (type == this.selectRoleId) return;
      this.selectRoleId = type;
      this.handleSearch({ ruleType: type });
    },
    handleChange(value, key, column) {
      const newData = [...this.dataSource];
      const target = newData.filter(item => key === item.checkRuleId)[0];
      if (target) {
        target[column] = value;
        this.dataSource = newData;
      }
    },
    edit(key) {
      const newData = [...this.dataSource];
      const target = newData.filter(item => key === item.checkRuleId)[0];
      if (target) {
        target.editable = true;
        this.editStatus = true;
        this.dataSource = newData;
      }
    },
    save(key) {
      debugger;
      const newData = [...this.dataSource];
      const target = newData.filter(item => key === item.checkRuleId)[0];
      if (!target.score || target.score > 0) {
        this.$message.warning("积分不能为空并且为负数或0!");
        return null;
      }
      if (target) {
        if (!target.minDay) delete target.minDay;
        if (!target.maxDay) delete target.maxDay;
        //保存
        request
          .post(reqApi.editCheckRule, target)
          .then(() => {
            delete target.editable;
            this.editStatus = false;
            this.dataSource = newData;
            this.handleSearch({ ruleType: target.ruleType });
          })
          .finally(() => (this.loading = false));
      }
    },
    cancel(key) {
      const newData = [...this.dataSource];
      const target = newData.filter(item => key === item.checkRuleId)[0];
      if (!target.score || target.score > 0) {
        this.$message.warning("积分不能为空并且为负数或0!");
        return null;
      }
      if (target) {
        delete target.editable;
        this.editStatus = true;
        this.handleSearch({ ruleType: target.ruleType });
      }
    },
    getCheckRuleData() {
      let datas = this.$getCodeByType("003");
      for (let key in datas) {
        let obj = {};
        obj.key = key;
        obj.value = datas[key];
        this.checkRuleData.push(obj);
      }
    },
    handleSearch(query = {}) {
      //机构列表查询方法
      let params = {
        ...query //[orgCode,orgName]
      };
      request
        .get(reqApi.checkRuleList, params)
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
      this.editOrg(values)
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
  @include layout(20%, 80%);
}

.roleList {
  .roleItem {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 6px 0;
    padding: 24px 16px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }

    &:hover:after {
      opacity: 1;
    }

    p {
      height: 30px;
      line-height: 30px;
      color: rgba(0, 0, 0, 0.45);
    }

    .roleName {
      line-height: 20px;
      height: 22px;
      padding: 0 7px;
      border: 1px solid rgba(0, 0, 0, 0.65);
      border: 1px solid #d9d9d9;
      border-radius: 4px;
      background: #fafafa;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
    }

    .roleNameDiv {
      height: 22px;
      line-height: 22px;
    }

    .roleId {
      padding-left: 4px;
    }
  }

  .roleItemSelected {
    border-right: 6px solid #1890ff;
    transition: all 0.3s ease-in-out;
  }
}

.roleName {
  text-align: left !important;
  padding-left: 10px;
}
</style>
