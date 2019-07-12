<template>
  <a-modal
    :title="modalTitle"
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
          <a-form-item label="机构代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              :disabled="disabled"
              v-decorator="['orgCode',{initialValue:record.orgCode,rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="机构名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              :disabled="disabled"
              v-decorator="['orgName', {initialValue:record.orgName,rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="父机构" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <!-- <a-input size="small" v-decorator="['parentOrgId', {rules: [{required: true}]}]"/> -->
            <a-tree-select
              :treeData="treeData"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              allowClear
              treeDefaultExpandAll
              @change="onChange"
              v-decorator="['parentOrgId', {initialValue:record.parentOrgId,rules: [{required: true,message:'不能为空'}]}]"
              size="small"
              :disabled="disabled"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="机构权限" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-search
              @search="onCreate"
              size="small"
              :disabled="disabled"
              v-decorator="['orgPrivilegeCode', {initialValue:record.orgPrivilegeCode || '',rules: [{required: true,message:'不能为空'}]}]"
            >
              <a-button slot="enterButton" type="primary">生成</a-button>
            </a-input-search>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="机构电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              :disabled="disabled"
              v-decorator="['orgPhoneNbr',{initialValue:record.orgPhoneNbr,rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="负责人名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              :disabled="disabled"
              v-decorator="['orgHeaderName',{initialValue:record.orgHeaderName || '',rules: [{required: false}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="负责人电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              :disabled="disabled"
              v-decorator="['orgHeaderNbr',{initialValue:record.orgHeaderNbr || '',rules: [{required: false}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="机构地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              :disabled="disabled"
              v-decorator="['addressDesc',{initialValue:record.addressDesc || '',rules: [{required: false}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" type="flex" justify="start">
        <a-col :span="12">
          <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              :disabled="disabled"
              v-decorator="['remark',{initialValue:record.remark || '',rules: [{required: false}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <!-- </a-spin> -->
  </a-modal>
</template>
  
  <script>
import Vue from "vue";
import { Modal, TreeSelect } from "ant-design-vue";
import reqApi from "@/api/index";
import request from "@/utils/request";
Vue.use(Modal);
Vue.use(TreeSelect);
export default {
  props: {
    treeData: {
      //orgTree数据源
      type: Array,
      required: true,
      default: () => []
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
      value: undefined, //父机构值
      record: {}, //表单原始数据从父组件传来
      disabled: false, //用于区别修改和查看操作
      modalTitle: "修改机构",
      form: this.$form.createForm(this)
    };
  },
  methods: {
    edit(record, disabled = false) {
      debugger;
      //控制莫套框 显示/隐藏
      if (record) {
        this.record = Object.assign(this.record, record);
      }
      this.modalTitle = !disabled ? "修改机构" : "查看机构";
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
    },
    onChange(value) {
      this.value = value;
    },
    onCreate() {
      let parentOrgId = this.form.getFieldValue("parentOrgId");
      if (!parentOrgId) {
        this.$message.warning("请先选择父机构！");
        return false;
      }
      request
        .get(reqApi.createOrgPrivilegeCodeByParentOrgId, {
          parentOrgId: parentOrgId
        })
        .then(res => {
          if (!res) return false;
          this.form.setFieldsValue({ orgPrivilegeCode: res.result });
        });
    }
  }
};
</script>
  
 <style lang="scss" scoped>
.remark {
  transform: translateX(4%);
}
</style>
  