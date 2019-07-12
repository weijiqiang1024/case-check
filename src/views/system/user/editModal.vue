<template>
  <a-modal
    :title="`${modalTitle}代码类型`"
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
          <a-form-item label="用户名" v-bind="formItemLayout">
            <a-input
              size="small"
              :disabled="true"
              v-decorator="['username',{initialValue:record.username,rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="角色" v-bind="formItemLayout">
            <a-select
              v-decorator="['roleIds',{initialValue:record.roleIds,rules: [{required: true,message:'必填'}]}]"
              style="width:184px"
              size="small"
              :disabled="disabled"
              :allowClear="true"
            >
              <a-select-option v-for="(name,value) in roleType" :key="value">{{name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="所属机构" v-bind="formItemLayout">
            <!-- <a-input size="small" v-decorator="['parentOrgId', {rules: [{required: true}]}]"/> -->
            <a-tree-select
              :treeData="treeData"
              :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
              allowClear
              treeDefaultExpandAll
              @change="onChange"
              v-decorator="['orgId', {initialValue:record.orgId,rules: [{required: true,message:'不能为空'}]}]"
              size="small"
              :disabled="disabled"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="警员类型" v-bind="formItemLayout">
            <a-select
              v-decorator="['userType',{initialValue:record.userType,rules: [{required: true,message:'不能为空'}]}]"
              style="width:184px"
              size="small"
              :disabled="disabled"
              :allowClear="true"
            >
              <a-select-option value="1">领导</a-select-option>
              <a-select-option value="2">警员</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="姓名" v-bind="formItemLayout">
            <a-input
              size="small"
              :disabled="disabled"
              v-decorator="['fullName',{initialValue:record.fullName,rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="电话" v-bind="formItemLayout">
            <a-input
              size="small"
              :disabled="disabled"
              v-decorator="['phoneNbr',{initialValue:record.phoneNbr}, {rules: [{required: true,message:'不能为空'}]}]"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="是否启用" v-bind="formItemLayout">
            <a-radio-group
              v-decorator="['enableFlag',{initialValue:record.enableFlag + '' || ''}]"
              size="small"
              :disabled="disabled"
            >
              <a-radio value="1">启用</a-radio>
              <a-radio value="2">不启用</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <!-- </a-spin> -->
  </a-modal>
</template>
  
  <script>
import Vue from "vue";
import { Modal, TreeSelect } from "ant-design-vue";
// import passWord from '@/assets/password.png';
Vue.use(Modal);
Vue.use(TreeSelect);
export default {
  props: {
    treeData: {
      //orgTree数据源
      type: Array,
      required: true,
      default: () => []
    },
    handleEditOk: {
      //eidt处理方法
      type: Function,
      required: true,
      default: null
    },
    roleType: {
      type: Object,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 7 },
        wrapperCol: { span: 13 }
      },
      visible: this.addModalVisible, //modal框显示隐藏
      confirmLoading: false, //提交操作loading显示
      value: undefined, //父机构值
      record: {}, //表单原始数据从父组件传来
      disabled: false, //用于区别修改和查看操作
      modalTitle: "修改",
      form: this.$form.createForm(this)
    };
  },
  methods: {
    edit(record, disabled = false) {
      debugger;
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
          values.username = "";
          values.fullName = "";
          values.password = "";
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
    },
    onChange(value) {
      this.value = value;
    }
  }
};
</script>
  
 <style lang="scss" scoped>
.remark {
  transform: translateX(4%);
}
</style>
  