<template>
  <div>
    <a :href="fileDownloadUrl" title="模板下载">
      <a-icon type="cloud-download" />
    </a>
  </div>
</template>

<script>
import { config } from "@/utils/config";
export default {
  name: "DoewLoad",
  data() {
    return {
      loadding: false,
      visible: false,
      timeTemap: "刚刚",
      fileDownloadUrl: config.file_downLoad
    };
  },
  methods: {}
};
</script>

<style lang="css">
.header-notice-wrapper {
  top: 50px !important;
}
</style>
<style lang="scss" scoped>
.header-notice {
  display: inline-block;
  transition: all 0.3s;

  span {
    vertical-align: initial;
  }
}

.listItem {
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
}
</style>
