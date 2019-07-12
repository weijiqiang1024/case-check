<template>
  <div class="authItem">
    <div class="pageName">
      <a-checkbox
        :indeterminate="indeterminate"
        @change="onCheckAllChange"
        :checked="checkAll"
      >{{routeName}}</a-checkbox>
    </div>
    <div class="operateName">
      <a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange">
        <span slot="label" slot-scope="{value}" class="itemWidth">{{value}}</span>
      </a-checkbox-group>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  props: {
    plainOptions: {
      type: Array,
      required: true,
      default: () => []
    },
    routeName: {
      type: String,
      required: true,
      default: () => {}
    },
    ret: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    let allOptions = [];
    if (this.plainOptions.length > 0) {
      this.plainOptions.map(item => {
        allOptions.push(item.operateCode);
      });
    }
    let checkedList = _.cloneDeep(this.ret.auth);
    let indeterminate =
      this.ret.has && allOptions.length > this.ret.auth.length;
    let checkAll = allOptions.length == this.ret.auth.length;
    return {
      checkedList,
      checkAll,
      indeterminate,
      allOptions
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onChange(newCheckedList) {
      //   let ind, cheall;
      let seacrFunc =
        _.findIndex(newCheckedList, o => o == "query") !== -1 ? true : false; //当前选中项
      let seacrFunPre =
        _.findIndex(this.ret.auth, o => o == "query") !== -1 ? true : false; //之前选中项
      //当前选了，之前没选
      if (newCheckedList.length > 0 && seacrFunc && !seacrFunPre) {
        this.ret.has = true;
      } else if (!seacrFunc && seacrFunPre) {
        //当前没选，之前选了
        newCheckedList.length = 0;
        this.ret.has = false;
      } else if (newCheckedList.length > 0 && !seacrFunc && !seacrFunPre) {
        //当前没选，之前没选
        newCheckedList.push("query");
        this.ret.has = true;
      }

      this.ret.auth = newCheckedList;

      this.indeterminate =
        !!newCheckedList.length &&
        newCheckedList.length < this.plainOptions.length;
      this.checkAll = newCheckedList.length === this.plainOptions.length;
    },
    onCheckAllChange(e) {
      this.ret.auth = e.target.checked ? this.allOptions : [];
      this.ret.has = e.target.checked;
      Object.assign(this, {
        checkedList: e.target.checked ? this.allOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      });
    }
  },
  watch: {
    // ret: function(newValue, oldValue) {
    //   this.checkedList.length = 0;
    //   this.checkedList = newValue.auth;
    //   this.indeterminate =
    //     newValue.has && newValue.auth.length < this.plainOptions.length;
    //   this.checkAll = newValue.length === this.plainOptions.length;
    // }
  }
};
</script>

<style lang="scss" scoped>
.authItem {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.pageName {
  width: 10%;
  border-right: 1px solid #bfbfbf;
  font-size: 20px;
}

.operateName {
  width: 88%;
  padding: 0 20px;
}

.itemWidth{
    padding:0 20px;
}
</style>
