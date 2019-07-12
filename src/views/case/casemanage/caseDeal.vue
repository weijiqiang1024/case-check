<template>
  <a-form :form="form" class="form">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item label="处理方式" v-bind="formItemLayout">
          <a-select v-decorator="['processType',{initialValue:record.processType},{rules: [{required: true,message:'不能为空'}]}]" size="small" :allowClear="true">
            <a-select-option value="1">简易程序</a-select-option>
            <a-select-option value="2">一般程序</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <!-- <a-row :gutter="16">
      <a-col :span="12">
        <a-form-item label="死亡" v-bind="formItemLayout">
          <a-input
            addonAfter="人"
            size="small"
            v-decorator="['codeName', {rules: [{required: true,message:'不能为空'}]}]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item label="受伤" v-bind="formItemLayout">
          <a-input
            addonAfter="人"
            size="small"
            v-decorator="['codeName', {rules: [{required: true,message:'不能为空'}]}]"
          />
        </a-form-item>
      </a-col>
    </a-row>-->
  </a-form>
</template>

<script>
export default {
  props: {
    record: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 }
      },

      form: this.$form.createForm(this)
    };
  },
  methods: {
    getDealData() {
      let v = {};
      this.form.validateFields((errors, values) => {
        if (!errors) {
          v = Object.assign(v, values);
        } else {
          return false;
        }
      });
      return v;
    },
    resetFields() {
      this.form.resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.form {
  .ant-form-item {
    margin-bottom: 0px;
  }
}
</style>
