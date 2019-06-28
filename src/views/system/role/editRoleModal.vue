<template>
  <a-modal
    :title="`${modalTitle}角色信息`"
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
        <a-col :span="24">
          <a-form-item label="角色名称" v-bind="itemLayout">
            <a-input
              size="small"
              :disabled="disabled"
              v-decorator="['roleName',{initialValue:record.roleName},{rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="24">
          <a-form-item label="备注" :labelCol="{span:7}" :wrapperCol="{span:13}">
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
    handleEditOk: {
      //eidt处理方法
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
  