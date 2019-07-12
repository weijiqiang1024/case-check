<template>
  <div class="roleList">
    <template class="roleTemp" v-for="item in roleList">
      <div
        :key="item.roleId"
        @click="getRoleAuths(item.roleId)"
        :class="(selectRoleId == item.roleId)?['roleItem roleItemSelected']:'roleItem'"
      >
        <div class="roleNameDiv">
          <p class="roleName">{{item.roleName}}</p>
        </div>
        <div>
          <a-button
            v-auth="['roles','update']"
            type="default"
            icon="edit"
            size="small"
            style="margin-right:4px;"
            @click="e=>editRole(e,item)"
          ></a-button>
          <a-button
            v-if="item.roleName != 'admin'"
            v-auth="['roles','delete']"
            type="default"
            icon="delete"
            size="small"
            @click="e=>handleDel(e,item.roleId)"
          ></a-button>
        </div>
      </div>
    </template>
    <EditModal ref="editForm" :handleEditOk="handleEditOk" />
  </div>
</template>

<script>
// import _ from "lodash";
import reqApi from "@/api";
import request from "@/utils/request";
import EditModal from "./editRoleModal";
export default {
  components: {
    EditModal
  },
  props: {
    roleList: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      visibleTip: false,
      selectRoleId: this.roleList.length > 0 ? this.roleList[0]["roleId"] : ""
    };
  },
  mounted() {
    this.selectRoleId =
      this.roleList.length > 0 ? this.roleList[0]["roleId"] : "";
  },
  computed: {
    getSelectRole() {
      // debugger;
      return this.roleList.length > 0 ? this.roleList[0]["roleId"] : "";
    }
  },
  methods: {
    getRoleAuths(roleId) {
      if (roleId == this.selectRoleId) return;
      this.selectRoleId = roleId;
      this.$emit("selectRoleId", roleId);
    },
    handleDel(e, record) {
      e ? e.preventDefault() : null;
      e ? e.stopPropagation() : null;
      let that = this;
      this.$confirm({
        title: "确认删除?",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          if (record) {
            let obj = { ids: record };
            request.post(reqApi.delRole, obj).then(res => {
              that.$message.success(res.msg);
              that.selectRoleId =
                that.roleList.length > 0 ? that.roleList[0]["roleId"] : "";
              that.$parent.handleSearch();
            });
          }
        },
        onCancel() {
          console.log("Cancel");
        }
      });
      //删除、批量删除操作请求方法
    },
    delCancel() {},
    handleVisibleChange() {},
    visibleChange() {},
    editRole(e, record) {
      e ? e.preventDefault() : null;
      e ? e.stopPropagation() : null;
      //修改点击
      if (!record) return;
      this.$refs.editForm.edit(record);
    },
    handleEditOk(values) {
      //修改完成请求方法
      request
        .post(reqApi.editRole, values)
        .then(res => {
          this.$message.success(res.msg);
          this.$refs.editForm.handleCancel();
          this.$parent.handleSearch();
        })
        .finally(() => (this.$refs.editForm.confirmLoading = false));
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>
