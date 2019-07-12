<template>
  <a-modal
    title="批量导入"
    :width="480"
    :visible="visible"
    :destroyOnClose="true"
    :maskClosable="false"
  >
  <template slot="footer">
      <a-button key="back" @click="handleCancel">关闭</a-button>
  </template>
    <div class="content">
      <a-upload
        name="excelFile"
        :multiple="true"
        action="http://192.168.10.116:8090/CaseManage/caseInfo/upload"
        :headers="headers"
        @change="handleChange"
      >
        <a-button>
          <a-icon type="upload" />点击上传
        </a-button>
      </a-upload>
    </div>
  </a-modal>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      headers: {
        authorization: "authorization-text"
      }
    };
  },
  methods: {
    upload() {
      //控制莫套框 显示/隐藏
      this.visible = true;
    },
    handleChange(info) {
      console.log(info, 999);
      if (info.file.status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        //   console.log(info);
        this.$message.success(`${info.file.name} 导入成功.`);
        this.handleCancel();
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} 导入失败.`);
      }
    },
    handleSubmit() {},
    handleCancel() {
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
