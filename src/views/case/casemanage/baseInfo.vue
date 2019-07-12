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
            v-decorator="['happenTime',{initialValue:record && record.happenTime? moment(record.happenTime):moment(),rules: [{required: true,message:'不能为空'}]}]"
            :disabled="disabled"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="发生地点" v-bind="formItemLayout">
          <a-input
            size="small"
            :disabled="disabled"
            v-decorator="['happenAddress', {initialValue:record.happenAddress,rules: [{required: true,message:'不能为空'}]}]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="经办人" v-bind="formItemLayout">
          <!-- <a-input
            size="small"
            :disabled="disabled"
            v-decorator="['processPerson', {initialValue:record.processPerson,rules: [{required: true,message:'不能为空'}]}]"
          />-->
          <a-select
            v-decorator="['processPerson',{initialValue:record.processPerson,rules: [{required: true,message:'不能为空'}]}]"
            size="small"
            :disabled="disabled"
            :allowClear="true"
          >
            <a-select-option v-for="p in processPersonArr" :key="p.username">{{p.fullName}}</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-form-item label="死亡" v-bind="formItemLayout">
          <a-input
            addonAfter="人"
            size="small"
            :disabled="disabled"
            v-decorator="['deathNbr', {initialValue:record.deathNbr-0||0,rules: [{required: false,pattern:/^(0|\+?[1-9][0-9]*)$/,
            message:'请正确填写数字'}]}]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="受伤" v-bind="formItemLayout">
          <a-input
            addonAfter="人"
            size="small"
            :disabled="disabled"
            v-decorator="['hurtNbr', {initialValue:record.hurtNbr-0|| 0,rules: [{required: false,pattern:/^(0|\+?[1-9][0-9]*)$/,
            message:'请正确填写数字'}]}]"
          />
        </a-form-item>
      </a-col>
      <a-col :span="8">
        <a-form-item label="经济损失" v-bind="formItemLayout">
          <a-input
            addonAfter="元"
            size="small"
            :disabled="disabled"
            v-decorator="['lossNbr', {initialValue:record.lossNbr-0 || 0,rules: [{required: false,pattern:/^[0-9]+.?[0-9]*$/,
            message:'请正确填写数字'}]}]"
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
            :disabled="disabled"
            v-decorator="['reason', {initialValue:record.reason||''},{initialValue:''},{rules: [{required: false}]}]"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="21" class="remark">
        <a-form-item label="备注" :labelCol="{span:3}" :wrapperCol="{span:18}">
          <a-input
            size="small"
            :disabled="disabled"
            v-decorator="['remark',{initialValue:record.remark || ''}, {initialValue:''},{rules: [{required: false}]}]"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script>
import moment from "moment";
export default {
  props: {
    record: {
      type: Object,
      required: true,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      required: true,
      default: false
    },
    processPersonArr: {
      type: Array,
      required: true,
      default: () => []
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
    moment,
    getFormData() {
      let v = {};
      this.form.validateFields((errors, values) => {
        if (!errors) {
          if (values.happenTime) {
            values.happenTime = moment(values.happenTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          }
          v = Object.assign(v, values);
        } else {
          this.$message.warning("请检查基础信息！");
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
