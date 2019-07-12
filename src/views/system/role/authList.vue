
<template>
  <div>
    <div class="listItem" style="height:calc(100vh - 250px);overflow-y:auto;">
      <a-list itemLayout="horizontal" :dataSource="allPageAuths">
        <a-list-item slot="renderItem" slot-scope="item,index">
          <AuthCheck
            :key="`auth${index}`"
            ref="AuthCheck"
            :plainOptions="item.operates"
            :routeName="item.routeName"
            :routeCode="item.routeCode"
            :ret="authSelect[item.routeCode]"
          />
        </a-list-item>
      </a-list>
    </div>
    <div class="saveButton">
      <a-button v-auth="['roles','authUpdate']" type="primary" @click="saveAuth">保存修改</a-button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import reqApi from "@/api";
import request from "@/utils/request";
import AuthCheck from "./authCheck";

export default {
  components: {
    AuthCheck
  },
  props: {
    roleId: {
      type: String,
      required: true,
      default: () => ""
    },
    allPageAuths: {
      type: Array,
      required: true,
      default: () => []
    },
    hasSelect: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    let hasSelect = _.cloneDeep(this.hasSelect); //已选
    let authSelect = {};
    if (this.allPageAuths.length > 0) {
      this.allPageAuths.map(item => {
        if (hasSelect[item.routeCode]) {
          authSelect[item.routeCode] = hasSelect[item.routeCode];
        }
        if (!authSelect[item.routeCode]) {
          authSelect[item.routeCode] = { has: false, auth: [] };
        }
      });
    }
    return {
      dataList: [],
      authSelect: authSelect
      //   plainOptions
    };
  },
  created() {
    // this.getAuthList(this.roleId);
  },
  computed: {},
  mounted() {},
  methods: {
    saveAuth() {
      let authTemp = _.cloneDeep(this.authSelect);
      let auths = [];
      for (let i in authTemp) {
        if (authTemp[i].has) {
          let o = {
            authCode: i,
            operateCodes: authTemp[i]["auth"].join(",")
          };
          auths.push(o);
        }
      }
      let params = {
        id: this.roleId,
        auths: JSON.stringify(auths)
      };
      request.post(reqApi.addAuthForRole, params).then(res => {
        if (res) {
          this.$message.success(res.msg);
        }
      });
    }
  },
  watch: {
    // hasSelect: function(newValue, oldValue) {
    //   console.table(newValue, oldValue);
    // }
  }
};
</script>

<style lang="scss" scoped>
.authItem {
  display: flex;
  width: 100%;
}

.pageName {
  width: 10%;
  border-right: 2px solid #bfbfbf;
  font-size: 20px;
}

.operateName {
  width: 88%;
  padding: 0 16px;
}

.listItem {
  padding: 10px 20px;
  border: 1px solid #f0f2f5;
}

.saveButton {
    padding-top:20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
