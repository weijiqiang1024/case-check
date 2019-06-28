<template>
  <a-modal
    :title="`${modalTitle}系统代码`"
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
          <a-form-item label="字典编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              :disabled="disabled"
              v-decorator="['codeNo',{initialValue:record.codeNo},{rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="字典名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              :disabled="disabled"
              v-decorator="['codeName', {initialValue:record.codeName},{rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="字典类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select
              v-decorator="['codeTypeNo',{initialValue:record.codeTypeNo},{rules: [{required: true,message:'不能为空'}]}]"
              style="width:184px"
              size="small"
              :allowClear="true"
              :disabled="disabled"
            >
              <a-select-option v-for="(name,value) in codeType" :key="value">{{name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="是否启用:" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-radio-group
              v-decorator="['enableFlag',{initialValue:record.enableFlag + ''||'1'}]"
              size="small"
              :disabled="disabled"
            >
              <a-radio value="1">启用</a-radio>
              <a-radio value="2">不启用</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="是否编辑" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-radio-group
              size="small"
              v-decorator="['editFlag',{initialValue:record.editFlag + ''||'1'},{rules: [{required: false}]}]"
              :disabled="disabled"
            >
              <a-radio value="1">是</a-radio>
              <a-radio value="2">否</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="0">
        <a-col :span="24">
          <a-form-item label="备注" :labelCol="{span:3}" :wrapperCol="{span:17}">
            <a-input
              size="small"
              :disabled="disabled"
              v-decorator="['remark',{initialValue:record.remark || ''}, {rules: [{required: false}]}]"
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
Vue.use(Modal);
export default {
  props: {
    codeType:{
      type: Object,
      required: true,
      default: null
    },
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
  