<template>
  <a-modal
    title="添加节假日"
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
          <a-form-item label="年份" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select
                    v-decorator="['year',{rules: [{required: true,message:'年份不能为空'}]}]"
                    style="width:184px"
                    size="small"
                    :allowClear="true"
            >
              <a-select-option v-for="(name,value) in yearType" :key="value">{{name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="节假日类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select
                    v-decorator="['festivalType',{rules: [{required: true,message:'节假日类型不能为空'}]}]"
                    style="width:184px"
                    size="small"
                    :allowClear="true"
            >
              <a-select-option v-for="(name,value) in $getCodeByType('004')" :key="value">{{name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="日期范围:" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-range-picker
                    :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
                    format="YYYY-MM-DD"
                    size="small"
                    style="width:100%"
                    v-decorator="['rangeDate',{rules: [{required: true,message:'日期不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="0">
        <a-col :span="12">
          <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="{span:17}">
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
import moment from "moment";
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
  mounted() {
    this.getYearType();
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
      form: this.$form.createForm(this),
      yearType:{}
    };
  },
  methods: {
    moment,
    add() {
      //控制莫套框 显示/隐藏
      this.visible = true;
    },
    getYearType(){
      let currentYear=new Date().getFullYear();
      for(let i=0;i<5;i++){
        this.yearType[currentYear+i]=currentYear+i;
      }
    },
    handleSubmit() {
      //表单数据提交方法
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
