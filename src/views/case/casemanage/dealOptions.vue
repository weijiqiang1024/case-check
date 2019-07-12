/* 
 * @Title: 案件处理动态步骤显示项
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-07-01 15:32:05 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-07-12 13:49:25
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

 <template>
  <a-form :form="form" class="form">
    <a-row :gutter="16">
      <a-col :span="12">
        <span v-if="(['3','7'].indexOf(record.nextStatus) != -1)">
          <a-form-item :label="dealObj.label" v-bind="formItemLayout">
            <a-select
              v-decorator="[dealObj.fields,{rules: [{required: true,message:'不能为空'}]}]"
              size="small"
              :allowClear="true"
              @change="handleChange"
            >
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="2">否</a-select-option>
            </a-select>
          </a-form-item>
        </span>
        <span v-else-if="record.nextStatus == '13'">
          <a-form-item :label="dealObj.label" v-bind="formItemLayout">
            <a-select
              v-decorator="[dealObj.fields,{rules: [{required: true,message:'不能为空'}]}]"
              size="small"
              :allowClear="true"
            >
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="2">否</a-select-option>
            </a-select>
          </a-form-item>
        </span>
        <span v-else-if="record.nextStatus == '1'">
          <a-col :span="12">
            <a-form-item :label="dealObj.label" v-bind="formItemLayout">
              <a-date-picker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                size="small"
                style="width:100%"
                v-decorator="['processTime',{rules: [{required:true,message:'不能为空'}]}]"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item :label="dealObj.defineLabel" v-bind="formItemLayout">
              <a-select
                v-decorator="[dealObj.fields,{rules: [{required: true,message:'不能为空'}]}]"
                size="small"
                :allowClear="true"
              >
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="2">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </span>
        <span v-else>
          <a-col :span="12">
            <a-form-item :label="dealObj.label" v-bind="formItemLayout">
              <a-date-picker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                size="small"
                style="width:100%"
                v-decorator="['processTime',{rules: [{required: true,message:'不能为空'}]}]"
              />
            </a-form-item>
          </a-col>
        </span>
      </a-col>
      <span v-if="showExtra == '1' || record.nextStatus == '13'">
        <a-col :span="12">
          <a-form-item :label="dealObj.defineLabel" v-bind="formItemLayout">
            <a-date-picker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              size="small"
              style="width:100%"
              v-decorator="['processTime',{rules: [{required:true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
      </span>
      <span v-if="showExtra == '2' && record.nextStatus == '3'">
        <a-col :span="12">
          <a-form-item :label="dealObj.denyLabel" v-bind="formItemLayout">
            <a-date-picker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              size="small"
              style="width:100%"
              v-decorator="['processTime',{rules: [{required:true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item :label="dealObj.publishLabel" v-bind="formItemLayout">
            <a-select
              v-decorator="[dealObj.publishFields,{rules: [{required: true,message:'不能为空'}]}]"
              size="small"
              :allowClear="true"
            >
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="2">否</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </span>
      <!-- <span v-else></span> -->
    </a-row>
  </a-form>
</template>

<script>
import moment from "moment";
import { dealDic } from "@/utils/pub";
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
    }
  },
  data() {
    const dealObj = dealDic(this.record.nextStatus);
    return {
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 10 }
      },
      dealObj,
      showExtra: "",
      form: this.$form.createForm(this)
    };
  },
  computed: {
    // getShowExtra() {
    //   return this.showExtra;
    // }
  },
  methods: {
    moment,
    getDealData() {
      const {
        caseId,
        isCheck,
        status,
        processType,
        isEvidenceOpen,
        isPunish,
        isRepeatCheck
      } = this.record;
      let v = {
        caseId,
        isCheck,
        status,
        processType,
        isEvidenceOpen,
        isPunish,
        isRepeatCheck
      };
      this.form.validateFields((errors, values) => {
        if (!errors) {
          if (values.processTime) {
            values.processTime = moment(values.processTime).format(
              "YYYY-MM-DD HH:mm:ss"
            );
          }
          v = Object.assign(v, values);
        } else {
          return false;
        }
      });
      return v;
    },
    resetFields() {
      this.form.resetFields();
    },
    handleChange(value) {
      //   console.log(value);
      if (value) {
        this.showExtra = value;
      }
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

