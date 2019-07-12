<template>
  <a-modal
    title="更改用户密码"
    :width="560"
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
        <a-col :span="24">
          <a-form-item label="旧密码" v-bind="formItemLayout">
            <a-input
              id="userName"
              size="small"
              type="password"
              v-decorator="['oldPassword',{rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16"></a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="新密码" v-bind="formItemLayout">
            <a-input
              size="small"
              type="password"
              v-decorator="['newPassword',{rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="确认密码" v-bind="formItemLayout">
            <a-input
              size="small"
              type="password"
              v-decorator="['confirmPassword',{rules: [{required: true,message:'不能为空'}]}]"
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
import reqApi from "@/api";
import request from "@/utils/request";
Vue.use(Modal);

export default {
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
          if (values.newPassword != values.confirmPassword) {
            this.$message.error("两次密码不一致！");
            return;
          }
          this.handleChangeOk(values);
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
    },
    handleChangeOk(values) {
      let useInfo = sessionStorage.getItem("user_info");
      useInfo && (values.userId = JSON.parse(useInfo).userId);
      request.post(reqApi.changePassword, values).then(res => {
        if (!res) return;
        this.$message.success(res.msg);
        this.$router.push({ name: "login" });
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
