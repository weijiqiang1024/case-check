<template>
  <a-modal
    :title="`${modalTitle}案件信息`"
    :width="1280"
    :visible="visible"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
    cancelText="取消"
    okText="确定"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :okButtonProps="{ props: {disabled: disabled} }"
    :cancelButtonProps="{ props: {disabled: disabled} }"
  >
    <!-- <a-spin :spinning="confirmLoading"> -->
    <div class="contentArea">
      <div class="baseInfo" v-if="disabled == true">
        <div class="panel">
          <div class="panelName">处理进度</div>
          <div class="panelContent">
            <StepsInfo ref="stepsInfo" :record="stepsArr" :disabled="disabled" />
          </div>
        </div>
      </div>
      <div class="baseInfo" :style="`margin-top:${disabled==false?14:4}px`">
        <div class="panel">
          <div class="panelName">基础信息</div>
          <div class="panelContent">
            <base-info
              ref="baseInfo"
              :record="record"
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
            <person-info ref="personInfo" :record="record.relations" :disabled="disabled" />
          </div>
        </div>
      </div>
      <div class="dealInfo">
        <div class="panel">
          <div class="panelName">案件程序</div>
          <div class="panelContent">
            <case-type ref="caseType" :record="record" :disabled="disabled" />
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>
  
  <script>
import Vue from "vue";
import { Modal } from "ant-design-vue";
import _ from "lodash";
import request from "@/utils/request";
import reqApi from "@/api";
import baseInfo from "./baseInfo";
import personInfo from "./casePerson";
import caseType from "./caseType";
import StepsInfo from "./stepsInfo";

Vue.use(Modal);
export default {
  components: {
    "base-info": baseInfo,
    "person-info": personInfo,
    "case-type": caseType,
    StepsInfo
  },
  props: {
    handleEditOk: {
      //eidt处理方法
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
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: this.addModalVisible, //modal框显示隐藏
      confirmLoading: false, //提交操作loading显示
      record: {}, //表单原始数据从父组件传来
      disabled: false, //用于区别修改和查看操作
      modalTitle: "修改",
      stepsArr: [], //流程进度信息
      form: this.$form.createForm(this)
    };
  },
  methods: {
    edit(record, disabled = false) {
      // console.log(record,'bbbbb');
      //控制莫套框 显示/隐藏
      if (record) {
        this.record = Object.assign(this.record, record);
      }
      this.getFlowLine(this.record.caseId);
      this.modalTitle = !disabled ? "修改" : "查看";
      this.disabled = disabled;
      this.visible = true;
    },
    handleSubmit() {
      //提交方法
      //表单数据提交方法
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
        this.handleEditOk(baseInfo);
      } else {
        return false;
      }
    },
    handleCancel() {
      //取消
      this.visible = false;
      //重置数据
      this.$refs.baseInfo.resetFields();
      this.$refs.personInfo.resetFields();
      this.$refs.caseType.resetFields();
    },
    getFlowLine(caseId) {
      if (!caseId) return;
      request.get(reqApi.flowLine, { caseId }).then(res => {
        let data = _.cloneDeep(res.result.nodes);
        let nodes = [];
        data.map(item => {
          let isTimeOutFlag = "color:rgba(0,0,0,.65)";
          if (item.isTimeout == "1") isTimeOutFlag = "color:#f00";
          let temp = {
            title: this.$getCodeName("001", item.status),
            description: (
              <div style="display:inlin-block;transform:translateX(-30px)">
                <span style={isTimeOutFlag}>{item.username}</span>
                <br />
                <span style={isTimeOutFlag}>{item.processTime}</span>
                <br />
                <span style={isTimeOutFlag}>{item.timeoutDay ? item.timeoutDay : null}</span>
              </div>
            ),
            username: item.username,
            processTime: item.processTime,
            is_timeout: item.isTimeout,
            timeout_day: item.timeoutDay
          };
          nodes.push(temp);
        });
        this.stepsArr.length = 0;
        this.stepsArr = nodes;
      });
    }
  }
};
</script>
  
 <style lang="scss" scoped>
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
  border-radius: 8px;
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
  border-radius: 8px;
  box-shadow: $shadow;
}

.dealInfo {
  position: relative;
  display: inline-block;
  width: 94%;
  margin: 4px 0 14px;
  margin-left: 3%;
  border-radius: 8px;
  box-shadow: $shadow;
}
</style>
  