<template>
  <a-modal
    :title="`${modalTitle}流程配置`"
    :width="760"
    :visible="visible"
    :confirmLoading="confirmLoading"
    cancelText="取消"
    okText="确定"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :okButtonProps="{ props: {disabled: disabled} }"
    :cancelButtonProps="{ props: {disabled: disabled} }"
  >
    <!-- <a-spin :spinning="confirmLoading"> -->
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select
                    v-decorator="['festivalType',{initialValue:record.flowType},{rules: [{required: true,message:'类型不能为空'}]}]"
                    style="width:184px"
                    size="small"
                    :allowClear="true"
                    :disabled="true"
            >
              <a-select-option v-for="(name,value) in $getCodeByType('002')" :key="value">{{name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="处理天数:" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number
                    :min="1"
                    size="small"
                    :disabled="disabled"
                    v-decorator="['days',{initialValue:record.days || ''}, {rules: [{required: true,message:'处理天数不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="提醒内容:" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
                    size="small"
                    :disabled="disabled"
                    v-decorator="['warningMsg',{initialValue:record.warningMsg || ''}, {rules: [{required: false}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>
  
  <script>
import Vue from "vue";
import { Modal } from "ant-design-vue";
import moment from "moment";
Vue.use(Modal);
export default {
  props: {
    handleEditOk: {
      //eidt处理方法
      type: Function,
      required: true,
      default: null
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
      form: this.$form.createForm(this)
    };
  },
  methods: {
    moment,
    edit(record, disabled = false) {
      //控制莫套框 显示/隐藏
      if (record) {
        this.record = Object.assign(this.record, record);
      }
      this.modalTitle = !disabled ? "修改" : "查看";
      this.disabled = disabled;
      this.visible = true;
    },
    handleSubmit() {
      //提交方法
      const {
        form: { validateFields }
      } = this;
      this.confirmLoading = true;
      validateFields((errors, values) => {
        if (!errors) {
          values = Object.assign(this.record, values);
          this.handleEditOk(values);
        } else {
          this.confirmLoading = false;
        }
      });
    },
    handleCancel() {
      //取消
      this.visible = false;
      this.confirmLoading = false;
      this.form.resetFields();
    }
  }
};
</script>
  
 <style lang="scss" scoped>
.remark {
  transform: translateX(4%);
}
</style>
  