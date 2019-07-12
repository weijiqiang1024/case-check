/* 
 * @Title: 案件处理动态步骤显示项
 * @Description: Todo 
 * @Author: weijq@cychina.cn (韦继强) 
 * @Date: 2019-07-01 15:32:05 
 * @Last Modified by: weijq@cychina.cn (韦继强)
 * @Last Modified time: 2019-07-12 13:51:41
 * @Version:V1.0 
 * Copyright: Copyright (c) 2017' 
 */

 <template>
  <a-form :form="form" class="form">
    <a-row :gutter="16">
      <a-col>
        <span v-if="record.nextStatus == '1'">
          <a-form-item label="事故确认时间" v-bind="formItemLayout">
            <a-date-picker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              size="small"
              style="width:100%"
              v-decorator="['processTime',{rules: [{required:true,message:'不能为空'}]}]"
            />
          </a-form-item>
          <a-form-item label="是否处罚" v-bind="formItemLayout">
            <a-select
              v-decorator="['isPunish',{rules: [{required: true,message:'不能为空'}]}]"
              size="small"
              :allowClear="true"
            >
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="2">否</a-select-option>
            </a-select>
          </a-form-item>
        </span>
        <span v-else-if="record.nextStatus == '2'">
          <a-form-item label="处罚时间" v-bind="formItemLayout">
            <a-date-picker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              size="small"
              style="width:100%"
              v-decorator="['processTime',{rules: [{required:true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </span>
        <span v-else-if="record.nextStatus == '3'">
          <a-form-item label="是否检定" v-bind="formItemLayout">
            <a-select
              v-decorator="['isCheck',{rules: [{required: true,message:'不能为空'}]}]"
              size="small"
              :allowClear="true"
              @change="handleChange"
            >
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="2">否</a-select-option>
            </a-select>
          </a-form-item>
          <span v-if="showExtra == '1'">
            <a-form-item label="委托时间" v-bind="formItemLayout">
              <a-date-picker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                size="small"
                style="width:100%"
                v-decorator="['processTime',{rules: [{required:true,message:'不能为空'}]}]"
              />
            </a-form-item>
          </span>
          <span v-else-if="showExtra == '2'">
            <a-form-item label="事故确认时间" v-bind="formItemLayout">
              <a-date-picker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                size="small"
                style="width:100%"
                v-decorator="['processTime',{rules: [{required:true,message:'不能为空'}]}]"
              />
            </a-form-item>
            <a-form-item label="是否处罚" v-bind="formItemLayout">
              <a-select
                v-decorator="['isPunish',{rules: [{required: true,message:'不能为空'}]}]"
                size="small"
                :allowClear="true"
              >
                <a-select-option value="1">是</a-select-option>
                <a-select-option value="2">否</a-select-option>
              </a-select>
            </a-form-item>
          </span>
        </span>
        <span v-else-if="(['4','5','6','8','9','10','11'].indexOf(record.nextStatus) != -1)">
          <a-form-item :label="dealObj.label" v-bind="formItemLayout">
            <a-date-picker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              size="small"
              style="width:100%"
              v-decorator="['processTime',{rules: [{required:true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </span>
        <span v-else-if="record.nextStatus == '7'">
          <a-form-item label="是否重新检定" v-bind="formItemLayout">
            <a-select
              v-decorator="['isRepeatCheck',{rules: [{required: true,message:'不能为空'}]}]"
              size="small"
              :allowClear="true"
              @change="handleChange"
            >
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="2">否</a-select-option>
            </a-select>
          </a-form-item>
          <span v-if="showExtra == '1'">
            <a-form-item label="(重新)委托时间" v-bind="formItemLayout">
              <a-date-picker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                size="small"
                style="width:100%"
                v-decorator="['processTime',{rules: [{required:true,message:'不能为空'}]}]"
              />
            </a-form-item>
          </span>
          <span v-else-if="showExtra == '2'">
            <a-form-item label="鉴定生效时间" v-bind="formItemLayout">
              <a-date-picker
                showTime
                format="YYYY-MM-DD HH:mm:ss"
                size="small"
                style="width:100%"
                v-decorator="['processTime',{rules: [{required:false,message:'不能为空'}]}]"
              />
            </a-form-item>
          </span>
        </span>
        <span v-else-if="record.nextStatus == '13'">
          <a-form-item label="是否证据公开" v-bind="formItemLayout">
            <a-select
              v-decorator="['isEvidenceOpen',{rules: [{required: true,message:'不能为空'}]}]"
              size="small"
              :allowClear="true"
            >
              <a-select-option value="1">是</a-select-option>
              <a-select-option value="2">否</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="证据公开时间" v-bind="formItemLayout">
            <a-date-picker
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              size="small"
              style="width:100%"
              v-decorator="['processTime',{rules: [{required:true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </span>
      </a-col>
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
        wrapperCol: { span: 8 }
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

