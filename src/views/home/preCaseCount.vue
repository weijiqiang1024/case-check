<template>
  <div class="scoreConent">
    <div class="title">
      <span>{{normalCase}}</span>
      <span class="caseType">正常</span>
    </div>
    <div class="chart">
      <span>{{willMature}}</span>
      <span class="caseType">即将到期</span>
    </div>
    <div class="number">
      <span>{{overDue}}</span>
      <span class="caseType">超期</span>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import request from "@/utils/request";
import reqApi from "@/api/index";
export default {
  data() {
    return {
      normalCase: 0,
      willMature: 0,
      overDue: 0
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      request.get(reqApi.countCurrentCaseTimeout, {}).then(res => {
        console.log(res);
        let data = res.result;
        data.map(item => {
          if (item.type == "正常") this.normalCase = item.value;
          if (item.type == "即将到期") this.willMature = item.value;
          if (item.type == "超期") this.overDue = item.value;
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$border-radius: 10px;
$font-size: 30px;
$span-font-size: 14px;
.scoreConent {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 16px 0;
  width: 100%;
  height: 100%;
  letter-spacing: 2px;

  .title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-left: 20px;
    border-radius: $border-radius;
    text-align: center;
    font-size: $font-size;
    color: rgba(53, 202, 202, 1);
    font-weight: 700;
    letter-spacing: 2px;
    background: rgba(0, 0, 0, 0.025);
  }

  .chart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-left: 20px;
    font-size: $font-size;
    font-weight: 700;
    border-radius: $border-radius;
    text-align: center;
    color: rgba(57, 159, 254, 1);
    background: rgba(0, 0, 0, 0.025);
  }

  .number {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 20px;
    border-radius: $border-radius;
    text-align: center;
    font-size: $font-size;
    color: rgba(255, 0, 0, 0.5);
    font-weight: 700;
    background: rgba(0, 0, 0, 0.025);
  }

  .caseType {
    font-size: $span-font-size;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.5);
  }

  .ant-progress-circle-wrap,
  .ant-progress-line-wrap {
    margin-right: 8px;
    margin-bottom: 5px;
  }
}
</style>
