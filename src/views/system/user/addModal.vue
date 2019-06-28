<template>
  <a-modal
    title="添加用户信息"
    :width="760"
    :visible="visible"
    :confirmLoading="confirmLoading"
    cancelText="取消"
    okText="确定"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <!-- <a-spin :spinning="confirmLoading"> -->
    <a-form :form="form" class="form">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="用户名" v-bind="formItemLayout">
            <a-input
              id="userName"
              size="small"
              v-decorator="['username',{rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="密码" v-bind="formItemLayout">
            <a-input
              size="small"
              v-decorator="['password', {rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="所属机构" v-bind="formItemLayout">
            <!-- <a-input size="small" v-decorator="['parentOrgId', {rules: [{required: true}]}]"/> -->
            <a-tree-select
              :treeData="treeData"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              allowClear
              treeDefaultExpandAll
              @change="onChange"
              v-decorator="['orgId', {rules: [{required: true,message:'不能为空'}]}]"
              size="small"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="姓名" v-bind="formItemLayout">
            <a-input
              size="small"
              v-decorator="['fullName',{rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="电话" v-bind="formItemLayout">
            <a-input
              size="small"
              v-decorator="['phoneNbr',{initialValue:''},{rules: [{required: false}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="是否启用" v-bind="formItemLayout">
            <a-radio-group v-decorator="['enableFlag',{initialValue:'1'}]" size="small">
              <a-radio value="1">启用</a-radio>
              <a-radio value="2">不启用</a-radio>
            </a-radio-group>
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
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 }
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
.form {
}
.remark {
  transform: translateX(4%);
}
</style>
