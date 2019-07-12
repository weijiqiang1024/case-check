<template>
  <a-modal
    title="添加案件信息"
    :width="1280"
    :visible="visible"
    :destroyOnClose="true"
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
            <base-info
              ref="baseInfo"
              :record="{}"
              :disabled="disabled"
              :processPersonArr="processPersonArr"
            />
          </div>
        </div>
      </div>
      <div class="personInfo">
        <div class="panel">
          <div class="panelName">涉案人员</div>
          <div class="panelContent">
            <person-info ref="personInfo" :record="[]" :disabled="disabled" />
          </div>
        </div>
      </div>
      <div class="dealInfo">
        <div class="panel">
          <div class="panelName">案件程序</div>
          <div class="panelContent">
            <case-type ref="caseType" :record="{}" :disabled="disabled" />
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
import caseType from "./caseType";
Vue.use(Modal);
export default {
  components: {
    "base-info": baseInfo,
    "person-info": personInfo,
    "case-type": caseType
  },
  props: {
    handleAddOk: {
      //父组件传递添加方法
      type: Function,
      required: true,
      default: null
    },
    processPersonArr: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      visible: this.addModalVisible, //modal框显示隐藏
      confirmLoading: false, //提交操作loading显示
      disabled: false,
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
        personInfo = this.$refs.personInfo.getCasePerson(),
        dealInfo = this.$refs.caseType.getDealData();

      if (!dealInfo) {
        this.$message.warning("处理程序必填！");
        return;
      }

      if (personInfo == "[]") {
        this.$message.warning("涉案人不能为空");
        return;
      }
      personInfo = JSON.stringify(personInfo);
      if (baseInfo) {
        baseInfo.relationPersons = personInfo;
        baseInfo.processType = dealInfo.processType;
        this.handleAddOk(baseInfo);
      } else {
        return false;
      }
    },
    handleCancel() {
      //取消方法（也用重置表单状态调用）
      this.visible = false;
      //重置数据
      this.$refs.baseInfo.resetFields();
      this.$refs.personInfo.resetFields();
      this.$refs.caseType.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
// $shadow: 0px 17px 10px -10px rgba(0, 0, 0, 0.4);
$shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
$border-radius: 8px;

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
  border-radius: $border-radius;
  box-shadow: $shadow;
}

.panel {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background: #108ee9;
  border-radius: $border-radius;
}

.panelName {
  width: 10%;
  text-align: center;
  vertical-align: center;
  height: 100%;
  color: #fff;
  font-size: 14;
  font-weight: 700;
  border-radius: $border-radius;
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
  border-radius: $border-radius;
  box-shadow: $shadow;
}

.dealInfo {
  position: relative;
  display: inline-block;
  width: 94%;
  margin: 4px 0 14px;
  margin-left: 3%;
  border-radius: $border-radius;
  box-shadow: $shadow;
}
</style>
