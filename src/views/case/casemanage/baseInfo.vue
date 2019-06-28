<template>
  <a-form :form="form" class="form">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-form-item label="发生时间" v-bind="formItemLayout">
          <a-date-picker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            size="small"
            style="width:100%"
            v-decorator="['happenTime',{rules: [{required: true,message:'不能为空'}]}]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="发生地点" v-bind="formItemLayout">
          <a-input
            size="small"
            v-decorator="['happenAddress', {rules: [{required: true,message:'不能为空'}]}]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="经办人" v-bind="formItemLayout">
          <a-input
            size="small"
            v-decorator="['processPerson', {rules: [{required: false,message:'不能为空'}]}]"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-form-item label="死亡" v-bind="formItemLayout">
          <a-input
            addonAfter="人"
            size="small"
            v-decorator="['deathNbr', {rules: [{required: false,message:'不能为空'}]}]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="受伤" v-bind="formItemLayout">
          <a-input
            addonAfter="人"
            size="small"
            v-decorator="['hurtNbr', {rules: [{required: false,message:'不能为空'}]}]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="经济损失" v-bind="formItemLayout">
          <a-input
            addonAfter="元"
            size="small"
            v-decorator="['lossNbr', {rules: [{required: false,message:'不能为空'}]}]"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- <a-row :gutter="16">
      
      
    </a-row>-->
    <a-row :gutter="16">
      <a-col :span="21" class="remark">
        <a-form-item label="原因" :labelCol="{span:3}" :wrapperCol="{span:18}">
          <a-input
            size="small"
            v-decorator="['reason', {initialValue:''},{rules: [{required: false}]}]"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="21" class="remark">
        <a-form-item label="备注" :labelCol="{span:3}" :wrapperCol="{span:18}">
          <a-input
            size="small"
            v-decorator="['remark', {initialValue:''},{rules: [{required: false}]}]"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import moment from "moment";
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
  },
  methods: {
    moment,
    getFormData() {
      let v = {};
      this.form.validateFields((errors, values) => {
        if (!errors) {
          if (values.happenTime) {
            values.happenTime = moment(values.happenTime).format("YYYY-MM-DD HH:mm:ss");
          }
          v = Object.assign(v, values);
        } else {
          return false;
        }
      });
      return v;
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
