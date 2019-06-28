<template>
  <a-modal
    title="添加角色信息"
    :width="560"
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
        <a-col :span="24">
          <a-form-item label="角色名称" v-bind="itemLayout">
            <a-input
              size="small"
              v-decorator="['roleName',{rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24" class="remark">
          <a-form-item label="备注" :labelCol="{span:7}" :wrapperCol="{span:13}">
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
import { Modal } from "ant-design-vue";
Vue.use(Modal);
export default {
  props: {
    handleAddOk: {
      //父组件传递添加方法
      type: Function,
      required: true,
      default: null
    }
  },
  data() {
    return {
      itemLayout: { labelCol: { span: 7 }, wrapperCol: { span: 13 } },
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
    }
  }
};
</script>

<style lang="scss" scoped>
 
</style>
