<template>
  <a-modal
    title="添加机构"
    :width="760"
    :visible="visible"
    :confirmLoading="confirmLoading"
    cancelText="取消"
    okText="确定"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <!-- <a-spin :spinning="confirmLoading"> -->
    <a-form :form="form">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="机构代码" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              v-decorator="['orgCode',{rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="机构名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              v-decorator="['orgName', {rules: [{required: true,message:'不能为空'}]}]"
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
              v-decorator="['parentOrgId', {rules: [{required: true,message:'不能为空'}]}]"
              size="small"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="机构类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              v-decorator="['orgType',{rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="机构电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              v-decorator="['orgPhoneNbr',{initialValue:''},{rules: [{required: false}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="负责人名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              v-decorator="['orgHeaderName', {initialValue:''},{rules: [{required: false}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="负责人电话" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              v-decorator="['orgHeaderNbr',{initialValue:''}, {rules: [{required: false}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="机构地址" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              v-decorator="['addressDesc', {initialValue:''},{rules: [{required: false}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16" type="flex" justify="start">
        <a-col :span="24">
          <a-form-item label="备注" :labelCol="{span:3}" :wrapperCol="{span:19}">
            <a-input
              size="small"
              v-decorator="['remark', {initialValue:''},{rules: [{required: false}]}]"
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
Vue.use(Modal);
Vue.use(TreeSelect);
export default {
  props: {
    treeData: {
      //机构树原始数据
      type: Array,
      required: true,
      default: () => []
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
      const {
        form: { validateFields }
      } = this;
      this.confirmLoading = true;
      validateFields((errors, values) => {
        if (!errors) {
          this.handleAddOk(values);
        } else {
          this.confirmLoading = false;
        }
      });
    },
    handleCancel() {
      //取消方法（也用重置表单状态调用）
      this.visible = false;
      this.confirmLoading = false;
      this.form.resetFields();
    },
    onChange(value) {
      this.value = value;
    }
  }
};
</script>

<style lang="scss" scoped>
.remark {
  transform: translateX(4%);
}
</style>
