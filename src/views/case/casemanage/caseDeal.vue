<template>
  <a-form :form="form" class="form">
    <a-row :gutter="16">
         <a-col :span="12">
        <a-form-item label="处理方式" v-bind="formItemLayout">
          <a-input
            size="small"
            v-decorator="['codeName', {rules: [{required: true,message:'不能为空'}]}]"
          />
        </a-form-item>
      </a-col>
      <!-- <a-col :span="12">
        <a-form-item label="处理时间" v-bind="formItemLayout">
          <a-date-picker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            size="small"
            style="width:100%"
            v-decorator="['codeNo',{rules: [{required: true,message:'不能为空'}]}]"
          />
        </a-form-item>
      </a-col> -->
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
    </a-row> -->
  </a-form>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 12 }
      },

      form: this.$form.createForm(this)
    };
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
