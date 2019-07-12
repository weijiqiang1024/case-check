<template>
  <div class="_layout">
    <div class="_main_page">
      <div class="treeInfo">
        <div class="treeNameArea roleName">
          <span>角色信息</span>
          <a-button
            v-auth="['roles','add']"
            type="default"
            shape="circle"
            icon="plus"
            class="addRoleBtn"
            @click="$refs.addForm.add()"
          />
        </div>
        <div class="treeArea" style="background:#f0f2f5">
          <div class="orgTreeDiv">
            <div v-if="dataSource.length != 0">
              <roleList :roleList="dataSource" v-on:selectRoleId="getAuthListByRoleId" />
            </div>
          </div>
        </div>
        <AddModal ref="addForm" :handleAddOk="handleAddOk" />
      </div>
      <div class="mainArea">
        <div class="searchArea" style="border:0px;">
          <div v-if="dataSource.length != 0 && allPageAuths.length != 0 && hasSelectStatus">
            <AuthList :roleId="roleId" :allPageAuths="allPageAuths" :hasSelect="hasSelect" />
          </div>
        </div>
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
import AuthList from "./authList";
export default {
  components: {
    AddModal,
    RoleList,
    AuthList
  },
  data() {
    return {
      listHeight: 0,
      dataSource: [],
      allPageAuths: [],
      hasSelect: {},
      hasSelectStatus: false,
      roleId: ""
    };
  },
  created() {
    this.listHeight = document.body.clientHeight - 380;
  },
  mounted() {
    //默认数据查询
    this.handleSearch();
    this.getAllPageAuth();
  },
  methods: {
    handleSearch() {
      //机构列表查询方法
      request
        .get(reqApi.roleList, {})
        .then(res => {
          this.dataSource = _.cloneDeep(res.result.rows);
          this.hasSelectStatus = false;
          this.roleId = this.dataSource[0]["roleId"];
          this.getAuthListByRoleId(this.dataSource[0]["roleId"] || "");
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
    },
    getAllPageAuth() {
      request.get(reqApi.getAllPageAuth, {}).then(res => {
        if (res) {
          let data = _.cloneDeep(res.result);
          let temp = [];
          data.map(item => {
            let o = {};
            o.routeCode = item.routeCode;
            o.routeName = item.routeName;
            o.operates = [];
            if (item.operates && item.operates.length > 0) {
              item.operates.map(i => {
                let t = {};
                t.operateCode = i.operateCode;
                t.operateName = i.operateName;
                t.label = i.operateName;
                t.value = i.operateCode;
                o.operates.push(t);
              });
            }
            temp.push(o);
          });
          this.allPageAuths = temp;
        }
      });
    },
    getAuthListByRoleId(id) {
      let that = this;
      this.roleId = id;
      this.hasSelectStatus = false;
      request.get(reqApi.getAuthByRoleId, { id }).then(res => {
        that.hasSelect = {};
        if (res) {
          let data = res.result;
          let o = {};
          data.forEach(ele => {
            o[ele.authCode] = {};
            o[ele.authCode]["has"] = true;
            o[ele.authCode]["auth"] = ele.operateCodes.split(",");
          });
          that.hasSelect = o;
          that.hasSelectStatus = true;
        }
      });
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
