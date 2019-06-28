<template>
  <a-modal
    title="添加代码类型"
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
          <a-form-item label="字典类型编号" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              v-decorator="['codeTypeNo',{rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="字典类型名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
              size="small"
              v-decorator="['codeTypeName', {rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="是否启用:" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-radio-group v-decorator="['enableFlag',{initialValue:'1'}]" size="small">
              <a-radio value="1">启用</a-radio>
              <a-radio value="2">不启用</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="是否编辑" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-radio-group
              size="small"
              v-decorator="['editFlag',{initialValue:'1'},{rules: [{required: false}]}]"
            >
              <a-radio value="1">启用</a-radio>
              <a-radio value="2">不启用</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>

      <a-row :gutter="0">
        <a-col :span="20" class="remark">
          <a-form-item label="备注" :labelCol="{span:3}" :wrapperCol="{span:17}">
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
.remark {
  transform: translateX(4%);
}
</style>
