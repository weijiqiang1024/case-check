<template>
  <div class="_layout">
    <div class="_main_page">
      <div class="treeInfo">
        <div class="treeNameArea roleName">
          <span>角色信息</span>
          <a-button
            type="default"
            shape="circle"
            icon="plus"
            class="addRoleBtn"
            @click="$refs.addForm.add()"
          />
        </div>
        <div class="treeArea" style="background:#f0f2f5">
          <div class="orgTreeDiv">
            <roleList :roleList="dataSource"/>
          </div>
        </div>
        <AddModal ref="addForm" :handleAddOk="handleAddOk"/>
      </div>
      <div class="mainArea">
        <div class="searchArea"></div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import request from "@/utils/request";
import reqApi from "@/api/index";
import AddModal from "./addRoleModal";
import RoleList from "./roleList";
export default {
  components: {
    AddModal,
    RoleList
  },
  data() {
    return {
      dataSource: []
    };
  },
  mounted() {
    //默认数据查询
    this.handleSearch();
  },
  computed: {
    getDataSource() {
      return this.dataSource;
    }
  },
  methods: {
    handleSearch() {
      //机构列表查询方法
      request
        .get(reqApi.roleList, {})
        .then(res => {
          this.dataSource = _.cloneDeep(res.result.rows);
        })
        .finally(() => (this.loading = false));
    },
    handleAddOk(values) {
      //添加操作请求方法
      request
        .post(reqApi.addRole, values)
        .then(res => {
          this.$message.success(res.msg);
          this.$refs.addForm.handleCancel();
          this.handleSearch();
        })
        .finally(() => (this.$refs.addForm.confirmLoading = false));
    }
  }
};
</script>

<style lang="scss" scoped>
@include layout(
  20%,
  80%
); //20%--机构树区域 80%--查询条件和列表区域 若无机构区域 可设置 （0，,100%）

.roleName {
  text-align: left !important;
  padding-left: 10px;
}

.treeInfo {
  .addRoleBtn {
    position: absolute;
    left: 15.5%;
    top: 2px;
  }
}
</style>
