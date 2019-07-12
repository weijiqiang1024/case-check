<template>
  <a-modal
    :title="`${modalTitle}节假日`"
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
        <a-col :span="12">
          <a-form-item label="年份" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input
                    size="small"
                    :disabled="true"
                    v-decorator="['year',{initialValue:record.year,rules: [{required: true,message:'年份不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="节假日类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select
                    v-decorator="['festivalType',{initialValue:record.festivalType,rules: [{required: true,message:'节假日类型不能为空'}]}]"
                    style="width:184px"
                    size="small"
                    :allowClear="true"
                    :disabled="true"
            >
              <a-select-option v-for="(name,value) in $getCodeByType('004')" :key="value">{{name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="0">
        <a-col :span="12">
          <a-form-item label="日期范围:" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-range-picker
                    :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
                    format="YYYY-MM-DD"
                    size="small"
                    style="width:100%"
                    :disabled="disabled"
                    v-decorator="['rangeDate',{initialValue:[moment(record.startDate,'YYYY-MM-DD'),moment(record.endDate,'YYYY-MM-DD')],rules: [{required: true,message:'日期不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="0">
        <a-col :span="12">
          <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="{span:17}">
            <a-input
              size="small"
              :disabled="disabled"
              v-decorator="['remark',{initialValue:record.remark || '',rules: [{required: false}]}]"
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
import moment from "moment";
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
      record: {}, //表单原始数据从父组件传来
      disabled: false, //用于区别修改和查看操作
      modalTitle: "修改",
      form: this.$form.createForm(this)
    };
  },
  methods: {
    moment,
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
          const rangeDate = values['rangeDate'];
          if(rangeDate&&rangeDate.length>0) {
              values.startDate = moment(rangeDate[0]).format('YYYY-MM-DD');
              values.endDate = moment(rangeDate[1]).format('YYYY-MM-DD');
          }
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
  