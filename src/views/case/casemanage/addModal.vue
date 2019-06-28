<template>
  <a-modal
    title="添加案件信息"
    :width="1280"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    cancelText="取消"
    okText="确定"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <div class="contentArea">
      <div class="baseInfo">
        <div class="panel">
          <div class="panelName">基础信息</div>
          <div class="panelContent">
            <base-info ref="baseInfo"/>
          </div>
        </div>
      </div>
      <div class="personInfo">
        <div class="panel">
          <div class="panelName">涉案人员</div>
          <div class="panelContent">
            <person-info ref="personInfo"/>
          </div>
        </div>
      </div>
      <div class="dealInfo">
        <div class="panel">
          <div class="panelName">处理信息</div>
          <div class="panelContent">
            <case-deal/>
          </div>
        </div>
      </div>
    </div>
    <!-- </a-spin> -->
  </a-modal>
</template>

<script>
import Vue from "vue";
import { Modal } from "ant-design-vue";
import baseInfo from "./baseInfo";
import personInfo from "./casePerson";
import caseDeal from "./caseDeal";
Vue.use(Modal);
export default {
  components: {
    "base-info": baseInfo,
    "person-info": personInfo,
    "case-deal": caseDeal
  },
  props: {
    codeType: {
      type: Object,
      required: true,
      default: null
    },
    handleAddOk: {
      //父组件传递添加方法
      type: Function,
      required: true,
      default: null
    }
  },
  data() {
    return {
      visible: this.addModalVisible, //modal框显示隐藏
      confirmLoading: false, //提交操作loading显示
      form: this.$form.createForm(this)
    };
  },
  methods: {
    add() {
      //控制莫套框 显示/隐藏
      this.visible = true;
    },
    handleSubmit() {
      //表单数据提交方法
      let baseInfo = this.$refs.baseInfo.getFormData(),
        personInfo = this.$refs.personInfo.getCasePerson();
      if (baseInfo) {
        baseInfo = this.$refs.baseInfo.getFormData();
      }
      if (personInfo) {
        personInfo = JSON.stringify(personInfo);
      }

      if (baseInfo && personInfo) {
        baseInfo.relationPersons = personInfo;
        console.log(baseInfo, 999);
        this.handleAddOk(baseInfo);
      } else {
        return false;
      }
    },
    handleCancel() {
      //取消方法（也用重置表单状态调用）
      this.visible = false;
      this.confirmLoading = false;
      this.form.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
// $shadow: 0px 17px 10px -10px rgba(0, 0, 0, 0.4);
$shadow: 0 1px 2px rgba(0, 0, 0, 0.15);

.remark {
  transform: translateX(4%);
}

.contentArea {
  width: 100%;
  height: 100%;
  margin: -20px 0; //抵消antd-modal-body自带的padding
}

.baseInfo {
  position: relative;
  display: inline-block;
  width: 94%;
  margin: 14px 0 4px;
  margin-left: 3%;
  box-shadow: $shadow;
}

.panel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: #108ee9;
  border-radius: 8px;
}

.panelName {
  width: 10%;
  text-align: center;
  vertical-align: center;
  height: 100%;
  color: #fff;
  font-size: 14;
  font-weight: 700;
  border-radius: 6px;
  letter-spacing: 2px;
}

.panelContent {
  width: 90%;
  padding: 10px;
  background: #fff;
  border: 1px solid #e9e9e9;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}

.personInfo {
  position: relative;
  display: inline-block;
  width: 94%;
  margin: 4px 0;
  margin-left: 3%;
  box-shadow: $shadow;
}

.dealInfo {
  position: relative;
  display: inline-block;
  width: 94%;
  margin: 4px 0 14px;
  margin-left: 3%;
  box-shadow: $shadow;
}
</style>
